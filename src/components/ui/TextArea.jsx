import React from 'react';

const TextArea = ({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  error,
  rows = 4,
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
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-pitch-black text-warm-cream placeholder:text-warm-cream/40 rounded-[25px] border px-5 py-4 text-sm transition-all focus:outline-none focus:ring-1 ${
          error
            ? 'border-ember-orange focus:border-ember-orange focus:ring-ember-orange'
            : 'border-charcoal-900 focus:border-acid-lime focus:ring-acid-lime'
        }`}
        {...props}
      />
      {error && <p className="text-xs text-ember-orange font-medium tracking-wide mt-0.5">{error}</p>}
    </div>
  );
};

export default TextArea;
