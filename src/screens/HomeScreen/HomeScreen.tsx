import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router';
import { topics, ContentType, CategoryKey } from '../../data/topics';
import { usePageSEO } from '../../customHooks/usePageSEO';
import {
  FaSearch,
  FaBookOpen,
  FaPlay,
  FaGithub,
  FaLayerGroup,
  FaCode,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaTimes,
} from 'react-icons/fa';

const HomeScreen: React.FC = () => {
  usePageSEO({
    title: 'React Lab - Architecture & Machine Coding Masterclass',
    description:
      'A comprehensive educational platform featuring 60+ interactive React machine coding challenges, frontend system design blueprints, rendering patterns, and performance optimization guides.',
    keywords: [
      'React',
      'Machine Coding',
      'System Design',
      'Frontend Architecture',
      'React Hooks',
      'Polyfills',
      'Performance Optimization',
      'Interview Questions',
    ],
    canonicalPath: '/',
    type: 'website',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | ContentType | 'interview'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Compute category list with counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    topics.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  // Filter topics based on active filters
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      // Type filter
      if (selectedType === 'interview') {
        if (!t.companyTag && t.category !== 'Interview Questions') return false;
      } else if (selectedType !== 'all') {
        if (t.type !== selectedType) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(query);
        const matchesDesc = t.description.toLowerCase().includes(query);
        const matchesCategory = t.category.toLowerCase().includes(query);
        const matchesCompany = t.companyTag?.toLowerCase().includes(query);
        const matchesTags = t.tags?.some((tag) => tag.toLowerCase().includes(query));

        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesCompany && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedType, selectedCategory]);

  const totalInteractive = topics.filter((t) => t.type === 'interactive').length;
  const totalArticles = topics.filter((t) => t.type === 'article').length;
  const totalInterview = topics.filter((t) => t.companyTag || t.category === 'Interview Questions').length;

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50/70 to-transparent rounded-3xl p-6 sm:p-10 mb-8 border border-blue-100/60">
        <div className="max-w-3xl">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-4">
            <span>✨ Educational Knowledge Base</span>
          </div> */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            React Architecture & Machine Coding
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            A comprehensive, modular collection of interactive machine coding implementations, 
            in-depth architectural articles, system design blueprints, and React internals.
          </p>

          {/* Quick Stats Pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => { setSelectedType('interactive'); setSelectedCategory('all'); }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700 transition-all cursor-pointer"
            >
              <FaPlay className="text-emerald-500" size={10} />
              <span>{totalInteractive} Interactive Demos</span>
            </button>
            <button
              onClick={() => { setSelectedType('article'); setSelectedCategory('all'); }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-700 transition-all cursor-pointer"
            >
              <FaBookOpen className="text-blue-500" size={12} />
              <span>{totalArticles} In-Depth Articles</span>
            </button>
            <button
              onClick={() => { setSelectedType('interview'); setSelectedCategory('all'); }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 hover:border-purple-400 hover:text-purple-700 transition-all cursor-pointer"
            >
              <FaCheckCircle className="text-purple-500" size={12} />
              <span>{totalInterview} Interview Challenges</span>
            </button>
            <a
              href="https://github.com/Asharalikhan4/React"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white shadow-sm text-xs font-semibold hover:bg-slate-800 transition-all"
            >
              <FaGithub size={13} />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </div>

      {/* Control Bar: Search and Primary Tabs */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Main Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl max-w-fit overflow-x-auto">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedType === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Content ({topics.length})
            </button>
            <button
              onClick={() => setSelectedType('article')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedType === 'article'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaBookOpen size={11} />
              Written Articles ({totalArticles})
            </button>
            <button
              onClick={() => setSelectedType('interactive')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedType === 'interactive'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaPlay size={9} />
              Machine Coding ({totalInteractive})
            </button>
            <button
              onClick={() => setSelectedType('interview')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedType === 'interview'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaCheckCircle size={11} />
              Company Questions ({totalInterview})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 md:max-w-xs">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, tag, keyword..."
              className="w-full pl-10 pr-9 py-2 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1 flex-shrink-0">
            <FaLayerGroup size={11} /> Categories:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer flex-shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All
          </button>
          {categories.map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer flex-shrink-0 flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between mb-5 px-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Showing {filteredTopics.length} of {topics.length} topics
        </p>
        {(searchQuery || selectedCategory !== 'all' || selectedType !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
            }}
            className="text-xs font-medium text-blue-600 hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Topic Cards Grid */}
      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map((topic) => {
            const isArticle = topic.type === 'article';
            return (
              <div
                key={topic.id}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Badges Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        isArticle
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {isArticle ? <FaBookOpen size={10} /> : <FaPlay size={8} />}
                      {isArticle ? 'Written Article' : 'Interactive Demo'}
                    </span>

                    {topic.companyTag && (
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                        {topic.companyTag}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <NavLink to={`/topic/${topic.slug}`} className="block">
                    <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {topic.title}
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </NavLink>

                  {/* Tags */}
                  {topic.tags && topic.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {topic.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action Links */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <NavLink
                    to={`/topic/${topic.slug}`}
                    className="font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{isArticle ? 'Read Article' : 'Open Demo'}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </NavLink>

                  <a
                    href={`https://github.com/Asharalikhan4/React/tree/main/${topic.githubPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-700 inline-flex items-center gap-1 transition-colors"
                    title="View source code on GitHub"
                  >
                    <FaCode size={12} />
                    <span>Code</span>
                    <FaExternalLinkAlt size={9} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200">
          <FaSearch className="mx-auto text-slate-300 mb-3" size={32} />
          <h3 className="text-lg font-bold text-slate-800">No matching topics found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or resetting your category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedType('all');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
