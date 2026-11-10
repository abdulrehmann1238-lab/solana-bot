import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="w-4 h-4 text-text-muted absolute left-3 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 bg-bg-surface border border-border-subtle rounded-fintech text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-brand-forest focus:ring-1 focus:ring-brand-forest transition-colors shadow-fintech-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 text-text-muted hover:text-text-main p-1 rounded-md transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

