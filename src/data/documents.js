/**
 * DOCUMENT REGISTRY — every PDF the site links to
 * ---------------------------------------------------------------------------
 * Every document is served from THIS site and opens DIRECTLY — the link points
 * at the bundled PDF itself, which the browser renders in its own viewer in a
 * new tab. There is no interstitial page to click through, and nothing links
 * out to the Institute's servers, so the page the visitor was reading stays
 * exactly where it was.
 *
 * HOW IT WORKS
 * The files live in src/assets/PDF. Vite's import.meta.glob below bundles every
 * one of them and hands back a hashed URL, so they are fingerprinted, cached
 * and deployed with the rest of the site. The registry then maps a short id
 * (used in the URL) to a filename and a human title.
 *
 * TO ADD A DOCUMENT
 *   1. drop the PDF into src/assets/PDF
 *   2. add an entry below: id, the exact `file` name, and a `title`
 * Nothing else changes.
 *
 * WHERE THE FILES CAME FROM
 * Every `file` name below is the name the Institute publishes the document
 * under. The originals live at online.crescent-institute.edu.in — mostly under
 * /img/, /img/brochure/, /img/admissionlist/, /img/annual reports_ol/ and
 * /img/UGCpart1/ — with two exceptions: the MBA/MCA regulations are on
 * crescent.education/wp-content/uploads/2021/11/, and the DEB application form
 * is on distance.crescent-institute.edu.in/img/. The Institute writes several
 * of those paths with Windows backslashes; browsers normalise them.
 *
 * A REGISTRY ENTRY WHOSE FILE IS NOT THERE YET is not an error: `url` comes
 * back null and every link renders as "Yet to be published" instead of a dead
 * button. `missingDocuments` lists them, and in development the console names
 * them on boot — see the bottom of this file.
 */

/*
 * Eagerly bundle every PDF in src/assets/PDF as a URL. `eager` matters: the
 * registry is read synchronously while a page renders, so a lazy glob (which
 * returns import functions) would hand components a promise instead of a href.
 */
const bundled = import.meta.glob('../assets/PDF/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** Bundled URLs keyed by the file's own name, e.g. 'UGC_Public Notice.pdf'. */
const urlByFile = Object.fromEntries(
  Object.entries(bundled).map(([path, url]) => [path.split('/').pop(), url])
)

/**
 * id → { file, title }
 * The id is what appears in the address bar (/document/<id>), so keep it short,
 * lowercase and hyphenated. The file name must match the file on disk exactly,
 * spaces and double spaces included.
 */
export const documentRegistry = {
  /* ---------------- UGC Corner ---------------- */
  'aicte-noc': {
    file: 'AITCE - ODL-OL 5 years NOC.pdf',
    title: 'AICTE — ODL / OL, 5 Years NOC',
  },
  'ugc-degree-equivalence': {
    file: 'UGC_OL-ODL Equvalance.pdf',
    title: 'UGC — OL / ODL Degree Equivalence',
  },
  'ugc-notification-2024': {
    file: 'UGC_20240319165222_1.pdf',
    title: 'UGC Notification',
  },
  'compliance-bsacist-24-25': {
    file: 'BSACIST 24-25-im.pdf',
    title: 'BSACIST Compliance 2024-25',
  },
  'compliance-ugc-2024': {
    file: 'UGC_20240119142934_1.pdf',
    title: 'UGC Compliance Notification',
  },
  'ugc-application-2021-22': {
    file: '3. Application  OL - 2021-22.pdf',
    title: 'UGC Application — OL 2021-22',
  },
  'ugc-application-2022-23': {
    file: '2022-23 OL filled  application.pdf',
    title: 'UGC Application — OL 2022-23',
  },
  'ugc-application-2023': {
    file: 'Application UGC Portal_OL2023 _ After_ submisson.pdf',
    title: 'UGC Portal Application — OL 2023',
  },
  'ugc-application-2024-25': {
    file: 'OL_application form 2024-2025_After submission.pdf',
    title: 'UGC Application — OL 2024-25',
  },
  'deb-application-2026-27': {
    file: 'DEB-Application Form 2026-2027.pdf',
    title: 'DEB Application Form 2026-2027',
  },
  'annual-report-2021-22': {
    file: 'CDOE - OL ANNUAL REPORT -2021-2022.pdf',
    title: 'CDOE OL Annual Report 2021-2022',
  },
  'annual-report-2022-23': {
    file: 'CDOE- OL ANNUAL REPORT -2022-2023.pdf',
    title: 'CDOE OL Annual Report 2022-2023',
  },
  'annual-report-2023-24': {
    file: 'CDOE-  OL ANNUAL REPORT -2023-2024.pdf',
    title: 'CDOE OL Annual Report 2023-2024',
  },
  'annual-report-2024-25': {
    file: 'CDOE -OL ANNUAL REPORT -2024-2025.pdf',
    title: 'CDOE OL Annual Report 2024-2025',
  },
  'annual-report-2025-26': {
    // Note the double space after CDOE — that is the published file name.
    file: 'CDOE  - OL -ANNUAL REPORT -2025-2026.pdf',
    title: 'CDOE OL Annual Report 2025-2026',
  },
  'admission-list-ay-2021': {
    file: 'MBA MCA OL AY 2021.pdf',
    title: 'MBA / MCA OL — AY 2021',
  },
  'admission-list-ay-2022': {
    file: 'MBA MCA OL AY 2022.pdf',
    title: 'MBA / MCA OL — AY 2022',
  },
  'admission-list-cy-2022': {
    file: 'MBA MCA OL CY 2022.pdf',
    title: 'MBA / MCA OL — CY 2022',
  },
  'admission-list-ay-2023': {
    file: 'OL AY 23 student list.pdf',
    title: 'OL Student List — AY 2023',
  },
  'admission-list-cy-2023': {
    file: 'MBA OL CY 2023.pdf',
    title: 'MBA OL — CY 2023',
  },
  'admission-list-cy-2024': {
    file: 'MBA OL CY 2024.pdf',
    title: 'MBA OL — CY 2024',
  },
  'admission-list-ay-2024-online': {
    file: 'Admission List AY 2024 Online.pdf',
    title: 'Admission List AY 2024 — Online',
  },
  'ugc-19-august': {
    file: 'UGC_19th August.pdf',
    title: 'UGC — 19th August',
  },
  'ugc-public-notice': {
    file: 'UGC_Public Notice.pdf',
    title: 'UGC Public Notice',
  },

  /* ---------------- Admission ----------------
     Not yet in src/assets/PDF — the row renders as "Yet to be published"
     until the file is dropped in under exactly this name. */
  'admission-notification': {
    file: 'Admission Notification AY 2023.pdf',
    title: 'Admission Notification AY 2023',
  },

  /* ---------------- Programme regulations & brochures ---------------- */
  'regulations-mba-mca': {
    file: 'DeanAA-MBA-MCA-ODL-and-OL-Regulations2021-24.11.2021-F.pdf',
    title: 'MBA / MCA — ODL and OL Regulations 2021',
  },
  'regulations-ba-islamic-studies': {
    file: 'DeanAA-BAIslamic-StudiesR2021-CS-24.08.22-F (1).pdf',
    title: 'BA Islamic Studies — Regulations 2021',
  },
  'brochure-mba': {
    file: 'OL MBA Website Brochure09012026.pdf',
    title: 'MBA — Programme Brochure',
  },
  'brochure-mca': {
    file: 'OL MCA Website Brochure09012026.pdf',
    title: 'MCA — Programme Brochure',
  },
  'brochure-ba-islamic-studies': {
    file: 'OL B.A. Islamic Studies Website Brochure09012026.pdf',
    title: 'BA Islamic Studies — Programme Brochure',
  },
  // The Institute has not published brochures for these three yet. These are
  // built in the same layout as the official ones above, from the programme
  // details on this site — replace each file once an official one exists.
  'brochure-ba-english': {
    file: 'OL B.A. English Website Brochure.pdf',
    title: 'BA English — Programme Brochure',
  },
  'brochure-ba-public-policy': {
    file: 'OL B.A. Public Policy Website Brochure.pdf',
    title: 'BA Public Policy — Programme Brochure',
  },
  'brochure-ma-islamic-studies': {
    file: 'OL M.A. Islamic Studies Website Brochure.pdf',
    title: 'MA Islamic Studies — Programme Brochure',
  },

  /* ---------------- Project ---------------- */
  'mba-project-guidelines': {
    file: 'MBA ODL Project Guidelines - Revised.pdf',
    title: 'MBA — Project Guidelines (Revised)',
  },
  'mba-project-report-format': {
    file: 'MBA Project Report Format.pdf',
    title: 'MBA — Project Report Format',
  },
  'mca-project-guidelines': {
    file: 'Project guide lines.pdf',
    title: 'MCA — Project Guidelines',
  },
  'mca-review-dates': {
    file: 'Project Review Details.pdf',
    title: 'MCA — Project Review Dates',
  },
  'mca-zeroth-review': {
    file: "STUDENTS' CIRCULAR FOR ZEROTH REVIEW.pdf",
    title: 'MCA — Zeroth Review Format',
  },
  'mca-first-review': {
    file: "STUDENTS' CIRCULAR FOR FIRST REVIEW.pdf",
    title: 'MCA — First Review Format',
  },
  'mca-project-report-format': {
    file: 'MCA Project Report Format.pdf',
    title: 'MCA — Project Report Format',
  },
}

/** The bundled URL for a document id, or null when the file is not in yet. */
export function documentUrl(id) {
  const entry = documentRegistry[id]
  return (entry && urlByFile[entry.file]) || null
}

export function getDocument(id) {
  const entry = documentRegistry[id]
  if (!entry) return null
  return { id, ...entry, url: urlByFile[entry.file] || null }
}

/** Registry entries whose file is not in src/assets/PDF yet. */
export const missingDocuments = Object.entries(documentRegistry)
  .filter(([, { file }]) => !urlByFile[file])
  .map(([id, { file, title }]) => ({ id, file, title }))

// A loud, dev-only heads-up. Without it a mistyped filename fails silently as
// a permanently "unpublished" document.
if (import.meta.env.DEV && missingDocuments.length) {
  console.warn(
    `[documents] ${missingDocuments.length} registered file(s) are not in src/assets/PDF:\n` +
      missingDocuments.map((d) => `  • ${d.file}`).join('\n')
  )
}
