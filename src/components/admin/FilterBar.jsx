import React from 'react';

const FilterBar = ({ children, className = '' }) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-charcoal-900/60 p-5 rounded-[25px] border border-charcoal-900 mb-6 shadow-none ${className}`}
    >
      {children}
    </div>
  );
};

export default FilterBar;
