import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import Select from '../../components/ui/Select';
import StatusBadge from '../../components/ui/StatusBadge';

const UpdateStatus = () => {
  const { id } = useParams();
  
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true);
        // In our mock API, get by ID is supported or we filter from all
        const { data } = await api.get('/complaints');
        const found = data.find(c => c.id === id);
        if (found) {
          setComplaint(found);
          setNewStatus(found.status);
        } else {
          setError('Complaint not found.');
        }
      } catch {
        setError('Failed to fetch complaint details.');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      setError('');
      
      // Simulate API call to update status
      await api.patch(`/complaints/${id}`, { status: newStatus });
      
      setComplaint(prev => ({ ...prev, status: newStatus }));
      setSuccess(true);
      setShowConfirmation(false);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Failed to update status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 bg-pitch-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-acid-lime"></div>
      </div>
    );
  }

  if (error && !complaint) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-charcoal-900 border border-ember-orange rounded-[25px] text-center">
        <p className="text-warm-cream font-bold uppercase tracking-wider text-sm">{error}</p>
        <Link to="/admin/complaints" className="mt-4 inline-block text-xs uppercase tracking-wider text-warm-cream border-b border-charcoal-900 hover:text-acid-lime hover:border-acid-lime transition-all pb-0.5">
          Back to Complaints
        </Link>
      </div>
    );
  }

  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Resolved', value: 'resolved' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12 bg-pitch-black">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-warm-cream uppercase font-oldschoolgrotesk">Update Status</h1>
          <p className="text-xs text-warm-cream/60 tracking-wide font-light mt-1.5">Manage resolution progress for #{id}</p>
        </div>
        <Link 
          to="/admin/complaints"
          className="text-xs font-bold uppercase tracking-wider text-warm-cream/60 hover:text-warm-cream transition-colors"
        >
          ← Back to list
        </Link>
      </div>

      {/* Success Notification */}
      {success && (
        <div className="bg-charcoal-900 border border-acid-lime text-acid-lime px-5 py-3 rounded-full flex items-center gap-3 relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <svg className="h-5 w-5 text-acid-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="font-black text-xs uppercase tracking-widest">Status updated successfully!</p>
        </div>
      )}

      <div className="bg-charcoal-900/60 rounded-[25px] border border-charcoal-900 shadow-none overflow-hidden relative">
        <div className="p-6 border-b border-charcoal-900 bg-charcoal-900/20">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-warm-cream font-oldschoolgrotesk">Complaint Overview</h2>
          <div className="mt-6 grid grid-cols-2 gap-6 text-xs">
            <div>
              <p className="text-warm-cream/40 font-bold uppercase text-[9px] tracking-widest">Student</p>
              <p className="text-warm-cream mt-1.5 font-semibold">{complaint.studentName}</p>
            </div>
            <div>
              <p className="text-warm-cream/40 font-bold uppercase text-[9px] tracking-widest">Current Status</p>
              <div className="mt-1.5">
                <StatusBadge status={complaint.status} />
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-warm-cream/40 font-bold uppercase text-[9px] tracking-widest">Subject</p>
              <p className="text-warm-cream mt-1.5 font-medium">{complaint.title}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="max-w-xs">
            <label className="block text-[10px] font-bold tracking-[0.2em] text-warm-cream/60 uppercase mb-2">
              Change Status To
            </label>
            <Select
              options={statusOptions}
              value={newStatus}
              onChange={(e) => {
                setNewStatus(e.target.value);
                setSuccess(false);
                setShowConfirmation(false);
              }}
            />
          </div>

          {/* Action Area */}
          {!showConfirmation ? (
            <button
              onClick={() => setShowConfirmation(true)}
              disabled={newStatus === complaint.status}
              className="px-6 py-3 bg-acid-lime hover:bg-lime-400 text-pitch-black text-xs font-black uppercase tracking-widest rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              Update Status
            </button>
          ) : (
            <div className="p-5 bg-charcoal-900 border border-ember-orange rounded-[25px] relative overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-charcoal-900 border border-charcoal-900/40 rounded-full text-ember-orange">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-warm-cream font-bold uppercase text-xs tracking-wider font-oldschoolgrotesk">Confirm Status Change</h3>
                  <p className="text-warm-cream/60 text-xs mt-2">
                    Are you sure you want to change the status from <span className="font-bold uppercase text-warm-cream">{complaint.status.replace('_', ' ')}</span> to <span className="font-bold uppercase text-warm-cream">{newStatus.replace('_', ' ')}</span>?
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className="px-5 py-2.5 bg-acid-lime text-pitch-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-lime-400 transition-all shadow-none disabled:opacity-50 cursor-pointer"
                    >
                      {isUpdating ? 'Updating...' : 'Yes, Confirm'}
                    </button>
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="px-5 py-2.5 bg-transparent text-warm-cream/60 text-xs font-bold uppercase tracking-widest rounded-full border border-charcoal-900 hover:text-warm-cream hover:border-warm-cream/20 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;
