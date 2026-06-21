import React from 'react';

const Select = ({
  label,
  id,
  name,
  options = [],
  value,
  onChange,
  error,
  placeholder,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-pitch-black text-warm-cream rounded-full border px-5 py-3 text-sm transition-all focus:outline-none focus:ring-1 appearance-none ${
          error
            ? 'border-ember-orange focus:border-ember-orange focus:ring-ember-orange'
            : 'border-charcoal-900 focus:border-acid-lime focus:ring-acid-lime'
        }`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled className="bg-pitch-black text-warm-cream/40">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-pitch-black text-warm-cream">
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-ember-orange font-medium tracking-wide mt-0.5">{error}</p>}
    </div>
  );
};

export default Select;
