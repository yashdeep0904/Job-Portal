import React from "react";
import { PIPELINE_STAGES } from "../data/fallbackJobs";
import { Check, ArrowRight, FileText, Briefcase, Trash2 } from "lucide-react";

export default function ApplicationsTracker({
  applications,
  onAdvanceStage,
  onWithdrawApplication,
  onBrowseClick,
}) {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          No Active Applications
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Submit your resume to any live role and track every stage of your
          hiring pipeline here.
        </p>
        <button
          onClick={onBrowseClick}
          className="mt-5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold"
        >
          Browse Live Openings
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Application Status Tracker ({applications.length})
        </h2>
        <p className="text-sm text-slate-500">
          Your applications are saved locally and persist across browser reloads.
        </p>
      </div>

      {applications.map((app) => (
        <div
          key={app.id}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {app.job.title}
              </h3>
              <p className="text-sm text-slate-600">
                {app.job.company} · Applied on {app.appliedDate}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span>Resume: {app.applicant.resumeFileName}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {app.stageIndex < PIPELINE_STAGES.length - 1 && (
                <button
                  onClick={() => onAdvanceStage(app.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                >
                  <span>Advance Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => onWithdrawApplication(app.id)}
                title="Withdraw application"
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5-Stage Progress Stepper */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-5 gap-3">
            {PIPELINE_STAGES.map((stage, idx) => {
              const isCompleted = idx <= app.stageIndex;
              const isCurrent = idx === app.stageIndex;
              return (
                <div
                  key={stage}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isCurrent
                      ? "border-indigo-600 bg-indigo-50/70 font-bold text-indigo-900"
                      : isCompleted
                      ? "border-emerald-200 bg-emerald-50/60 text-emerald-800 font-medium"
                      : "border-slate-200 bg-slate-50 text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>Stage {idx + 1}</span>
                    {isCompleted && (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </div>
                  <p>{stage}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}