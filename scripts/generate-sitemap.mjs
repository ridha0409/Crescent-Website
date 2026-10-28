// Writes public/sitemap.xml from the site's real routes. Runs before every
// build (see "prebuild" in package.json), so new faculty profiles, UGC Corner
// sections and Project pages are always listed.
//
//   node scripts/generate-sitemap.mjs
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const SITE_URL = 'https://online.crescent-institute.edu.in'
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
// Commented-out lines (e.g. programmes hidden for now) must not be listed.
const read = (p) =>
  fs.readFileSync(path.join(root, p), 'utf8')
    .split('\n')
    .filter((line) => !/^\s*(\/\/|\*|\/\*)/.test(line))
    .join('\n')

// Fixed pages, from src/App.jsx.
const fixed = [
  '/', '/about', '/about/vision-mission', '/about/visionary-team', '/about/execution-team',
  '/about/cdoe-team', '/about/facilities', '/programmes', '/programmes/ug', '/programmes/pg',
  '/admission/how-to-apply', '/admission/notification', '/students/affairs',
  '/students/complaint-form', '/ugc-corner', '/project', '/contact', '/faq',
]
// Data-driven pages: programme paths, UGC Corner sections, Project sections, faculty profiles.
const programmes = [...read('src/data/programmes.js').matchAll(/path: '(\/programmes\/[^']+)'/g)].map((m) => m[1])
const ugc = [...read('src/data/ugcCorner.js').matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => `/ugc-corner/${m[1]}`)
const project = [...read('src/data/projects.js').matchAll(/slug: '([^']+)'/g)].map((m) => `/project/${m[1]}`)
const faculty = [...read('src/data/cdoeTeam.js').matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => `/about/cdoe-team/${m[1]}`)

const urls = [...new Set([...fixed, ...programmes, ...ugc, ...project, ...faculty])]
const today = new Date().toISOString().slice(0, 10)
const priority = (u) => (u === '/' ? '1.0' : u.startsWith('/programmes/') || u.startsWith('/admission') ? '0.9' : '0.6')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc><lastmod>${today}</lastmod><priority>${priority(u)}</priority></url>`).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml)
console.log(`sitemap.xml: ${urls.length} pages`)
