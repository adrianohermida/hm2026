
import React from 'react';
import { BlogPage as BlogOrganism } from '../components/organisms/BlogPage.tsx';
import { Footer } from '../components/organisms/Footer.tsx';
import { ArtigoBlog } from '../types.ts';

export const BlogPage: React.FC<{ onPostClick: (post: ArtigoBlog) => void }> = ({ onPostClick }) => {
  return (
    <div className="min-h-screen bg-white">
      <BlogOrganism onPostClick={onPostClick} />
      <Footer />
    </div>
  );
};
