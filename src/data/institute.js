/**
 * INSTITUTE FACTS — single source of truth
 * ---------------------------------------------------------------------------
 * These numbers were appearing in four components with three different values
 * ("40+ Years", "37 years", "55" vs "55+"). Everything numeric about the
 * Institute now lives here, so the hero, the stats bar, the About page and the
 * Who We Are block can never disagree again.
 *
 * Figures are the ones the Institute itself publishes. "Years of excellence"
 * is deliberately expressed as the founding year instead of a count, because a
 * count goes stale every January and was already inconsistent across the site.
 */

export const institute = {
  name: 'B.S. Abdur Rahman Crescent Institute of Science & Technology',
  shortName: 'Crescent',
  centre: 'Centre for Distance and Online Education (CDOE)',
  established: 1984,
  programmes: 55,
  schools: 12,
  ugProgrammes: 30,
  pgProgrammes: 25,
  alumni: '30K+',
  tagline: 'A renowned Quality Leadership Institution at the greenest spot of Chennai.',
}

/** Verified accreditations only — nothing claimed that the Institute doesn't publish. */
export const accreditations = [
  'UGC Entitled',
  'AICTE Approved',
  'Deemed to be University',
]

/** The four headline figures used by the home-page stats bar. */
export const headlineStats = [
  { value: String(institute.established), label: 'Established' },
  { value: String(institute.programmes), label: 'Programmes' },
  { value: String(institute.schools), label: 'Schools' },
  { value: institute.alumni, label: 'Alumni' },
]

/** The longer breakdown used on the About page. */
export const glanceStats = [
  { value: String(institute.established), label: 'Established' },
  { value: String(institute.programmes), label: 'Programmes' },
  { value: String(institute.schools), label: 'Schools' },
  { value: String(institute.ugProgrammes), label: 'Undergraduate Programmes' },
  { value: String(institute.pgProgrammes), label: 'Postgraduate Programmes' },
  { value: institute.alumni, label: 'Alumni' },
]
