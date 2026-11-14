import React, { useState } from "react";
import { X, UploadCloud, FileText, AlertCircle } from "lucide-react";

const PROFILE_STORAGE_KEY = "hiregrid_candidate_profile";

export default function ApplyModal({ job, onClose, onSubmitApplication }) {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || "{}");
      return {
        fullName: saved.fullName || "",
        email: saved.email || "",
        phone: saved.phone || "",
        experienceYears: saved.experienceYears || "2-4 years",
        portfolioUrl: saved.portfolioUrl || "",
        coverNote: "",
        resumeFileName: "",
      };
    } catch {
      return {
        fullName: "",
        email: "",
        phone: "",
        experienceYears: "2-4 years",
        portfolioUrl: "",
        coverNote: "",
        resumeFileName: "",
      };
    }
  });
  const [error, setError] = useState("");

  if (!job) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resumeFileName: file.name }));
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setError("Please enter your full name and email address.");
      return;
    }
    if (!formData.resumeFileName) {
      setError("Please attach your resume (PDF or DOCX).");
      return;
    }

    localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        experienceYears: formData.experienceYears,
        portfolioUrl: formData.portfolioUrl,
      })
    );

    onSubmitApplication(job, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Quick Application
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {job.title}
            </h2>
            <p className="text-xs text-slate-500">
              {job.company} · {job.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="Aarav Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="aarav@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Total Experience
              </label>
              <select
                value={formData.experienceYears}
                onChange={(e) =>
                  setFormData({ ...formData, experienceYears: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Fresher (0-1 year)</option>
                <option>2-4 years</option>
                <option>5-8 years</option>
                <option>8+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                GitHub / Portfolio URL
              </label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) =>
                  setFormData({ ...formData, portfolioUrl: e.target.value })
                }
                placeholder="https://github.com/username"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Resume / CV (PDF, DOCX) *
            </label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-xl p-4 cursor-pointer bg-slate-50 transition-colors">
              {formData.resumeFileName ? (
                <div className="flex items-center gap-2 text-indigo-700 text-sm font-medium">
                  <FileText className="w-5 h-5" />
                  <span>{formData.resumeFileName}</span>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs font-medium text-slate-700">
                    Click to attach your resume
                  </span>
                  <span className="text-[11px] text-slate-400">
                    PDF or DOCX up to 5 MB
                  </span>
                </>
              )}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cover Note
            </label>
            <textarea
              rows={3}
              value={formData.coverNote}
              onChange={(e) =>
                setFormData({ ...formData, coverNote: e.target.value })
              }
              placeholder="Highlight relevant projects, tech stack, or notice period..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}