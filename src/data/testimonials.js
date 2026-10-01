/**
 * STUDENT TESTIMONIALS & HOME GALLERY
 * ---------------------------------------------------------------------------
 * READ THIS BEFORE THE SITE GOES LIVE.
 *
 * Every testimonial below is a PLACEHOLDER, marked `placeholder: true`. While
 * that flag is set the card renders a small "SAMPLE" badge, so nobody mistakes
 * these for real student voices — publishing invented quotes on a university
 * site misleads applicants and is the one thing this file exists to prevent.
 *
 * TO PUBLISH A REAL TESTIMONIAL
 *   1. replace `name`, `programme`, `year` and `quote` with the real ones
 *   2. delete that entry's `placeholder: true` line
 * The badge disappears on its own. Nothing else needs changing, and the
 * carousel handles any number of entries.
 */
export const testimonials = [
  {
    placeholder: true,
    name: 'Student name',
    programme: 'MBA',
    year: '2024 batch',
    quote:
      'Replace this with a real quote from a graduate — what the programme changed for them at work, and how the online format fitted around their job.',
  },
  {
    placeholder: true,
    name: 'Student name',
    programme: 'MCA',
    year: '2024 batch',
    quote:
      'Replace this with a real quote — the courses that mattered most, the faculty who taught them, and where the degree took them next.',
  },
  {
    placeholder: true,
    name: 'Student name',
    programme: 'BA Islamic Studies',
    year: '2023 batch',
    quote:
      'Replace this with a real quote — what drew them to the programme and what studying it online made possible for them.',
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
