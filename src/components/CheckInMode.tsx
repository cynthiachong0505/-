import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, LogOut, Check, ArrowLeft, ShieldAlert, KeyRound } from 'lucide-react';
import { Activity, Student } from '../types';

interface CheckInModeProps {
  activity: Activity;
  onCheckInStudent: (studentId: string) => void;
  onExit: () => void;
}

export default function CheckInMode({ activity, onCheckInStudent, onExit }: CheckInModeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showExitPin, setShowExitPin] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Filter students based on query
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return activity.students;
    return activity.students.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activity.students, searchQuery]);

  // Handle self check in confirmation
  const handleConfirmCheckIn = () => {
    if (!selectedStudent) return;
    onCheckInStudent(selectedStudent.studentId);
    setSuccessMessage(`Checked in successfully! Have a great session, ${selectedStudent.name}!`);
    setSelectedStudent(null);

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  // Exit PIN validation
  const handleExitValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234') {
      onExit();
    } else {
      setPinError('Incorrect PIN code. Admin default is 1234.');
      setPinInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface text-inverse-on-surface flex flex-col p-6 overflow-y-auto">
      {/* Kiosk Header */}
      <header className="flex justify-between items-center pb-4 border-b border-outline/30 mb-8 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center p-1">
            <img
              className="w-10 h-10 object-contain rounded"
              alt="Oakwood logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-ChMVe96oN6loMMi8Kj3HP0VEJlxtFbLvjmTdDgqiVX9vzT77euNZ6ssNOhF7dmFS51Zro_u9NlQaLFUBMLsD6opsgLBhVDi8N-JYEfSu4HnD8d4vRTlhaLznrR_hQ4nEGSlxCBsLX25MWFj9WNNZCrsL8j9NHOTDcclxfkAL89RG8WqnORxgNgACv9bqSjPFrtlMqDqtcyhYNZb8E5nwN0U0xqBIyHeugwdeX5VFbhf2IgUL5ss-"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-[10px] bg-secondary text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Kiosk Self-Check-in Mode
            </span>
            <h1 className="font-display font-extrabold text-lg text-white leading-tight mt-0.5">
              {activity.title}
            </h1>
          </div>
        </div>

        {/* Exit Button */}
        <button
          onClick={() => setShowExitPin(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-white/10"
          id="exit-kiosk-mode-btn"
        >
          <LogOut className="w-4 h-4 text-error" />
          <span>Exit Kiosk</span>
        </button>
      </header>

      {/* Main Content Kiosk Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col items-center">
        {/* Success Alert */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full bg-secondary text-white p-4 rounded-xl flex items-center gap-3 mb-6 font-bold shadow-md shadow-secondary/15"
              id="kiosk-success-alert"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm">{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info panel */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
            Find Your Name to Check-in
          </h2>
          <p className="text-xs text-inverse-on-surface/80 font-semibold">
            Tap your name card and confirm your attendance for the instructor.
          </p>
        </div>

        {/* Large Kiosk Search Box */}
        <div className="w-full max-w-lg relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-6 h-6" />
          <input
            type="text"
            className="w-full bg-white/10 border-2 border-white/20 focus:border-secondary rounded-2xl pl-12 pr-4 py-4 text-md font-bold text-white placeholder:text-white/40 focus:outline-hidden transition-all shadow-xs"
            placeholder="Type your name to filter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="kiosk-search-input"
          />
        </div>

        {/* Student Grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full pb-12">
          {filteredStudents.map((stu) => {
            const isCheckedIn = stu.status === 'present';

            return (
              <button
                key={stu.studentId}
                onClick={() => !isCheckedIn && setSelectedStudent(stu)}
                className={`p-5 rounded-2xl border transition-all text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[140px] shadow-xs group ${
                  isCheckedIn
                    ? 'bg-secondary/20 border-secondary text-white cursor-default'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/35 active:scale-95 cursor-pointer'
                }`}
                id={`kiosk-student-btn-${stu.studentId}`}
              >
                {/* Checked Badge Overlay */}
                {isCheckedIn && (
                  <div className="absolute top-2 right-2 bg-secondary text-white w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* Initials circle */}
                <div
                  className={`w-12 h-12 rounded-full font-bold text-sm flex items-center justify-center mb-3 shadow-xs ${
                    isCheckedIn ? 'bg-secondary text-white' : 'bg-white/10 text-white group-hover:bg-white/20'
                  }`}
                >
                  {stu.initials}
                </div>

                <span className="text-xs font-bold block">{stu.name}</span>
                <span className="text-[10px] text-white/60 font-semibold block mt-0.5">{stu.grade}</span>

                {/* Action hint overlay */}
                {!isCheckedIn && (
                  <span className="text-[9px] text-secondary font-bold uppercase tracking-wider mt-2 bg-secondary/15 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    TAP TO CHECK-IN
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </main>

      {/* Confirm Check-in Dialog */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xl max-w-sm w-full text-center space-y-5"
              id="kiosk-confirm-dialog"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary text-xl font-bold">
                {selectedStudent.initials}
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-lg text-on-surface">Confirm Check-in</h3>
                <p className="text-xs text-on-surface-variant font-semibold">
                  Hello <strong className="text-primary">{selectedStudent.name}</strong> ({selectedStudent.grade}), would you like to mark yourself as Present for Basketball Practice?
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex-1 py-2.5 hover:bg-surface-container-high rounded-xl text-xs font-bold text-on-surface-variant transition-all border border-outline-variant/50"
                  id="kiosk-cancel-confirm-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmCheckIn}
                  className="flex-1 py-2.5 bg-secondary hover:bg-secondary-container text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-secondary/10 flex items-center justify-center gap-1.5"
                  id="kiosk-approve-confirm-btn"
                >
                  <Check className="w-4 h-4" />
                  <span>Yes, I am here!</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Exit PIN Verification Modal */}
      <AnimatePresence>
        {showExitPin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xl max-w-sm w-full text-center space-y-4 text-on-surface"
              id="exit-kiosk-pin-modal"
            >
              <div className="w-12 h-12 rounded-full bg-error-container/20 border border-error/20 flex items-center justify-center mx-auto text-error">
                <KeyRound className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-md text-on-surface">Enter Instructor PIN</h3>
                <p className="text-[11px] text-on-surface-variant font-semibold">
                  Enter administrative credentials to unlock back to administrative suite. Default is <strong className="text-primary">1234</strong>.
                </p>
              </div>

              <form onSubmit={handleExitValidate} className="space-y-4">
                <input
                  type="password"
                  className="w-full text-center tracking-widest text-lg font-bold px-4 py-2 bg-surface-container-low border border-outline-variant rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                  placeholder="••••"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  maxLength={4}
                  required
                  id="kiosk-pin-input"
                />

                {pinError && (
                  <div className="text-[10px] text-error font-bold flex items-center gap-1 justify-center">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>{pinError}</span>
                  </div>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowExitPin(false);
                      setPinInput('');
                      setPinError('');
                    }}
                    className="flex-1 py-2 hover:bg-surface-container-high rounded-lg text-xs font-bold text-on-surface-variant transition-all border border-outline-variant/40"
                    id="exit-kiosk-cancel-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-primary hover:bg-primary-container text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                    id="exit-kiosk-submit-btn"
                  >
                    Unlock Suite
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
