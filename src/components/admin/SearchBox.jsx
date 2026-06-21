import React from 'react';

const SearchBox = ({ value, onChange, placeholder = 'Search...', className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-warm-cream/60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-pitch-black text-warm-cream placeholder:text-warm-cream/40 rounded-full border border-charcoal-900 px-5 py-3 pl-10 text-sm transition-all focus:outline-none focus:border-acid-lime focus:ring-1 focus:ring-acid-lime"
      />
    </div>
  );
};

export default SearchBox;
