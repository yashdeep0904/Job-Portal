import React from "react";
import { Briefcase, Bookmark, ClipboardCheck, RefreshCw, Radio } from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  savedCount,
  applicationsCount,
  isLive,
  isLoading,
  onRefreshJobs,
}) {
  const navItems = [
    { id: "browse", label: "Browse Jobs", icon: Briefcase, count: null },
    { id: "saved", label: "Saved Jobs", icon: Bookmark, count: savedCount },
    {
      id: "applications",
      label: "My Applications",
      icon: ClipboardCheck,
      count: applicationsCount,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Live Feed Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("browse")}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Hire<span className="text-indigo-600">Grid</span>
            </span>
          </button>

          <button
            onClick={onRefreshJobs}
            disabled={isLoading}
            title="Sync real-time job listings"
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
              isLive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            <Radio className={`w-3 h-3 ${isLive ? "animate-pulse" : ""}`} />
            <span>{isLive ? "Live API Synced" : "Cached Mode"}</span>
            <RefreshCw className={`w-3 h-3 ml-0.5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map(({ id, label, icon: Icon, count }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{label}</span>
                {count !== null && count > 0 && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}