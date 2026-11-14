import { FALLBACK_JOBS } from "../data/fallbackJobs";

const REMOTIVE_ENDPOINT = "https://remotive.com/api/remote-jobs";
const ARBEITNOW_ENDPOINT = "https://www.arbeitnow.com/api/job-board-api";

const LOGO_COLORS = [
  "bg-indigo-600",
  "bg-blue-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-violet-600",
  "bg-sky-600",
];

function inferExperience(title = "") {
  const t = title.toLowerCase();
  if (t.includes("intern") || t.includes("junior") || t.includes("entry") || t.includes("graduate")) {
    return "Entry Level (0-2 yrs)";
  }
  if (t.includes("senior") || t.includes("staff") || t.includes("lead") || t.includes("principal") || t.includes("architect")) {
    return "Senior (5+ yrs)";
  }
  return "Mid-Level (2-5 yrs)";
}

function estimateSalaryLPA(title = "", rawSalary = "") {
  if (rawSalary && rawSalary.trim().length > 0) {
    const nums = rawSalary.match(/\d+/g);
    if (nums && nums.length >= 1) {
      let val = parseInt(nums[0], 10);
      if (val > 1000) val = Math.round((val * 0.84) / 100000); // Convert USD to approx INR LPA
      if (val >= 4 && val <= 90) {
        return { min: val, max: Math.round(val * 1.3), display: rawSalary };
      }
    }
  }
  const exp = inferExperience(title);
  if (exp.startsWith("Entry")) return { min: 8, max: 14, display: "₹8 – 14 LPA (Est.)" };
  if (exp.startsWith("Senior")) return { min: 26, max: 42, display: "₹26 – 42 LPA (Est.)" };
  return { min: 15, max: 24, display: "₹15 – 24 LPA (Est.)" };
}

function daysSince(dateInput) {
  if (!dateInput) return 1;
  const timestamp = typeof dateInput === "number" ? dateInput * 1000 : Date.parse(dateInput);
  if (Number.isNaN(timestamp)) return 2;
  const diff = Math.max(0, Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24)));
  return diff === 0 ? 0 : diff;
}

function normalizeRemotiveJob(item, idx) {
  const sal = estimateSalaryLPA(item.title, item.salary);
  return {
    id: `remotive-${item.id}`,
    source: "Remotive Live",
    title: item.title,
    company: item.company_name,
    companyLogo: item.company_logo || null,
    logoBg: LOGO_COLORS[idx % LOGO_COLORS.length],
    logoText: (item.company_name || "R").charAt(0).toUpperCase(),
    location: item.candidate_required_location || "Worldwide / Remote",
    workMode: "Remote",
    experienceLevel: inferExperience(item.title),
    salaryMin: sal.min,
    salaryMax: sal.max,
    salaryDisplay: sal.display,
    employmentType: item.job_type === "contract" ? "Contract" : item.job_type === "internship" ? "Internship" : "Full-time",
    postedDaysAgo: daysSince(item.publication_date),
    skills: (item.tags && item.tags.length > 0 ? item.tags : ["Web Development", "Remote"]).slice(0, 5),
    htmlDescription: item.description || "",
    externalUrl: item.url,
  };
}

function normalizeArbeitnowJob(item, idx) {
  const sal = estimateSalaryLPA(item.title, "");
  return {
    id: `arbeitnow-${item.slug}`,
    source: "Arbeitnow Live",
    title: item.title,
    company: item.company_name,
    companyLogo: null,
    logoBg: LOGO_COLORS[(idx + 3) % LOGO_COLORS.length],
    logoText: (item.company_name || "A").charAt(0).toUpperCase(),
    location: item.location || "Europe / Remote",
    workMode: item.remote ? "Remote" : "On-site",
    experienceLevel: inferExperience(item.title),
    salaryMin: sal.min,
    salaryMax: sal.max,
    salaryDisplay: sal.display,
    employmentType:
      item.job_types && item.job_types.some((t) => t.toLowerCase().includes("intern"))
        ? "Internship"
        : "Full-time",
    postedDaysAgo: daysSince(item.created_at),
    skills: (item.tags && item.tags.length > 0 ? item.tags : ["Software Engineering"]).slice(0, 5),
    htmlDescription: item.description || "",
    externalUrl: item.url,
  };
}

export async function fetchLiveJobs({ search = "", category = "software-dev" } = {}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (search.trim()) params.set("search", search.trim());
  params.set("limit", "25");

  const results = await Promise.allSettled([
    fetch(`${REMOTIVE_ENDPOINT}?${params.toString()}`).then((res) => {
      if (!res.ok) throw new Error("Remotive fetch failed");
      return res.json();
    }),
    fetch(ARBEITNOW_ENDPOINT).then((res) => {
      if (!res.ok) throw new Error("Arbeitnow fetch failed");
      return res.json();
    }),
  ]);

  let combined = [];

  if (results[0].status === "fulfilled" && Array.isArray(results[0].value?.jobs)) {
    combined.push(...results[0].value.jobs.map(normalizeRemotiveJob));
  }

  if (results[1].status === "fulfilled" && Array.isArray(results[1].value?.data)) {
    const arbeitJobs = results[1].value.data.slice(0, 20).map(normalizeArbeitnowJob);
    combined.push(...arbeitJobs);
  }

  if (combined.length === 0) {
    return { jobs: FALLBACK_JOBS, isLive: false };
  }

  // Merge Indian curated roles at the top alongside real-time global/remote roles
  return {
    jobs: [...FALLBACK_JOBS.slice(0, 3), ...combined],
    isLive: true,
  };
}