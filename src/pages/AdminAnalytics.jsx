import { useEffect, useMemo, useState } from 'react';
import api from '../services/api.js';
import StatCard from '../components/StatCard.jsx';
import { DocumentTextIcon, ClockIcon, ExclamationCircleIcon, CheckCircleIcon } from '../components/Icons.jsx';
import { useAuth } from '../context/useAuth.js';
import { statusColors } from '../data/dummyData.js';
import { getComplaintStageStats, normalizeComplaintStatus } from '../utils/complaintStatus.js';

const stageDotColors = {
  pending: 'bg-ember-orange',
  in_progress: 'bg-iris-violet',
  resolved: 'bg-acid-lime',
  rejected: 'bg-charcoal-900',
  closed: 'bg-charcoal-900',
};

function AdminAnalytics() {
  const { isAuthenticated } = useAuth();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function loadComplaints() {
      if (!isAuthenticated) {
        setComplaints([]);
        return;
      }

      try {
        const { data } = await api.get('/admin/complaints');
        if (!ignore) {
          setComplaints(data);
        }
      } catch (err) {
        console.error('Fetch complaints error:', err);
        if (!ignore) {
          setComplaints([]);
        }
      }
    }

    loadComplaints();

    return () => {
      ignore = true;
    };
  }, [isAuthenticated]);

  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((complaint) => normalizeComplaintStatus(complaint.status) === 'pending').length;
    const inProgress = complaints.filter((complaint) => normalizeComplaintStatus(complaint.status) === 'in_progress').length;
    const resolved = complaints.filter((complaint) => normalizeComplaintStatus(complaint.status) === 'resolved').length;

    return { total, pending, inProgress, resolved };
  }, [complaints]);

  const categoryStats = useMemo(
    () =>
      complaints.reduce((acc, complaint) => {
        acc[complaint.category] = (acc[complaint.category] || 0) + 1;
        return acc;
      }, {}),
    [complaints],
  );

  const stageStats = useMemo(() => getComplaintStageStats(complaints), [complaints]);

  const priorityStats = useMemo(
    () =>
      complaints.reduce((acc, complaint) => {
        acc[complaint.priority || 'medium'] = (acc[complaint.priority || 'medium'] || 0) + 1;
        return acc;
      }, {}),
    [complaints],
  );

  const monthlyTrend = useMemo(() => {
    if (complaints.length === 0) {
      return [
        { label: 'No Data', count: 0 },
        { label: '', count: 0 },
        { label: '', count: 0 },
        { label: '', count: 0 },
        { label: '', count: 0 },
        { label: '', count: 0 },
      ];
    }

    const latestDate = complaints.reduce((latest, complaint) => {
      const date = new Date(complaint.submittedAt || complaint.createdDate || 0);
      return date > latest ? date : latest;
    }, new Date(0));

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const months = [];

    for (let i = 5; i >= 0; i -= 1) {
      const monthDate = new Date(Date.UTC(latestDate.getUTCFullYear(), latestDate.getUTCMonth() - i, 1));
      const year = monthDate.getUTCFullYear();
      const month = monthDate.getUTCMonth();
      const count = complaints.filter((complaint) => {
        const complaintDate = new Date(complaint.submittedAt || complaint.createdDate || 0);
        return complaintDate.getUTCFullYear() === year && complaintDate.getUTCMonth() === month;
      }).length;

      months.push({
        label: monthNames[month],
        count,
      });
    }

    return months;
  }, [complaints]);

  const maxMonthlyCount = Math.max(...monthlyTrend.map((month) => month.count), 1);
  const chartPoints = monthlyTrend.map((month, index) => {
    const x = (index / Math.max(monthlyTrend.length - 1, 1)) * 100;
    const y = 100 - (month.count / maxMonthlyCount) * 100;

    return { x, y, count: month.count, label: month.label };
  });

  const chartPath = chartPoints.length
    ? `M ${chartPoints
        .map((point) => `${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
        .join(' L ')}`
    : '';

  return (
    <div className="space-y-8 bg-pitch-black">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-warm-cream uppercase font-oldschoolgrotesk">Analytics Dashboard</h1>
        <p className="mt-1.5 text-xs text-warm-cream/60 tracking-wide font-light">Complaint trends and insights</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Complaints" value={stats.total} icon={DocumentTextIcon} iconColor="blue" />
        <StatCard title="Pending" value={stats.pending} icon={ClockIcon} iconColor="orange" />
        <StatCard title="In Progress" value={stats.inProgress} icon={ExclamationCircleIcon} iconColor="purple" />
        <StatCard title="Resolved" value={stats.resolved} icon={CheckCircleIcon} iconColor="green" />
      </div>

      <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 p-6 shadow-none relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-warm-cream">Complaint Stages</h2>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-warm-cream/40">
              Count of complaints by stage across the live dataset
            </p>
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-acid-lime">
            {stats.total} total
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stageStats.map((stage) => (
            <div key={stage.key} className="rounded-[20px] border border-charcoal-900 bg-pitch-black p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">{stage.label}</span>
                <span className={`h-2.5 w-2.5 rounded-full ${stageDotColors[stage.key] || 'bg-warm-cream/20'}`} />
              </div>
              <div className="mt-3 flex items-end justify-between gap-3">
                <p className="text-3xl font-black text-warm-cream font-oldschoolgrotesk">{stage.count}</p>
                <p className="text-[10px] font-bold tracking-widest text-acid-lime uppercase">{stage.percent}%</p>
              </div>
              <div className="mt-3 h-2 rounded-full bg-charcoal-900 overflow-hidden">
                <div
                  className={`h-full rounded-full ${statusColors[stage.key] || statusColors.pending}`}
                  style={{ width: `${stage.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 p-6 shadow-none relative overflow-hidden">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-warm-cream mb-6 font-oldschoolgrotesk">Complaints by Category</h2>
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between text-xs font-medium tracking-wide">
                  <span className="text-warm-cream/60">{category}</span>
                  <span className="text-warm-cream font-bold">{count}</span>
                </div>
                <div className="h-2 bg-pitch-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-acid-lime rounded-full transition-all"
                    style={{ width: `${stats.total ? (count / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 p-6 shadow-none relative overflow-hidden">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-warm-cream mb-6 font-oldschoolgrotesk">Complaints by Priority</h2>
          <div className="space-y-4">
            {Object.entries(priorityStats).map(([priority, count]) => {
              const colors = {
                high: 'bg-ember-orange',
                medium: 'bg-schoolbus-yellow',
                low: 'bg-cobalt-blue',
              };

              return (
                <div key={priority} className="space-y-2">
                  <div className="flex justify-between text-xs font-medium tracking-wide">
                    <span className="capitalize text-warm-cream/60">{priority}</span>
                    <span className="text-warm-cream font-bold">{count}</span>
                  </div>
                  <div className="h-2 bg-pitch-black rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${colors[priority]}`}
                      style={{ width: `${stats.total ? (count / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 p-6 shadow-none relative overflow-hidden">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-warm-cream mb-6 font-oldschoolgrotesk">Monthly Trend</h2>
          <div className="h-48 px-2">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
              <defs>
                <linearGradient id="monthlyTrendLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c8ff2d" />
                  <stop offset="100%" stopColor="#f6c445" />
                </linearGradient>
                <linearGradient id="monthlyTrendFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#c8ff2d" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#c8ff2d" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              {chartPath && (
                <>
                  <path d={`${chartPath} L 100 100 L 0 100 Z`} fill="url(#monthlyTrendFill)" />
                  <path d={chartPath} fill="none" stroke="url(#monthlyTrendLine)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                </>
              )}
              {chartPoints.map((point, index) => (
                <g key={`${point.label}-${index}`}>
                  <circle cx={point.x} cy={point.y} r="2.8" fill="#c8ff2d" />
                  <circle cx={point.x} cy={point.y} r="5" fill="transparent" stroke="rgba(200,255,45,0.18)" strokeWidth="2" />
                </g>
              ))}
            </svg>
            <div className="mt-3 grid grid-cols-6 gap-2 px-1">
              {monthlyTrend.map((month, i) => (
                <div key={`${month.label}-${i}`} className="text-center">
                  <span className="block text-[10px] font-bold tracking-widest text-warm-cream/40 uppercase">{month.label || 'No Data'}</span>
                  <span className="mt-1 block text-[10px] font-bold tracking-widest text-acid-lime uppercase">{month.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 p-6 shadow-none relative overflow-hidden">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-warm-cream mb-6 font-oldschoolgrotesk">Stage Summary</h2>
          <div className="space-y-4">
            {stageStats.map((stage) => (
              <div key={stage.key} className="flex items-center justify-between rounded-2xl border border-charcoal-900 bg-pitch-black px-4 py-3">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-warm-cream/60">{stage.label}</span>
                <span className="text-xs font-black tracking-widest text-warm-cream">
                  {stage.count} / {stage.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
