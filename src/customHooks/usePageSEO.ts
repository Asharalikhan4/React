import { useEffect } from 'react';

interface UsePageSEOOptions {
  title: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
  type?: 'website' | 'article';
}

const DEFAULT_TITLE = 'React Lab - Architecture & Machine Coding Masterclass';
const DEFAULT_DESC =
  'A comprehensive educational platform featuring interactive React machine coding challenges, frontend system design blueprints, rendering patterns, and performance optimization guides.';

export const usePageSEO = ({
  title,
  description = DEFAULT_DESC,
  keywords,
  canonicalPath,
  type = 'article',
}: UsePageSEOOptions) => {
  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title === DEFAULT_TITLE ? title : `${title} | React Lab`;
    document.title = formattedTitle;

    // Helper function to safely update or insert meta tags
    const updateMetaTag = (attribute: string, key: string, content: string) => {
      let meta = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'title', formattedTitle);

    if (keywords && keywords.length > 0) {
      updateMetaTag('name', 'keywords', keywords.join(', '));
    }

    // 3. Open Graph
    updateMetaTag('property', 'og:title', formattedTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', type);

    // 4. Twitter Card
    updateMetaTag('name', 'twitter:title', formattedTitle);
    updateMetaTag('name', 'twitter:description', description);

    // 5. Canonical Link
    if (canonicalPath) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      const baseUrl =
        typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
          ? window.location.origin
          : 'https://react.asharlabs.stream';
      canonicalLink.setAttribute('href', `${baseUrl}${canonicalPath}`);
    }

    // 6. JSON-LD Structured Data for Google
    const scriptId = 'json-ld-seo';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'TechArticle' : 'WebSite',
      headline: formattedTitle,
      description: description,
      url: window.location.href,
      author: {
        '@type': 'Person',
        name: 'Ashar Ali Khan',
      },
    });

    return () => {
      document.title = DEFAULT_TITLE;
      updateMetaTag('name', 'description', DEFAULT_DESC);
      updateMetaTag('property', 'og:title', DEFAULT_TITLE);
      updateMetaTag('property', 'og:description', DEFAULT_DESC);
    };
  }, [title, description, keywords, canonicalPath, type]);
};
