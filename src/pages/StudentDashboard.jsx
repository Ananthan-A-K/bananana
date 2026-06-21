import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';
import StatCard from '../components/StatCard.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import { DocumentTextIcon, ClockIcon, CheckCircleIcon } from '../components/Icons.jsx';
import { getStudentStats } from '../data/dummyData.js';

function StudentDashboard() {
  const { user } = useAuth();
  const stats = getStudentStats();

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

      <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 shadow-none relative overflow-hidden">
        <div className="border-b border-charcoal-900 px-6 py-5 flex items-center justify-between">
          <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-warm-cream">Recent Complaints</h2>
          <Link
            to="/student/submit"
            className="rounded-full bg-acid-lime px-5 py-2.5 text-[10px] font-black tracking-widest text-pitch-black hover:bg-lime-400 transition-all uppercase cursor-pointer"
          >
            File Complaint ↗
          </Link>
        </div>
        <div className="divide-y divide-charcoal-900">
          {[
            { id: 'CMP-001', title: 'WiFi not working in Library', status: 'resolved', date: 'Oct 15, 2025' },
            { id: 'CMP-002', title: 'Broken chair in Lecture Hall A', status: 'pending', date: 'Nov 2, 2025' },
            { id: 'CMP-003', title: 'Cafeteria food quality', status: 'in_progress', date: 'Nov 10, 2025' },
            { id: 'CMP-004', title: 'AC not working in Room 301', status: 'resolved', date: 'Oct 28, 2025' },
            { id: 'CMP-005', title: 'Missing fire extinguisher', status: 'pending', date: 'Nov 12, 2025' },
          ].map((complaint) => (
            <div key={complaint.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-charcoal-900/30 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-warm-cream truncate">{complaint.title}</p>
                <p className="text-xs text-warm-cream/40 mt-1 tracking-wide">{complaint.id} • {complaint.date}</p>
              </div>
              <div className="flex-shrink-0">
                <StatusBadge status={complaint.status} />
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-charcoal-900 bg-charcoal-900/20">
          <Link
            to="/student/complaints"
            className="text-xs font-bold tracking-[0.25em] text-warm-cream hover:text-acid-lime transition-colors uppercase"
          >
            View all complaints ↗
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;