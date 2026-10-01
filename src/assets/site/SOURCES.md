# Site photographs

Every picture here comes from the CDOE photo library (the `img/` tree of the
live site), web-sized to at most 1600px on the long edge and saved as
quality-84 progressive JPEG. The whole set is ~2.4 MB.

To swap one: resize the replacement the same way, overwrite the file, keep the
name. The file name is what the code imports, so nothing else needs touching.

| File | Used by | Source in the photo library |
|---|---|---|
| `hero-campus.jpg` | Hero | `home/crescent1.jpg` |
| `academic-block.jpg` | About section, About page | `home/about-us-content.jpg` |
| `convocation.jpg` | WhoWeAre | `home/our-institution.jpg` |
| `auditorium.jpg` | WhyChoose | `mba/salient-features.jpg` |
| `studio.jpg` | Facilities — Studio (cropped to the studio panel) | `facilities/studio.jpeg` |
| `lms.jpg` | Facilities — LMS | `facilities/lms.jpeg` |
| `datacenter.jpg` | Facilities — Datacenter | `facilities/Server.jpg` |
| `mba.jpg` | MBA card + page | `home/MBA_Thumbnail.jpg` |
| `mca.jpg` | MCA card + page | `home/MCA.jpg` |
| `islamic-studies.jpg` | BA Islamic Studies card + page | `home/BAIS Thumb.jpg` |
| `public-policy.jpg` | BA Public Policy card + page | `mba/mba-vision.jpg` |
| `ma-islamic.jpg` | MA Islamic Studies card + page | `bais/arabvision.jpg` |
| `ug.jpg` | UG programmes card | `MCA/mca-overview.jpg` |
| `pg.jpg` | PG programmes card | `mba/mba.jpg` |
| `campus-panorama.jpg` | Gallery — "Crescent campus" | `visionary/about-us-1.jpg` |
| `studio-facility.jpg` | Gallery — "Recording studio" | `home/studiofacility.jpg` |
| `editor-room.jpg` | Gallery — "Editing suite" | `facilities/Editorroom.jpg` |
| `computer-lab.jpg` | Gallery — "Computer lab" | `MCA/mca-events.jpg` |
| `programme-launch.jpg` | Gallery — "Online programme launch" | `home/cdoe.jpg` |

## Portraits

Faculty, leadership, execution-team and technical-staff photographs are **not**
here. They live in `public/img/` mirroring the live site's own folder layout
(`visionary/`, `technical/`, `nonteaching/`, `execution/`, `bais/`,
`mba/people/`, `mca/people/`, `facilities/`) and are referenced by path, e.g.
`/img/visionary/VC-1.jpg`. That is why the path constants in `data/cdoeTeam.js`,
`pages/VisionaryTeam.jsx`, `pages/ExecutionTeam.jsx` and
`data/programmeDetails.js` now read `/img/...` instead of pointing at
online.crescent-institute.edu.in — the site no longer needs that server to
render its people.

> The photo library ships the campus panorama twice — `visionary/about-us-1.jpg`
> and `execution/ss_cleanup.jpg` are byte-identical. The gallery originally had a
> sixth slide built from the second copy, which showed the same picture again
> under a different caption; that slide was removed, so the gallery runs five.
