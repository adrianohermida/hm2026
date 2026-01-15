import { useState, useEffect } from 'react';
import { ArtigoBlog } from '../types.ts';
import { fetchBlogPosts } from '../services/supabaseService.ts';

export const useBlog = (categoriaAtiva: string = "Todos", busca: string = "") => {
  const [posts, setPosts] = useState<ArtigoBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchBlogPosts();
      setPosts(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const filteredPosts = posts.filter(post => {
    if (!post) return false;
    const matchesCategory = categoriaAtiva === "Todos" || post.categoria === categoriaAtiva;
    
    const titulo = (post.titulo || "").toLowerCase();
    const resumo = (post.resumo || "").toLowerCase();
    const query = (busca || "").toLowerCase();

    const matchesSearch = titulo.includes(query) || resumo.includes(query);
    return matchesCategory && matchesSearch;
  });

  return { posts: filteredPosts, featured: posts[0], loading };
};