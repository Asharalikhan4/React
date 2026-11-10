import React, { useEffect, useState, useRef, useMemo } from 'react';
import { marked } from 'marked';
import GitHubButton from '../Common/GitHubButton';
import { NavLink } from 'react-router';
import {
  FaArrowLeft,
  FaBookOpen,
  FaListUl,
  FaClock,
} from 'react-icons/fa';

interface ArticleViewerProps {
  title: string;
  category: string;
  content: string;
  githubPath: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const ArticleViewer: React.FC<ArticleViewerProps> = ({
  title,
  category,
  content,
  githubPath,
}) => {
  const [html, setHtml] = useState('');
  const [activeSection, setActiveSection] = useState<string>('');
  const activeSectionRef = useRef<string>('');
  const progressBarRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  // 1. Extract Headings for Table of Contents
  const tocItems: TocItem[] = useMemo(() => {
    const items: TocItem[] = [];
    const lines = content.split('\n');

    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim().replace(/\*+/g, '').replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');

        if (text && id) {
          items.push({ id, text, level });
        }
      }
    });

    return items;
  }, [content]);

  // 2. Parse Markdown with Heading Anchor IDs (pure block layout, no flex interference)
  useEffect(() => {
    const renderer = new marked.Renderer();

    renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
      const cleanText = text.replace(/<[^>]*>/g, '').replace(/\*+/g, '');
      const id = cleanText
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      return `<h${depth} id="${id}" class="scroll-mt-24 group relative">
        <a href="#${id}" class="heading-anchor text-slate-900 hover:text-blue-600 no-underline">${text}</a>
        <span class="opacity-0 group-hover:opacity-100 text-blue-500 text-sm ml-2 font-normal select-none">#</span>
      </h${depth}>`;
    };

    marked.setOptions({
      renderer,
      gfm: true,
      breaks: true,
    });

    setHtml(marked.parse(content) as string);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [content]);

  // 3. Inject Copy Buttons into Code Blocks (cleanly styled without layout thrashing)
  useEffect(() => {
    if (!contentContainerRef.current) return;

    const preBlocks = contentContainerRef.current.querySelectorAll('pre');
    preBlocks.forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return;

      const button = document.createElement('button');
      button.className =
        'copy-btn absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm border border-slate-700 select-none';
      button.innerHTML = `<span>Copy</span>`;

      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const codeText = pre.querySelector('code')?.innerText || pre.innerText;
        navigator.clipboard.writeText(codeText).then(() => {
          button.innerHTML = `<span>Copied!</span>`;
          button.classList.add('text-emerald-400');
          setTimeout(() => {
            button.innerHTML = `<span>Copy</span>`;
            button.classList.remove('text-emerald-400');
          }, 2000);
        });
      });

      pre.style.position = 'relative';
      pre.appendChild(button);
    });
  }, [html]);

  // 4. Butter-Smooth Scroll Tracking (rAF-throttled, Zero React Re-renders for Progress Bar)
  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;

        // 1. Direct DOM update for progress bar (No React state re-render!)
        const docEl = document.documentElement;
        const totalScroll = docEl.scrollHeight - window.innerHeight;
        const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${Math.min(100, Math.max(0, currentProgress))}%`;
        }

        // 2. Efficient active section detection
        if (tocItems.length === 0) return;

        const scrollPosition = window.scrollY + 140;
        let currentActiveId = '';

        for (let i = 0; i < tocItems.length; i++) {
          const el = document.getElementById(tocItems[i].id);
          if (el) {
            const top = el.offsetTop;
            if (top <= scrollPosition) {
              currentActiveId = tocItems[i].id;
            } else {
              break;
            }
          }
        }

        // Only trigger state update if the section actually changed
        if (currentActiveId && currentActiveId !== activeSectionRef.current) {
          activeSectionRef.current = currentActiveId;
          setActiveSection(currentActiveId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [tocItems]);

  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="relative">
      {/* Top Reading Progress Bar (Hardware-accelerated, zero animation lag) */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 z-50 pointer-events-none"
        style={{ width: '0%', transform: 'translateZ(0)' }}
      />

      <div className="max-w-7xl mx-auto py-4">
        {/* Top Breadcrumb & Tag */}
        <div className="flex items-center justify-between mb-6">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <FaArrowLeft size={13} />
            <span>Dashboard</span>
          </NavLink>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {category}
          </span>
        </div>

        {/* Article Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
                <span className="inline-flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  <FaBookOpen size={11} />
                  Written Guide
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <FaClock size={11} />
                  {readTime} min read
                </span>
                <span>•</span>
                <span>{wordCount} words</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {title}
              </h1>
            </div>
            <div className="flex-shrink-0">
              <GitHubButton path={githubPath} />
            </div>
          </div>
        </div>

        {/* Article Body Grid (Content + Right Sticky TOC) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article Content Container */}
          <main className="lg:col-span-8 xl:col-span-9 bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm overflow-hidden">
            <div
              ref={contentContainerRef}
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* Bottom GitHub Contributor Callout */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Suggest an edit or view the raw source
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  This educational article is open source and tracked on GitHub.
                </p>
              </div>
              <GitHubButton path={githubPath} />
            </div>
          </main>

          {/* Right Sticky Table of Contents (Outline) */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100">
                  <FaListUl className="text-blue-600" />
                  <span>On This Page</span>
                </div>
                <nav className="space-y-1 text-xs">
                  {tocItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={`${item.id}-${index}`}
                        href={`#${item.id}`}
                        style={{ paddingLeft: item.level === 3 ? '1rem' : '0.5rem' }}
                        className={`block py-1.5 pr-2 rounded-lg leading-snug border-l-2 transition-colors ${
                          isActive
                            ? 'text-blue-600 font-bold bg-blue-50/80 border-blue-600'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent'
                        }`}
                      >
                        {item.text}
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleViewer;
