HireGrid — Real-Time Tech Job Portal & Application TrackerHireGrid is a modern, responsive React + Tailwind CSS job portal application built for discovering, filtering, saving, and applying to web engineering and tech opportunities in real time. It aggregates live postings from public job APIs alongside curated Indian tech openings and provides an interactive 5-stage application pipeline tracker.

✨ Key FeaturesReal-Time Job Feed Aggregation (jobApiService.js)Concurrently fetches live openings from the Remotive Public Jobs API and Arbeitnow Job Board API (zero API keys required).Normalizes heterogeneous API responses into a unified schema (inferring experience tiers, estimating annual compensation in ₹ LPA, and resolving company logos).Includes automatic fallback to curated Indian tech listings (Razorpay, Zerodha, Postman) if offline or rate-limited.Faceted Search & Multi-Criteria Filtering (FilterSidebar.jsx)Real-time keyword search across job titles, companies, and technical skills, paired with location filtering and live API category tabs (Software Dev, Design & UI/UX, Product, Data & AI, DevOps & Cloud).Interactive facets for Work Mode (All, Remote, Hybrid, On-site with live counts), Minimum Compensation (₹ LPA slider), Experience Level, Employment Type, and Feed Source.Sort results by Newest First or Highest Salary (LPA) with paginated Load More controls.Job Details Slide-Over Drawer (JobDetailsDrawer.jsx)Renders sanitized HTML job descriptions, compensation/experience highlights, bookmark toggles, and direct links to original external ATS postings.Quick Apply Modal with Profile Auto-Fill (ApplyModal.jsx)Validates required fields (Full Name, Email, and .pdf/.docx resume attachment).Automatically persists candidate contact details (fullName, email, phone, experienceYears, portfolioUrl) in localStorage for one-click auto-fill on subsequent applications.Persistent 5-Stage Application Status Tracker (ApplicationsTracker.jsx)Tracks submitted applications across Submitted → Under Review → Shortlisted → Interview Scheduled → Offer / Decision.Includes stage progression simulation, resume attachment badges, application withdrawal, and localStorage persistence across browser reloads.🗂️ Project Structurehiregrid/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx                         # Root state, filtering, persistence & layout
    ├── index.css                       # Tailwind CSS entry
    ├── services/
    │   └── jobApiService.js            # Live Remotive & Arbeitnow API integration
    ├── data/
    │   └── fallbackJobs.js             # Pipeline stages, categories & fallback listings
    └── components/
        ├── Navbar.jsx                  # Top navigation bar + live API sync indicator
        ├── HeroSection.jsx             # Live search form & category quick-filters
        ├── FilterSidebar.jsx           # Faceted search filter controls
        ├── JobCard.jsx                 # Job listing card with bookmark & quick-apply
        ├── JobDetailsDrawer.jsx        # Slide-over full job description drawer
        ├── ApplyModal.jsx              # Validated resume submission modal
        ├── ApplicationsTracker.jsx     # 5-stage application status tracker
        └── Footer.jsx                  # Portal navigation & feed attribution
🛠️ Tech StackFramework: React 18 (Hooks, useMemo, useCallback)Build Tool: Vite 6Styling: Tailwind CSS v4Icons: Lucide ReactData Persistence: Browser localStorage (hiregrid_saved_jobs, hiregrid_applications, hiregrid_candidate_profile)🚀 Getting StartedPrerequisitesNode.js v18.0.0 or highernpm v9.0.0 or higherInstallation & Local DevelopmentExtract or clone the project directory:cd hiregrid
Install dependencies:npm install
Start the development server:npm run dev
Open in your browser:
Visit the local URL printed in your terminal (typically http://localhost:5173).Production BuildTo generate an optimized production bundle:npm run build
npm run preview
🔌 External APIs UsedAPIEndpointPurposeAuth RequiredRemotive APIhttps://remotive.com/api/remote-jobsLive remote software, design, product & data rolesNoneArbeitnow APIhttps://www.arbeitnow.com/api/job-board-apiLive global & European tech job board listingsNone📄 LicenseThis project is open-source and available under the MIT License.