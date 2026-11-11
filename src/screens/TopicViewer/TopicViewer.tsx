import React from 'react';
import { useParams, Navigate } from 'react-router';
import { topics } from '../../data/topics';
import { articleContentMap } from '../../data/articles';
import ArticleViewer from '../../components/ArticleViewer/ArticleViewer';
import PlaygroundViewer from '../../components/PlaygroundViewer/PlaygroundViewer';
import { usePageSEO } from '../../customHooks/usePageSEO';

const TopicViewer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const topic = topics.find((t) => t.slug === slug);

  usePageSEO({
    title: topic ? topic.title : 'Topic Details',
    description: topic ? topic.description : undefined,
    keywords: topic?.tags,
    canonicalPath: topic ? `/topic/${topic.slug}` : undefined,
    type: 'article',
  });

  if (!topic) {
    return <Navigate to="/" replace />;
  }

  if (topic.type === 'article') {
    const content = (topic.articleKey && articleContentMap[topic.articleKey]) || '# Content Not Found\n\nSorry, this article content is not available.';
    return (
      <ArticleViewer
        title={topic.title}
        category={topic.category}
        content={content}
        githubPath={topic.githubPath}
      />
    );
  }

  if (topic.type === 'interactive' && topic.component) {
    const Component = topic.component;
    return (
      <PlaygroundViewer
        title={topic.title}
        description={topic.description}
        githubPath={topic.githubPath}
        category={topic.category}
        companyTag={topic.companyTag}
      >
        <Component />
      </PlaygroundViewer>
    );
  }

  return <div>Topic type not supported yet.</div>;
};

export default TopicViewer;
