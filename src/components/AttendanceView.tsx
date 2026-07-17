import { useState, useMemo } from 'react';
import { Printer, Save, CheckSquare, X, Info, FileText, Check, AlertCircle } from 'lucide-react';
import { Activity, Student } from '../types';

interface AttendanceViewProps {
  activity: Activity;
  onUpdateActivity: (updated: Activity) => void;
  searchQuery: string;
  onAddNotification: (msg: string) => void;
}

export default function AttendanceView({
  activity,
  onUpdateActivity,
  searchQuery,
  onAddNotification,
}: AttendanceViewProps) {
  const [successMsg, setSuccessMsg] = useState('');
  const [localNotes, setLocalNotes] = useState(activity.notes || '');
  const [isPrivate, setIsPrivate] = useState(activity.isPrivateNote || false);

  // Filter students based on search input
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return activity.students;
    return activity.students.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.grade.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activity.students, searchQuery]);

  // Compute live statistics for Daily Summary card
  const stats = useMemo(() => {
    const total = activity.students.length;
    const present = activity.students.filter((s) => s.status === 'present').length;
    const absent = activity.students.filter((s) => s.status === 'absent').length;
    const excused = activity.students.filter((s) => s.status === 'excused').length;
    const unmarked = activity.students.filter((s) => s.status === 'none').length;

    const presentPercentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { total, present, absent, excused, unmarked, presentPercentage };
  }, [activity.students]);

  // Handle single student status change
  const handleToggleStatus = (studentId: string, newStatus: 'present' | 'absent' | 'excused' | 'none') => {
    const updatedStudents = activity.students.map((s) => {
      if (s.studentId === studentId) {
        // Toggle off if clicking active status
        const statusToApply = s.status === newStatus ? 'none' : newStatus;
        return { ...s, status: statusToApply };
      }
      return s;
    });

    onUpdateActivity({ ...activity, students: updatedStudents });
  };

  // Handle bulk action (Present or Absent or Clear)
  const handleBulkAction = (action: 'present' | 'absent' | 'clear') => {
    const updatedStudents = activity.students.map((s) => {
      if (action === 'present') return { ...s, status: 'present' as const };
      if (action === 'absent') return { ...s, status: 'absent' as const };
      return { ...s, status: 'none' as const };
    });

    onUpdateActivity({ ...activity, students: updatedStudents });

    const message =
      action === 'present'
        ? 'Marked all students as Present'
        : action === 'absent'
        ? 'Marked all students as Absent'
        : 'Cleared all attendance marks';

    onAddNotification(`Bulk Action: ${message} in ${activity.title}`);
  };

  // Save/Submit attendance changes
  const handleSubmitAttendance = () => {
    onUpdateActivity({
      ...activity,
      notes: localNotes,
      isPrivateNote: isPrivate,
    });

    setSuccessMsg('Attendance successfully submitted and synced with parents!');
    onAddNotification(`Attendance submitted for ${activity.title} (${stats.present} present, ${stats.absent} absent)`);

    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  // Browser Print Roster Trigger
  const handlePrintRoster = () => {
    window.print();
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Activity Header Hero */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wide uppercase">
              {activity.category}
            </span>
            <span className="text-on-surface-variant font-semibold text-xs">
              • {activity.date === '2024-10-25' ? 'Friday, Oct 25' : activity.date}
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold text-on-surface tracking-tight">
            {activity.title}
          </h2>
          <p className="text-on-surface-variant mt-1 font-medium text-sm">
            {activity.description} • {activity.time}
          </p>
        </div>

        {/* Action Button Controls */}
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handlePrintRoster}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface text-sm font-semibold hover:bg-surface-container-high hover:shadow-2xs transition-all cursor-pointer"
            id="print-roster-btn"
          >
            <Printer className="w-4 h-4 text-primary" />
            <span>Print Roster</span>
          </button>
          <button
            onClick={handleSubmitAttendance}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold shadow-md shadow-primary/10 hover:bg-primary-container transition-all cursor-pointer"
            id="submit-attendance-btn"
          >
            <Save className="w-4 h-4 fill-white/10" />
            <span>Submit Attendance</span>
          </button>
        </div>
      </div>

      {/* Inline success toast */}
      {successMsg && (
        <div className="p-4 bg-secondary-container/20 border-l-4 border-secondary text-on-secondary-container rounded-r-xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Check className="w-4 h-4 text-secondary shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg('')} className="p-1 hover:bg-secondary/10 rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Attendance Dashboard Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main Attendance Table Area */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-2xs">
            {/* Table Header / Stats count */}
            <div className="px-6 py-4 border-b border-outline-variant bg-surface flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-display font-semibold text-on-surface text-md">Student List</h3>
                <span className="bg-surface-container-high px-2.5 py-0.5 rounded-full text-xs font-bold text-on-surface-variant">
                  {activity.students.length} Students Enrolled
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold">
                <button
                  onClick={() => handleBulkAction('present')}
                  className="text-primary hover:bg-primary/5 px-2.5 py-1 rounded-md transition-all font-semibold"
                >
                  Mark All Present
                </button>
                <span className="text-outline-variant">|</span>
                <button
                  onClick={() => handleBulkAction('clear')}
                  className="text-on-surface-variant hover:bg-surface-container-high px-2.5 py-1 rounded-md transition-all font-semibold"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/40 text-on-surface-variant font-semibold text-xs border-b border-outline-variant">
                    <th className="px-6 py-3.5">Student ID</th>
                    <th className="px-6 py-3.5">Student Name</th>
                    <th className="px-6 py-3.5">Class</th>
                    <th className="px-6 py-3.5 text-center">Attendance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant/70 text-sm font-semibold">
                        No students found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((stu) => {
                      const isPresent = stu.status === 'present';
                      const isAbsent = stu.status === 'absent';
                      const isExcused = stu.status === 'excused';

                      return (
                        <tr
                          key={stu.studentId}
                          className="hover:bg-primary/5 transition-all group"
                          id={`student-row-${stu.studentId}`}
                        >
                          <td className="px-6 py-3.5 text-on-surface-variant font-mono text-xs font-semibold">
                            #{stu.studentId}
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-xs shadow-2xs shrink-0">
                                {stu.initials}
                              </div>
                              <span className="font-semibold text-on-surface text-sm">{stu.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3.5 text-on-surface-variant text-sm font-medium">
                            {stu.grade}
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="flex items-center justify-center gap-2">
                              {/* Present Toggle */}
                              <button
                                onClick={() => handleToggleStatus(stu.studentId, 'present')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                                  isPresent
                                    ? 'bg-secondary-container text-on-secondary-container border-secondary shadow-2xs'
                                    : 'border-outline-variant text-on-surface-variant hover:bg-secondary/10 hover:border-secondary hover:text-secondary'
                                }`}
                                id={`status-present-${stu.studentId}`}
                              >
                                Present
                              </button>

                              {/* Absent Toggle */}
                              <button
                                onClick={() => handleToggleStatus(stu.studentId, 'absent')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                                  isAbsent
                                    ? 'bg-error-container text-on-error-container border-error shadow-2xs'
                                    : 'border-outline-variant text-on-surface-variant hover:bg-error/10 hover:border-error hover:text-error'
                                }`}
                                id={`status-absent-${stu.studentId}`}
                              >
                                Absent
                              </button>

                              {/* Excused Toggle */}
                              <button
                                onClick={() => handleToggleStatus(stu.studentId, 'excused')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                                  isExcused
                                    ? 'bg-tertiary-container/30 text-tertiary border-tertiary/40 shadow-2xs'
                                    : 'border-outline-variant text-on-surface-variant hover:bg-tertiary/10 hover:border-tertiary hover:text-tertiary'
                                }`}
                                id={`status-excused-${stu.studentId}`}
                              >
                                Excused
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Sidebar: Notes & Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Attendance Stats Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="font-display font-bold text-on-surface text-md">Daily Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-on-surface-variant">Present</span>
                <span className="text-secondary">{stats.present} / {stats.total}</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div
                  className="bg-secondary h-full rounded-full transition-all duration-500"
                  style={{ width: `${stats.presentPercentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2 text-xs font-semibold">
                <span className="text-on-surface-variant">Absent</span>
                <span className="font-bold text-error">{stats.absent}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-on-surface-variant">Excused</span>
                <span className="font-bold text-tertiary">{stats.excused}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-on-surface-variant">Unmarked</span>
                <span className="font-bold text-on-surface-variant/70">{stats.unmarked}</span>
              </div>
            </div>
          </div>

          {/* Instructor Notes Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-on-surface text-md">Instructor Notes</h3>
              <FileText className="w-4.5 h-4.5 text-outline shrink-0" />
            </div>
            <textarea
              className="w-full min-h-[140px] p-3.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline/40"
              placeholder="Type any observations, injuries, or behavioral notes for this session..."
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              id="instructor-notes-textarea"
            />
            <div className="flex items-center gap-2 pt-1">
              <input
                className="rounded-md border-outline-variant text-primary focus:ring-primary/30 w-4 h-4 cursor-pointer"
                id="private-note"
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <label className="text-[11px] text-on-surface-variant font-semibold cursor-pointer select-none" htmlFor="private-note">
                Mark as private (internal only)
              </label>
            </div>
          </div>

          {/* Facility Reminders Section */}
          <div className="bg-primary/5 border border-primary/25 rounded-xl p-6 space-y-3">
            <h4 className="font-display text-xs font-bold text-primary uppercase tracking-wider">
              Facility Reminders
            </h4>
            <ul className="space-y-3.5">
              <li className="flex gap-2 text-xs font-medium text-on-surface-variant">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Gym A floor was polished today; please ensure all students have clean sneakers.</span>
              </li>
              <li className="flex gap-2 text-xs font-medium text-on-surface-variant">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Equipment closet key must be returned to the main office by 5:15 PM.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
