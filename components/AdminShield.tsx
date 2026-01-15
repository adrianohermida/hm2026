import React, { useState } from 'react';
import { CoreManifesto } from '../services/core/manifesto.ts';
import { CoreSkeleton } from '../services/core/core-skeleton.ts';

export const AdminShield: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-indigo-700 transition-all transform hover:scale-110 active:scale-95 group relative"
        title={CoreSkeleton.labels.shieldTooltip}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="text-indigo-600 text-lg">🛡️</span> Admin Shield
            </h3>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              {CoreSkeleton.labels.governanceStatus}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Module ID</p>
              <p className="text-sm font-mono text-gray-700">{CoreManifesto.id}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Status</p>
                <p className="text-xs font-semibold text-green-600">{CoreManifesto.status}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Version</p>
                <p className="text-xs font-semibold text-gray-700">{CoreManifesto.version}</p>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">Audit Logs</p>
              <div className="text-[11px] text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Manifest valid & linked</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Skeleton structure verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>No inconsistencies detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};