import { NavLink, useLocation } from 'react-router-dom';
import { XIcon, HomeIcon, UserIcon, ChartBarIcon, InboxIcon, CogIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx';

const navigation = [
  { name: 'Dashboard', href: '/student/dashboard', icon: HomeIcon, roles: ['student'] },
  { name: 'My Complaints', href: '/student/complaints', icon: InboxIcon, roles: ['student'] },
  { name: 'Submit Complaint', href: '/student/submit', icon: ChartBarIcon, roles: ['student'] },
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon, roles: ['admin'] },
  { name: 'All Complaints', href: '/admin/complaints', icon: InboxIcon, roles: ['admin'] },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon, roles: ['admin'] },
  { name: 'Users', href: '/admin/users', icon: UserIcon, roles: ['admin'] },
  { name: 'Settings', href: '/settings', icon: CogIcon, roles: ['student', 'admin'] },
];

function Sidebar({ isOpen, onClose, user, collapsed, onToggleCollapse, isMobile }) {
  const userRole = user?.role || 'student';
  const location = useLocation();

  const filteredNav = navigation.filter((item) => item.roles.includes(userRole));

  return (
    <>
      {isMobile && isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={`
          z-50 transform bg-charcoal-900 border-r border-pitch-black transition-all duration-300 ease-in-out
          ${isMobile
            ? 'fixed inset-y-0 left-0 ' + (isOpen ? 'translate-x-0' : '-translate-x-full')
            : 'lg:fixed lg:top-0 lg:bottom-0 lg:left-0 lg:translate-x-0 ' + (collapsed ? 'w-20' : 'w-64')
          }
        `}
        aria-label="Sidebar"
        style={!isMobile ? { width: collapsed ? '5rem' : '16rem' } : undefined}
      >
        <div className="flex h-full flex-col">
          {/* Header area in Sidebar */}
          <div className="flex h-20 items-center justify-between border-b border-pitch-black px-4">
            {!collapsed && (
              <NavLink
                to="/"
                className="flex items-center gap-2"
                aria-label="BANANANA Home"
              >
                <div className="w-8 h-8 rounded-[8px] bg-ember-orange flex items-center justify-center font-black text-pitch-black text-xs font-oldschoolgrotesk tracking-tighter">
                  B
                </div>
                <span className="font-oldschoolgrotesk font-black text-sm tracking-wider text-warm-cream uppercase">
                  BANANANA
                </span>
              </NavLink>
            )}
            {collapsed && !isMobile && (
              <div className="mx-auto w-8 h-8 rounded-[8px] bg-ember-orange flex items-center justify-center font-black text-pitch-black text-xs font-oldschoolgrotesk tracking-tighter">
                B
              </div>
            )}
            <div className="flex items-center gap-2">
              {isMobile && (
                <button
                  type="button"
                  className="rounded-full p-2 text-warm-cream hover:bg-pitch-black cursor-pointer"
                  onClick={onClose}
                  aria-label="Close sidebar"
                >
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
              {!isMobile && (
                <button
                  type="button"
                  className="rounded-full p-2 text-warm-cream hover:bg-pitch-black cursor-pointer"
                  onClick={onToggleCollapse}
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {collapsed ? (
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              )}
            </div>
          </div>

          <nav className="flex-1 space-y-2.5 p-4 overflow-y-auto" aria-label="Main navigation">
            {filteredNav.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all rounded-full ${
                    isActive
                      ? 'bg-pitch-black text-acid-lime border-l-2 border-acid-lime pl-3 pr-3 font-semibold'
                      : 'text-warm-cream/80 hover:bg-pitch-black/30 hover:text-warm-cream px-4'
                  }`}
                  onClick={onClose}
                  title={collapsed && !isMobile ? item.name : undefined}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              );
            })}
          </nav>

          <div className="border-t border-pitch-black p-4 bg-pitch-black/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pitch-black text-warm-cream flex-shrink-0 relative">
                <UserIcon className="h-5 w-5" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-acid-lime ring-2 ring-charcoal-900" />
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-warm-cream truncate">
                    {user?.name || 'Guest User'}
                  </p>
                  <p className="text-[10px] text-warm-cream/60 capitalize font-medium">{userRole}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
