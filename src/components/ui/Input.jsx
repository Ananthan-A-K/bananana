import React from 'react';

const Input = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
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
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-pitch-black text-warm-cream placeholder:text-warm-cream/40 rounded-full border px-5 py-3 text-sm transition-all focus:outline-none focus:ring-1 ${
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

export default Input;
