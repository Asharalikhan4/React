import React from 'react';
import { Outlet, NavLink } from 'react-router';
import { FaReact, FaGithub } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Website Footer with Description and Navigation */}
      <footer className="mt-16 border-t border-slate-200/80 bg-white py-8 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <FaReact size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">React Architecture &amp; Machine Coding Lab</p>
              <p className="text-xs text-slate-500">
                Interactive machine coding challenges, system design blueprints, and React architecture guides.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 shrink-0">
            <NavLink to="/" className="hover:text-blue-600 transition-colors">
              Dashboard
            </NavLink>
            <span className="text-slate-300">•</span>
            <a
              href="https://github.com/Asharalikhan4/React"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors"
            >
              <FaGithub size={14} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
