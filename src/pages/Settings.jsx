import { useAuth } from '../context/useAuth.js';
import { useState } from 'react';

function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { id: 'preferences', label: 'Preferences', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  if (!user) {
    return (
      <div className="text-center py-12 bg-pitch-black">
        <p className="text-warm-cream/60 text-sm uppercase tracking-wider">Please log in to access settings</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8 bg-pitch-black">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-warm-cream uppercase font-oldschoolgrotesk">Settings</h1>
        <p className="mt-1.5 text-xs text-warm-cream/60 tracking-wide font-light">Manage your account settings and preferences</p>
      </div>

      <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 shadow-none overflow-hidden relative">
        <div className="border-b border-charcoal-900 overflow-x-auto bg-charcoal-900/20">
          <nav className="flex gap-4 px-6" aria-label="Settings tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-acid-lime text-warm-cream'
                    : 'border-transparent text-warm-cream/60 hover:text-warm-cream'
                }`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <h2 className="text-xs font-bold tracking-[0.2em] text-warm-cream uppercase mb-6 font-oldschoolgrotesk">Profile Information</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      defaultValue={user.name}
                      className="w-full bg-pitch-black text-warm-cream placeholder:text-warm-cream/40 rounded-full border border-charcoal-900 px-5 py-3 text-sm transition-all focus:outline-none focus:border-acid-lime focus:ring-1 focus:ring-acid-lime"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Email</label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={user.email}
                      className="w-full bg-pitch-black text-warm-cream placeholder:text-warm-cream/40 rounded-full border border-charcoal-900 px-5 py-3 text-sm transition-all focus:outline-none focus:border-acid-lime focus:ring-1 focus:ring-acid-lime"
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <label htmlFor="phone" className="text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-pitch-black text-warm-cream placeholder:text-warm-cream/40 rounded-full border border-charcoal-900 px-5 py-3 text-sm transition-all focus:outline-none focus:border-acid-lime focus:ring-1 focus:ring-acid-lime"
                  />
                </div>
              </div>
              <div className="pt-6 border-t border-charcoal-900">
                <button 
                  type="submit" 
                  className="rounded-full bg-acid-lime hover:bg-lime-400 px-8 py-2.5 text-xs font-black uppercase tracking-widest text-pitch-black transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xs font-bold tracking-[0.2em] text-warm-cream uppercase mb-4 font-oldschoolgrotesk">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { title: 'Email Notifications', desc: 'Receive email updates for complaint status changes', enabled: true },
                  { title: 'Push Notifications', desc: 'Get real-time push notifications on your device', enabled: true },
                  { title: 'Weekly Digest', desc: 'Receive a weekly summary of your complaints', enabled: false },
                  { title: 'Admin Alerts', desc: 'Notifications for admin actions on your complaints', enabled: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-[25px] border border-charcoal-900 bg-charcoal-900/30">
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wider text-warm-cream">{item.title}</p>
                      <p className="text-xs text-warm-cream/60 mt-1">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-pitch-black border border-charcoal-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-warm-cream after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-warm-cream after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-acid-lime" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-xs font-bold tracking-[0.2em] text-warm-cream uppercase font-oldschoolgrotesk">Display Preferences</h2>
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase mb-3">Theme</label>
                <div className="flex gap-6">
                  {['light', 'dark', 'system'].map((theme) => (
                    <label key={theme} className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase text-warm-cream/60 hover:text-warm-cream transition-colors">
                      <input 
                        type="radio" 
                        name="theme" 
                        defaultValue="system" 
                        defaultChecked={theme === 'system'} 
                        className="accent-acid-lime" 
                      />
                      <span className="capitalize">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Language</label>
                <select className="block w-full max-w-xs bg-pitch-black text-warm-cream rounded-full border border-charcoal-900 px-5 py-3 text-sm focus:outline-none focus:border-acid-lime focus:ring-1 focus:ring-acid-lime cursor-pointer appearance-none">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div className="pt-6 border-t border-charcoal-900">
                <button 
                  type="submit" 
                  className="rounded-full bg-acid-lime hover:bg-lime-400 px-8 py-2.5 text-xs font-black uppercase tracking-widest text-pitch-black transition-all cursor-pointer"
                >
                  Save Preferences
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;