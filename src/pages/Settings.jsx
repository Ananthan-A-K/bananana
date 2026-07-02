import React, { useState } from 'react';
import { useAuth } from '../context/useAuth.js';
import api from '../services/api.js';

function Settings() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status State
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const tabs = [
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' 
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' 
    },
  ];

  if (!user) {
    return (
      <div className="text-center py-12 bg-pitch-black">
        <p className="text-warm-cream/60 text-sm uppercase tracking-wider">Please log in to access settings</p>
      </div>
    );
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    if (!name.trim() || !email.trim()) {
      setErrorMessage('Name and Email are required.');
      return;
    }

    try {
      setIsSaving(true);
      const { data } = await api.put('/auth/profile', { name, email });
      updateUser({ user: data.user, token: data.token });
      setSuccessMessage('Profile information updated successfully!');
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage('All password fields are required.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match.');
      return;
    }

    try {
      setIsSaving(true);
      const { data } = await api.put('/auth/profile', {
        currentPassword,
        newPassword,
      });
      updateUser({ user: data.user, token: data.token });
      setSuccessMessage('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to change password. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8 bg-pitch-black">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-warm-cream uppercase font-oldschoolgrotesk">Settings</h1>
        <p className="mt-1.5 text-xs text-warm-cream/60 tracking-wide font-light">Manage your account settings and credentials</p>
      </div>

      {/* Success alert with fade-in animation */}
      {successMessage && (
        <div className="bg-charcoal-900 border border-acid-lime text-acid-lime px-5 py-3 rounded-[20px] flex items-center gap-3 relative overflow-hidden animate-in fade-in duration-300">
          <svg className="h-5 w-5 text-acid-lime shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="font-bold text-xs uppercase tracking-wider">{successMessage}</p>
        </div>
      )}

      {/* Error alert with fade-in animation */}
      {errorMessage && (
        <div className="bg-charcoal-900 border border-ember-orange text-ember-orange px-5 py-3 rounded-[20px] flex items-center gap-3 relative overflow-hidden animate-in fade-in duration-300">
          <svg className="h-5 w-5 text-ember-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="font-bold text-xs uppercase tracking-wider">{errorMessage}</p>
        </div>
      )}

      <div className="rounded-[25px] border border-charcoal-900 bg-charcoal-900/60 shadow-none overflow-hidden relative">
        <div className="border-b border-charcoal-900 overflow-x-auto bg-charcoal-900/20">
          <nav className="flex gap-4 px-6" aria-label="Settings tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSuccessMessage('');
                  setErrorMessage('');
                }}
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
            <form className="space-y-6" onSubmit={handleProfileSubmit}>
              <div>
                <h2 className="text-xs font-bold tracking-[0.2em] text-warm-cream uppercase mb-6 font-oldschoolgrotesk">Profile Information</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-pitch-black text-warm-cream placeholder:text-warm-cream/40 rounded-full border border-charcoal-900 px-5 py-3 text-sm transition-all focus:outline-none focus:border-acid-lime focus:ring-1 focus:ring-acid-lime"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-pitch-black text-warm-cream placeholder:text-warm-cream/40 rounded-full border border-charcoal-900 px-5 py-3 text-sm transition-all focus:outline-none focus:border-acid-lime focus:ring-1 focus:ring-acid-lime"
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <label htmlFor="role" className="text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Role</label>
                  <input
                    type="text"
                    id="role"
                    value={user.role}
                    disabled
                    className="w-full bg-pitch-black text-warm-cream/45 rounded-full border border-charcoal-900/40 px-5 py-3 text-sm cursor-not-allowed select-none capitalize"
                  />
                </div>
              </div>
              <div className="pt-6 border-t border-charcoal-900">
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="rounded-full bg-acid-lime hover:bg-lime-400 px-8 py-2.5 text-xs font-black uppercase tracking-widest text-pitch-black transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form className="space-y-6" onSubmit={handlePasswordSubmit}>
              <div>
                <h2 className="text-xs font-bold tracking-[0.2em] text-warm-cream uppercase mb-6 font-oldschoolgrotesk">Change Password</h2>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="currentPassword" className="text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-pitch-black text-warm-cream placeholder:text-warm-cream/40 rounded-full border border-charcoal-900 px-5 py-3 text-sm transition-all focus:outline-none focus:border-acid-lime focus:ring-1 focus:ring-acid-lime"
                    />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="newPassword" className="text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-pitch-black text-warm-cream placeholder:text-warm-cream/40 rounded-full border border-charcoal-900 px-5 py-3 text-sm transition-all focus:outline-none focus:border-acid-lime focus:ring-1 focus:ring-acid-lime"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="confirmPassword" className="text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-pitch-black text-warm-cream placeholder:text-warm-cream/40 rounded-full border border-charcoal-900 px-5 py-3 text-sm transition-all focus:outline-none focus:border-acid-lime focus:ring-1 focus:ring-acid-lime"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-charcoal-900">
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="rounded-full bg-acid-lime hover:bg-lime-400 px-8 py-2.5 text-xs font-black uppercase tracking-widest text-pitch-black transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Updating...' : 'Update Password'}
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