import React, { useState } from "react";
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  Bookmark,
  CheckCircle2,
} from "lucide-react";

export default function JobCard({
  job,
  isSaved,
  isApplied,
  onToggleSave,
  onSelectJob,
  onApplyJob,
}) {
  const [imgError, setImgError] = useState(false);

  const modeBadgeColor = {
    Remote: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Hybrid: "bg-amber-50 text-amber-700 border-amber-200",
    "On-site": "bg-sky-50 text-sky-700 border-sky-200",
  }[job.workMode] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <article className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          {job.companyLogo && !imgError ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              onError={() => setImgError(true)}
              className="w-12 h-12 rounded-xl object-contain border border-slate-200 bg-white p-1 shrink-0"
            />
          ) : (
            <div
              className={`w-12 h-12 rounded-xl ${job.logoBg} text-white font-bold text-lg flex items-center justify-center shrink-0`}
            >
              {job.logoText}
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onSelectJob(job)}
                className="text-left text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors"
              >
                {job.title}
              </button>
              <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                {job.source}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-600 mt-0.5">
              {job.company}
            </p>
          </div>
        </div>

        <button
          onClick={() => onToggleSave(job.id)}
          aria-label="Save job"
          className={`p-2 rounded-lg border transition-colors shrink-0 ${
            isSaved
              ? "bg-indigo-50 border-indigo-200 text-indigo-600"
              : "bg-white border-slate-200 text-slate-400 hover:text-slate-700"
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Metadata Row */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
        <span
          className={`px-2.5 py-0.5 rounded-full border font-medium ${modeBadgeColor}`}
        >
          {job.workMode}
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5 text-slate-400" />
          {job.experienceLevel}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
          <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
          {job.salaryDisplay}
        </span>
      </div>

      {/* Skill Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.skills.map((skill, idx) => (
          <span
            key={`${job.id}-skill-${idx}`}
            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Card Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          {job.postedDaysAgo === 0 ? "Posted today" : `Posted ${job.postedDaysAgo}d ago`}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectJob(job)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            View Details
          </button>

          {isApplied ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Applied
            </span>
          ) : (
            <button
              onClick={() => onApplyJob(job)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Quick Apply
            </button>
          )}
        </div>
      </div>
    </article>
  );
}