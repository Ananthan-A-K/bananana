const dummyUsers = [
  { id: 'USR-001', name: 'John Smith', email: 'john.smith@student.edu', role: 'student', complaints: 3, status: 'active' },
  { id: 'USR-001', name: 'John Smith', email: 'john.smith@student.edu', role: 'student', complaints: 3, status: 'active' },
  { id: 'USR-002', name: 'Emily Johnson', email: 'emily.j@student.edu', role: 'student', complaints: 1, status: 'active' },
  { id: 'USR-003', name: 'Michael Brown', email: 'm.brown@student.edu', role: 'student', complaints: 5, status: 'active' },
  { id: 'USR-004', name: 'Sarah Davis', email: 'sarah.davis@student.edu', role: 'student', complaints: 0, status: 'inactive' },
  { id: 'USR-005', name: 'Admin User', email: 'admin@campus.edu', role: 'admin', complaints: 0, status: 'active' },
];

function AdminUsers() {
  return (
    <div className="space-y-8 bg-pitch-black">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-warm-cream uppercase font-oldschoolgrotesk">User Management</h1>
          <p className="mt-1.5 text-xs text-warm-cream/60 tracking-wide font-light">View and manage all system users</p>
        </div>
        <button className="rounded-full bg-acid-lime px-6 py-2.5 text-xs font-black tracking-widest text-pitch-black hover:bg-lime-400 uppercase transition-all duration-300 cursor-pointer">
          Add User ↗
        </button>
      </div>

      <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 shadow-none overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-charcoal-900/40">
              <tr className="border-b border-charcoal-900">
                <th className="px-6 py-4 text-left text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">User ID</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Email</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Role</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Complaints</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-900">
              {dummyUsers.map((user) => (
                <tr key={user.id} className="hover:bg-charcoal-900/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-warm-cream">{user.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-warm-cream">{user.name}</td>
                  <td className="px-6 py-4 text-xs text-warm-cream/60">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                      user.role === 'admin' ? 'bg-ember-orange text-pitch-black font-extrabold' : 'bg-cobalt-blue text-pitch-black font-extrabold'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-warm-cream/60 font-bold">{user.complaints}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                      user.status === 'active' ? 'bg-acid-lime text-pitch-black font-extrabold' : 'bg-charcoal-900 text-warm-cream/40 border border-charcoal-900'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button className="text-xs font-bold tracking-wider text-acid-lime hover:text-lime-400 uppercase transition-colors cursor-pointer">Edit</button>
                      <button className="text-xs font-bold tracking-wider text-ember-orange hover:text-orange-400 uppercase transition-colors cursor-pointer">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
