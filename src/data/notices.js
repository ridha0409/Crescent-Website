/**
 * NOTICE BOARD — exam dates and announcements
 * ---------------------------------------------------------------------------
 * Feeds the yellow "Notice" tab on the right edge of every page.
 *
 * READ THIS BEFORE THE SITE GOES LIVE.
 * Every entry below is a PLACEHOLDER, marked `placeholder: true`. While that
 * flag is set the row carries a "SAMPLE" badge, so nobody sits an exam on a
 * date this site invented. Publishing a wrong exam date is the one mistake a
 * notice board must never make.
 *
 * TO PUBLISH A REAL ENTRY
 *   1. replace the values with the real ones
 *   2. delete that entry's `placeholder: true` line
 * The badge disappears on its own.
 *
 * `date` is ISO (YYYY-MM-DD) so the list can sort itself and mark anything in
 * the past as completed — nothing needs pruning by hand as the term goes on.
 */

/** Examination schedule — the main content of the notice board. */
export const examSchedule = [
  {
    placeholder: true,
    programme: 'MBA',
    title: 'End Semester Examinations — Semester I',
    date: '2026-11-16',
    endDate: '2026-11-24',
    session: 'Forenoon · 10.00 am – 1.00 pm',
    note: 'Hall tickets are released on the LMS one week before the first paper.',
  },
  {
    placeholder: true,
    programme: 'MCA',
    title: 'End Semester Examinations — Semester I',
    date: '2026-11-16',
    endDate: '2026-11-25',
    session: 'Afternoon · 2.00 pm – 5.00 pm',
    note: 'Hall tickets are released on the LMS one week before the first paper.',
  },
  {
    placeholder: true,
    programme: 'BA Islamic Studies',
    title: 'End Semester Examinations — Semester I',
    date: '2026-11-18',
    endDate: '2026-11-26',
    session: 'Forenoon · 10.00 am – 1.00 pm',
  },
  {
    placeholder: true,
    programme: 'All programmes',
    title: 'Assignment submission — last date',
    date: '2026-10-31',
    session: 'Upload on the LMS before 11.59 pm',
  },
]

/** Anything that is not an exam date — admissions, results, holidays. */
export const generalNotices = [
  {
    placeholder: true,
    tag: 'Results',
    title: 'Semester results — announcement',
    date: '2026-12-20',
    body: 'Results are published on the LMS. Revaluation requests close two weeks after publication.',
  },
  {
    placeholder: true,
    tag: 'Admission',
    title: 'Admissions open for AY 2026-27',
    date: '2026-09-01',
    body: 'Applications for MBA, MCA and BA Islamic Studies are open. Apply through the admission portal.',
  },
]

/** True when a dated entry is in the past — drives the "Completed" label. */
export function isPast(entry) {
  const end = entry.endDate || entry.date
  if (!end) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(`${end}T23:59:59`) < today
}

/** How many entries are still ahead — shown as the badge on the tab. */
export function upcomingCount() {
  return [...examSchedule, ...generalNotices].filter((e) => !isPast(e)).length
}

/**
 * '2026-11-16' + '2026-11-24' -> '16 – 24 Nov 2026'
 * A single date -> '16 Nov 2026'. Built from an explicit month table rather
 * than toLocaleDateString so the format is identical in every browser locale.
 */
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export function formatRange(date, endDate) {
  if (!date) return ''
  const [y, m, d] = date.split('-').map(Number)
  const start = `${d} ${MONTHS[m - 1]} ${y}`
  if (!endDate) return start

  const [ey, em, ed] = endDate.split('-').map(Number)
  if (y === ey && m === em) return `${d} – ${ed} ${MONTHS[m - 1]} ${y}`
  if (y === ey) return `${d} ${MONTHS[m - 1]} – ${ed} ${MONTHS[em - 1]} ${y}`
  return `${start} – ${ed} ${MONTHS[em - 1]} ${ey}`
}
