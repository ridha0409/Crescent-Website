# src/assets

Everything in here is bundled by Vite, which means a file is only shipped to the
browser if something `import`s it. Dropping a photo in a folder does not put it
on the site — an import does.

Photographs are grouped by what they are of, one folder per kind:

| Folder     | What belongs in it                                                        |
| ---------- | ------------------------------------------------------------------------- |
| `logos/`   | The Institute lockup and mark, in every colourway.                         |
| `campus/`  | Buildings and grounds — the originals, at full resolution.                 |
| `site/`    | Web-sized photographs actually used on pages. See `site/SOURCES.md`.       |
| `faculty/` | Staff portraits, one per person.                                           |
| `gallery/` | Web-sized campus photographs for galleries and carousels.                  |
| `hero/`    | Artwork made for the home page hero rather than photographed.              |
| `icons/`   | Loose SVG marks that are not part of the icon set in `public/icons.svg`.   |
| `PDF/`     | Documents. Registered in `src/data/documents.js`, never imported by hand.  |

## Naming

Lower-case, hyphen-separated, no spaces: `architecture-block-side-view.jpg`, not
`Crescent Architecture Block  Side View.JPG`. Spaces and capitals in a filename
are the usual cause of an image that loads on Windows and 404s once deployed.

Faculty portraits are named after the person exactly as the site titles them, so
the import reads as the name: `dr-r-sabin-begum.jpg`.

## Which folder do I import from?

- Anything that appears **on a page** should come from `site/` or `gallery/`,
  which hold web-sized files. A page that imports straight out of `campus/`
  ships a multi-megabyte original to every visitor.
- `campus/` is the archive the web-sized copies are made from. Keep it; don't
  import from it.

## Adding a photograph

1. Resize it for the web (long edge ~1600px, quality ~80) and put the result in
   `site/`, keeping the original in `campus/`.
2. Record where it came from in `site/SOURCES.md`.
3. Import it by path in the component or data file that uses it.
