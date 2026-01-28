
import React from 'react';

interface EditorProps {
  value: string;
  onChange: (val: string) => void;
  title: string;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange, title }) => {
  const lineCount = value.split('\n').length;

  return (
    <div className="flex flex-col h-full bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/80 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</span>
        </div>
      </div>
      <div className="flex flex-1 overflow-auto bg-[#0b0e14]">
        <div className="w-12 pt-4 flex flex-col items-center bg-gray-900/30 text-gray-600 select-none code-font text-sm leading-6">
          {Array.from({ length: Math.max(lineCount, 15) }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="flex-1 p-4 bg-transparent text-gray-200 code-font text-sm leading-6 outline-none resize-none placeholder:text-gray-700"
          placeholder="Start coding in Andromeda..."
        />
      </div>
    </div>
  );
};
