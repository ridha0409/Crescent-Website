/**
 * STUDENT TESTIMONIALS & HOME GALLERY
 * ---------------------------------------------------------------------------
 * Real student quotes, as published on the institute's current site
 * (online.crescent-institute.edu.in, "What Our Students Say"). Quotes are kept
 * word for word; registration numbers are left off this page.
 *
 * To add one: copy an entry and fill in `name`, `programme`, `year` and
 * `quote`. The carousel handles any number of entries.
 */
export const testimonials = [
  {
    name: 'Nitish J',
    programme: 'MCA (Online)',
    year: '',
    quote:
      'Hi I am Nitish Jaishankar completed a Master of Computer Application (MCA) online program at BSACIST (CDOE). This online course citing excellent academic environment, enjoying online live sessions, industry-relevant syllabus, approachable professors, and placement support. Overall, I felt wonderful experience @ BSACIST (CDOE).',
  },
  {
    name: 'Ashiq Ahamed C',
    programme: 'MBA (Online)',
    year: '',
    quote:
      'The MBA online course at BSACIST offers a comprehensive, flexible curriculum with industry-leading faculty. The course provides deep insights into business administration, practical guidance, and essential skills for success in the global business world. The institute dedication to excellence makes it a great choice for career advancement.',
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
import ceremonyAward from '../assets/site/degree-ceremony-award.jpg'
import ceremonyStage from '../assets/site/degree-ceremony-stage.jpg'
import ceremonyFaculty from '../assets/site/degree-ceremony-faculty.jpg'

/*
 * The campus panorama is listed once: the photo library ships it twice
 * (visionary/about-us-1.jpg and execution/ss_cleanup.jpg are the same file),
 * and a second entry showed the same picture under a different caption.
 * The Degree Award Ceremony photos follow it so they come up early.
 */
export const gallery = [
  { src: campusPanorama, caption: 'Crescent campus' },
  { src: ceremonyAward, caption: 'Degree Award Ceremony, February 2025' },
  { src: ceremonyStage, caption: 'Dignitaries at the Degree Award Ceremony' },
  { src: ceremonyFaculty, caption: 'Faculty at the Degree Award Ceremony' },
  { src: studioFacility, caption: 'Recording studio' },
  { src: editorRoom, caption: 'Editing suite' },
  { src: computerLab, caption: 'Computer lab' },
  { src: programmeLaunch, caption: 'Online programme launch' },
]
