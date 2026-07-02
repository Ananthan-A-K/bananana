import React from 'react';
import { formatComplaintStatusLabel, normalizeComplaintStatus } from '../../utils/complaintStatus.js';

const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (normalizeComplaintStatus(status)) {
      case 'resolved':
        return 'bg-acid-lime text-pitch-black font-extrabold';
      case 'in_progress':
        return 'bg-iris-violet text-warm-cream font-extrabold';
      case 'pending':
        return 'bg-ember-orange text-pitch-black font-extrabold';
      case 'rejected':
      case 'closed':
        return 'bg-charcoal-900 text-warm-cream/50 border border-charcoal-900';
      default:
        return 'bg-warm-cream text-pitch-black font-extrabold border border-charcoal-900/10';
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase ${getStatusStyles(
        status
      )}`}
    >
      {formatComplaintStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
