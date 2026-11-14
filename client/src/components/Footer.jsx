import React from "react";
import { Briefcase } from "lucide-react";

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <span>HireGrid</span>
          </div>
          <p className="mt-3 text-sm text-slate-400 max-w-md">
            Real-time job aggregation powered by live public job APIs alongside
            curated Indian tech opportunities.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => setActiveTab("browse")}
                className="hover:text-white transition-colors"
              >
                Browse Live Jobs
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("saved")}
                className="hover:text-white transition-colors"
              >
                Saved Jobs
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("applications")}
                className="hover:text-white transition-colors"
              >
                Application Tracker
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Live Feeds</h4>
          <ul className="space-y-2 text-sm">
            <li>Remotive Public Jobs API</li>
            <li>Arbeitnow Job Board API</li>
            <li>Verified India Tech Direct</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} HireGrid Job Portal. Built with React & Tailwind CSS.
      </div>
    </footer>
  );
}