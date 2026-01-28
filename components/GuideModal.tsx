
import React from 'react';
import { ANDROMEDA_GUIDE } from '../constants';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-950/50">
          <h2 className="text-xl font-bold text-indigo-400">{ANDROMEDA_GUIDE.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {ANDROMEDA_GUIDE.sections.map((section, idx) => (
            <section key={idx}>
              <h3 className="text-lg font-semibold text-purple-300 mb-3">{section.heading}</h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <div className="p-6 border-t border-gray-800 bg-gray-950/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all"
          >
            Got it, Space Traveler
          </button>
        </div>
      </div>
    </div>
  );
};
