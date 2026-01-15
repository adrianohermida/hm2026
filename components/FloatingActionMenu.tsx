
import React, { useState } from 'react';
import { Sparkles, Type, Image as ImageIcon, Code, Plus, X } from 'lucide-react';

interface FloatingActionMenuProps {
  onAddManual: (type: 'text' | 'image' | 'code') => void;
  onOpenAI: () => void;
}

export const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({ onAddManual, onOpenAI }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3 z-50">
      {isOpen && (
        <div className="flex flex-col gap-3 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <button
            onClick={() => { onOpenAI(); setIsOpen(false); }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all text-sm font-medium"
          >
            <Sparkles size={18} />
            Ask AI
          </button>
          
          <div className="flex flex-col gap-2 p-2 bg-white rounded-2xl shadow-xl border border-slate-100">
            <button
              onClick={() => { onAddManual('text'); setIsOpen(false); }}
              className="p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-3"
            >
              <Type size={20} />
              <span className="text-sm font-medium">Text Block</span>
            </button>
            <button
              onClick={() => { onAddManual('image'); setIsOpen(false); }}
              className="p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-3"
            >
              <ImageIcon size={20} />
              <span className="text-sm font-medium">Image Block</span>
            </button>
            <button
              onClick={() => { onAddManual('code'); setIsOpen(false); }}
              className="p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-3"
            >
              <Code size={20} />
              <span className="text-sm font-medium">Code Block</span>
            </button>
          </div>
        </div>
      )}
      
      <button
        onClick={toggleMenu}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 transform ${isOpen ? 'bg-slate-800 rotate-0' : 'bg-indigo-600 hover:scale-105 rotate-0'}`}
      >
        {isOpen ? <X size={24} className="text-white" /> : <Plus size={24} className="text-white" />}
      </button>
    </div>
  );
};

// Lucide React fallback for environment where it might not be pre-installed
// Since instructions don't forbid common libraries, assuming lucide-react is accessible
// For the context of this prompt, I'll use SVG icons instead.
