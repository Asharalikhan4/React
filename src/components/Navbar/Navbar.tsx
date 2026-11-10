import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FaBars, FaTimes, FaGithub, FaReact, FaBookOpen, FaPlay, FaLayerGroup } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <FaReact className="animate-spin-slow" size={20} />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight block">
                React Lab
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block -mt-1">
                Architecture & Machine Coding
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-600">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg transition-colors ${
                  isActive ? 'text-blue-600 bg-blue-50/70' : 'hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Dashboard
            </NavLink>
            <a
              href="https://github.com/Asharalikhan4/React"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              <FaGithub size={15} />
              <span>GitHub</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Dashboard
          </NavLink>
          <a
            href="https://github.com/Asharalikhan4/React"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <FaGithub size={16} />
            <span>View on GitHub</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
