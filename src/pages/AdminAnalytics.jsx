import { getAdminStats, adminComplaints } from '../data/dummyData.js';
import StatCard from '../components/StatCard.jsx';
import { DocumentTextIcon, ClockIcon, ExclamationCircleIcon, CheckCircleIcon } from '../components/Icons.jsx';

function AdminAnalytics() {
  const stats = getAdminStats();
  const monthlyTrendHeights = [28, 42, 55, 61, 73, 86];

  const categoryStats = adminComplaints.reduce((acc, complaint) => {
    acc[complaint.category] = (acc[complaint.category] || 0) + 1;
    return acc;
  }, {});

  const statusStats = adminComplaints.reduce((acc, complaint) => {
    acc[complaint.status] = (acc[complaint.status] || 0) + 1;
    return acc;
  }, {});

  const priorityStats = adminComplaints.reduce((acc, complaint) => {
    acc[complaint.priority] = (acc[complaint.priority] || 0) + 1;
    return acc;
  }, {});

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
                    style={{ width: `${(count / stats.total) * 100}%` }}
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
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 p-6 shadow-none relative overflow-hidden">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-warm-cream mb-6 font-oldschoolgrotesk">Status Distribution</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center p-4 rounded-[25px] bg-pitch-black border border-charcoal-900">
              <p className="text-3xl font-black text-ember-orange font-oldschoolgrotesk">{statusStats.pending || 0}</p>
              <p className="text-[10px] font-bold tracking-widest text-warm-cream/60 uppercase mt-1">Pending</p>
            </div>
            <div className="text-center p-4 rounded-[25px] bg-pitch-black border border-charcoal-900">
              <p className="text-3xl font-black text-iris-violet font-oldschoolgrotesk">{statusStats.in_progress || 0}</p>
              <p className="text-[10px] font-bold tracking-widest text-warm-cream/60 uppercase mt-1">In Progress</p>
            </div>
            <div className="text-center p-4 rounded-[25px] bg-pitch-black border border-charcoal-900">
              <p className="text-3xl font-black text-acid-lime font-oldschoolgrotesk">{statusStats.resolved || 0}</p>
              <p className="text-[10px] font-bold tracking-widest text-warm-cream/60 uppercase mt-1">Resolved</p>
            </div>
          </div>
        </div>

        <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 p-6 shadow-none relative overflow-hidden">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-warm-cream mb-6 font-oldschoolgrotesk">Monthly Trend</h2>
          <div className="h-48 flex items-end justify-around gap-2 px-2">
            {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map((month, i) => (
              <div key={month} className="flex-1 flex flex-col items-center group">
                <div
                  className="w-full max-w-[24px] bg-pitch-black border border-charcoal-900 rounded-t-[8px] transition-all hover:bg-acid-lime hover:border-transparent duration-300"
                  style={{ height: `${monthlyTrendHeights[i]}%` }}
                />
                <span className="mt-3 text-[10px] font-bold tracking-widest text-warm-cream/40 uppercase">{month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
