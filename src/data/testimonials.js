/**
 * STUDENT TESTIMONIALS & HOME GALLERY
 * ---------------------------------------------------------------------------
 * READ THIS BEFORE THE SITE GOES LIVE.
 *
 * Every testimonial below is a SAMPLE, marked `placeholder: true` (the
 * on-screen "Sample" badge was removed at the client's request, so this flag
 * is now the only record of which entries are not real student quotes).
 * Publishing invented quotes as real ones would mislead applicants — replace
 * them with real, consented quotes before the site is promoted publicly.
 *
 * TO PUBLISH A REAL TESTIMONIAL
 *   1. replace `name`, `programme`, `year` and `quote` with the real ones
 *   2. delete that entry's `placeholder: true` line
 * The carousel handles any number of entries.
 */
/*
 * The entries below are SAMPLE voices, written to show how the section reads.
 * They describe the programmes accurately (live sessions, self-learning
 * material, online exams) but are not quotes from real students, so they carry
 * no personal names — only the programme and the kind of learner. Swap each
 * one for a real, consented quote before the site is promoted publicly.
 */
export const testimonials = [
  {
    placeholder: true,
    name: 'MBA learner',
    programme: 'Working professional',
    year: '',
    quote:
      'I could keep my full-time job and still study properly. The evening live sessions fit after office hours, and the self-learning material meant I never had to buy extra books.',
  },
  {
    placeholder: true,
    name: 'MCA learner',
    programme: 'Software support role',
    year: '',
    quote:
      'Being able to clear my doubts with the faculty every working day made a big difference. Programming topics I had struggled with on my own finally made sense.',
  },
  {
    placeholder: true,
    name: 'BA Islamic Studies learner',
    programme: 'Studying from home',
    year: '',
    quote:
      'I always wanted to study Islamic thought and history in a structured way. The online format let me learn at my own pace from home, with recorded lectures I could revisit.',
  },
  {
    placeholder: true,
    name: 'MBA learner',
    programme: 'Family business',
    year: '',
    quote:
      'The finance and marketing courses were directly useful in our family business. Writing the exams online through the LMS saved me the travel.',
  },
  {
    placeholder: true,
    name: 'MCA learner',
    programme: 'Career changer',
    year: '',
    quote:
      'Moving into IT felt daunting, but the course structure was clear from the first semester. Knowing the degree is UGC entitled gave me confidence it would be recognised.',
  },
]

/*
 * THE GALLERY
 * Campus photographs that already live in this repo, so the section loads with
 * the page and needs no external host.
 *
 * These are web-sized copies in src/assets/site — the originals in the CDOE
 * photo library run 2-13 MB each, which would have made the home page enormous.
 * Each copy is capped at 1600px on the long edge (quality-84 JPEG), which is
 * more than the tile or the lightbox ever needs.
 *
 * To add a picture: web-size it the same way, drop it in src/assets/site,
 * import it here and add an entry. `caption` is the visible label and doubles
 * as the image's alt text.
 */
import campusPanorama from '../assets/site/campus-panorama.jpg'
import editorRoom from '../assets/site/editor-room.jpg'
import computerLab from '../assets/site/computer-lab.jpg'
import programmeLaunch from '../assets/site/programme-launch.jpg'
import studioFacility from '../assets/site/studio-facility.jpg'

/*
 * Five slides, not six: the photo library ships the campus panorama twice
 * (visionary/about-us-1.jpg and execution/ss_cleanup.jpg are the same file),
 * so a sixth entry showed the first picture again under a different caption.
 */
export const gallery = [
  { src: campusPanorama, caption: 'Crescent campus' },
  { src: studioFacility, caption: 'Recording studio' },
  { src: editorRoom, caption: 'Editing suite' },
  { src: computerLab, caption: 'Computer lab' },
  { src: programmeLaunch, caption: 'Online programme launch' },
]
