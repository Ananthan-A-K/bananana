import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'bg-acid-lime text-pitch-black font-extrabold';
      case 'in_progress':
        return 'bg-iris-violet text-warm-cream font-extrabold';
      case 'pending':
        return 'bg-ember-orange text-pitch-black font-extrabold';
      case 'rejected':
      case 'closed':
        return 'bg-charcoal-900 text-warm-cream/50 border border-charcoal-900';
      case 'open':
      default:
        return 'bg-warm-cream text-pitch-black font-extrabold border border-charcoal-900/10';
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase ${getStatusStyles(
        status
      )}`}
    >
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;
