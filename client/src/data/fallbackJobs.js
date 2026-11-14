export const PIPELINE_STAGES = [
  "Submitted",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Offer / Decision",
];

export const JOB_CATEGORIES = [
  { label: "Software Dev", slug: "software-dev" },
  { label: "Design & UI/UX", slug: "design" },
  { label: "Product", slug: "product" },
  { label: "Data & AI", slug: "data" },
  { label: "DevOps & Cloud", slug: "devops" },
];

export const FALLBACK_JOBS = [
  {
    id: "in-razorpay-1",
    source: "Verified Direct",
    title: "Senior Frontend Engineer (React & Performance)",
    company: "Razorpay",
    companyLogo: null,
    logoBg: "bg-blue-600",
    logoText: "R",
    location: "Bengaluru, India",
    workMode: "Hybrid",
    experienceLevel: "Senior (5+ yrs)",
    salaryMin: 28,
    salaryMax: 38,
    salaryDisplay: "₹28 – 38 LPA",
    employmentType: "Full-time",
    postedDaysAgo: 0,
    skills: ["React.js", "TypeScript", "Tailwind CSS", "Web Vitals"],
    htmlDescription: `
      <p>Lead architecture and UI engineering for Razorpay's next-generation merchant checkout and financial dashboard experiences.</p>
      <h4>Key Responsibilities</h4>
      <ul>
        <li>Architect reusable, accessible React component libraries used across 15+ product squads.</li>
        <li>Optimise Core Web Vitals and reduce checkout bundle payload by 30%.</li>
        <li>Mentor engineers through thorough architecture and code reviews.</li>
      </ul>
      <h4>Qualifications</h4>
      <ul>
        <li>5+ years of production experience in React.js and modern JavaScript (ES6+).</li>
        <li>Deep understanding of browser rendering pipelines, state management, and REST/GraphQL APIs.</li>
      </ul>
    `,
    externalUrl: "https://razorpay.com/jobs/",
  },
  {
    id: "in-zerodha-2",
    source: "Verified Direct",
    title: "Full Stack Web Developer",
    company: "Zerodha",
    companyLogo: null,
    logoBg: "bg-sky-600",
    logoText: "Z",
    location: "Bengaluru, India (Remote Eligible)",
    workMode: "Remote",
    experienceLevel: "Mid-Level (2-5 yrs)",
    salaryMin: 18,
    salaryMax: 26,
    salaryDisplay: "₹18 – 26 LPA",
    employmentType: "Full-time",
    postedDaysAgo: 1,
    skills: ["React.js", "Node.js", "PostgreSQL", "HTML/CSS"],
    htmlDescription: `
      <p>Build high-throughput retail investing interfaces and back-office analytics tools serving millions of daily active traders across India.</p>
      <h4>What You Will Do</h4>
      <ul>
        <li>Develop real-time market watchlists and portfolio visualisation modules.</li>
        <li>Design resilient API endpoints and optimise SQL queries for sub-50ms latency.</li>
      </ul>
    `,
    externalUrl: "https://zerodha.com/careers/",
  },
  {
    id: "in-postman-3",
    source: "Verified Direct",
    title: "Frontend Software Engineer – Web Platform",
    company: "Postman",
    companyLogo: null,
    logoBg: "bg-orange-600",
    logoText: "P",
    location: "Bengaluru / Remote",
    workMode: "Remote",
    experienceLevel: "Entry Level (0-2 yrs)",
    salaryMin: 14,
    salaryMax: 20,
    salaryDisplay: "₹14 – 20 LPA",
    employmentType: "Full-time",
    postedDaysAgo: 1,
    skills: ["JavaScript", "React.js", "CSS", "REST APIs"],
    htmlDescription: `
      <p>Join the API Collaboration squad to build intuitive request builders, live documentation viewers, and workspace controls.</p>
      <h4>Requirements</h4>
      <ul>
        <li>Strong fundamentals in HTML5, CSS3, asynchronous JavaScript, and React.js.</li>
        <li>Experience shipping responsive web applications with automated unit tests.</li>
      </ul>
    `,
    externalUrl: "https://www.postman.com/company/careers/",
  },
];