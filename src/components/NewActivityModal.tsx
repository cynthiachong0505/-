import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, User, Info, Plus } from 'lucide-react';
import { NewActivityInput } from '../types';

interface NewActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: NewActivityInput) => void;
}

export default function NewActivityModal({ isOpen, onClose, onSubmit }: NewActivityModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Athletics' | 'Arts' | 'STEM' | 'Clubs' | 'Academic'>('Athletics');
  const [date, setDate] = useState('2024-09-03');
  const [time, setTime] = useState('3:30 PM - 5:00 PM');
  const [instructor, setInstructor] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !instructor || !location) {
      setError('Please fill in all required fields (Activity Name, Instructor, Location)');
      return;
    }
    onSubmit({
      title,
      category,
      date,
      time,
      instructor,
      location,
      description: description || 'No description provided.'
    });
    // Reset state
    setTitle('');
    setCategory('Athletics');
    setDate('2024-09-03');
    setTime('3:30 PM - 5:00 PM');
    setInstructor('');
    setLocation('');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-xl bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl overflow-hidden"
            id="new-activity-modal-container"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-on-surface">Schedule New Activity</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-surface-container-high rounded-full transition-all text-on-surface-variant hover:text-on-surface"
                aria-label="Close modal"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-error-container/20 border border-error/20 text-error rounded-lg text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-on-surface" htmlFor="act-name">
                  Activity Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  id="act-name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Swimming Class, Lego League"
                  className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-on-surface" htmlFor="act-cat">
                    Category
                  </label>
                  <select
                    id="act-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  >
                    <option value="Athletics">Athletics</option>
                    <option value="Arts">Arts</option>
                    <option value="STEM">STEM</option>
                    <option value="Clubs">Clubs</option>
                    <option value="Academic">Academic</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-on-surface" htmlFor="act-date">
                    Date <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 w-4 h-4 text-on-surface-variant" />
                    <input
                      type="date"
                      id="act-date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-on-surface" htmlFor="act-time">
                    Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 w-4 h-4 text-on-surface-variant" />
                    <input
                      type="text"
                      id="act-time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g. 3:30 PM - 5:00 PM"
                      className="w-full pl-9 pr-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-on-surface" htmlFor="act-instructor">
                    Instructor / Coach <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 w-4 h-4 text-on-surface-variant" />
                    <input
                      type="text"
                      id="act-instructor"
                      value={instructor}
                      onChange={(e) => setInstructor(e.target.value)}
                      placeholder="e.g. Coach Richardson"
                      className="w-full pl-9 pr-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-on-surface" htmlFor="act-loc">
                  Location / Facility <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 w-4 h-4 text-on-surface-variant" />
                  <input
                    type="text"
                    id="act-loc"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Gymnasium A, Lab B, Room 104"
                    className="w-full pl-9 pr-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-on-surface" htmlFor="act-desc">
                  Description / Subtext
                </label>
                <textarea
                  id="act-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Intermediate Skills, Beginner basics..."
                  rows={2}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 hover:bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-semibold transition-all"
                  id="cancel-modal-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-container text-white rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5"
                  id="submit-modal-btn"
                >
                  <Plus className="w-4 h-4" />
                  Schedule Activity
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
