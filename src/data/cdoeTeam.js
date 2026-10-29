// CDOE Team data — faculty profiles (converted from the official Faculty Profile PDFs),
// technical team and non-teaching staff.
//
// Each faculty entry drives two things:
//   1. the card shown on /about/cdoe-team
//   2. the full profile page shown on /about/cdoe-team/:slug
//
// `sections` is a generic list so every profile can carry whatever the PDF had.
// Supported section shapes:
//   { title, type: 'list',  items: [string] }
//   { title, type: 'text',  body: [string] }
//   { title, type: 'table', columns: [string], rows: [[string]] }
//   { title, type: 'groups', groups: [{ heading, items: [string] }] }

// Faculty portraits, extracted from the official Faculty Profile documents and
// stored locally so the site does not depend on any external host.
import photoThowseaf from '../assets/faculty/dr-s-thowseaf.jpg'
import photoAgalya from '../assets/faculty/dr-v-agalya.jpg'
import photoJeslin from '../assets/faculty/dr-e-jeslin-renjith.jpg'
import photoMaheswari from '../assets/faculty/dr-p-maheswari.jpg'
import photoManjula from '../assets/faculty/mrs-s-manjula.jpg'

// The BA programmes and the MA carry their people on the programme pages rather
// than as full CDOE profiles, so the Faculty tab reads them from there instead
// of holding a second copy. programmeDetails imports nothing from this file, so
// there is no cycle.
import { programmeDetails } from './programmeDetails.js'

export const faculty = [
  /* ------------------------------------------------------------------ */
  /* MBA                                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: 'dr-s-thowseaf',
    photo: photoThowseaf,
    programme: 'MBA',
    name: 'Dr. S. Thowseaf',
    designation: 'Assistant Professor',
    role: 'Assistant Director, CDOE',
    employment: 'Regular',
    qualification: 'B.Tech., M.B.A., Ph.D., (S.E.T. Qualified)',
    email: 'thowseaf@crescent.education',
    stats: [
      ['46', 'Publications'],
      ['24', 'Conference Papers'],
      ['03', 'Books Written'],
      ['03', 'Patents / Designs'],
    ],
    profileLink: {
      label: 'Published articles on Academia.edu',
      url: 'https://alagappauniversity.academia.edu/ThowseafAhamed',
    },
    education: [
      ['Ph.D.', 'Management', '2015 – 2019', 'Alagappa University'],
      ['M.B.A.', 'Business Administration', '2013 – 2015', 'Dhaanish Ahmed College (Anna University)'],
      [
        'B.Tech.',
        'Electronics and Communication Engineering',
        '2009 – 2013',
        'B. S. Abdur Rahman University',
      ],
      ['HSC', 'Higher Secondary', '2009', 'S.R.D.F. Vivekananda Vidyalaya'],
      ['S.E.T.', 'State Eligibility Test for Lectureship', 'Qualified', 'General Category'],
    ],
    experience: [
      [
        'Assistant Director & Assistant Professor',
        'B. S. Abdur Rahman Crescent Institute of Science and Technology — Centre for Distance and Online Education (CDOE)',
        'Jul 2022 – Present',
        '4+ years',
      ],
      [
        'H.O.D., B.B.A.',
        'The Quaide Milleth College for Men (Shift-II)',
        'Jan 2019 – Jul 2022',
        '3.6 years',
      ],
      [
        'N.S.S. Programme Officer',
        'The Quaide Milleth College for Men (Shift-II) — NSS, University of Madras',
        'Jul 2019 – Jul 2022',
        '3 years',
      ],
    ],
    courses: [
      'Statistics for Decision Making',
      'Business Communication',
      'Business Analytics',
      'Resource Management Technique',
      'Management Information System',
      'Supply Chain Management',
    ],
    research: [
      'Business & Social Research',
      'Human Resources',
      'Marketing',
      'Finance',
      'International Business & Trade Finance',
      'Export-Import',
    ],
    sections: [
      {
        title: 'Industry & Research Experience',
        type: 'table',
        columns: ['Role / Position', 'Organization', 'Department', 'Period', 'Duration'],
        rows: [
          ['Full Time Research Scholar', 'Alagappa University', 'Management', 'Oct 2015 – Jan 2019', '3.3 years'],
          ['Research Associate (Freelancer)', 'ARS Market Research Services', 'Research', 'Jul 2013 – Oct 2015', '2.3 years'],
        ],
      },
      {
        title: 'Academic Specialization',
        type: 'table',
        columns: ['Domain', 'Specialization'],
        rows: [
          ['Business Administration', 'Fundamentals of Research and Human Resources'],
          ['International Business Administration', 'Marketing'],
          ['International Trade Finance', 'Finance'],
        ],
      },
      {
        title: 'Computer Skills',
        type: 'table',
        columns: ['Category', 'Tools'],
        rows: [
          ['General Office Tools', 'MS-Office'],
          ['Statistical & Analytical Tools', 'SPSS, E-Views, AMOS'],
        ],
      },
      {
        title: 'Publications',
        type: 'table',
        columns: ['S.No', 'Title of the Article', 'Journal / Publisher', 'ISSN / ISBN, Year', 'Scope', 'I.F.'],
        rows: [
          ['1', 'Zero Defect Software Development & Exporting', 'IJRCMEAS, Vol. 1, Special Issue, Pg. 293-296', 'ISSN 2454-6593, 2016', 'National', '—'],
          ['2', 'Better Export for Better India', 'Bonfring Pub., Vol. 1, Pg. 81-87', 'ISBN 978-93-85477-53-9, 2016', 'National', '—'],
          ['3', 'Factors Influencing Export – A Conceptual Review', 'IJM, Vol. 7, Issue 2, Pg. 150-158', 'ISSN 0976-6502, 2016', 'International', '8.19'],
          ['4', 'An Overview of Payment Method and Arranging Export Finance', 'SIJM, Vol. 3, Special Issue, Pg. 104-107', 'ISSN 2321-4343, 2016', 'International', '—'],
          ['5', 'A Study on Export Entrepreneurs and Collective Opinion for Successful Export Marketing', 'Shanlax Pub., Vol. 3, Pg. 300-307', 'ISBN 978-81-929458-4-2, 2016', 'National', '—'],
          ['6', 'Marine Insurance – Legal Aspect in India', 'Mayas Publication, Pg. 147-153', 'ISBN 987-81-929581-7-0, 2016', 'National', '—'],
          ['7', 'A Study on GST Implementation and Its Impact on Indian Industrial Sectors and Export', 'IJMRSS, Vol. 3, Issue 2, Pg. 27-30', 'ISSN 2394-6407, 2016', 'International', '—'],
          ['8', 'An Inclusive Review on Entrepreneurial Triggers in Context to India', 'AIM, Vol. 3, Pg. 23-29', 'ISBN 978-81-9259-745-4, 2016', 'National', '—'],
          ['9', 'A Conceptual Model for Social Media Knowledge Sharing', 'Souvenir Pub., Pg. 6', '2016', 'International', '—'],
          ['10', 'Agricultural and Processed Food Products Export Contribution to Indian GDP and Future Trends', 'GJRA, Vol. 5, Issue 9, Pg. 26-28', 'ISSN 2277-8160, 2016', 'International', '3.62'],
          ['11', 'An Analysis on Indian FOREX for Examining Investment and Trade', 'IJARMSS, Vol. 5, Issue 9, Pg. 47-54', 'ISSN 2278-6236, 2016', 'International', '6.28'],
          ['12', 'India’s Agricultural Products Export Prospects In selected Middle East Countries', 'IJIKC, Vol. 2, Issue 11, Pg. 26-30', 'ISSN 2454-2415, 2016', 'International', '—'],
          ['13', 'Integrated Farming a Way Forward For Better Environment and Economy', 'JIARM, Vol. 4, Issue 10, Pg. 33-39', 'ISSN 2320-5083, 2016', 'International', '3.11'],
          ['14', 'Causes for Decentralization and Its upshot and Poverty in India', 'JBM&SSR, Vol. 5, Issue 11, Pg. 328-335', 'ISSN 2319-5614, 2016', 'International', '—'],
          ['15', 'Export Performance of Special Economic Zones in India and its Economic Contribution', 'IJIRMS, Vol. 1, Issue 10, Pg. 24-28', 'ISSN 2455-7188, 2016', 'International', '4.10'],
          ['16', 'An Investigative Study on Stock Performance of Selected Companies in Food and Beverage Sector Listed Under BSE', 'ZIJBEMR, Vol. 7, Pg. 59-70', 'ISSN 2249-8826, 2017', 'International', '4.13'],
          ['17', 'Does Tamil Nadu have Untapped Potential with Respect to Processed Fruit Production', 'IJCMS, Vol. 8, Special Issue, Pg. 1-9', 'ISSN 2249-0310, 2017', 'National', '2.6'],
          ['18', 'Impact of Glass Ceiling on Women Employees in Hospitals', 'JASC, Issue 4, Pg. 11-18', 'ISSN 2231-4172, 2017', 'International', '3.19'],
          ['19', 'Elucidating Challenges Faced by the Differently-Abled Women During Education In India', 'Dream Makers Publishing House', 'ISBN 978-81-935866-0-0, 2018', 'National', '—'],
          ['20', 'Elucidating Water Supply, Demand and Contamination in Tamil Nadu', 'SIJM, Vol. 5, Special Issue, Pg. 209-216', 'ISSN 2321-4643, 2018', 'International', '2.08'],
          ['21', 'Impact of demonetization and G.S.T. On stock price of automobile sector', 'ZENITH International Journal of Multidisciplinary Research, Vol. 8 (11), Pg. 35-44', 'ISSN 2231-5780, 2018', 'International', '6.479'],
          ['22', 'Expounding The Impact Of AI On IOT And Explicating A Conceptualized Framework', 'Global Journal of Research and Analysis, Vol. 8, Issue 4, Pg. 1-2', 'ISSN 2277-8160, 2019', 'International', '—'],
          ['23', 'Challenges Faced by Students of PULC Twinning Programme', 'International Journal for Research in Engineering Application & Management, Special Issue - ICIIPM - 2019, Pg. 112-114', 'ISSN 2454-9150, 2019', 'International', '6.466'],
          ['24', 'Aftermath Effect Of GST On Consumer Purchasing Power', 'Restaurant Business, Vol. 118, Issue 5, Pg. 122-131', 'ISSN 0097-8043, 2019', 'International', '5.3'],
          ['25', 'Reconnoitering the Impact of Economic Variables on Fruit Pulp Export from Tamil Nadu', 'International Journal of Recent Technology and Engineering (IJRTE), Vol. 8, Issue 4S5, Pg. 58-65', 'ISSN 2277-3878, 2019', 'International', '6.04'],
          ['26', 'What is wanted? Lockdown or Vaccination and treatment: Investigating the impact of COVID-19 on India’s Population', 'The International Journal of analytical and experimental modal analysis, Vol. 8, Issue 7, Pg. 1570-1581', 'ISSN 0886-9367, 2020', 'International', '6.3'],
          ['27', 'Estimating The Efficiency Of Machine Learning In Forecasting Harvesting Time Of Rice', 'International Journal of Modern Agriculture, Vol. 10, Issue 2, Pg. 1930 – 1937', 'ISSN 2305-7246, 2021', 'International', '—'],
          ['28', 'An Investigative Study: Is IoT An Intellectual Idea For Industries Of 21 St Centuries', 'IT in Industry, Vol. 9, No.2, Pg. 1494 – 1505', 'ISSN 2204-0595 / 2203-1731, 2021', 'International', '—'],
          ['29', 'Integrated solution for optimal generation operation efficiency through dynamic economic dispatch on Software Technological Park of India', 'Materials Today: Proceedings, Pg. 1 – 4', 'DOI 10.1016/j.matpr.2021.05.019, 2021', 'International', '—'],
          ['30', "An Exploratory Study On Cumulative Performance Index Of Inflation At Rural And Urban Areas Of India And Its Influence On India's Inflation", 'Turkish Journal of Physiotherapy and Rehabilitation, Vol. 32, Issue 3, Pg. 15147 – 15151', 'ISSN 2651-4451 / 2651-446X, 2021', 'International', '—'],
          ['31', "COVID-19 Pandemic's Effect On India's Gdp -An Investigative Study With Industrial Sector Performance", 'Turkish Journal of Physiotherapy and Rehabilitation, Vol. 32, Issue 3, Pg. 15128 – 15135', 'ISSN 2651-4451 / 2651-446X, 2021', 'International', '—'],
          ['32', 'Cryptocurrency May Prove Financial Crime: A Conceptual Analysis', 'IGI Global, Ch 7', 'DOI 10.4018/978-1-6684-5691-0.ch007, 2023', 'International', '—'],
          ['33', 'An empirical analysis on different modes of learning systems', 'Research and Reflections on Education, Vol. 21, No. 1A', 'ISSN 0974-648X(P), 2023', 'National', '—'],
          ['34', "Navigating Success: Evaluating STPI'S Contribution To It Operations In Tamil Nadu Through Infrastructure And Facilities", 'Humanities and Social Science Studies, Vol. 13, Issue 1, No. 24', 'ISSN 2319-829X, 2024', 'National', '—'],
          ['35', 'Investigating the problems encountered by the medical tourist of india', 'SOUTH INDIA JOURNAL OF SOCIAL SCIENCES, Vol. XXI, No.3', 'ISSN 0972-8945, 2023', 'National', '—'],
          ['36', 'Impact of IT Industry on Indian Economy – An Investigative Study', 'International Journal of All Research Education and Scientific Methods (IJARESM), Vol. 12, Issue 4', 'ISSN 2455-6211, 2024', 'International', '—'],
          ['37', "Comparative analysis of leadership styles and employee engagement in Tamil Nadu's it industry", 'CAHIERS MAGELLANES-NS, Vol. 06, Issue 2', 'ISSN 1624-1940, 2024', 'International', '—'],
          ['38', 'Exemplified Study On Marine Products Export From India In Business Context', 'Rabindra Bharati University Journal of Economics, Vol. XXVIII, No:1', 'ISSN 0975-802X, 2024', 'National', '—'],
          ['39', 'Impact of Digital Infrastructure and Emerging Market Strategies on Online Purchase Intention Among Generation Z: A Study on Innovation, Infrastructure, and Industry Development (SDG 9)', 'Library Progress International, Vol. 44(3), Pg. 25287-25295', 'ISSN 0970-1052, 2024', 'International', '—'],
          ['40', 'Learning Impact of AI Skills for Employability and Its Influence on Today’s Employment – A Conceptual Study', 'TIMER - Technology-Information-Management-Entrepreneurship - Review, Vol. 2, Issue 2', 'E-ISSN 2584-1602, 2024', 'National', '—'],
          ['41', 'Effect of Quranic recitation on emotional well-being, cognitive clarity, and psychological resilience', 'TPM – Testing, Psychometrics, Methodology in Applied Psychology, Vol. 32 (S9), 193-202', 'ISSN 1972-6325, 2025', 'International', '—'],
          ['42', "AI'S adoption in recruitment across it firms in chennai district: a digital transformation in hiring", 'TPM – Testing, Psychometrics, Methodology in Applied Psychology, Vol. 32 (S9), 183-192', 'ISSN 1972-6326, 2025', 'International', '—'],
          ['43', 'Financial, Emotional, and Physical Support Dynamics for Left-Behind Wives: A Comparative Analysis of Parental Roles in Male-Migrated Families', 'musikinbayern, Vol. 90 (2), 58-80', 'ISSN 0937-583x, 2025', 'International', '—'],
          ['44', 'Breaking The Glass Ceiling: An Analysis Of Women’s Leadership Roles In The Banking Sector Of Tamil Nadu', 'International Journal of Environmental Sciences, Vol. 11 (No. 24s (2025)), 2315-2324', 'ISSN 2229-7359, 2025', 'International', '—'],
          ['45', 'Modelling Consumer Loyalty in Ayurvedic Medicine: A Pathway to Resilient and Sustainable Healthcare Ecosystems', 'The Bioscan, Vol. 21 (3), 191-207', 'ISSN 0973-7049(P), 2026', 'International', '—'],
          ['46', 'Clicks, Bricks, and Quick Picks: Retail Remix', 'TELEMATIQUE, Vol. 25 (1), 1985– 1996', 'ISSN 1856-4194, 2026', 'International', '—'],
        ],
      },
      {
        title: 'Book Chapters',
        type: 'table',
        columns: ['S.No', 'Chapter Title', 'Book Title', 'Year', 'Publisher', 'DOI / ISBN'],
        rows: [
          ['1', 'Harnessing Industry 5.0 for Economic Innovation: A Case Study of the Automotive Manufacturing Sector in Tamil Nadu', "Industry 5.0's Impact on Economic Innovation", '2025', 'IGI Global Scientific Publishing', 'DOI 10.4018/979-8-3693-4525-2.ch008'],
          ['2', 'Resilient Supply Chains in the Healthcare Sector: A Study on Crisis Strategies in Chennai Hospitals', 'Crisis Preparation Strategies and Developing Resilient Supply Chains', '2026', 'IGI Global Scientific Publishing', 'ISBN 979-8-3373-1757-1'],
        ],
      },
      {
        title: 'Books Written',
        type: 'table',
        columns: ['S.No', 'Title', 'Month & Year', 'Publisher', 'ISBN'],
        rows: [
          ['1', 'Start-Up to Success', 'Sep 2024', 'Notion Press', '979-8-89519-349-5'],
          ['2', 'Managing Men, Materials and Machine', 'Sep 2026', 'Notion Press', '979-8-90673-885-1'],
          ['3', 'Beyond Dumbbells - Innovative Management Practices in Fitness Centres', 'Oct 2026', 'RcHub Publisher', '978-81-180146-0-7'],
        ],
      },
      {
        title: 'Books Edited',
        type: 'table',
        columns: ['S.No', 'Title', 'Publisher', 'Month & Year', 'ISBN'],
        rows: [
          ['1', 'Emerging Trends In Intelligent Information Technologies & Applied Mathematics', 'The Quaide Milleth College for Men', 'Feb 2020', '978-93-5396-434-4'],
          ['2', 'Habit & Habitat for Pandemic Problems and Disaster Damages', 'Academic Province', 'Nov 2020', '978-81-948555-0-7'],
          ['3', 'Navigating Business Horizons: Integrating Commerce, Management, and Economic Strategies', 'RC-Hub', 'Jul 2024', '978-81-966869-2-5'],
        ],
      },
      {
        title: 'Papers Presented in National & International Conferences',
        type: 'table',
        columns: ['S.No', 'Title of the Article', 'Name of the Programme', 'Organizer', 'Year', 'Scope'],
        rows: [
          ['1', 'Present Trends In Green Accounting Management System And Its Impact On Current And Future Scenario', 'International Conference on Advance Management Challenges in Knowledge Era', 'Jamal Institute of Management', '2015', 'International'],
          ['2', 'Better Export for Better India', 'Indian Strategies in Functional Mgt.', 'JP College of Arts & Science', '2016', 'National'],
          ['3', 'Zero Defect Software Development – A Roadmap to Success', 'Emerging Trends in Global Accounting and Finance', 'Kristu Jayanti College', '2016', 'International'],
          ['4', 'Going Green in Export Production of Agricultural Allied Products', 'Foundation of Human Excellence', 'Loyola College', '2016', 'International'],
          ['5', 'An Overview of Payment Method and Arranging Export Finance', 'Recent Trends in Management Research', 'Alagappa University', '2016', 'National'],
          ['6', 'Factors Influencing Export – A Conceptual Overview', 'Advanced Management Challenges in Knowledge Era', 'Jamal Institute of Management', '2016', 'International'],
          ['7', 'A Conceptual Model for Social Media Knowledge Sharing', 'Recent Trends in Business and Management', 'J.J. College of Arts and Science', '2016', 'International'],
          ['8', 'An Inclusive Review on Entrepreneurial Triggers in Context to India', 'Entrepreneurial Resurgence and Innovations', 'Alagappa University', '2016', 'National'],
          ['9', 'Aftermath Effect of GST on Consumer Purchasing Power', 'Impact of Goods And Services Tax on Indian Industries', 'Dr. M. Guru-Samy Management Research Foundation Trust', '2016', 'International'],
          ['10', 'An Investigative Study on Stock Performance of Selected Companies in Food & Beverage Sector Listed Under BSE', 'Intelligence and Innovation in Business Management', 'Ananda College', '2016', 'National'],
          ['11', 'Revisiting strategies for SHG in Indian Context', 'Payment Banks and Small Finance Banks – New Vistas for Innovative Banking', 'Alagappa University – Department of Bank Management', '2017', 'National'],
          ['12', 'Impact of Demonetization and GST on Stock Price of Automobile Sector', 'Finance And Banking', 'Alagappa University – Department of Commerce', '2018', 'International'],
          ['13', 'Elucidating Water Supply, Demand and Contamination in Tamil Nadu', 'Sustainable Green Business', 'Alagappa University – Department of Alagappa Institute of Management', '2018', 'National'],
          ['14', 'Reconnoitering the Impact of Economic Variables on Fruit Pulp Export from Tamil Nadu', 'Emerging trends in intelligent Information technologies and applied mathematics and business management', 'The Quaide Milleth College – Dept. of Comp. Sci. , Business Admin., and math.', '2019', 'International'],
          ['15', 'Impact of Digital Marketing on Indian Industries', 'Facets of Digital Marketng', 'Alagappa University – Department of Alagappa Institute of Management', '2019', 'National'],
          ['16', 'Aftermath effect of GST on Consumer Purchasing Power', 'Depth and Expanse of Online marketing Mettle', 'Alagappa University – Department of Alagappa Institute of Management', '2019', 'National'],
          ['17', 'Navigating the gig economy in Chennai: unlocking HR innovations for industry 5.0', 'Industrial Resurgence and Contemporary Innovation In Business 4.0 & 5.0', 'Institute of Leadership Entrepreneurship & Development (iLEAD)', '2024', 'International'],
          ['18', 'Bridging The Technological Evolution: A Comparative Analysis Of Industry 4.0 And Industry 5.0', 'Global Contemporary Issues and Unlocking Innovation in Business Industry 4.0', 'Virudhunagar Hindu Nadars’ Senthikumara Nadar College', '2024', 'International'],
          ['19', "Challenges and Opportunities in Tamil Nadu's Retail Sector: Embracing Industrial Resurgence and Business Innovation 4.0", 'Global Contemporary Issues and Unlocking Innovation in Business Industry 4.0', 'Virudhunagar Hindu Nadars’ Senthikumara Nadar College', '2024', 'International'],
          ['20', 'Assessing - Learning Leadership Behavior Among Management Students in Chennai District', 'Interdisciplinary Research in Technology & Management', 'NIT, Calicut', '2024', 'International'],
          ['21', 'A study on Family, Income and Inclusive Growth Among Auto Drivers in Chennai', 'International Conference on Empowering Future Business Transformation and Innovation Though Digital and Sustainable Practices', 'Jaipuria School of Business', '2025', 'International'],
          ['22', "Sustainable Waste Management in Chennai's Hospitality Industry: Evaluating Consumption and Production Patterns (SDG 12) with Smart Technologies", 'AIand FinTech: Crafting the Future of Global Business', 'Manikam Ramaswami College of Arts and Science', '2025', 'National'],
          ['23', 'Role of Omni-Channel Experience and Intelligent Fulfilment in Sustainable Brand Strategies', 'International Conference on Future Chains Intelligence, Innovation & Integration: Shaping Smart Supply Chains with AI, IoT & Beyond', 'Jain University', '2026', 'International'],
          ['24', 'Work Anwhere, Perfrom Everywhere? A Study on Hybrid Work, Well-being and Productivity', 'International Conference on Interdisciplinary Innvations in Science, Technology, Humanities, AI and Sustainable Digital Transformation', 'AAA College ogf Engineering and Technology', '2026', 'International'],
        ],
      },
      {
        title: 'Intellectual Property Rights',
        type: 'table',
        columns: ['S.No', 'Title', 'Patent / Application No.', 'Field of Invention', 'Date', 'Status'],
        rows: [
          ['1', 'Prediction For Crop Yield Using Agricultural Parameters', '202141044914', 'Computer Science', 'Publication: 26/11/2021', 'Published'],
          ['2', 'IoT Environment With Artificial Intelligence Design Based Manufacturing System In Industry 4.0', '202241023772', 'Electronics', 'Publication: 13/05/2022', 'Published'],
          ['3', 'Educational Learning Console', '516224-001', 'Education', 'Filed Date: 02/09/2026', 'Filed'],
        ],
      },
      {
        title: 'Consultancy & Government Projects',
        type: 'table',
        columns: ['Project', 'Company', 'Period', 'Amount Granted', 'Roles and Responsibilities'],
        rows: [
          ['FAME - TN: MSME Survey', 'CRISIL', 'Mar 2026 – Sep 2026', '₹3,15,000', 'Questionnaire Design, Field Survey, Analysis of the Data Collected, Reporting the Findings'],
          ['NITI Aayog Start-up Survey', 'CRISIL', 'Sep 2026', '—', 'Data Collection and Analysis'],
          ['RAMP - MSME - Pan India Survey', 'CRISIL', 'Oct 2026 – Dec 2026', '₹1,60,000', 'Field Survey, Analysis of the Data Collected, Reporting the Findings'],
        ],
      },
      {
        title: 'Seminar / Symposium Attended',
        type: 'table',
        columns: ['S.No', 'Name of the Programme', 'Organizer', 'Scope', 'Date'],
        rows: [
          ['1', 'CRESCIENCE', 'B.S. Abdur Rahman University', 'State', '19th Oct 2010'],
          ['2', 'Safety and Security of Women and Girls in Public Spaces: Planning & Designing Mechanism', 'Alagappa University', 'National', '4th-5th Dec 2015'],
          ['3', 'Technology Trends in Indian Banking Sector', 'Alagappa University', 'National', '25th Feb 2016'],
          ['4', 'The Dynamics of Data Analysis & Research Publications', 'Alpha Arts & Science College', 'National', '3rd Mar 2016'],
          ['5', 'Online Marketing of Services in the Globalization Era', 'Sourashtra College', 'National', '15th Mar 2016'],
          ['6', 'Emerging Trends in Indian Insurance Sector', 'Alagappa University', 'National', '23rd Mar 2016'],
          ['7', 'Empowering Teachers to Prepare Professionals of Tomorrow', 'Alagappa University', 'National', '21st Aug 2016'],
          ['8', 'Emerging Trends in Social Science Research', 'Alagappa University', 'International', '1st Sep 2016'],
          ['9', 'Components and Methods of Qualitative Research', 'Alagappa University', 'National', '21st & 22nd Sep 2016'],
          ['10', 'Challenging Business Intelligence and Innovation Management', 'Alagappa University', 'National', '26th Sep 2016'],
          ['11', 'Customer Service Trends in Global Logistics', 'Alagappa University', 'International', '19th Jan 2018'],
          ['12', 'A Road Map To Excellence In Higher Education', 'The Quaide Milleth College For Men', 'National', '9th Jan 2020'],
          ['13', 'Entrepreneurship & Marketing', 'The Quaide Milleth College For Men', 'National', '18th Feb 2020'],
        ],
      },
      {
        title: 'FDP, FIP, Workshop, Orientation & Training Programmes',
        type: 'table',
        columns: ['S.No', 'Topic / Programme', 'Conducted By', 'Type', 'Year'],
        rows: [
          ['1', 'Data Analysis & Interpretation Using SPSS and AMOS', 'Madurai Kamaraj University', 'Workshop', '2016'],
          ['2', 'Novelty for Sustainable and Green Business Management', 'Alagappa University', 'Workshop', '2017'],
          ['3', 'Analysis & Interpretation Using SPSS and AMOS', 'MEASI Institute of Management', 'Workshop', '2020'],
          ['4', 'NPTEL - FDP - Marketing Management', 'IIT', 'FDP', '2023'],
          ['5', 'NPTEL - FDP - Marketing Research and Analysis', 'IIT', 'FDP', '2023'],
          ['6', 'NPTEL - FDP - Retail Marketing Strategy', 'IIT', 'FDP', '2023'],
          ['7', 'Faculty in Universities/Colleges/Institutes of Higher Education', 'Teaching Learning Centre - Ramanujan College, University of Delhi', 'FIP', '2024'],
          ['8', 'NPTEL – FDP - Managing Services', 'IIT', 'FDP', '2024'],
          ['9', 'NPTEL – FDP – Research for Marketing Decisions', 'IIT', 'FDP', '2024'],
          ['10', 'NPTEL – FDP – Introduction to Marketing Essentials', 'IIT', 'FDP', '2024'],
          ['11', 'Marketing Strategies For Business Excellence (Orientation)', 'Alagappa University', 'Orientation', '2017'],
          ['12', 'Achieving Publication Index Scores (Training)', 'Alagappa University', 'Training', '2018'],
          ['13', 'Impact of recent approach on evolution of ML & Deep Learning (Training)', 'Bharath Institute of Higher Education and Research', 'Training', '2024'],
          ['14', 'NPTEL - FDP - Marketing Management - II', 'IIT', 'FDP', '2025'],
          ['15', 'NPTEL – FDP – Consumer Behaviour', 'IIT', 'FDP', '2026'],
        ],
      },
      {
        title: 'Programmes Conducted',
        type: 'table',
        columns: ['S.No', 'Programme Name', 'Year', 'Position', 'Place Conducted'],
        rows: [
          ['1', '3 – Days National Level Workshop on SPSS, AMOS and EViews', '2018', 'Organizing Secretary', 'Faculty of Management, Alagappa University'],
          ['2', '2 - International Conference On Emerging Trends In Intelligent Information Technologies & Applied Mathematics', '2020', 'Organizing Secretary', 'The Quaide Milleth College For Men'],
          ['3', '1 – Day National Conference on A Road Map To Excellence In Higher Education', '2020', 'Executive Committee', 'The Quaide Milleth College For Men'],
          ['4', 'Financial Empowerment through wealth creations', '2024', 'Programme Coordinator', 'B.S.A.R.C.I.S.T.'],
          ['5', 'Mastering E-Content Development', '2024', 'Programme Coordinator', 'B.S.A.R.C.I.S.T.'],
          ['6', 'Exploring Tableau', '2024', 'Programme Coordinator', 'B.S.A.R.C.I.S.T.'],
          ['7', 'From Curiosity to Code: Python for Absolute Beginners', '2026', 'Programme Coordinator', 'B.S.A.R.C.I.S.T.'],
        ],
      },
      {
        title: 'Resource Person',
        type: 'table',
        columns: ['S.No', 'Topic / Title', 'Organizing Institution', 'Level', 'Year'],
        rows: [
          ['1', 'Statistical Tools in Social Science Research', 'Alagappa University', 'International Level', '2016'],
          ['2', 'Data Analysis using SPSS', 'Sacred Heart College', 'National Level', '2018'],
          ['3', 'Workshop on Data Analysis using SPSS', 'The Quaide Milleth College for Men', 'College Level', '2019'],
          ['4', 'Overview of SPSS & Hands-on Training', 'Government Arts College', 'State Level', '2020'],
          ['5', 'Data Analysis in Social Science Research', 'A.M. Jain College', 'National Level', '2020'],
          ['6', 'Data Analysis using SPSS and AMOS', 'BSAR Crescent Institute of Science and Technology', 'National Level', '2022'],
          ['7', 'Data Analysis using SPSS and AMOS', 'BSAR Crescent Institute of Science and Technology', 'National Level', '2023'],
          ['8', 'Data Analysis using SPSS and AMOS', 'BSAR Crescent Institute of Science and Technology', 'National Level', '2024'],
          ['9', 'Data Analysis using SPSS and AMOS', 'BSAR Crescent Institute of Science and Technology', 'National Level', '2025'],
          ['10', 'Data Analysis using SPSS and AMOS', 'BSAR Crescent Institute of Science and Technology', 'National Level', '2026'],
          ['11', 'ICETIIT- International Conference', 'Quaide Milleth College for Men', 'International Level', '2026'],
        ],
      },
      {
        title: 'Editorial Role',
        type: 'list',
        items: ['Editor — RcHub Publishing House'],
      },
      {
        title: 'Achievements',
        type: 'list',
        items: [
          'International level Young Scientist Award — 6th July 2020, awarded by VGood Professional Association, VGood Technologies Pvt. Ltd., Coimbatore.',
          'Certificate of Excellence in Reviewing — Academic & Editorial Recognition for peer reviewing research papers / articles (International).',
          'Two SPSS certification programmes completed.',
        ],
      },
    ],
  },

  {
    slug: 'dr-v-agalya',
    photo: photoAgalya,
    programme: 'MBA',
    name: 'Dr. V. Agalya',
    designation: 'Assistant Professor',
    role: 'Programme Coordinator, MBA (OL)',
    employment: 'Regular',
    qualification: 'B.A., M.A., M.Phil., MBA, Ph.D.',
    email: 'agalyav@crescent.education',
    stats: [
      ['14', 'Years of Teaching'],
      ['28', 'Publications'],
      ['13', 'Conference Papers'],
      ['01', 'Patent'],
    ],
    profileLink: {
      label: 'Google Scholar profile',
      url: 'https://scholar.google.com/citations?user=b1mO0-AAAAAJ',
    },
    summary:
      'Fourteen years of experience teaching, mentoring and guiding UG and PG students, and a Recognised Research Supervisor in Business Administration, Economics and Marketing (2024 onwards). Brings three years of sponsored research and consultancy for government and non-government agencies, and thirteen years of HR and academic administration supporting AICTE, UGC, NBA, ISO and NAAC inspection and accreditation.',
    education: [
      ['Ph.D.', 'Business Administration', 'Jan 2020', 'Manonmaniam Sundaranar University, Tirunelveli (Highly Commended)'],
      ['MBA', 'Business Administration', '2012', 'GKM College of Engineering and Technology, Anna University, Chennai (7.48 CGPA, First Class)'],
      ['M.Phil.', 'Economics', '2009', 'Bharath Post Graduate College, Chennai, Vinayaga Mission University, Salem (67%, First Class)'],
      ['M.A.', 'Economics', '2008', 'University of Madras, Chennai (55%, Second Class)'],
      ['B.A.', 'Economics', '2002', 'SDNB Vaishnav College for Women, University of Madras, Chennai (62%, First Class)'],
      ['PG Diploma', 'Counseling', 'Additional Qualification', 'TNPESU, Chennai'],
    ],
    experience: [
      ['Assistant Professor, Management Studies (MBA)', 'B.S. Abdur Rahman Crescent Institute of Science and Technology, Vandalur, Chennai', 'Jan 2023 – Present', '3+ years'],
      ['Assistant Professor, Department of Business Administration', 'SRM Institute of Science and Technology, College of Science and Humanities, Vadapalani, Chennai', 'Aug 2022 – Jan 2023', '06 months'],
      ['Assistant Professor & Head, Department of Economics', 'Dr. M.G.R. Educational and Research Institute, Maduravoyal, Chennai', 'Feb 2021 – Jul 2022', '1 year 6 months'],
      ['Coordinator – ESPAC', 'B.S. Abdur Rahman Crescent Institute of Science and Technology, Vandalur, Chennai', 'Jul 2019 – Feb 2021', '1 year 8 months'],
      ['Assistant Professor', 'Karpaga Vinayaga College of Engineering & Technology, Madhuranthagam', 'Jul 2016 – Apr 2019', '2 years 10 months'],
      ['Assistant Professor', 'GKM College of Engineering & Technology, Chennai', 'Sep 2012 – Dec 2015', '3 years 3 months'],
      ['HR-Admin Executive', 'GKM College of Engineering & Technology, Chennai', 'Mar 2006 – Dec 2015', '9 years 9 months'],
      ['Admin Assistant', 'SSD Oil Mills Ltd (Supreme Edible Oil), Chennai', 'Aug 2003 – Nov 2004', '1 year 3 months'],
    ],
    courses: [
      'Principles of Management',
      'Sales and Distribution Marketing',
      'International Marketing',
      'Services Marketing',
      'Business Analytics',
      'HRM',
      'Organisational Behaviour',
      'Logistics & Supply Chain Management',
      'Strategic Management',
      'Project Management',
      'Material Management',
      'Managing Disruptive Technologies',
    ],
    research: ['SERVQUAL Model', 'Gap Analysis', 'Business Analytics', 'HRIS'],
    sections: [
      {
        title: 'Research Profiles',
        type: 'table',
        columns: ['Profile', 'ID'],
        rows: [
          ['Recognised Research Supervisor', 'Business Administration, Economics & Marketing (2024 onwards)'],
          ['Scopus Author ID', '60320323300'],
          ['ORCID', '0000-0002-8945-8848'],
          ['Google Scholar', 'b1mO0-AAAAAJ'],
        ],
      },
      {
        title: 'Research Output at a Glance',
        type: 'table',
        columns: ['Category', 'Count'],
        rows: [
          ['Patent', '1'],
          ['WoS / Scopus indexed journals', '8'],
          ['Book chapters (3 Scopus-indexed)', '7'],
          ['UGC-CARE listed journals', '7'],
          ['National & international peer-reviewed journals', '6'],
        ],
      },
      {
        title: 'Patent',
        type: 'list',
        items: [
          '“Role of Stress Management Interventions to Reduce the Work Place Stress of the Employees” — Application No. 202441019271 A, published 29 March 2024.',
        ],
      },
      {
        title: 'Publications',
        type: 'groups',
        groups: [
          {
            heading: 'WoS / Scopus Indexed Journals (8 Nos)',
            items: [
              '“A Bibliometric Analysis of Juvenile Crimes and Psychological Well-Being: Trends, Patterns, and Gaps in Research”, Salud, Ciencia y Tecnología – Serie de Conferencias, Vol. 4, 2025, DOI 10.56294/sctconf20251365.',
              '“Impact of Digital Infrastructure and Emerging Market Strategies on Online Purchase Intention Among Generation Z – A Study on Innovation, Infrastructure and Industry Development (SDG 9)”, Library Progress International, Vol. 44, No. 3, Jul–Dec 2024, pp. 25287–25295, DOI 10.48165/bapas.2024.44.2.1.',
              '“Experimental Analysis on Continuous Ambient Air Quality Monitoring System (CAAQMS) at Vandalur, Chennai, India”, Ecology, Environment and Conservation, Vol. 30(1), 2024, pp. 290–300, DOI 10.53550/EEC.2024.v30i01.048.',
              '“Analytical Study on Parents’ Attitude Towards the Education of Girl Children with Special Reference to Villupuram District, Tamil Nadu”, The Seybold Report, Vol. 17, Issue 10, 2022, pp. 133–148, DOI 10.5281/zenodo.7155359.',
              '“The Effect of Digital India Program with Reference to Chennai City – A Critical Analysis”, The Seybold Report, Vol. 17, Issue 8, 2022, pp. 1363–1379, DOI 10.5281/zenodo.7009806.',
              '“Business Continuity and Decision Making after the Covid-19 – An Overview”, Annals of R.S.C.B., ISSN 1583-6258, Vol. 25, Issue 6, 2021, pp. 10966–10978.',
              '“Examining Occupational Hazards of Employees in Leather Manufacturing Industry”, Annals of R.S.C.B., ISSN 1583-6258, Vol. 25, Issue 4, 2021, pp. 18593–18602.',
              '“Performance of Indian Mutual Funds, Risk and Returns during Covid-19 – An Overview”, Turkish Online Journal of Qualitative Inquiry (TOJQI), Vol. 12, Issue 7.',
            ],
          },
          {
            heading: 'Books & Book Chapters (7 Nos)',
            items: [
              '“Event Finance and Budgeting”, pp. 89–108, in Event Planning Management: International Practices for the Future of Events, Emerald Publishing Limited, DOI 10.1108/978-1-83708-140-020261006.',
              '“Community Financing Empowering Local Tourism”, in Reimagining Tourism Finance: Technology, Sustainability, and Global Innovation (2026), 1: 196, Bentham Science Publishers, DOI 10.2174/9798898815431126010013.',
              '“Financial Inclusion for Marginalized Communities: Challenges and Strategies”, Springer, Cham, 2 January 2026, DOI 10.1007/978-3-032-01677-5_8.',
              'Human Resources Management, RC Hub Publications, June 2025, ISBN 978-81-986263-4-9.',
              '“Retailer and Strategical Issues in Retailing – An Overview”, in Digital Practice in Business World, Elakkiya Publisher, February 2024, ISBN 978-93-92649-83-7.',
              '“Enhanced Teaching and Learning Pedagogy: A Research Perspective”, B.S. Abdur Rahman Crescent Institute of Science and Technology, CDOE, ISBN 948-93-341-4459-8.',
              '“Analyzing the Effectiveness on Employees’ Retention in Leather Industries at Chennai, Tamil Nadu, India”, in Impact of Covid-19 on the Business Sector, Non-Olympic Times, 1st Edition, 2020, ISBN 978-81-949524-1-1 — recorded in the Noble World Records (Record No. NWR/2043/2021).',
            ],
          },
          {
            heading: 'UGC-CARE Listed Journals (7 Nos)',
            items: [
              '“Navigating Success: Evaluating STPI’s Contribution to IT Operations in Tamil Nadu Through Infrastructure and Facilities”, Humanities and Social Science Studies, Vol. 13, Issue 1, No. 24, Jan–Jun 2024, ISSN 2319-829X, pp. 57–66.',
              '“Impact of IT Industry on Indian Economy – An Investigative Study”, IJARESM, Vol. 12, Issue 4, April 2024, pp. 3606–3611.',
              '“Exemplified Study on Marine Products Export from India in Business Context”, Rabindra Bharati University Journal of Economics, Vol. XXVIII, No. 1, 2024, ISSN 0975-802X.',
              '“Impact of Utilizing Artificial Intelligence on Business – An Investigative Study”, South Indian Journal of Social Sciences, Vol. XXI, No. 28, Jan–Jun 2023, ISSN 0972-8945, pp. 21–30 (UGC-CARE Group I).',
              '“A Study on Quality of Work-Life of Employees in Leather Goods Manufacturing Industries at Chennai”, Parishodh Journal, Vol. IX, Issue III, March 2020, ISSN 2347-6648, pp. 6214–6224 (UGC-CARE Group I).',
              '“Recent Trends in Development of Workplace Policies and Procedure in Leather Goods Manufacturing Companies, Chennai”, International Journal of Management Studies (IJMS), Vol. V, Issue 4(1), October 2018, ISSN 2249-0302 (Print) / 2231-2528 (Online).',
              '“A Study on Employees Safety and Health Hazards Measures of Leather Goods Manufacturing Companies”, SUMEDHA Journal of Management, Vol. 5, No. 2, 2016, pp. 63–73, ISSN 2277-6753.',
            ],
          },
          {
            heading: 'National & International Peer-Reviewed Journals (6 Nos)',
            items: [
              '“A Study on Employees Welfare and Social Security Benefits in Leather Goods Manufacturing Companies at Chennai”, Pezzottaite Journals – International Journal of Entrepreneurship and Business Environment Perspectives, Vol. 5, No. 3, Jul–Sep 2016, ISSN 2279-0926.',
              '“A Study on Employees Job Satisfaction in Leather Goods Manufacturing Companies”, Archers & Elevators – International Journal of Multidisciplinary Research (AEIJMR), Vol. 4, Issue 4, April 2016, pp. 1–12, ISSN 2348-6724.',
              '“A Study on Job Stress and Its Impact on Job Performance in Leather Goods Manufacturing Companies”, International Journal of Exclusive Global Research (IJEGR), Vol. I, Issue 2, February 2016, pp. 1–11.',
              '“A Study on Effective Business Ethics and Role Behavior of Businessmen in Ambur Town, Vellore District”, International Journal of Exclusive and Management Research, Vol. 4, Issue 2, Feb–Mar 2014, ISSN 2249-8672.',
              '“The Intensity of Stress Among the Silk Weavers at Kanchipuram District”, Asian Academic Research Journal of Social Sciences and Humanities, Vol. 1, Issue 11, May 2013, pp. 105–116, ISSN 2278-859X.',
              '“The Effectiveness of Performance Appraisal on ITES Industry and its Outcome”, International Journal of Research in Commerce, IT and Management, Vol. 2, Issue 10, October 2012, ISSN 2231-5756.',
            ],
          },
        ],
      },
      {
        title: 'Conference Papers Presented',
        type: 'list',
        items: [
          '“Role of Omni-Channel Experience and Intelligent Fulfilment in Brand Strategy” — International Conference on FCIII 2026, Jain University, Bengaluru.',
          '“Patent Integration Strategy in Automotive Project Management – An Empirical Study on Challenges & Roadmap” — International Conference on FCIII 2026, Jain University, Bengaluru.',
          'Best Paper Award — “Revolutionizing Production: Literature Review on Industry 5.0 Innovations” — International Conference on Industrial Resurgence and Contemporary Innovation in Business 4.0 & 5.0, iLead Institute of Leadership, Entrepreneurship and Development with Vidyanagar College, July 2024.',
          '“The Effectiveness of Cost in Tourism Management” — 4th International Conference on Contemporary Management (INCOCOM 2024), Department of Management Studies, NPR College of Engineering & Technology, Natham, 26 April 2024 (ISBN 978-81-864847-2-9).',
          '“Impact of Utilizing Artificial Intelligence on Business – An Investigative Study” — 6th International Conference on Management, Accounting, Banking, Economics and Business Research for Sustainable Development, B.S. Abdur Rahman Crescent Institute of Science and Technology, March 2023.',
          '“Analyze the Effectiveness of Digital India Programme with Reference to Chennai City” — BIZAD 2022, 8th International Conference on Technology Agility and Transformed Management Practices during Pandemic, SRM Institute of Science and Technology, 16 March 2022.',
          '“A Study on Quality of Work-Life of Employees in Leather Goods Manufacturing Industries at Chennai” — International Conference on Innovations and Challenges in Global Business (ICICGB 2020), The New College (Autonomous), Chennai.',
          '“Analysing the Effectiveness on Employees Retention in Leather Industries at Chennai, Tamil Nadu, India” — 1st International Conference INSIGHT’20, S.A. College of Arts and Science, Chennai.',
          '“Examining Occupational Hazards of Employees in Leather Manufacturing Industry” — 3rd International Conference on Interdisciplinary Global Applied Research (ICIGAR-2020), Vellore.',
          '“A Study on Employees Work Life Balance in Leather Goods Manufacturing Industries at Chennai City” — 7th International Conference on Futuristic Trends in MBA (ICFETM 2K18).',
          '“Recent Trends in Development of Work Policies and Procedures in Leather Goods Manufacturing Industries” — National Conference on Business in the New Millennium: The Ever-Changing Landscape, 2018 (presented and published).',
          '“A Study on Indian Leather Industries – Growth and Prospects” — International Conference on Recent Trends in Science, Engineering & Management (ICRTSEM-2017).',
          '“A Study on Employees Welfare Measures and Social Security Benefits in Leather Goods Manufacturing Companies at Chennai” — National Conference on Emerging Trends in Management, 2016 (presented and published).',
        ],
      },
      {
        title: 'Workshops, Webinars & Conferences Attended',
        type: 'list',
        items: [
          'One-day Workshop on “Empowering Research”, New Prince Shri Bhavani College of Engineering and Technology, 16 August 2019.',
          'Live Webinar on “Cyber Forensics and the Current Challenges”, 13 June 2020.',
          'Webinar on “Soft Skills Needed to Face the After Pandemic Scenario”, T.J.S. Engineering College, 12 June 2020.',
          'E-Quiz, National Sports Day 2020, B.S. Abdur Rahman Crescent Institute of Science and Technology, 28 August 2020.',
          'State-level Online “Tamil Talent Test”, May 2020, B.S. Abdur Rahman Crescent Institute of Science and Technology.',
          'International Conference on Advance Research and Innovation in Engineering, Science, Technology and Management, 2015.',
        ],
      },
      {
        title: 'Faculty Development Programmes Attended',
        type: 'list',
        items: [
          'Seven-day Virtual FDP on NEP-2020 Orientation and Sensitization, UGC-Malaviya Mission Teacher Training Programme (MM-TTP).',
          'Five-day Virtual FDP on “Innovative Research in Artificial Intelligence for Commerce”, 18–24 Jan 2024, KG College of Arts and Science and Dr. R.V. Arts and Science College, Coimbatore.',
          'Five-day Virtual FDP on “Integration of Technology in Teaching – Faculty Development Perspective”, 29 Jan–2 Feb 2024, IQAC, Dr. R.V. Arts and Science College.',
          'Five-day Virtual FDP on “Impact of the Recent Approach on the Evolution of Machine Learning and Deep Learning”, 29 Feb–5 Mar 2024, Bharath Institute of Science and Technology, Chennai.',
          'Five-day FDP on “Opportunity to Leverage the Teaching Skills in Digital and Professional Landscape”, 18–22 Dec 2023, D.G. Vaishnav College, Chennai.',
          'Seven-day FDP on “Utilizing Cutting-Edge Pedagogical Approaches to Enhance Educational Efficacy”, 2–10 Nov 2023, Kristu Jayanti College (Autonomous), Bengaluru.',
          'Eight-day National Level Virtual FDP on “NAAC Accreditation Framework”, 9–16 Sep 2023, Guru Shree Shantivijai Jain College for Women, Chennai.',
          'Five-day FDP on “Unleashing the Potential: Transforming Research Using Modern Tech-Tools”, 19–23 June 2023, St. Paul’s College, Bengaluru.',
          'Certificate Programme on Basic Level SPSS, 27–31 March 2023, B.S. Abdur Rahman Crescent Institute of Science and Technology.',
          'Five-day National Level Online Workshop on “Data Analysis and Interpretation using SPSS and SMART PLS 4”, 28 Feb–4 Mar 2023, SIVET College, Chennai.',
          'Two-day Faculty Orientation Programme on “Salient Attributes for Professional Development”, SRM Institute of Science and Technology.',
          'Two-day FDP/Workshop on “How Teachers Can Make a Difference Through Outcome Based Education”, Teaching Learning Centre, IIT Madras.',
          'Six-day FDP on “Recent Trends of Research in Commerce and Business Studies”, SRM Institute of Science and Technology.',
          'Five-day National Level e-Workshop on “Innovation Techniques in SPSS and Data Analysis”, Sathyabama Institute of Science and Technology.',
          'Five-day Online FDP on “Mentoring, Teaching & Pedagogy in Technical Education”, 29 Nov–3 Dec 2021, Academic Staff College, Dr. M.G.R. Educational and Research Institute.',
          'FDP on “Learning Statistics and Data Interpretation Using SPSS” (Series 1), Saveetha Engineering College, Chennai.',
          'FDP on “Research Methodology Shiksha – 5 Series”, Dr. M.G.R. Educational and Research Institute.',
          'FDP on “Innovation & Entrepreneurship” (30 hours), Dr. M.G.R. Educational and Research Institute in association with IEEE.',
          'FDP – Institute-level Programme Mentor for Entrepreneurship Development (Level 2), TN EDII, Anna University.',
          'FDP – Institute-level Programme Mentor for Entrepreneurship Development (Level 1), TN EDII, Anna University.',
          'FDP on Stress Management, ICT India and KVCET.',
        ],
      },
      {
        title: 'Invited Talks & Session Chair',
        type: 'list',
        items: [
          'Resource Person, FDP on “NAAC Accreditation for Academic Excellence”, 24 December 2022, M.M.E.S. Women’s Arts and Science College, Melvisharam, Vellore.',
          'Speaker and Chief Guest, Webinar on “Controlling Cost Fluctuations in a Quick Service Restaurant – Economic Aspect to be Adopted”, HMCT, Dr. M.G.R. Educational and Research Institute, Chennai.',
          'Session Chair, International Conference on Technology-Enhanced Teaching and Learning (ICTEL-2025), in collaboration with Study World Global College, Malta, 23–24 October 2025.',
        ],
      },
      {
        title: 'Key Roles & Responsibilities',
        type: 'list',
        items: [
          'Programme Coordinator, MBA (OL) (from 2025 onwards)',
          'Head of the Department, Department of Economics (2021–2022)',
          'Research Coordinator, ESPAC (2019–2021)',
          'Department-level NAAC Coordinator (2016–2018, 2021)',
          'Department-level ISO Coordinator (2012–2015)',
          'HR-Admin Executive and Personal Secretary to the CEO & Director (2006–2010)',
          'Head and Board of Studies member, Department of Economics (UG & PG), Dr. M.G.R. Educational and Research Institute (2021–2022); prepared the B.A. and M.A. Economics syllabi (2021–2022)',
          'Institute-level Programme Mentor for the Entrepreneurship Development Cell (TN EDII, Anna University)',
        ],
      },
      {
        title: 'Academic Service & Examination Duties',
        type: 'list',
        items: [
          'Board of Studies (BOS) member, Department of Economics, SDNB Vaishnav College for Women (Autonomous), Chennai.',
          'Board of Studies (BOS) member, Department of Business Economics, Anna Adarsh College for Women (Autonomous), Chennai.',
          'Question paper setter and evaluator, Stella Maris College (Autonomous), Chennai; question paper setter, Pondicherry University.',
          'Anna University Representative (AUR) for University End Semester Examinations.',
          'External and internal examiner for University End Semester Examinations; external examiner for the Data Analysis and Business Modeling Lab (MBA) and for final-year MBA project viva voce.',
          'Peer reviewer of research manuscripts for two Asian journals.',
          'Department-level coordinator, International Conference on Recent Trends in Science, Engineering and Management (ICRTSEM-2017).',
        ],
      },
      {
        title: 'Events Organised',
        type: 'groups',
        groups: [
          {
            heading: 'Guest Lectures, Webinars, Seminars & Workshops',
            items: [
              'Webinar: “Essential Digital Skills for Personal and Professional Development” – Dr. N. Mari Anand, University of Technology and Applied Sciences, Oman.',
              'Webinar: “Exploring Tableau” – Dr. A. Salman Ayaz, Islamiah College (Autonomous), Vaniyambadi.',
              'Webinar: “Skills for Personality Development” – Mrs. Kanmani Thivya Mahesh, Psychologist cum Life Skill Trainer.',
              'Webinar: “Research Methodology” – Dr. K. Malathi, Department of Economics, University of Madras.',
              'Guest Lecture: “Insurance Market” – Mr. R.M. Muthukaruppan, Internal Auditor, Royal Sundaram General Insurance Co. Ltd.',
              'Webinar: “Eradicating Hunger & Malnutrition for Sustainable Development in India” – Dr. M.S. Lekha, SDNB Vaishnav College for Women, Chennai.',
              '“Deekshrambh – New Students Induction Programme, 2021” – Mrs. P. Blessey Carmichael, Career Counsellor and Mentor, Rising Star Outreach of India.',
              'Online Workshop cum Training of Trainers (TOT): “Social Accountability Tools and Techniques for Good Governance” – Dr. K. Prabhakar, NIRD & PR, Government of India, Hyderabad.',
              'Workshop: “Soft Skill Development – From Interview to Job Placement” – Mr. M.S. Sriram, U’reka-BE Ur BEST, Chennai.',
              'Webinar: “Improving the Human Development Index in India” – Dr. K. Malathi, University of Madras.',
              'Webinar: “Social Accountability Tools & Techniques for Good Governance” – Dr. K. Prabhakar, NIRD & PR, Hyderabad.',
              'Webinar: “Caste and Gender in Development Economics” – Dr. S. Anandhi, Madras Institute of Development Studies.',
              'Webinar: “Investment Avenues & Risk Control Mechanism – Mutual Funds, Stocks & Bonds” – Dr. R.S. Mani, VIT Business School, Vellore.',
              'Webinar: “Location, Location, Location: Implications for Welfare Inequality in India” – Dr. D. Sowmya Dhanaraj, Madras School of Economics.',
              'Webinar: “How to Prepare a Research Project Report” – Dr. H. Premraj, VELS Institute of Science, Technology and Advanced Studies.',
              'Seminar: “Equity Investment with Risk Control Mechanism through Derivatives Management” – Dr. R.S. Mani, VIT Business School, Vellore.',
              'Guest Lecture: “Mutual Funds – Emerging Trends & Fund” – Dr. P. Raju Iyer, Vice President, The Institute of Cost Accountants of India.',
              'Guest Lecture: “Design Thinking – A Strategy for Innovative Product Design” – Dr. B. Nataraj, Thiagarajar School of Management, Madurai.',
            ],
          },
          {
            heading: 'Training Programmes, Symposia & Outreach',
            items: [
              'Entrepreneurship Training Programme (3 days) for MBA students, with the Director of M/s. Ravannan Masala as chief guest.',
              'Department-level symposium “MAN MEET 2017”, with Mrs. M. Jayalakshmi, Professor and Tamil orator, SIVET College, as chief guest.',
              'Outreach: Entrepreneurship Development and Training awareness camp and rally at Marimalainagar with MBA students.',
              'Outreach: “Avoid Plastic Bags and Packing” awareness camp and rally at Guduvanchery with MBA students.',
            ],
          },
        ],
      },
      {
        title: 'Achievements & Certifications',
        type: 'list',
        items: [
          'NPTEL Domain Certifier and Discipline Star in Marketing Management; NPTEL course completed in Financial Accounting.',
          'Best Paper Award, International Conference on Industrial Resurgence and Contemporary Innovation in Business 4.0 & 5.0 (July 2024).',
          'Refresher course in “Advanced Research Methodology” – “A” Grade.',
          'Training of Trainers (TOT) on Social Accountability Tools and Techniques for Good Governance, NIRD & PR, Government of India, Hyderabad.',
          'Institute-level Programme Mentor for the Entrepreneurship Development Cell, TN EDII (Anna University).',
          'Best Performer Award for excellence in administration work, 2007–2008.',
        ],
      },
      {
        title: 'Technical Skills & Core Competencies',
        type: 'table',
        columns: ['Area', 'Details'],
        rows: [
          ['Software', 'Diploma in Computer Application (NIIT) – MS Word, Excel, PowerPoint, Internet; proficient in SPSS'],
          ['Competencies', 'Team player and facilitator; strong interpersonal skills; continuous updating of knowledge and skills; total commitment to the job; patience and punctuality'],
        ],
      },
      {
        title: 'Professional Memberships',
        type: 'list',
        items: [
          'Active Member, Madras Management Association (MMA)',
          'Active Executive Member, Integrated Institute of Professional Management (IIPM)',
          'Professional membership with the IFERP',
          'Active Member, Institute of Financial Operations & Leadership (IFOL)',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* MCA                                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: 'dr-e-jeslin-renjith',
    photo: photoJeslin,
    programme: 'MCA',
    name: 'Dr. E. Jeslin Renjith',
    designation: 'Assistant Professor',
    role: 'Programme Coordinator, Online MCA',
    employment: 'Regular',
    qualification: 'MCA., M.Phil., Ph.D., SET',
    email: 'jeslin.renjith@gmail.com',
    stats: [
      ['20+', 'Years of Experience'],
      ['23', 'Publications'],
      ['03', 'Books Published'],
      ['03', 'Patents'],
    ],
    summary:
      'Over twenty years of teaching, mentoring and academic experience in Computer Science and Computer Applications. Currently Programme Coordinator for the Online MCA programme, with published research across machine learning, biomedical signal analysis, cloud security and generative AI in education.',
    education: [
      ['SET', 'Computer Science', 'February 2016', 'Mother Teresa Women’s University (Conducting Body)'],
      ['Ph.D.', 'Computer Science', '2023 (Awarded)', 'Bharathiar University, Coimbatore'],
      ['M.Phil.', 'Computer Science', '2005–2006', 'Madurai Kamaraj University, Tamil Nadu'],
      ['MCA', 'Computer Applications', '2000–2003', 'Kamaraj College, Tuticorin, Tamil Nadu'],
      ['B.Sc.', 'Physics', '1997–2000', 'Lakshmipuram College, Nagercoil, Tamil Nadu'],
      ['HSC', 'Maths–Biology', '1996–1997', 'L.M.S. Girls Higher Secondary School, Nagercoil, Tamil Nadu'],
      ['SSLC', 'General', '1994–1995', 'L.M.S. Girls Higher Secondary School, Nagercoil, Tamil Nadu'],
    ],
    experience: [
      ['Assistant Professor', 'B.S. Abdur Rahman Crescent Institute of Science and Technology, Vandalur', '2022 – Present', '4+ years'],
      ['Assistant Professor', 'Mohamed Sathak College, Chennai', '2016 – 2022', '6 years'],
      ['Assistant Professor', 'Madras Christian College, Chennai', '2010 – 2016', '6 years'],
      ['Lecturer', 'Vel Tech Multi Tech Engineering College, Chennai', '2008 – 2009', '1 year'],
      ['Lecturer', 'Women’s Christian College, Chennai', '2005 – 2008', '3 years'],
    ],
    courses: [
      'Python Programming',
      'Big Data',
      'Data Science',
      'Object-Oriented Software Engineering',
      'Cyber Security',
      'Computer Organization',
      'Machine Learning',
      'E-Commerce',
    ],
    research: [
      'Machine Learning',
      'Deep Learning',
      'Data Science & Predictive Analytics',
      'Cloud Security',
      'Biomedical Signal Analysis (Obstructive Sleep Apnea)',
      'Generative AI in Education',
    ],
    sections: [
      {
        title: 'Technical Skills',
        type: 'table',
        columns: ['Category', 'Skills / Technologies'],
        rows: [
          ['Programming Languages', 'C, C++, Java, Python, R'],
          ['Data Science & Analytics', 'Machine Learning, Deep Learning, Tableau, Power BI, SPSS'],
          ['Database Management Systems', 'MySQL, Oracle, SQL Server, Microsoft Access'],
          ['Web Technologies', 'HTML, JavaScript, ASP'],
          ['Operating Systems', 'Windows, Linux, UNIX'],
        ],
      },
      {
        title: 'Journal Publications',
        type: 'table',
        columns: ['Year', 'Research Article', 'Journal', 'Indexing / Impact'],
        rows: [
          ['2026', 'Predictive Analytics for Hydrogen–Honge Oil Dual Fuel Engine Using Machine Learning', 'International Journal of Hydrogen Energy', 'Scopus Q1, Impact Factor 9.2'],
          ['2026', 'Enhancing critical thinking skills through generative AI models: mechanisms and educational impacts', 'International Journal of Reasoning-based Intelligent Systems', 'Scopus'],
          ['2025', 'Extrapolation Against Categorisation for Neural Network-Based System Equalisation in a Narrowband Electric Grid', 'International Journal of Critical Infrastructures', 'Scopus'],
          ['2025', 'Tree-Based Ensemble Regression Models for Emission Prediction of a Winter Green Oil–Hydrogen Dual-Fuel Engine with Zeolite After-Treatment', 'Renewable Energy, Vol. 257, Article 124726', 'Scopus Q1, Impact Factor 9.1'],
          ['2025', 'OSA Classification Using a Snore Sound Dataset', 'International Journal of Scientific Research in Engineering and Management (IJSREM)', '—'],
          ['2024', 'Revolutionizing Cloud Security: Innovative Approaches for Safeguarding Data Integrity', 'FMDB Transactions on Sustainable Computer Letters, Vol. 2, No. 2, 2024', '—'],
          ['2018', 'Ensemble Feature Selection (EFS) and Ensemble Convolutional Neural Network with Vote Classification (ECNN-VC) Approach for Detection of Snore Sounds in Obstructive Sleep Apnea Diagnosis', 'International Journal of Computer Science and Information Security (IJCSIS), Vol. 16, No. 5', 'Scopus, Impact Factor 1.38'],
          ['2018', 'ESIVC for Snore Sound Detection', 'Journal of Advanced Research in Dynamical and Control Systems (JARDCS), Vol. 10, No. 4', 'Scopus (0.08)'],
          ['2018', 'Heterogeneous Ensemble Classifier with Vote (HECV)', 'International Journal of Recent Technology and Engineering (IJRTE)', 'Scopus, Impact Factor 5.92'],
          ['2018', 'Review of Detection and Classification for Snore Sound', 'Research Journal of Pharmacy and Biological Sciences (RJPBCS)', 'Impact Factor 0.35'],
        ],
      },
      {
        title: 'IEEE Conference Publications',
        type: 'table',
        columns: ['Year', 'Research Article', 'Publication', 'DOI / Status'],
        rows: [
          ['2026', 'A Robust Machine Learning framework for plant disease emission forecasting using deep learning techniques', '7th International Conference on Computational Vision and Bio Inspired Computing (ICCVBIC 2026)', 'Published, Scopus Indexed'],
          ['2025', 'IoT Security-Enabled Attendance Tracking Unit for Remote Workforce Management', 'Proceedings of the 10th International Conference on Science, Technology, Engineering and Mathematics (ICONSTEM 2025), IEEE (Scopus)', '10.1109/ICONSTEM65670.2025.11374784'],
          ['2017', 'Ensemble Swarm Intelligent Based Classification (ESIC) Approach for Automatic Detection of Snore Sounds with Acoustic Multi-Feature Analysis', 'IEEE-Sponsored International Conference (ICLTSET 2017), Karpagam Institute of Technology, Coimbatore', '—'],
        ],
      },
      {
        title: 'Conferences',
        type: 'table',
        columns: ['Year', 'Paper Title', 'Conference', 'Venue / Organizer'],
        rows: [
          ['2026', 'Artificial Intelligence-Based Ensemble Learning Models for Electric Vehicle Battery Performance and Range Prediction', 'International Conference on Advanced Multidisciplinary Research and Innovation (ICAMRI–2026)', 'University of Edenberg, Lusaka, Zambia'],
          ['2026', 'A Robust Machine Learning framework for plant disease emission forecasting using deep learning techniques', '7th International IEEE Conference on Computational Vision and Bio Inspired Computing (ICCVBIC 2026)', 'Nepal Open University, Nepal'],
          ['2025', 'IoT Security-Enabled Attendance Tracking Unit for Remote Workforce Management', '10th International Conference on Science, Technology, Engineering and Mathematics (ICONSTEM 2025)', 'IEEE (Scopus)'],
          ['2025', 'AI-Driven Approaches for Detecting Obstructive Sleep Apnea: A Comprehensive Review', 'International Conference on Technology-Enhanced Teaching and Learning (ICTETL 2025)', 'In collaboration with Global College Malta, 23–24 October 2025'],
          ['2025', 'Improving Critical Thinking Abilities via Generative AI Models', 'International Conference on Convergence of Computing, Mathematics and Microbiology: Challenges and Opportunities (SAASC–CCMMCO-25)', 'St. Anne’s Arts & Science College, Madhavaram, 20 September 2025'],
          ['2025', 'The Role of AI in Enhancing Network Security', 'International Conference on NextGen Intelligence: The Role of AI in Evolving Computer Science Paradigms', 'Alpha Arts and Science College, Chennai'],
          ['2024', 'Voice Analysis for the Identification of Severe Obstructive Sleep Apnea (OSA)', 'CSIR-Sponsored International Conference (ICTDT 2024)', 'CTTE College for Women, Chennai'],
          ['2024', 'An Efficient Approach to Data Security in Cloud Computing', 'International Conference on Computing, Communication, Data Science and Security (ICCCDS 2024)', 'PERI Arts and Science College, Chennai'],
          ['2023', 'Machine Learning Model to Predict Heart Problems', 'International Conference on Advanced Research in Science and Technology (ICARST 2023)', 'Mohamed Sathak College of Arts and Science, Chennai'],
          ['2022', 'Improved Firefly Algorithm (IFA)-Based Gene Selection and Deep Flexible Neural Forest for Classification of Cancer Subtypes Based on Gene Expression Data', 'International Conference on Advances in Data Science and Computing (ICADSC 2022)', 'SRM Institute of Science and Technology, Kattankulathur'],
          ['2022', 'Detection of Snore Sounds in Obstructive Sleep Apnea Diagnosis Using Ensemble Feature Selection and Ensemble Convolutional Neural Network with Vote Classification Approach', 'International Conference', 'Vels Institute of Science, Technology & Advanced Studies, Chennai'],
          ['2017', 'Ensemble Swarm Intelligent Based Classification (ESIC) Approach for Automatic Detection of Snore Sounds with Acoustic Multi-Feature Analysis', 'IEEE-Sponsored International Conference (ICLTSET 2017)', 'Karpagam Institute of Technology, Coimbatore'],
          ['2007', 'Data Mining in E-Commerce', 'UGC-Sponsored National Conference', 'Gobi Arts and Science College, Gobichettipalayam'],
        ],
      },
      {
        title: 'Book Chapters',
        type: 'table',
        columns: ['Year', 'Book Chapter Title', 'Book Title', 'ISBN'],
        rows: [
          ['2026', 'Machine Learning Models for Solving Urban Challenges: A Review', 'Advances in Machine Learning: Algorithms, Applications, and Emerging Trends, Volume 6S1 (IIP Series)', 'e-ISBN 978-93-7020-938-1'],
          ['2026', 'Data Storage and Management in Hybrid Systems', 'Academic Synergy: A Multidisciplinary Research Outlook', '978-81-999601-7-6'],
          ['2025', 'Real-World Applications and Case Studies of Generative AI in Academic Institutions', 'The Strategic Role of Multidisciplinary Academic Research and Practice', '978-81-991789-2-2'],
          ['2025', 'An Effective Method for Ensuring Data Privacy and Security in Digital Education Using Cloud Computing', 'Education 4.0: Leveraging Technology for Future-Ready Learning', '978-81-19567-09-6'],
          ['2025', 'Digital Evidence Management using Blockchain', 'Next Gen Forensic Science and Criminology: Future of Criminal Investigation', '978-93-49832-31-2'],
          ['2024', 'Online Teaching Methods — Research Perspective', 'Enhanced Teaching and Learning Pedagogy – A Research Perspective', '978-93-341-4459-8'],
        ],
      },
      {
        title: 'Books Published',
        type: 'table',
        columns: ['Year', 'Book Title', 'ISBN', 'Type'],
        rows: [
          ['2026', 'Introduction to AI and ML', '978-81-685119-1-0', 'Textbook'],
          ['2025', 'Learn Python Generative AI', '978-81-980400-8-4', 'Textbook'],
          ['2022', 'Computer Organization', '978-93-91303-30-3', 'Textbook'],
        ],
      },
      {
        title: 'Patents',
        type: 'table',
        columns: ['Year', 'Title', 'Status', 'Application / Design No.'],
        rows: [
          ['2026', 'An Intelligent Platform for Competency-Based Technical Education Delivery Using Advanced Computing (Indian Patent Office)', 'Published Patent', 'Application No. 202641102258 (Published 04 September 2026)'],
          ['2025', 'Real-Time Classroom System with Augmented Reality for Interactive Learning', 'Published Patent', 'Application No. 202511062153'],
          ['2024', 'Icon Design for Virtual Assistant Software', 'Published Patent (UK Registered Design)', 'Design No. 6352546 (Registration 12 March 2024; Grant 21 March 2024)'],
        ],
      },
      {
        title: 'FDPs, Workshops & Training',
        type: 'table',
        columns: ['Year', 'Programme', 'Organized By'],
        rows: [
          ['2025', 'Faculty Development Programme on Blockchain and Its Applications', 'NPTEL–AICTE (January–April 2025)'],
          ['2025', 'Moodle Test for Teachers — successfully completed', 'Spoken Tutorial Project, IIT Bombay, organized by B.S. Abdur Rahman Crescent Institute of Science and Technology (17 March 2025)'],
          ['2021', 'Workshop on Machine Learning Using Python', 'Workshop'],
          ['2020', 'Faculty Development Programme on Artificial Intelligence and Cyber Security', 'FDP'],
          ['2017', 'Workshop on Android for Mobile Applications', 'Workshop'],
          ['Various', 'Several FDPs, Workshops, Webinars and Online Training Programmes in emerging technologies', 'Various Institutions'],
        ],
      },
      {
        title: 'Professional Certifications',
        type: 'table',
        columns: ['Year', 'Certification Programme', 'Organized By'],
        rows: [
          ['2025', 'Certification Programme on Data Analysis Using Python', 'Centre for Distance and Online Education, B.S. Abdur Rahman Crescent Institute of Science and Technology'],
          ['2024', 'Certification Programme on Data Analysis Using SPSS', 'Centre for Distance and Online Education, B.S. Abdur Rahman Crescent Institute of Science and Technology'],
        ],
      },
      {
        title: 'NPTEL / SWAYAM Certifications',
        type: 'table',
        columns: ['Year', 'Certification Course', 'Platform / Organization'],
        rows: [
          ['2026', 'Fundamentals of Object-Oriented Programming', 'SWAYAM–NPTEL'],
          ['2025', 'Blockchain and Its Applications', 'SWAYAM–NPTEL'],
          ['2025', 'Cyber Security and Privacy', 'SWAYAM–NPTEL'],
          ['2024', 'Big Data Computing', 'SWAYAM–NPTEL'],
          ['2023', 'E-Commerce', 'SWAYAM–NPTEL'],
        ],
      },
      {
        title: 'Resource Person, Reviewer & Session Chair',
        type: 'table',
        columns: ['Year', 'Programme / Journal / Conference', 'Role'],
        rows: [
          ['2025', 'Certificate Programme on Data Analytics Using Python', 'Resource Person'],
          ['2024', 'Faculty Development Programme on Mastering E-Content Development', 'Resource Person'],
          ['2026', 'Click 2026 – IEEE Conference, Hindustan University', 'Reviewer'],
          ['2025', 'International Conference on Technology-Enhanced Teaching and Learning (ICTETL 2025), in collaboration with Global College Malta', 'Conference Reviewer'],
          ['2025', 'Journal of Advances in Mathematics and Computer Science', 'Journal Reviewer'],
          ['2025', 'International Journal of Scientific Development and Research (IJSDR)', 'Journal Reviewer'],
          ['2025', 'International Conference on Technology-Enhanced Teaching and Learning (ICTETL 2025), in collaboration with Global College Malta', 'Session Chair'],
        ],
      },
      {
        title: 'Refresher Course',
        type: 'table',
        columns: ['Year', 'Course', 'Organized By', 'Grade'],
        rows: [
          ['2025', 'Refresher Course in Advanced Science & Technology for a Sustainable Future (Interdisciplinary) under the Malaviya Mission Teacher Training Programme (MM-TTP), UGC (18–31 July 2025)', 'Malaviya Mission Teacher Training Centre, Indira Gandhi National Tribal University, Amarkantak, Madhya Pradesh', 'A+'],
        ],
      },
      {
        title: 'External Academic Responsibilities',
        type: 'table',
        columns: ['Year', 'Responsibility', 'Institution'],
        rows: [
          ['2025', 'Subject Expert – Board of Studies (B.Sc. Computer Science)', 'Madras Christian College, Chennai'],
          ['2025', 'Question Paper Setter – B.Sc. Computer Science End-Semester Examination', 'Madras Christian College, Chennai'],
          ['2025', 'Valuation Examiner – Computer Science End-Semester Examination', 'Madras Christian College, Chennai'],
          ['2025', 'External Practical Examiner – End-Semester Examination', 'Madras Christian College, Chennai'],
          ['2025', 'Valuation Examiner – Computer Science End-Semester Examination', 'SRM Institute of Science and Technology, Chennai'],
          ['2025', 'Project External Examiner – Computer Science End-Semester Examination', 'SRM Institute of Science and Technology, Chennai'],
        ],
      },
      {
        title: 'Doctoral Committee Member',
        type: 'table',
        columns: ['Year', 'Role', 'Institution'],
        rows: [
          ['2026', 'Doctoral Committee (DC) Member for Ph.D. Scholars', 'Vels Institute of Science and Technology, Chennai'],
          ['2025', 'Doctoral Committee (DC) Member for Ph.D. Scholars', 'Bharath Institute of Higher Education and Research, Chennai'],
        ],
      },
      {
        title: 'Additional Responsibilities',
        type: 'list',
        items: [
          'Programme Coordinator for the Online MCA Programme.',
          'Developed and delivered video lectures for Python, Big Data, Data Science, Object-Oriented Software Engineering and Cyber Security courses.',
          'Developed Self-Learning Materials (SLMs) for Python, Big Data, Data Science and Cyber Security.',
          'Created instructional content for the Certificate Programme in Data Analytics using Python.',
          'Served as an NSS Programme Officer, promoting student development and community engagement.',
          'Participated in Library Book Auditing and academic resource management activities.',
          'Delivered invited sessions as a Resource Person for Faculty Development Programmes and Certificate Programmes.',
          'Served as an External Board of Examiners Member for Madras Christian College, Chennai.',
          'Demonstrated strong leadership, communication, organizational and academic administration skills.',
        ],
      },
      {
        title: 'Achievements & Memberships',
        type: 'list',
        items: [
          'Best Paper Award — “Machine Learning Model to Predict Heart Problems”, International Conference on Advanced Research in Science and Technology (ICARST 2023), Mohamed Sathak College of Arts and Science, Chennai, for outstanding research contribution.',
          'Member, Computer Society of India (CSI) — Membership ID 7021240015.',
          'Co-curricular and community engagement: Drama, Elocution and Public Speaking; active participation in sports and games; Literacy Movement and National Service Scheme (NSS) activities.',
        ],
      },
    ],
  },

  {
    slug: 'dr-p-maheswari',
    photo: photoMaheswari,
    programme: 'MCA',
    name: 'Dr. P. Maheswari',
    designation: 'Assistant Professor',
    employment: 'Regular',
    qualification: 'MCA., M.Phil., SET, Ph.D',
    email: 'maheswari@crescent.education',
    stats: [
      ['15+', 'Years of Experience'],
      ['06', 'Publications'],
      ['06', 'Conference Papers'],
      ['02', 'Book Chapters'],
    ],
    education: [
      ['B.Sc', 'Statistics', '2002', 'Madras University'],
      ['MCA', 'Computer Application', '2005', 'Anna University'],
      ['M.Phil', 'Computer Science', '2013', 'B.S Abdur Rahman University'],
      ['SET', 'Computer Science', '2016', 'Mother Teresa University'],
      ['Ph.D', 'Computer Science', '2020', 'B.S Abdur Rahman Crescent Institute of Science and Technology'],
    ],
    experience: [
      ['Assistant Professor', 'B.S Abdur Rahman Crescent Institute of Science and Technology', '23rd March 2022 – till date', '03 years 9 months'],
      ['Assistant Professor', 'C S I Ewart Women’s Christian College', '24th August 2012 – 21st March 2022', '9 years 7 months'],
      ['Lecturer', 'Prof. Dhanapalan College for Women', '7th February 2011 – 30th June 2011', '5 months'],
      ['Lecturer', 'S.D.N.B Vaishnav College for Women', '20th May 2005 – 1st June 2006', '01 year'],
    ],
    courses: [
      'Programming in Java',
      'Cloud Computing',
      'Full Stack Development',
      'Machine Learning',
      'Software Project Management',
      'Design and Analysis of Algorithms',
      'Management Information System',
      'Data Structure and Algorithms',
      'Web Technologies',
      'Programming in C and C++',
      'Computer Application in Business Organization',
      'Internet of Things',
      'Python Programming',
    ],
    research: [
      'Data Mining',
      'Machine Learning',
      'Data Science',
      'Predictive Analysis',
      'NLP',
      'Artificial Intelligence',
      'Deep Learning',
    ],
    sections: [
      {
        title: 'Publications',
        type: 'groups',
        groups: [
          {
            heading: 'Web of Science / Scopus Indexed Journals',
            items: [
              'Maheswari Petchiappan and Jaya Aravindhen, “Comparative Study of Machine Learning Algorithms towards Predictive Analytics”, Recent Advances in Computer Science and Communications, Volume 16, Issue 6, 2023, 69-79, published 17th October 2022, DOI 10.2174/2666255816666220623160821, Article ID e230622206361 (Scopus).',
              'Maheswari P and Jaya A, “Analyzing Tweets for Predicting The Sentiments Of Investors In The Stock Markets”, China Petroleum Processing and Petrochemical Technology, Catalyst Research Volume 23, Issue 2, July 2023, Pp. 58-72 (Web of Science).',
            ],
          },
          {
            heading: 'Book Chapters',
            items: [
              '“Machine Learning Approach For Cloud Data Analytics In IOT” — chapter titled “Prediction of Stock Market Using Machine Learning – Based Data Analytics”, 13th July 2021, ISBN 9781119785804, Wiley Group. DOI 10.1002/9781119785873.ch14.',
              '“A Handbook on Intelligent HealthCare Analytics: Knowledge Engineering with Big Data” — Chapter 6 titled “Business Intelligence and Analytics from Big Data”, 6th May 2022, published by Scrivener Publishing, Wiley Group. DOI 10.1002/9781119792550.ch6.',
            ],
          },
          {
            heading: 'Book',
            items: [
              '“Python Coding Instructor for Beginners” — Jayalakshmi V, Maheswari P and Sriram N, Notion Press, ISBN 9781639407330.',
            ],
          },
          {
            heading: 'International Journal',
            items: [
              'Maheswari and A. Jaya, “An Integrated Approach towards Prediction of Stock Values for Short Term”, IFRSA’s International Journal Of Computing, Vol. 2, Issue 3, July 2012, 645-651.',
            ],
          },
        ],
      },
      {
        title: 'International Conferences',
        type: 'list',
        items: [
          'Maheswari P, A. Jaya, “Prediction of Stock Values in Health Care Sectors”, in the proceedings of 45th INDIAN SOCIAL SCIENCE CONGRESS (ISSC), organized by ISSA and B.S. Abdur Rahman Crescent Institute of Science and Technology, 28th March – 4th April 2022.',
          'P Maheswari and A. Jaya, “Organising and retrieving of scientific articles using ontology”, in the proceedings of the 21st International Conference on Computer Science and Information Technology (ICCIT 2016); published in International Journal of Current Engineering and Scientific Research (IJCESR), ISSN (print) 2993-0697, Volume 3, Issue 8, 2016.',
          'P. Maheswari and Dr. A. Jaya, “Sentiment Based Approach towards Prediction of Stock Values For Long and Short Term”, in the proceedings of International Conference On Computational Intelligence And Communication (ICCIC 2012), pp 17-21, July 2012.',
        ],
      },
      {
        title: 'National Conferences',
        type: 'list',
        items: [
          '“Intrusion Detection to Secure Networks Using Machine Learning and Data Mining – Review”, in the Proceedings of National Conference on RTCSM, April 2019.',
          '“Organizing And Collecting the Research Articles Using Web Mining Techniques and Mind Mapping”, in the proceedings of National Conference on Recent Trends in Web Technologies, October 2013; published in the International Journal of Research in Advance Technology in Engineering (IJRATE), special issue for October 2013, Volume 1.',
          'P. Maheswari and A. Jaya, “An Integrated Approach towards Prediction of Stock Values For Long and Short Term”, in the proceedings of 3rd National Conference on Futuristic and Advanced Computing Technologies, March 2012.',
        ],
      },
      {
        title: 'Major FDP / Workshop / Seminar Attended',
        type: 'list',
        items: [
          'Intellectual Property Rights',
          'Prospective Areas of Research in Computer Science',
          '360° of Teaching Excellence: Reinventing Teaching for Gen Next',
          'Cloud based Machine Learning algorithms for Data Mining',
          'Women’s Rights are Human Rights',
          'Quality Assurance in Academic and Sponsored Research',
          'Google Applications and Android Programming',
          'Statistical Analysis using SPSS Package',
          'International workshop in Advances in Data and Web Mining',
          'Application of MATLAB and LABVIEW for Biomedical Applications',
          'Faculty Development Programme on “Securities Market”',
          'Faculty Development Programme on “Predictive Modelling using R”',
          'Seminar on “Role of AI and IOT for Health Care”',
        ],
      },
      {
        title: 'International Conferences and Seminars Organized',
        type: 'list',
        items: [
          'Two-day International conference on “Pathways to success in a Global Market place”, 18th and 19th July 2019.',
          'Seminar on “Big Data Analytics”, 7th February 2020.',
          'Seminar on “Recent Trends in Information Technology”, 2nd March 2016.',
        ],
      },
      {
        title: 'Certification Courses',
        type: 'list',
        items: [
          'Quality Assurance through NAAC Accreditation Process — Swayam NITTTR, July–Sep 2021.',
          'NPTEL – “Python for Data Science”, Aug–Sep 2019.',
        ],
      },
      {
        title: 'Additional Responsibilities',
        type: 'list',
        items: [
          'NPTEL Local Chapter from 2021 to 2022.',
          'Liaison Officer 2018 to 2022.',
          'Nodal Officer for Online Certificate Course 2021 to 2022.',
          'Nodal Officer for conducting University Theory Examinations, 2020-21.',
          'Assistant to the Chief Superintendent for conducting examinations, University of Madras (Regular) and the Institute of Distance Education.',
          'External and Internal examiner for conducting University Practical examinations, 2012–2022.',
          'Managed union, cultural, IQAC and academic activities — department magazines, timetable, examination schedule, guiding student projects, recommending books and journals for the library, organizing guest lectures, seminars and workshops.',
          'Handled confidential examination work and correspondence from the Regional Joint Director, University of Madras.',
          'Assisted with scholarships and AISHE, 2012–2014.',
          'Involved in stock audit.',
          'Member of Internal Complaints Committee, 2013–2022.',
        ],
      },
    ],
  },

  {
    slug: 'mrs-s-manjula',
    photo: photoManjula,
    programme: 'MCA',
    name: 'Mrs. S. Manjula',
    designation: 'Assistant Professor',
    employment: 'Regular',
    qualification: 'MCA., SET., Ph.D (Pursuing)',
    email: 'Manjula.s@crescent.education',
    stats: [
      ['08+', 'Years of Experience'],
      ['03', 'Conference Papers'],
      ['11', 'Webinars Attended'],
      ['02', 'FDPs Attended'],
    ],
    education: [
      ['MCA', 'Computer Applications', '2006', 'IGNOU'],
      ['B.Sc', 'Computer Science', '2003', 'Periyar University'],
    ],
    experience: [
      ['Assistant Professor', 'B S A Crescent Institute of Science and Technology', 'Jun 06 2022 – till now', '10 months'],
      ['Assistant Professor', 'St. Annes Arts and Science College for Women, Madavaram, Chennai', 'Jan 2019 – Sep 2020', '1 year 9 months'],
      ['Assistant Professor', 'Sri Kanyaka Parameswari Arts and Science College for Women, Chennai', 'Jun 2017 – Nov 2018', '1 year 6 months'],
      ['Assistant Professor', 'RB. Gothi Jain College for Women, Redhills, Chennai', 'Dec 2013 – Mar 2016', '2 years 6 months'],
      ['Assistant Professor', 'Shri Shankarlal Sundarbai Shasun Jain College for Women, Chennai', 'Sep 2011 – Apr 2012', '8 months'],
      ['Assistant Professor', 'Marudhar Kesari Jain College for Women, Vaniyambadi', 'Jun 2010 – Apr 2011', '11 months'],
    ],
    courses: [
      'Software Engineering',
      'Operating Systems',
      'Client and Server Computing',
      'Data Communication and Networking',
      'Programming in C++ using Data Structures',
      'Fundamentals of Digital Computers',
      'Database Management System',
      'Practicals handled: C, C++, VB, Java, PC Software Lab',
    ],
    research: ['Social Media Network', 'Data Mining', 'Educational Platform', 'Deep Learning'],
    sections: [
      {
        title: 'Publications & Professional Contributions',
        type: 'list',
        items: [
          'Online course certificate from Udemy on “The basics of Scrum, Agile and Project Delivery”.',
          'Developed a blog to update student knowledge — “Study portals for B.Sc and BCA students” — listing websites and portals for students to grow in their career (http://studyportalbca.blogspot.com/2019/07/bsc-andbca-students.html).',
          'Participated in the National Workshop on “Social Network Analysis” conducted by Women’s Christian College, Chennai.',
          'National level seminar on “Best Practices in Higher Education with reference to Rural Areas” conducted by IQAC, Marudhar Kesari Jain College for Women, affiliated to Tiruvalluvar University, accredited by NAAC, Vaniyambadi.',
          'National conference on “Recent Trends in Information Technology” — presented a paper titled “Mobile Computing”, published in the book with ISBN 978-9380530-82-6, organized by Vidhya Sagar Women’s College, Chengalpattu.',
          'National conference on Innovative Computing (NCIT) — presented a paper titled “Generation of Wireless Communication”, published in the book with ISBN 978-93-81195-31-4, organized by Rathankanwar Bhawarlal Gothi Jain College for Women, Redhills, Chennai.',
        ],
      },
      {
        title: 'International / National Conference',
        type: 'list',
        items: [
          'International conference on “Emerging trends in online teaching, assessment and learning” (eTotal), 24 & 25 Feb 2023 — presented a paper titled “Accessing E-Learning Tool Udemy: To Make Your Passion Into A Passive Income”, published in the book Research and Reflections on Education (A Quarterly Journal), Reg. No. TNENG/2003/10220, ISSN 0974-648(P).',
        ],
      },
      {
        title: 'Webinars Attended',
        type: 'table',
        columns: ['S.No', 'Name of the Webinar', 'Organized by', 'Date'],
        rows: [
          ['1', 'Leading in a VUCA World: Opening Key Note Sessions', 'ICT Academy', 'Apr 20th 2020'],
          ['2', 'Leading in a VUCA World: Expert Sessions', 'ICT Academy', 'Apr 21st 2020'],
          ['3', 'Leading in a VUCA World: Expert Sessions', 'ICT Academy', 'Apr 22nd 2020'],
          ['4', 'Leading in a VUCA World: Expert Sessions', 'ICT Academy', 'Apr 23rd 2020'],
          ['5', 'Leading in a VUCA World: Expert Sessions', 'ICT Academy', 'Apr 24th 2020'],
          ['6', '“How to get published in scientific journal: From Research to publication”', 'Sri Sairam Institute of Technology', 'Apr 27th 2020'],
          ['7', 'The Future of Education, Employment and Entrepreneurship: Opening Key Note Sessions', 'ICT Academy', 'May 5th 2020'],
          ['8', 'The Future of Education, Employment and Entrepreneurship: Expert Sessions', 'ICT Academy', 'May 6th 2020'],
          ['9', 'The Future of Education, Employment and Entrepreneurship: Expert Sessions', 'ICT Academy', 'May 7th 2020'],
          ['10', 'The Future of Education, Employment and Entrepreneurship: Expert Sessions', 'ICT Academy', 'May 8th 2020'],
          ['11', 'Live webinar on “Artificial Intelligence and its applications”', 'Hindustan College of Arts and Science', 'May 21st 2020'],
        ],
      },
      {
        title: 'Quiz Programmes Attended',
        type: 'table',
        columns: ['S.No', 'Quiz', 'Organized by', 'Date'],
        rows: [
          ['1', 'Awareness Quiz for COVID 19', 'Panimalar Medical College', 'Apr 17th 2020'],
          ['2', 'Online Mock test on “Research Aptitude”', 'Kaamadhenu Arts and Science College', 'May 17th 2020'],
          ['3', 'National level Technical Quiz — Cerebroquiz 20', 'DKM College', 'May 19th 2020'],
          ['4', 'Awareness Quiz for COVID 19', 'Ramakrishna College of Arts and Science', 'May 19th 2020'],
          ['5', 'Awareness Quiz for COVID 19', 'Sri Muthukumaran Arts and Science College', 'May 19th 2020'],
          ['6', 'National level online quiz on Machine Learning', 'Thiruthangal Nadar College', 'May 23rd 2020'],
        ],
      },
      {
        title: 'Faculty Development Programmes Attended',
        type: 'table',
        columns: ['S.No', 'Name of the FDP', 'Organized by', 'Date'],
        rows: [
          ['1', 'International Faculty Development Programme', 'AIMIT', 'Apr 24th 2020'],
          ['2', 'Online Faculty Development Programme on Computational Intelligence', 'PSG College of Arts and Science', '12.5.2020 to 16.5.2020'],
        ],
      },
      {
        title: 'Additional Responsibilities',
        type: 'list',
        items: ['Department course file in-charge', 'Academic Audit'],
      },
      {
        title: 'Achievements',
        type: 'list',
        items: [
          'Received the Best Paper award for the oral presentation of the paper “Accessing E-Learning Tool Udemy: To Make Your Passion Into A Passive Income” at the international conference on “Emerging Trends in Online Teaching, Assessment and Learning” (eTotal), 24 & 25 Feb 2023.',
          'Various online certificates in C, C++, Computer Technology Basics, HTML, Mobile Technology Basics, MS Excel 2007, Oracle 9i SQL and Programming.',
        ],
      },
    ],
  },
]

// Technical team photos are served from the institute's own site, same as the
// non-teaching portraits below. Every card falls back to an avatar icon if a
// remote image cannot be reached, so no placeholder is ever left blank.
const TECH_IMG = `${import.meta.env.BASE_URL}img/technical/`

export const technicalTeam = [
  {
    slug: 'mrs-p-paul-merline',
    name: 'Mrs. P. Paul Merline',
    designation: 'Technical Manager (LMS & Data Management)',
    group: 'Technical Team',
    teamLink: '?tab=technical&team=lms',
    qualification: 'B.Sc., MCA',
    photo: `${TECH_IMG}merline.jpg`,
    email: 'merline.nt@crescent.education',
    stats: [
      ['03', 'Publications'],
      ['02', 'Conference Papers'],
      ['06', 'Certifications'],
      ['06', 'MCA Students Guided'],
    ],
    summary:
      'Technical Manager at the Centre for Distance and Online Education (CDOE), B.S. Abdur Rahman Crescent Institute of Science and Technology. Manages and supports LMS operations and digital learning services, contributes to the online education websites and academic technology platforms, and coordinates database management, online examinations, server infrastructure and cloud migration — with a strong interest in AI in education and learning analytics.',
    experience: [
      ['Technical Manager', 'Centre for Distance and Online Education (CDOE), B.S. Abdur Rahman Crescent Institute of Science and Technology', 'Current', ''],
    ],
    research: [
      'AI in Education',
      'Generative AI Applications',
      'Learning Analytics',
      'Digital Transformation',
      'Cloud and Data Management',
      'Educational Technology',
      'Software Development',
    ],
    sections: [
      {
        title: 'Technical Skills',
        type: 'table',
        columns: ['Area', 'Skills'],
        rows: [
          ['Programming & Web Development', 'JavaScript, React.js, Node.js, Express.js, PHP, HTML, CSS, Bootstrap'],
          ['Database Management', 'MySQL, MariaDB, MongoDB'],
          ['Cloud & Infrastructure', 'Server administration, cloud migration, system performance monitoring'],
          ['Learning Management Systems', 'LMS administration, online assessment, academic automation'],
          ['Emerging Technologies', 'Generative AI, AI tools, Machine Learning, Learning Analytics'],
          ['Digital Publishing', 'Electronic content production, content management'],
        ],
      },
      {
        title: 'Current Role & Responsibilities',
        type: 'list',
        items: [
          'Manage and support LMS operations and digital learning services.',
          'Contribute to the development and enhancement of online education websites and academic technology platforms.',
          'Support database management, course and student administration, and online examination processes.',
          'Coordinate server infrastructure, cloud migration, system performance and digital service continuity.',
          'Contribute to technology-enabled academic workflows and continuous improvement of online and distance education services.',
        ],
      },
      {
        title: 'Selected Technical Projects',
        type: 'table',
        columns: ['Project', 'Description'],
        rows: [
          ['Crescent Online Website Development', 'Development and enhancement of the online education website with programme information and student resources.'],
          ['Learning Management System & Online Examination Support', 'LMS operations, course and student mapping, and online assessment workflows.'],
          ['Cloud Infrastructure and Server Modernisation', 'Cloud migration, server coordination, data management and performance optimisation.'],
          ['Central File Management and Data Migration', 'Web-based solution using Node.js, Express.js, JavaScript, MySQL and Bootstrap for file migration, verification, logging, backup and rollback.'],
        ],
      },
      {
        title: 'Publications',
        type: 'table',
        columns: ['Year', 'Chapter', 'Book / Publisher', 'ISBN'],
        rows: [
          ['2026', 'Data Storage and Management in Hybrid Systems (with E. Jeslin Renjith and Dr. D. Pradeep Kumar)', 'Academic Synergy: A Multidisciplinary Research Outlook — Multi Spectrum Publications, March 2026', '978-81-999601-7-6'],
          ['2025', 'Real-World Applications and Case Studies of Generative AI in Academic Institutions (with Dr. E. Jeslin Renjith)', 'The Strategic Role of Multidisciplinary Academic Research and Practice — Multi Spectrum Publications, September 2025', '978-81-991789-2-2'],
          ['2024', 'Chapter 4: Online Learning', 'Enhanced Teaching Learning Pedagogy – A Research Perspective, November 2024', '948-93-341-4459-8'],
        ],
      },
      {
        title: 'Conference Presentations',
        type: 'table',
        columns: ['Year', 'Paper', 'Conference'],
        rows: [
          ['2026', 'Artificial Intelligence-Based Ensemble Learning Models for Electric Vehicle Battery Performance and Range Prediction', 'International Conference on Advanced Multidisciplinary Research and Innovation (ICAMRI–2026), 15 August 2026'],
          ['2025', 'AI-Driven Approaches for Detecting Obstructive Sleep Apnea: A Comprehensive Review', 'International Conference on Technology-Enhanced Teaching and Learning (ICTETL 2025), in collaboration with Global College Malta, 23–24 October 2025'],
        ],
      },
      {
        title: 'MCA Student Guidance',
        type: 'list',
        items: [
          'Guided 6 postgraduate (MCA) students in project and thesis work during 2023–2024, including “E-Learning Management for Academic Institutions” and “Cognitive Assistance for Students Using Machine Learning”.',
          'Supports students in connecting computer science concepts with real-world applications and research.',
        ],
      },
      {
        title: 'Certifications',
        type: 'table',
        columns: ['Date', 'Certification', 'Organized By'],
        rows: [
          ['Aug 2026', 'Mobile Application Development (17–21 August 2026)', 'CDOE, BSACIST'],
          ['Apr 2026', 'ChatGPT for Everyone', 'GUVI / HCL'],
          ['Mar 2026', 'Certificate Program in Applied AI (Statistics to NLP)', 'GUVI / HCL'],
          ['Mar 2026', 'Build & Deploy Apps with Google AI Studio & Multilingual AI Speech App with Vibe Coding', 'GUVI / HCL'],
          ['Mar 2026', 'Fundamentals of DevOps', 'GUVI / HCL'],
          ['Oct 2025', 'Data Analytics Using Python (13–17 October 2025)', 'CDOE, BSACIST'],
        ],
      },
    ],
  },
  {
    name: 'Mr. A. Mohamed Meerasa Mujahith',
    designation: 'Technical Assistant (LMS & Data Management)',
    qualification: 'BCA, MCA',
    email: 'mohamedmujahith.nt@crescent.education',
    photo: `${TECH_IMG}mohammed.jpg`,
  },
  {
    name: 'Ms. Shanofer',
    designation: 'Technical Assistant (LMS & Data Management)',
    qualification: 'B.Sc., MCA',
    email: 'shanofer.nt@crescent.education',
    photo: `${TECH_IMG}shanofer.jpg`,
  },
  {
    name: 'Mr. K. Rooban',
    designation: 'Technical Assistant (Audio - Video Editing)',
    photo: `${TECH_IMG}rooban.jpg`,
  },
  {
    name: 'Mrs. R. Latha',
    designation: 'Technical Assistant (Audio - Video Editing)',
    photo: `${TECH_IMG}latha.jpg`,
  },
  {
    name: 'Mr. R. Deepak',
    designation: 'Technical Assistant (Audio - Video Editing)',
    photo: `${TECH_IMG}deepak.jpg`,
  },
  {
    name: 'Mr. T. Abdur Rahman',
    designation: 'Technical Assistant (Audio - Video Editing)',
    qualification: 'B.Sc. Visual Communication',
    photo: `${TECH_IMG}abdur-rahman.jpg`,
  },
]

// The Technical Team tab is split in two on the page: the people who run the
// LMS, and the Editing Team (audio-video) who produce the recorded lectures.
// Anyone whose designation mentions LMS is in the LMS Team; the order is the
// order above.
export const technicalGroups = [
  { id: 'lms', label: 'LMS Team', match: (m) => m.designation.includes('LMS') },
  { id: 'editing', label: 'Editing Team', match: (m) => !m.designation.includes('LMS') },
]

export const getTechnicalGroup = (id) =>
  technicalTeam.filter((technicalGroups.find((g) => g.id === id) ?? technicalGroups[0]).match)

// Non-teaching photos are currently served from the institute's own site.
// Run download-photos.ps1 to pull them into src/assets/nonteaching/, then these
// become local imports like the faculty portraits above.
const NT_IMG = `${import.meta.env.BASE_URL}img/nonteaching/`

export const nonTeaching = [
  {
    slug: 'khaja-thameem-ahmed',
    name: 'Mr. Khaja Thameem Ahmed',
    designation: 'Academic Coordinator',
    group: 'Non-Teaching Staff',
    teamLink: '?tab=non-teaching',
    photo: `${NT_IMG}khaja-thameem-ahmed.jpg`,
    qualification: 'B.Sc., MBA, Ph.D. (Pursuing)',
    stats: [
      ['17+', 'Years of Experience'],
      ['3', 'Research Publications'],
      ['3', 'Countries Worked In'],
      ['2020', 'With CDOE Since'],
    ],
    summary:
      'Academic Coordinator with over 17 years of progressive experience in academic coordination, academic administration, faculty management, student advisory services and compliance documentation across India, the UAE (Dubai) and Qatar (Doha). Manages academic operations, coordinates faculty and staff, supports curriculum implementation and keeps academic documentation inspection-ready, supporting quality assurance and continuous academic improvement. Currently pursuing a Ph.D. in Management, with published work in a Scopus-indexed journal.',
    education: [
      ['Ph.D.', 'Management', '2024 – Present (Pursuing)', 'B.S. Abdur Rahman Crescent Institute of Science and Technology, Chennai'],
      ['MBA', 'Human Resources Management', '2011', 'University of Madras'],
      ['B.Sc.', 'Computer Science', '2008', 'The New College, Chennai'],
      ['Rashtrabhasha Praveen Uttarardh', 'Hindi (equivalent to M.A. in Hindi)', '—', 'Dakshina Bharat Hindi Prachar Sabha, Chennai'],
    ],
    experience: [
      ['Academic Coordinator', 'B.S. Abdur Rahman Crescent Institute of Science and Technology, India', 'Mar 2020 – Present', '6+ years'],
      ['Senior Administrator', 'Pridemann Façade Consultant Pvt. Ltd., Dubai (UAE) & India', 'Nov 2017 – Oct 2019', '2 years'],
      ['Project Coordinator', 'Professional Aluminium Company (PAC), Doha, Qatar', 'Dec 2013 – Sep 2017', '3 years 10 months'],
      ['IPG Administrator', 'ICON Clinical Research, Chennai', 'Jun 2011 – Oct 2013', '2 years 5 months'],
      ['Administrator', 'Hapag-Lloyd Global Services, Chennai', 'Sep 2009 – Jan 2010', '5 months'],
    ],
    courses: [
      'Managerial Behaviour & Strategic Leadership',
      'Financial Markets & Services',
      'Strategic Management',
      'Business Communication',
      'Entrepreneurship Development',
    ],
    research: [
      'AI Adoption in Recruitment (IT sector, India)',
      'Human Resources Management',
      'Industry 5.0 & Operational Agility',
      'Digital Transformation in Hiring',
    ],
    sections: [
      {
        title: 'Core Competencies & Skills',
        type: 'list',
        items: [
          'Academic Operations & Timetabling',
          'Faculty Coordination & Support',
          'Curriculum Planning & Implementation',
          'Student Progress Monitoring & Advisory',
          'Academic Audits & Compliance Documentation',
          'Teaching & Training',
          'Regulatory Compliance & Inspection Readiness (KHDA / ADEK aligned)',
          'Quality Assurance & Academic Review Processes',
          'Admissions Support & Academic Records Management',
          'Staff Induction & Training Coordination',
          'Parent & Stakeholder Communication Support',
          'Policy Implementation & Institutional Reporting',
          'Multicultural Team Coordination',
          'Strategic Planning & Time Management',
          'Conflict Resolution & Leadership Support',
        ],
      },
      {
        title: 'Language Skills',
        type: 'table',
        columns: ['Language', 'Read', 'Write', 'Speak'],
        rows: [
          ['English', '✓', '✓', '✓'],
          ['Tamil', '✓', '✓', '✓'],
          ['Hindi', '✓', '✓', '✓'],
          ['Urdu', '—', '—', '✓'],
        ],
      },
      {
        title: 'Research Publications',
        type: 'list',
        items: [
          'Khaja Thameem Ahmed, S., Hemalatha, J., & Thowseaf, S. (2025). “AI’s adoption in recruitment across IT firms in Chennai district: A digital transformation in hiring.” TPM – Testing, Psychometrics, Methodology in Applied Psychology, 32(S9), 183–192. (Scopus Indexed)',
          'Khaja Thameem Ahmed, S. (2025). “Adoption of Industry 5.0 practices and their impact on operational agility in the Indian manufacturing sector.” Journal of Contemporary Trends in Management, Commerce and Economics, 1(1), 01–07.',
          'Khaja Thameem Ahmed, S. (2025). “A Digital Transformation in Hiring.” International Conference on Technology Enhanced Teaching and Learning, 210–225.',
        ],
      },
      {
        title: 'Ph.D. Research Project',
        type: 'list',
        items: [
          'Research topic: An empirical investigation into the determinants of Artificial Intelligence (AI) adoption in recruitment practices in the Information Technology (IT) sector in India — B.S. Abdur Rahman Crescent Institute of Science and Technology (2024 – present).',
        ],
      },
      {
        title: 'Roles & Responsibilities',
        type: 'groups',
        groups: [
          {
            heading: 'Academic Coordinator — B.S. Abdur Rahman Crescent Institute of Science and Technology (Mar 2020 – Present)',
            items: [
              'Teaches MBA courses (OL / ODL): Managerial Behaviour & Strategic Leadership, Financial Markets & Services, Strategic Management, Business Communication & Entrepreneurship Development.',
              'Manages end-to-end academic coordination, including academic calendars, class schedules and faculty allocation.',
              'Coordinates with faculty members to ensure effective curriculum delivery and academic continuity.',
              'Provides student advisory services on academic progression, performance improvement and compliance requirements.',
              'Keeps academic records, course files, student evidence and documentation in line with regulatory and inspection standards (KHDA / ADEK aligned).',
              'Supports internal academic audits, quality assurance reviews and inspection-readiness processes.',
              'Organises academic meetings, faculty briefings, workshops and induction programmes.',
              'Maintains academic records, course files, student data and programme documentation.',
              'Assists in faculty recruitment, onboarding and academic orientation.',
              'Supports admissions processes, student follow-ups and inter-departmental coordination.',
            ],
          },
          {
            heading: 'Senior Administrator — Pridemann Façade Consultant Pvt. Ltd., Dubai (UAE) & India (Nov 2017 – Oct 2019)',
            items: [
              'Coordinated administrative and HR operations in a multicultural UAE work environment.',
              'Managed staff training schedules, performance documentation and HR compliance records.',
              'Supported employee onboarding, orientation and policy implementation.',
              'Handled employee relations, grievance management and conflict resolution.',
              'Coordinated travel, training and operational logistics.',
              'Maintained personnel files, payroll documentation and performance evaluation reports.',
            ],
          },
          {
            heading: 'Project Coordinator — Professional Aluminium Company (PAC), Doha, Qatar (Dec 2013 – Sep 2017)',
            items: [
              'Coordinated large-scale projects, including the Mall of Qatar and World Trade Centre Doha.',
              'Managed project schedules, resources, documentation and reporting.',
              'Liaised with clients and internal teams to ensure project alignment and timely delivery.',
              'Implemented ISO-compliant document control and quality management systems.',
              'Monitored project timelines, budgets and compliance requirements.',
            ],
          },
          {
            heading: 'IPG Administrator — ICON Clinical Research, Chennai (Jun 2011 – Oct 2013)',
            items: [
              'Supported global clinical research teams using ICONomics systems.',
              'Reviewed investigator payments based on contractual agreements and site visits.',
              'Compiled statistical, financial and operational reports.',
              'Coordinated recruitment team follow-ups and documentation.',
            ],
          },
          {
            heading: 'Administrator — Hapag-Lloyd Global Services, Chennai (Sep 2009 – Jan 2010)',
            items: [
              'Managed shipment tracking and coordination with logistics partners.',
              'Handled customer queries on Bills of Lading, routing and payments.',
              'Prepared import / export documentation ensuring trade and banking compliance.',
            ],
          },
        ],
      },
      {
        title: 'Certifications',
        type: 'list',
        items: ['HR Prep — Bernie Portal', 'Certificate Course — Bernie Portal'],
      },
    ],
  },
  {
    name: 'Mrs. Shakira Banu',
    designation: 'Assistant',
    //photo: `${NT_IMG}usha4%20copy.jpg`,
  },
  {
    name: 'Mr. Ujjal Sikdar',
    designation: 'Admission Counsellor',
    photo: `${NT_IMG}ujjal.jpeg`,
  },
  {
    name: 'Mr. N. Kumaresan',
    designation: 'Attender Gr II',
    photo: `${NT_IMG}kumaresan.jpg`,
  },
  {
    name: 'Mr. N. Vijayakumar',
    designation: 'Attender Gr III',
    photo: `${NT_IMG}vijay.jpg`,
  },
]

// Profiles: faculty, plus technical and non-teaching staff who have one (an entry with a slug).
export const getFacultyBySlug = (slug) =>
  faculty.find((f) => f.slug === slug) ??
  technicalTeam.find((m) => m.slug === slug) ??
  nonTeaching.find((m) => m.slug === slug)

export const facultyByProgramme = faculty.reduce((acc, f) => {
  ;(acc[f.programme] ||= []).push(f)
  return acc
}, {})

/* =========================================================================
 * FACULTY BY LEVEL — the UG / PG split behind the Faculty tab
 * =========================================================================
 * The Faculty tab is two levels deep: UG Programmes / PG Programmes, and then
 * one tab per programme inside the chosen level, so every programme's faculty
 * is reachable — not only MBA and MCA.
 *
 * A programme gets its people from one of two places:
 *   `profileProgramme` — the `programme` field on the full profiles above,
 *                        which also gives each card a Read More profile page
 *   `detailsKey`       — the programmeDetails entry for programmes whose
 *                        faculty have no profile page yet
 * Both ids appear in the URL (?tab=faculty&level=ug&programme=ba-english), so
 * any programme tab can be linked, bookmarked or shared.
 */
export const facultyLevels = [
  {
    id: 'ug',
    label: 'UG Programmes',
    programmes: [
      { id: 'ba-islamic-studies', label: 'BA Islamic Studies', detailsKey: 'ba-islamic-studies' },
      // HIDDEN FOR NOW
      // { id: 'ba-public-policy', label: 'BA Public Policy', detailsKey: 'ba-public-policy' },
      // { id: 'ba-english', label: 'BA English', detailsKey: 'ba-english' },
    ],
  },
  {
    id: 'pg',
    label: 'PG Programmes',
    programmes: [
      { id: 'mba', label: 'MBA', profileProgramme: 'MBA' },
      { id: 'mca', label: 'MCA', profileProgramme: 'MCA' },
      // HIDDEN FOR NOW
      // { id: 'ma-islamic-studies', label: 'MA Islamic Studies', detailsKey: 'ma-islamic-studies' },
    ],
  },
]

/* Flat lookup of every faculty programme tab, keyed by its URL id. */
export const facultyProgrammeById = facultyLevels.reduce((acc, level) => {
  level.programmes.forEach((programme) => {
    acc[programme.id] = { ...programme, level: level.id }
  })
  return acc
}, {})

/*
 * A programme page lists its people as one flat list — only the staff
 * concerned with that programme, each once. The role becomes the card's
 * designation, the same shape the MBA / MCA profile cards already use.
 */
function membersFromDetails(key) {
  return (programmeDetails[key]?.people ?? []).map(({ name, role, photo }) => ({
    // No slug: these cards carry no Read More link, because there is no
    // profile page to send anyone to yet.
    name,
    photo: photo ?? null,
    designation: role,
    role: null,
  }))
}

/** The faculty to show for one programme tab. */
export function getFacultyForProgramme(programme) {
  if (!programme) return []
  if (programme.profileProgramme) return facultyByProgramme[programme.profileProgramme] ?? []
  return programme.detailsKey ? membersFromDetails(programme.detailsKey) : []
}
