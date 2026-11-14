import React, { useState, useEffect, useMemo, useCallback } from "react";
import { fetchLiveJobs } from "./services/jobApiService";
import { FALLBACK_JOBS } from "./data/fallbackJobs";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FilterSidebar from "./components/FilterSidebar";
import JobCard from "./components/JobCard";
import JobDetailsDrawer from "./components/JobDetailsDrawer";
import ApplyModal from "./components/ApplyModal";
import ApplicationsTracker from "./components/ApplicationsTracker";
import Footer from "./components/Footer";
import { CheckCircle2 } from "lucide-react";

const DEFAULT_FILTERS = {
  workMode: "All",
  minSalary: 0,
  experienceLevels: [],
  employmentTypes: [],
  source: "All",
};

const PAGE_SIZE = 8;

export default function App() {
  const [activeTab, setActiveTab] = useState("browse");
  const [jobs, setJobs] = useState(FALLBACK_JOBS);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("software-dev");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Persistent Saved Jobs
  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("hiregrid_saved_jobs") || "[]");
    } catch {
      return [];
    }
  });

  // Persistent Applications
  const [applications, setApplications] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("hiregrid_applications") || "[]");
    } catch {
      return [];
    }
  });

  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3200);
  };

  useEffect(() => {
    localStorage.setItem("hiregrid_saved_jobs", JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem("hiregrid_applications", JSON.stringify(applications));
  }, [applications]);

  const loadJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const { jobs: fetchedJobs, isLive: liveStatus } = await fetchLiveJobs({
        search: searchQuery,
        category: selectedCategory,
      });
      setJobs(fetchedJobs);
      setIsLive(liveStatus);
      setVisibleCount(PAGE_SIZE);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    loadJobs();
  }, [selectedCategory]); // Auto-fetch when category changes

  const workModeCounts = useMemo(() => {
    return jobs.reduce(
      (acc, job) => {
        acc.All += 1;
        acc[job.workMode] = (acc[job.workMode] || 0) + 1;
        return acc;
      },
      { All: 0, Remote: 0, Hybrid: 0, "On-site": 0 }
    );
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const baseList =
      activeTab === "saved"
        ? jobs.filter((job) => savedJobIds.includes(job.id))
        : jobs;

    return baseList
      .filter((job) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.skills.some((s) => s.toLowerCase().includes(q));

        const loc = locationQuery.toLowerCase().trim();
        const matchesLocation =
          !loc ||
          job.location.toLowerCase().includes(loc) ||
          job.workMode.toLowerCase().includes(loc);

        const matchesMode =
          filters.workMode === "All" || job.workMode === filters.workMode;

        const matchesSalary = job.salaryMax >= filters.minSalary;

        const matchesExp =
          filters.experienceLevels.length === 0 ||
          filters.experienceLevels.includes(job.experienceLevel);

        const matchesType =
          filters.employmentTypes.length === 0 ||
          filters.employmentTypes.includes(job.employmentType);

        const matchesSource =
          filters.source === "All" || job.source === filters.source;

        return (
          matchesQuery &&
          matchesLocation &&
          matchesMode &&
          matchesSalary &&
          matchesExp &&
          matchesType &&
          matchesSource
        );
      })
      .sort((a, b) => {
        if (sortBy === "salary") return b.salaryMax - a.salaryMax;
        return a.postedDaysAgo - b.postedDaysAgo;
      });
  }, [jobs, activeTab, savedJobIds, searchQuery, locationQuery, filters, sortBy]);

  const toggleSaveJob = (jobId) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      showToast(exists ? "Removed from Saved Jobs" : "Job saved to bookmarks");
      return exists ? prev.filter((id) => id !== jobId) : [...prev, jobId];
    });
  };

  const handleSubmitApplication = (job, applicantData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      job,
      applicant: applicantData,
      appliedDate: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      stageIndex: 0,
    };
    setApplications((prev) => [newApp, ...prev]);
    setSelectedJob(null);
    setActiveTab("applications");
    showToast(`Application submitted to ${job.company}!`);
  };

  const handleAdvanceStage = (appId) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, stageIndex: Math.min(app.stageIndex + 1, 4) }
          : app
      )
    );
  };

  const handleWithdrawApplication = (appId) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
    showToast("Application withdrawn");
  };

  const appliedJobIds = useMemo(
    () => new Set(applications.map((a) => a.job.id)),
    [applications]
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedJobIds.length}
        applicationsCount={applications.length}
        isLive={isLive}
        isLoading={isLoading}
        onRefreshJobs={loadJobs}
      />

      {activeTab === "browse" && (
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onTriggerLiveSearch={loadJobs}
          totalJobs={jobs.length}
          isLoading={isLoading}
        />
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "applications" ? (
          <ApplicationsTracker
            applications={applications}
            onAdvanceStage={handleAdvanceStage}
            onWithdrawApplication={handleWithdrawApplication}
            onBrowseClick={() => setActiveTab("browse")}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 xl:col-span-3">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                onResetFilters={() => {
                  setFilters(DEFAULT_FILTERS);
                  setSearchQuery("");
                  setLocationQuery("");
                }}
                workModeCounts={workModeCounts}
              />
            </div>

            <div className="lg:col-span-8 xl:col-span-9 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 rounded-xl border border-slate-200">
                <p className="text-sm text-slate-600">
                  Showing{" "}
                  <span className="font-bold text-slate-900">
                    {Math.min(visibleCount, filteredJobs.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-900">
                    {filteredJobs.length}
                  </span>{" "}
                  {activeTab === "saved" ? "saved" : "matching"} roles
                </p>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="salary">Sort: Highest Salary (LPA)</option>
                </select>
              </div>

              {/* Skeleton Loaders while fetching live jobs */}
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-200" />
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-slate-200 rounded w-1/2" />
                          <div className="h-3 bg-slate-100 rounded w-1/4" />
                        </div>
                      </div>
                      <div className="h-3 bg-slate-100 rounded w-3/4" />
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-slate-100 rounded" />
                        <div className="h-6 w-16 bg-slate-100 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                  <p className="font-semibold text-slate-800">
                    No matching live roles found.
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Try resetting your filters or switching to another live category.
                  </p>
                </div>
              ) : (
                <>
                  {filteredJobs.slice(0, visibleCount).map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isSaved={savedJobIds.includes(job.id)}
                      isApplied={appliedJobIds.has(job.id)}
                      onToggleSave={toggleSaveJob}
                      onSelectJob={setSelectedJob}
                      onApplyJob={setApplyingJob}
                    />
                  ))}

                  {visibleCount < filteredJobs.length && (
                    <div className="pt-2 text-center">
                      <button
                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        className="px-6 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold text-slate-700 shadow-xs"
                      >
                        Load More Opportunities ({filteredJobs.length - visibleCount} remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />

      <JobDetailsDrawer
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
        isApplied={selectedJob ? appliedJobIds.has(selectedJob.id) : false}
        onToggleSave={toggleSaveJob}
        onApplyJob={(job) => setApplyingJob(job)}
      />

      <ApplyModal
        job={applyingJob}
        onClose={() => setApplyingJob(null)}
        onSubmitApplication={handleSubmitApplication}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}