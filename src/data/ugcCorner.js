/**
 * UGC CORNER — single source of truth
 * ---------------------------------------------------------------------------
 * Every document below is mirrored from the official CDOE site's UGC Corner
 * menu: https://online.crescent-institute.edu.in/
 *
 * The PDFs themselves now live in this repo (src/assets/PDF) rather than on the
 * Institute's servers, so a document entry carries a `doc` id into the registry
 * in src/data/documents.js instead of an external href. Every one opens in this
 * site's own viewer at /document/<id> — no link on this page leaves the site.
 *
 * `slug` matches the route in App.jsx and the navbar dropdown. Adding a
 * document is a one-line change here; no component needs to be touched.
 */

export const ugcSections = [
  {
    slug: 'approval',
    label: 'AICTE Approval',
    heading: 'AICTE Approval',
    blurb:
      'The All India Council for Technical Education No Objection Certificate covering the Institute’s Online and Open Distance Learning programmes.',
    documents: [
      {
        title: 'AICTE — ODL / OL, 5 Years NOC',
        meta: 'No Objection Certificate',
        doc: 'aicte-noc',
      },
    ],
  },
  {
    slug: 'degree-equi',
    label: 'Degree Equivalence',
    heading: 'Degree Equivalence',
    blurb:
      'The UGC notification establishing that degrees earned through Online and Open Distance Learning are equivalent to their on-campus counterparts.',
    documents: [
      {
        title: 'UGC — OL / ODL Degree Equivalence',
        meta: 'UGC notification',
        doc: 'ugc-degree-equivalence',
      },
    ],
  },
  {
    slug: 'notification',
    label: 'UGC Notification',
    heading: 'UGC Notifications',
    blurb:
      'Public notices issued by the University Grants Commission relating to the Institute’s online and distance programmes.',
    documents: [
      {
        title: 'Public Notice — 19 August 2024',
        meta: 'UGC public notice',
        doc: 'ugc-19-august',
      },
      {
        title: 'Public Notice — 19 March 2024',
        meta: 'UGC public notice',
        doc: 'ugc-notification-2024',
      },
      {
        title: 'Public Notice — 19 September 2023',
        meta: 'UGC public notice',
        doc: 'ugc-public-notice',
      },
      {
        title: 'AICTE — approval for offering UG Programmes',
        meta: 'Approval letter',
        doc: 'compliance-ugc-2024',
      },
    ],
  },
  {
    slug: 'compliance',
    label: 'Compliance',
    heading: 'Compliance',
    blurb:
      'Annual compliance filing submitted to the University Grants Commission.',
    documents: [
      {
        title: 'BSACIST Compliance — 2024-2025',
        meta: 'Academic year 2024-2025',
        doc: 'compliance-bsacist-24-25',
      },
    ],
  },
  {
    slug: 'application',
    label: 'UGC Applications',
    heading: 'UGC Applications',
    blurb:
      'The applications submitted to the UGC / Distance Education Bureau seeking recognition to offer online programmes, year by year.',
    documents: [
      {
        title: 'Application — 2026-2027',
        meta: 'DEB application form',
        doc: 'deb-application-2026-27',
      },
      {
        title: 'Application — 2024-2025',
        meta: 'After submission',
        doc: 'ugc-application-2024-25',
      },
      {
        title: 'Application — 2023-2024',
        meta: 'UGC portal, after submission',
        doc: 'ugc-application-2023',
      },
      {
        title: 'Application — 2022-2023',
        meta: 'Filled application',
        doc: 'ugc-application-2022-23',
      },
      {
        title: 'Application — 2021-2022',
        meta: 'Online mode application',
        doc: 'ugc-application-2021-22',
      },
    ],
  },
  {
    slug: 'annual',
    label: 'Annual Reports',
    heading: 'Annual Reports',
    blurb:
      'Annual reports of the Centre for Internal Quality Assurance for programmes offered under online mode.',
    documents: [
      {
        title: 'CDOE — OL Annual Report 2025-2026',
        meta: 'CIQA annual report',
        doc: 'annual-report-2025-26',
      },
      {
        title: 'CDOE — OL Annual Report 2024-2025',
        meta: 'CIQA annual report',
        doc: 'annual-report-2024-25',
      },
      {
        title: 'CDOE — OL Annual Report 2023-2024',
        meta: 'CIQA annual report',
        doc: 'annual-report-2023-24',
      },
      {
        title: 'CDOE — OL Annual Report 2022-2023',
        meta: 'CIQA annual report',
        doc: 'annual-report-2022-23',
      },
      {
        title: 'CDOE — OL Annual Report 2021-2022',
        meta: 'CIQA annual report',
        doc: 'annual-report-2021-22',
      },
    ],
  },
  {
    slug: 'admission',
    label: 'Admission List',
    heading: 'Admission List',
    blurb:
      'Lists of admitted learners, published by academic year (AY) and calendar year (CY) admission cycles.',
    grouped: true,
    documents: [
      {
        group: '2024-2025',
        title: 'Admission List — AY 2024 (Online)',
        meta: 'Academic year cycle',
        doc: 'admission-list-ay-2024-online',
      },
      {
        group: '2024-2025',
        title: 'MBA — OL CY 2024',
        meta: 'Calendar year cycle',
        doc: 'admission-list-cy-2024',
      },
      {
        group: '2023-2024',
        title: 'Student List — OL AY 2023',
        meta: 'Academic year cycle',
        doc: 'admission-list-ay-2023',
      },
      {
        group: '2023-2024',
        title: 'MBA — OL CY 2023',
        meta: 'Calendar year cycle',
        doc: 'admission-list-cy-2023',
      },
      {
        group: '2022-2023',
        title: 'MBA & MCA — OL AY 2022',
        meta: 'Academic year cycle',
        doc: 'admission-list-ay-2022',
      },
      {
        group: '2022-2023',
        title: 'MBA & MCA — OL CY 2022',
        meta: 'Calendar year cycle',
        doc: 'admission-list-cy-2022',
      },
      {
        group: '2021-2022',
        title: 'MBA & MCA — OL AY 2021',
        meta: 'Academic year cycle',
        doc: 'admission-list-ay-2021',
      },
    ],
  },
]

/** Look up one section by its route slug. */
export function getUgcSection(slug) {
  return ugcSections.find((s) => s.slug === slug)
}

/** Total number of published documents — used on the UGC Corner index. */
export const ugcDocumentCount = ugcSections.reduce(
  (n, s) => n + s.documents.length,
  0
)
