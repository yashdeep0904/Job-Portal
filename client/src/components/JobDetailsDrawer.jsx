import React, { useMemo } from "react";
import {
  X,
  MapPin,
  Briefcase,
  IndianRupee,
  CheckCircle2,
  Bookmark,
  ExternalLink,
} from "lucide-react";

function sanitizeHtml(htmlString) {
  if (!htmlString) return "<p>No additional description provided.</p>";
  return htmlString
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "");
}

export default function JobDetailsDrawer({
  job,
  onClose,
  isSaved,
  isApplied,
  onToggleSave,
  onApplyJob,
}) {
  const safeHtml = useMemo(
    () => (job ? sanitizeHtml(job.htmlDescription) : ""),
    [job]
  );

  if (!job) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl ${job.logoBg} text-white font-bold text-xl flex items-center justify-center shrink-0`}
              >
                {job.logoText}
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                  {job.source}
                </span>
                <h2 className="text-xl font-bold text-slate-900">{job.title}</h2>
                <p className="text-sm font-medium text-slate-600">
                  {job.company} · {job.employmentType}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 block">Compensation</span>
              <span className="text-sm font-bold text-slate-900 inline-flex items-center gap-1 mt-0.5">
                <IndianRupee className="w-3.5 h-3.5 text-indigo-600" />
                {job.salaryDisplay}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 block">Experience</span>
              <span className="text-sm font-bold text-slate-900 inline-flex items-center gap-1 mt-0.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                {job.experienceLevel}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 block">Location</span>
              <span className="text-sm font-bold text-slate-900 inline-flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                {job.workMode} ({job.location.split(",")[0]})
              </span>
            </div>
          </div>

          {/* Live HTML Job Description */}
          <div
            className="prose prose-sm max-w-none text-slate-700 space-y-3 [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-slate-900 [&_h4]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </div>

        {/* Sticky Drawer Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(job.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isSaved ? "fill-indigo-600 text-indigo-600" : ""
                }`}
              />
              {isSaved ? "Saved" : "Save"}
            </button>

            {job.externalUrl && (
              <a
                href={job.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <span>Original Post</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {isApplied ? (
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Application Submitted
            </span>
          ) : (
            <button
              onClick={() => onApplyJob(job)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm"
            >
              Quick Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}