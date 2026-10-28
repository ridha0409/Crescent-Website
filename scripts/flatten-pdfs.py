"""
FLATTEN PDFS — publish every document as images, so its text cannot be copied
---------------------------------------------------------------------------
Every page of every PDF in src/assets/PDF is rendered to a JPEG and the PDF is
rebuilt from those pictures alone. The result looks the same but has no text
layer: nothing to select, copy or search. As a second lock the rebuilt file is
saved with the "copy / extract" permission switched off.

The original of each file is kept in pdf-originals/ (not bundled, not
committed) before it is replaced, so nothing is lost.

Run it after dropping a new PDF into src/assets/PDF:

    npm run pdf:flatten

It is safe to run again: a file this script already flattened is skipped.
To re-do files that are already flattened (from their copy in pdf-originals/):

    python scripts/flatten-pdfs.py --redo "File name.pdf" ...

LONG DOCUMENTS (more than LONG_DOC_PAGES pages, e.g. the annual reports) are
stored lighter so they stay quick to open on mobile data: pages that are plain
black-on-white text become pure black-and-white images at 150 dpi, which are
several times smaller than JPEG and stay just as readable. Pages with real
colour keep a colour JPEG. Short documents are unchanged (150 dpi colour JPEG).

Needs Python with PyMuPDF and Pillow (pip install pymupdf pillow).
"""

import io
import os
import secrets
import shutil
import sys

import pymupdf
from PIL import Image, ImageStat

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_DIR = os.path.join(ROOT, "src", "assets", "PDF")
BACKUP_DIR = os.path.join(ROOT, "pdf-originals")

DPI = 150  # sharp enough to read and zoom on screen, without bloating the file
JPEG_QUALITY = 82
LONG_DOC_PAGES = 15   # documents longer than this get the lighter treatment
COLOUR_THRESHOLD = 12  # mean saturation (0-255) above which a page counts as colour
INK_THRESHOLD = 160    # greyscale level below which a pixel counts as ink (black)
MARKER = "cresoline-flattened"  # written to the PDF's metadata

PERMISSIONS = (
    pymupdf.PDF_PERM_PRINT
    | pymupdf.PDF_PERM_PRINT_HQ
    | pymupdf.PDF_PERM_ACCESSIBILITY
)  # copy, extract, modify and annotate are all left off


def already_flattened(doc):
    return MARKER in (doc.metadata or {}).get("keywords", "")


def render_long_doc_page(page):
    """A page of a long document: black-and-white PNG for text, JPEG for colour."""
    pix = page.get_pixmap(dpi=DPI, alpha=False)
    im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    buf = io.BytesIO()
    if ImageStat.Stat(im.convert("HSV").split()[1]).mean[0] > COLOUR_THRESHOLD:
        im.save(buf, "JPEG", quality=JPEG_QUALITY, optimize=True)
    else:
        ink = im.convert("L").point(lambda v: 255 if v > INK_THRESHOLD else 0).convert("1")
        ink.save(buf, "PNG", optimize=True)
    return buf.getvalue()


def flatten(path, redo=False):
    backup = os.path.join(BACKUP_DIR, os.path.basename(path))
    src = pymupdf.open(path)
    if already_flattened(src):
        if not redo:
            return "skipped (already flattened)"
        if not os.path.exists(backup):
            return "skipped (no original in pdf-originals to redo from)"
        src.close()
        src = pymupdf.open(backup)

    long_doc = src.page_count > LONG_DOC_PAGES
    out = pymupdf.open()
    for page in src:
        if long_doc:
            image = render_long_doc_page(page)
        else:
            pix = page.get_pixmap(dpi=DPI, alpha=False)
            image = pix.tobytes("jpeg", jpg_quality=JPEG_QUALITY)
        new_page = out.new_page(width=page.rect.width, height=page.rect.height)
        new_page.insert_image(new_page.rect, stream=image)

    out.set_metadata({
        "title": (src.metadata or {}).get("title") or os.path.splitext(os.path.basename(path))[0],
        "keywords": MARKER,
        "producer": "",
        "creator": "",
    })
    src.close()

    if not os.path.exists(backup):
        shutil.copy2(path, backup)

    tmp = path + ".tmp"
    out.save(
        tmp,
        garbage=4,
        deflate=True,
        encryption=pymupdf.PDF_ENCRYPT_AES_256,
        owner_pw=secrets.token_urlsafe(24),  # no one needs it; it only locks the permissions
        permissions=PERMISSIONS,
    )
    out.close()
    os.replace(tmp, path)
    return ("re-flattened" if redo else "flattened") + (" (long document)" if long_doc else "")


def main(argv):
    os.makedirs(BACKUP_DIR, exist_ok=True)
    files = sorted(f for f in os.listdir(PDF_DIR) if f.lower().endswith(".pdf"))
    if not files:
        print("No PDFs in", PDF_DIR)
        return 0

    redo = set()
    if argv[:1] == ["--redo"]:
        redo = set(argv[1:])
        unknown = redo - set(files)
        if not redo or unknown:
            print("Usage: --redo \"File name.pdf\" ...  (names as they appear in src/assets/PDF)")
            for name in sorted(unknown):
                print("  not found:", name)
            return 2
        files = sorted(redo)

    failed = 0
    for name in files:
        path = os.path.join(PDF_DIR, name)
        before = os.path.getsize(path)
        try:
            result = flatten(path, redo=name in redo)
        except Exception as exc:  # keep going; report at the end
            failed += 1
            print(f"  FAILED   {name}: {exc}")
            continue
        after = os.path.getsize(path)
        print(f"  {result:<27} {before // 1024:>6} KB -> {after // 1024:>6} KB  {name}")

    print(f"\nDone. Originals are in {BACKUP_DIR}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
