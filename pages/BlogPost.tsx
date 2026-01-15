
import React from 'react';
import { BlogPostPage } from '../components/organisms/BlogPostPage.tsx';
import { Footer } from '../components/Footer.tsx';
import { ArtigoBlog } from '../types.ts';

interface PostViewPageProps {
  post: ArtigoBlog;
}

export const PostViewPage: React.FC<PostViewPageProps> = ({ post }) => {
  return (
    <div className="min-h-screen bg-white">
      <BlogPostPage post={post} />
      <Footer />
    </div>
  );
};
