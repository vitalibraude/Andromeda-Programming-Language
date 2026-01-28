
import React from 'react';
import { ANDROMEDA_GUIDE, ANDROMEDA_KNOWLEDGE_BASE } from '../constants';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-950/50">
          <div>
            <h2 className="text-xl font-bold text-indigo-400">{ANDROMEDA_GUIDE.title}</h2>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Abbo Kubaba's Legacy & The Mars 2050 Vision</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
          {/* Main sections */}
          {ANDROMEDA_GUIDE.sections.map((section, idx) => (
            <section key={idx} className="border-l-2 border-indigo-500/30 pl-6">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">{section.heading}</h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                {section.content}
              </p>
            </section>
          ))}

          {/* 50 Knowledge Base Chapters for SEO/RAG */}
          <div className="pt-8 border-t border-gray-800">
            <h3 className="text-lg font-bold text-indigo-400 mb-6 uppercase tracking-widest">Andromeda Technical Library (50 Chapters)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ANDROMEDA_KNOWLEDGE_BASE.map((item) => (
                <div key={item.id} className="p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 transition-all">
                  <h4 className="text-sm font-bold text-purple-400 mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-800 bg-gray-950/50 flex justify-between items-center">
          <span className="text-[10px] text-gray-600 uppercase">Martian Colonization Status: Initializing on 30,000 GTA 6 GPUs...</span>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all"
          >
            Acknowledge Mission
          </button>
        </div>
      </div>
    </div>
  );
};
