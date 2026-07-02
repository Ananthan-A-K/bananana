const STATUS_ORDER = ['pending', 'in_progress', 'resolved', 'rejected', 'closed'];

export function normalizeComplaintStatus(status) {
  if (!status) {
    return 'pending';
  }

  const normalized = String(status).trim().toLowerCase().replace(/[\s-]+/g, '_');

  if (normalized === 'open') {
    return 'pending';
  }

  if (normalized === 'inprogress') {
    return 'in_progress';
  }

  return normalized;
}

export function formatComplaintStatusLabel(status) {
  const normalized = normalizeComplaintStatus(status);

  switch (normalized) {
    case 'pending':
      return 'Pending';
    case 'in_progress':
      return 'In Progress';
    case 'resolved':
      return 'Resolved';
    case 'rejected':
      return 'Rejected';
    case 'closed':
      return 'Closed';
    default:
      return normalized
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
  }
}

export function getComplaintStageStats(complaints = []) {
  const counts = complaints.reduce((acc, complaint) => {
    const key = normalizeComplaintStatus(complaint?.status);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const total = complaints.length;

  return STATUS_ORDER.map((key) => ({
    key,
    label: formatComplaintStatusLabel(key),
    count: counts[key] || 0,
    percent: total > 0 ? Math.round(((counts[key] || 0) / total) * 100) : 0,
  }));
}

export function getComplaintSummaryCounts(complaints = []) {
  return complaints.reduce(
    (acc, complaint) => {
      const key = normalizeComplaintStatus(complaint?.status);

      acc.total += 1;
      if (key === 'pending') acc.pending += 1;
      else if (key === 'in_progress') acc.inProgress += 1;
      else if (key === 'resolved') acc.resolved += 1;
      else if (key === 'rejected') acc.rejected += 1;
      else acc.other += 1;

      return acc;
    },
    {
      total: 0,
      pending: 0,
      inProgress: 0,
      resolved: 0,
      rejected: 0,
      other: 0,
    },
  );
}
