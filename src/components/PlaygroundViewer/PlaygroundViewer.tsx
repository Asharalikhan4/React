import React, { useState } from 'react';
import GitHubButton from '../Common/GitHubButton';
import { NavLink } from 'react-router';
import { FaArrowLeft, FaPlay, FaRedo, FaCode } from 'react-icons/fa';

interface PlaygroundViewerProps {
  title: string;
  description: string;
  githubPath: string;
  category?: string;
  companyTag?: string;
  children: React.ReactNode;
}

const PlaygroundViewer: React.FC<PlaygroundViewerProps> = ({
  title,
  description,
  githubPath,
  category,
  companyTag,
  children,
}) => {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-5xl mx-auto py-4">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <NavLink
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
        >
          <FaArrowLeft size={13} />
          Back to Dashboard
        </NavLink>
        <div className="flex items-center gap-2">
          {category && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {category}
            </span>
          )}
          {companyTag && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              {companyTag}
            </span>
          )}
        </div>
      </div>

      {/* Header Info Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 mb-1.5">
              <FaPlay size={10} />
              <span>Interactive Machine Coding Playground</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
            <p className="text-slate-600 mt-1.5 text-sm max-w-2xl">{description}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Reset component state"
            >
              <FaRedo size={12} />
              Reset
            </button>
            <GitHubButton path={githubPath} />
          </div>
        </div>
      </div>

      {/* Component Sandbox Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="ml-2 font-mono text-slate-600">Component Live Preview</span>
          </div>
          <a
            href={`https://github.com/Asharalikhan4/React/tree/main/${githubPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
          >
            <FaCode size={12} />
            <span>View Source File</span>
          </a>
        </div>
        <div key={resetKey} className="p-6 sm:p-8 min-h-[420px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PlaygroundViewer;
