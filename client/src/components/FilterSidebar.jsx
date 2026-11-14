import React from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

const WORK_MODES = ["All", "Remote", "Hybrid", "On-site"];
const EXPERIENCE_LEVELS = [
  "Entry Level (0-2 yrs)",
  "Mid-Level (2-5 yrs)",
  "Senior (5+ yrs)",
];
const EMPLOYMENT_TYPES = ["Full-time", "Internship", "Contract"];
const FEED_SOURCES = ["All", "Verified Direct", "Remotive Live", "Arbeitnow Live"];

export default function FilterSidebar({
  filters,
  setFilters,
  onResetFilters,
  workModeCounts,
}) {
  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((item) => item !== value)
          : [...prev[key], value],
      };
    });
  };

  return (
    <aside className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <span>Faceted Filters</span>
        </div>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Work Mode */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Work Mode
        </h3>
        <div className="space-y-2">
          {WORK_MODES.map((mode) => (
            <label
              key={mode}
              className="flex items-center justify-between text-sm text-slate-700 cursor-pointer hover:text-slate-900"
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="workMode"
                  checked={filters.workMode === mode}
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, workMode: mode }))
                  }
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                {mode}
              </span>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {workModeCounts[mode] ?? 0}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Salary */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Min. Compensation
          </h3>
          <span className="text-xs font-bold text-indigo-600">
            ₹{filters.minSalary} LPA+
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="35"
          step="2"
          value={filters.minSalary}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              minSalary: Number(e.target.value),
            }))
          }
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>₹0 LPA</span>
          <span>₹18 LPA</span>
          <span>₹35+ LPA</span>
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Experience Level
        </h3>
        <div className="space-y-2">
          {EXPERIENCE_LEVELS.map((level) => (
            <label
              key={level}
              className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.experienceLevels.includes(level)}
                onChange={() => toggleArrayFilter("experienceLevels", level)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Employment Type */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Employment Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {EMPLOYMENT_TYPES.map((type) => {
            const selected = filters.employmentTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleArrayFilter("employmentTypes", type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  selected
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Listing Source */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Job Feed Source
        </h3>
        <select
          value={filters.source}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, source: e.target.value }))
          }
          className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {FEED_SOURCES.map((src) => (
            <option key={src} value={src}>
              {src}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}