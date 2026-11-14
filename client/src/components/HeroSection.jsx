import React from "react";
import { Search, MapPin, Globe, X } from "lucide-react";
import { JOB_CATEGORIES } from "../data/fallbackJobs";

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
  selectedCategory,
  setSelectedCategory,
  onTriggerLiveSearch,
  totalJobs,
  isLoading,
}) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onTriggerLiveSearch();
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-11 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-medium mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>
              {isLoading
                ? "Fetching live openings..."
                : `${totalJobs} Real-Time & Verified Opportunities Available`}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Discover real-time{" "}
            <span className="text-indigo-400">tech & web</span> roles.
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
            Aggregating live openings across India and global remote teams.
            Filter by compensation, work mode, and track applications end-to-end.
          </p>
        </div>

        {/* Live Search Form */}
        <form
          onSubmit={handleFormSubmit}
          className="mt-7 bg-white p-2 rounded-2xl shadow-xl max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-2"
        >
          <div className="md:col-span-6 flex items-center px-3 py-2.5 rounded-xl bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500">
            <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, company, or skill (e.g. React, Python)"
              className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-4 flex items-center px-3 py-2.5 rounded-xl bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500">
            <MapPin className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Location (e.g. Bengaluru, Worldwide)"
              className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-colors shadow-sm"
          >
            Fetch Live
          </button>
        </form>

        {/* Live API Category Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 mr-1">Live Categories:</span>
          {JOB_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                  active
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white/10 hover:bg-white/20 text-slate-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}