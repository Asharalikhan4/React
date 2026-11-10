import React from 'react';
import { FaGithub } from 'react-icons/fa';

interface GitHubButtonProps {
  path: string;
}

const GitHubButton: React.FC<GitHubButtonProps> = ({ path }) => {
  const baseUrl = "https://github.com/Asharalikhan4/React/tree/main";
  return (
    <a
      href={`${baseUrl}/${path}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-700 transition-colors"
    >
      <FaGithub size={18} />
      View on GitHub
    </a>
  );
};

export default GitHubButton;
