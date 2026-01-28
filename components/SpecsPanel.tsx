
import React from 'react';
import { LanguageSpecs } from '../types';

interface SpecsPanelProps {
  specs: LanguageSpecs;
  onChange: (specs: LanguageSpecs) => void;
}

export const SpecsPanel: React.FC<SpecsPanelProps> = ({ specs, onChange }) => {
  const handleChange = (key: keyof LanguageSpecs, val: string) => {
    onChange({ ...specs, [key]: val });
  };

  const fields = [
    { label: 'Variables', key: 'variables' as const, placeholder: 'e.g., star [name] = [value];' },
    { label: 'Functions', key: 'functions' as const, placeholder: 'e.g., galaxy [name]() {}' },
    { label: 'Loops', key: 'loops' as const, placeholder: 'e.g., orbit [x] in [range] {}' },
    { label: 'Output', key: 'print' as const, placeholder: 'e.g., signal([msg]);' },
    { label: 'Types', key: 'types' as const, placeholder: 'e.g., Matter, Energy, Void' },
  ];

  return (
    <div className="space-y-4 p-4 h-full overflow-y-auto">
      <div className="mb-6">
        <label className="block text-xs font-bold text-indigo-400 uppercase mb-2">Andromeda Concept</label>
        <textarea
          value={specs.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-sm text-gray-300 focus:ring-1 focus:ring-indigo-500 outline-none h-24 resize-none"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{field.label}</label>
            <input
              type="text"
              value={specs[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-indigo-500 outline-none transition-colors"
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
