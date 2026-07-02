import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import { useAuth } from '../context/useAuth.js';
import StatCard from '../components/StatCard.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import { DocumentTextIcon, ClockIcon, CheckCircleIcon } from '../components/Icons.jsx';
import { getComplaintStageStats, normalizeComplaintStatus } from '../utils/complaintStatus.js';
import { statusColors } from '../data/dummyData.js';

const stageDotColors = {
  pending: 'bg-ember-orange',
  in_progress: 'bg-iris-violet',
  resolved: 'bg-acid-lime',
  rejected: 'bg-charcoal-900',
  closed: 'bg-charcoal-900',
};

function StudentDashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const userId = user?.id ?? null;

  useEffect(() => {
    let active = true;

    async function fetchComplaints() {
      try {
        const { data } = await api.get('/complaints');
        if (active) {
          setComplaints(data);
        }
      } catch {
        if (active) {
          setComplaints([]);
        }
      }
    }

    fetchComplaints();

    return () => {
      active = false;
    };
  }, []);

  const visibleComplaints = useMemo(() => {
    if (!userId) {
      return [];
    }

    return complaints.filter((complaint) => {
      const ownerId =
        complaint.studentId ||
        complaint.createdBy ||
        complaint.student ||
        complaint.createdBy?._id ||
        complaint.student?._id ||
        complaint.createdBy?.id ||
        complaint.student?.id;

      return ownerId?.toString?.() === userId.toString();
    });
  }, [complaints, userId]);

  const stats = useMemo(() => {
    const total = visibleComplaints.length;
    const pending = visibleComplaints.filter((complaint) => normalizeComplaintStatus(complaint.status) === 'pending').length;
    const resolved = visibleComplaints.filter((complaint) => normalizeComplaintStatus(complaint.status) === 'resolved').length;

    return { total, pending, resolved };
  }, [visibleComplaints]);

  const stageStats = useMemo(() => getComplaintStageStats(visibleComplaints), [visibleComplaints]);

  const recentComplaints = useMemo(
    () =>
      [...visibleComplaints]
        .sort((a, b) => new Date(b.submittedAt || b.createdDate || 0) - new Date(a.submittedAt || a.createdDate || 0))
        .slice(0, 5),
    [visibleComplaints],
  );

  return (
    <div className="space-y-8 bg-pitch-black">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-warm-cream uppercase font-oldschoolgrotesk">Student Dashboard</h1>
        <p className="mt-1.5 text-xs text-warm-cream/60 tracking-wide font-light">
          Welcome back, {user?.name || 'Student'}! Here's an overview of your campus complaints.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Complaints"
          value={stats.total}
          icon={DocumentTextIcon}
          iconColor="blue"
          trend={12}
          trendLabel="vs last month"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={ClockIcon}
          iconColor="orange"
          trend={-5}
          trendLabel="vs last month"
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
          icon={CheckCircleIcon}
          iconColor="green"
          trend={8}
          trendLabel="vs last month"
        />
      </div>

      <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 p-6 shadow-none relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-warm-cream">Complaint Stages</h2>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-warm-cream/40">
          How your submitted complaints are progressing
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
                <span className={`inline-flex h-2.5 w-2.5 rounded-full ${stageDotColors[stage.key] || 'bg-warm-cream/20'}`} />
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

      <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 shadow-none relative overflow-hidden">
        <div className="border-b border-charcoal-900 px-6 py-5 flex items-center justify-between">
          <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-warm-cream">Recent Complaints</h2>
          <Link
            to="/student/submit"
            className="rounded-full bg-acid-lime px-5 py-2.5 text-[10px] font-black tracking-widest text-pitch-black hover:bg-lime-400 transition-all uppercase cursor-pointer"
          >
            File Complaint {''}
          </Link>
        </div>
        <div className="divide-y divide-charcoal-900">
          {recentComplaints.map((complaint) => {
            const complaintDate = complaint.submittedAt || complaint.createdDate || complaint.createdAt || 0;

            return (
              <div key={complaint.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-charcoal-900/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-warm-cream truncate">{complaint.title}</p>
                  <p className="text-xs text-warm-cream/40 mt-1 tracking-wide">
                    {complaint.id} - {new Date(complaintDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <StatusBadge status={complaint.status} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-6 py-4 border-t border-charcoal-900 bg-charcoal-900/20">
          <Link
            to="/student/all-complaints"
            className="text-xs font-bold tracking-[0.25em] text-warm-cream hover:text-acid-lime transition-colors uppercase"
          >
            View all complaints {''}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
