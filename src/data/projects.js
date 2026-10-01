/**
 * PROJECT — Project › MBA / MCA
 * ---------------------------------------------------------------------------
 * Mirrors the Project menu on the official CDOE site:
 *   https://online.crescent-institute.edu.in/mba-project
 *   https://online.crescent-institute.edu.in/mca-project
 *
 * Both pages are document pages: the project guidelines, the review formats and
 * the report format a final-semester learner needs. The official MCA page hides
 * its review documents one click deeper, behind a "Review Format" link to a
 * /review page — all three are listed directly here instead. Each `doc` is a registry id
 * in src/data/documents.js, so the PDF is served from this site and opens in
 * this site's viewer — the official pages link out to files on their own
 * server, this one does not.
 *
 * A document whose file is not in src/assets/PDF yet renders as "Yet to be
 * published" rather than a dead link. Drop the file in, and it goes live.
 */

export const projectSections = [
  {
    slug: 'mba',
    label: 'MBA',
    heading: 'Project — MBA',
    blurb:
      'The project is the final component of the MBA. Everything a learner needs to plan, write and submit it is below — read the guidelines first, then use the prescribed report format.',
    programmePath: '/programmes/mba',
    documents: [
      {
        doc: 'mba-project-guidelines',
        title: 'Project Guidelines',
        meta: 'MBA ODL project guidelines — revised',
        description:
          'Scope, timelines, supervision, evaluation and the submission rules for the MBA project.',
      },
      {
        doc: 'mba-project-report-format',
        title: 'Project Report Format',
        meta: 'Prescribed report template',
        description:
          'The prescribed structure for the report — title page, certificate, chapter order, referencing and binding.',
      },
    ],
  },
  {
    slug: 'mca',
    label: 'MCA',
    heading: 'Project — MCA',
    blurb:
      'The MCA project runs through the final semester with periodic reviews. The guidelines, the review dates and formats, and the report format are all here.',
    programmePath: '/programmes/mca',
    documents: [
      {
        doc: 'mca-project-guidelines',
        title: 'Project Guidelines',
        meta: 'MCA project guidelines',
        description:
          'Scope, timelines, supervision, evaluation and the submission rules for the MCA project.',
      },
      {
        doc: 'mca-review-dates',
        title: 'Review Dates',
        meta: 'Project review schedule',
        description:
          'The dates of each review in the project cycle, and what has to be ready for it.',
      },
      {
        doc: 'mca-zeroth-review',
        title: 'Zeroth Review Format',
        meta: "Students' circular",
        description:
          'The format and expectations for the zeroth review — the problem statement and the plan.',
      },
      {
        doc: 'mca-first-review',
        title: 'First Review Format',
        meta: "Students' circular",
        description:
          'The format and expectations for the first review — design, progress and early results.',
      },
      {
        doc: 'mca-project-report-format',
        title: 'Project Report Format',
        meta: 'Prescribed report template',
        description:
          'The prescribed structure for the report — title page, certificate, chapter order, referencing and binding.',
      },
    ],
  },
]

export function getProjectSection(slug) {
  return projectSections.find((s) => s.slug === slug)
}
