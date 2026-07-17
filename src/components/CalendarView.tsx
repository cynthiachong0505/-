import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Clock, MapPin, User, CheckSquare, Plus, Info } from 'lucide-react';
import { Activity } from '../types';

interface CalendarViewProps {
  activities: Activity[];
  onSelectActivity: (activityId: string) => void;
  onNewActivityClick: () => void;
  searchQuery: string;
}

export default function CalendarView({
  activities,
  onSelectActivity,
  onNewActivityClick,
  searchQuery,
}: CalendarViewProps) {
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [currentMonth, setCurrentMonth] = useState('September 2024');
  const [selectedDayNum, setSelectedDayNum] = useState<number | null>(3); // Sept 3 selected by default matching mockup

  // September 2024 starts on Sunday, exactly matching our calendar!
  // Days of the week header
  const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Total 30 days in September
  const totalDays = 30;

  // Render day slots including padding if September 2024 didn't start on Sunday
  // Sept 1 2024 is Sunday, so starting padding is 0! That makes the grid perfectly aligned.
  // Let's generate days [1..30]
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Parse activities into days
  const getActivitiesForDay = (dayNum: number) => {
    const formattedDate = `2024-09-${String(dayNum).padStart(2, '0')}`;
    const dayActs = activities.filter((act) => act.date === formattedDate);

    // Apply search filter if present
    if (searchQuery.trim()) {
      return dayActs.filter(
        (act) =>
          act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          act.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          act.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return dayActs;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Athletics':
        return 'bg-primary/10 text-primary border-primary';
      case 'Arts':
        return 'bg-secondary/10 text-secondary border-secondary';
      case 'STEM':
        return 'bg-amber-600/10 text-amber-600 border-amber-600';
      case 'Clubs':
        return 'bg-purple-600/10 text-purple-600 border-purple-600';
      default:
        return 'bg-neutral-600/10 text-neutral-600 border-neutral-600';
    }
  };

  // Find currently selected day events
  const selectedDayEvents = selectedDayNum ? getActivitiesForDay(selectedDayNum) : [];

  return (
    <div className="flex-1 space-y-6">
      {/* Calendar Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold text-on-surface tracking-tight mb-1">
            {currentMonth}
          </h2>
          <p className="text-on-surface-variant font-medium text-sm">
            {activities.filter((act) => act.date.startsWith('2024-09')).length} Active extracurricular programs this month
          </p>
        </div>

        {/* Month/Week Switcher */}
        <div className="flex items-center bg-surface-container rounded-xl p-1 shadow-xs border border-outline-variant/30">
          <button
            onClick={() => setViewMode('month')}
            className={`px-6 py-2 rounded-lg font-semibold text-xs transition-all ${
              viewMode === 'month'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="calendar-mode-month-btn"
          >
            Month
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-6 py-2 rounded-lg font-semibold text-xs transition-all ${
              viewMode === 'week'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="calendar-mode-week-btn"
          >
            Week
          </button>
        </div>

        {/* Prev/Today/Next Controls */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-surface-container-high rounded-full text-on-surface transition-all border border-outline-variant/40 bg-surface-container-lowest shadow-2xs">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-4 py-1.5 hover:bg-surface-container-high rounded-lg font-semibold text-xs transition-all border border-outline-variant/40 bg-surface-container-lowest shadow-2xs">
            Today
          </button>
          <button className="p-2 hover:bg-surface-container-high rounded-full text-on-surface transition-all border border-outline-variant/40 bg-surface-container-lowest shadow-2xs">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid & Right Drawer */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-xs overflow-hidden flex min-h-[580px]">
        {/* Main Grid Area */}
        <div className="flex-1">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-outline-variant bg-surface-container-low/40">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="py-3 text-center font-semibold text-xs tracking-wider text-on-surface-variant border-r border-outline-variant/10 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Month/Week Cells */}
          <div className="grid grid-cols-7 bg-surface-container-lowest divide-y divide-x divide-outline-variant/20 border-b border-outline-variant/10">
            {daysArray.map((dayNum) => {
              const dayActs = getActivitiesForDay(dayNum);
              const isSelected = selectedDayNum === dayNum;
              const isCurrentDayHighlight = dayNum === 3; // Highlight September 3 as current day match

              return (
                <div
                  key={dayNum}
                  onClick={() => setSelectedDayNum(dayNum)}
                  className={`p-3 min-h-[110px] hover:bg-primary/5 cursor-pointer group transition-all relative ${
                    isSelected ? 'bg-primary-container/5 ring-1 ring-inset ring-primary' : ''
                  }`}
                  id={`calendar-cell-${dayNum}`}
                >
                  {/* Accent Highlight Bar for Current Day */}
                  {isCurrentDayHighlight && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                  )}

                  {/* Day number */}
                  <div className="flex justify-between items-start mb-1.5">
                    <span
                      className={`font-bold text-sm w-7 h-7 flex items-center justify-center rounded-full ${
                        isCurrentDayHighlight
                          ? 'bg-primary text-white'
                          : 'text-on-surface'
                      }`}
                    >
                      {dayNum}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* List of activity dots/bars */}
                  <div className="space-y-1">
                    {dayActs.slice(0, 3).map((act) => (
                      <div
                        key={act.id}
                        className={`border-l-4 px-2 py-0.5 text-[10px] font-bold rounded truncate ${getCategoryColor(
                          act.category
                        )}`}
                        title={act.title}
                      >
                        {act.title}
                      </div>
                    ))}
                    {dayActs.length > 3 && (
                      <div className="text-[9px] font-bold text-outline-variant pl-2">
                        +{dayActs.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Detail Panel (Initially Visible for Selected Day) */}
        <AnimatePresence>
          {selectedDayNum !== null && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 384, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="border-l border-outline-variant bg-surface-container-low/60 flex flex-col w-96 shrink-0 shadow-xs"
              id="calendar-detail-drawer"
            >
              <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                <h3 className="font-display font-semibold text-on-surface">Daily Overview</h3>
                <button
                  onClick={() => setSelectedDayNum(null)}
                  className="p-1 hover:bg-surface-container-highest rounded-full transition-all text-on-surface-variant hover:text-on-surface"
                  aria-label="Close overview"
                  id="close-overview-btn"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
                {/* Panel Header */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-primary tracking-widest uppercase">
                    Active Selection
                  </p>
                  <h4 className="text-xl font-bold text-on-surface font-display">
                    September {selectedDayNum}, 2024
                  </h4>
                </div>

                {/* List of Activities for Selected Day */}
                <div className="space-y-4">
                  {selectedDayEvents.length === 0 ? (
                    <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-6 text-center space-y-3">
                      <p className="text-xs text-on-surface-variant/80 font-medium">
                        No activities scheduled for this date.
                      </p>
                      <button
                        onClick={onNewActivityClick}
                        className="text-primary font-bold text-xs hover:underline flex items-center gap-1 mx-auto"
                        id="drawer-add-activity-btn"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Schedule Activity</span>
                      </button>
                    </div>
                  ) : (
                    selectedDayEvents.map((act) => (
                      <div
                        key={act.id}
                        className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant hover:shadow-xs transition-all group relative overflow-hidden"
                      >
                        {/* Status bar category color */}
                        <div
                          className={`absolute top-0 left-0 w-1.5 h-full ${
                            act.category === 'Athletics'
                              ? 'bg-primary'
                              : act.category === 'Arts'
                              ? 'bg-secondary'
                              : act.category === 'STEM'
                              ? 'bg-amber-600'
                              : act.category === 'Clubs'
                              ? 'bg-purple-600'
                              : 'bg-neutral-600'
                          }`}
                        />

                        <div className="flex justify-between items-start mb-2 pl-2">
                          <span className="px-2 py-0.5 bg-primary-container/10 text-primary rounded-full text-[9px] font-bold uppercase tracking-wider">
                            {act.category}
                          </span>
                          <span className="px-2.5 py-0.5 bg-secondary-container/20 text-on-secondary-container rounded-full text-[9px] font-bold">
                            Scheduled
                          </span>
                        </div>

                        <h5 className="text-sm font-extrabold text-on-surface mb-3 pl-2 group-hover:text-primary transition-colors">
                          {act.title}
                        </h5>

                        <div className="grid grid-cols-1 gap-2 mb-4 text-[11px] font-medium text-on-surface-variant pl-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{act.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{act.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{act.instructor}</span>
                          </div>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex gap-2 pl-2">
                          <button
                            onClick={() => onSelectActivity(act.id)}
                            className="flex-1 py-2.5 bg-primary hover:bg-primary-container text-white rounded-lg text-xs font-semibold hover:shadow-xs hover:shadow-primary/15 transition-all flex items-center justify-center gap-1.5"
                            id={`check-in-activity-${act.id}`}
                          >
                            <CheckSquare className="w-3.5 h-3.5" />
                            <span>Check-in / Attendance</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Enrollment Snapshot component for the selected day */}
                {selectedDayEvents.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-outline-variant">
                    <h6 className="text-xs font-bold text-on-surface font-display">Enrollment Snapshot</h6>
                    <div className="flex items-center justify-between">
                      {/* Avatar stacks */}
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full border-2 border-surface-container-lowest bg-primary-container/20 overflow-hidden shadow-xs">
                          <img
                            className="w-full h-full object-cover"
                            alt="Student face"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuABVA5BfvdEVj_dZWylkPRiDwRzaOnm1-7cftfwmYe3kBH9bbM-6olfaL8Kg-AICyvKpkViTmCDKVhP6jeMgZEc1hBN4JGvJ8Z0SRbb8SLQQVCR_XQpFe_oFckdVU5HuVr2oP8c8siGy7XdHplqaxk7orQN1GRvKkPMtyeuqN3MtjN0bsT8MXJR4VlAI4mc0ApM6D-SHyN2YSaPzZw35GUHTD4pa9k4T3W2DnvbFxvrCRbX88pJ8MM2"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="w-7 h-7 rounded-full border-2 border-surface-container-lowest bg-primary-container/20 overflow-hidden shadow-xs">
                          <img
                            className="w-full h-full object-cover"
                            alt="Student face"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi_GLDby_LUgZmqGDQPqs1JPfFPI8L4XrGbCtS2q81rGtLj2WXSTgacE-OaDRh4VsOsHExM7c-dnlGpIjDkPQykA2RLLeN4K83rddGNFtVemOlYD_aMd_eu2Dz4D-grLp-qXanlVeN_FX4-fd3uXaZhT981vqrxtD28rYE8YDDznajoubJwOUtplSJ2lO8arEfOiwnwKBCsOv4AOjMigPoTisVzN-rIpcmMnQn6MPygibZWDrUZs51"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="w-7 h-7 rounded-full border-2 border-surface-container-lowest bg-primary-container/20 overflow-hidden shadow-xs">
                          <img
                            className="w-full h-full object-cover"
                            alt="Student face"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN9YRMfMdZrYD6kPUYOY0322LbAaHnWHLhbq-8yYkiN_CrMYe-0Rn5omBhL0kGkE2J4TVAWXCqKT7vB1RnJRJAHwEUogayl_p1YdTjueJhdQBZwAk98mmSVIAVm7jEkzQDY_xI0aLVZvCjija0RxwMZtW2wbVx00HjlYnWKlOr5o5te7YCN_DAkPgxf23FODnuTre5OoHvJDUTpjbd8RBQkzAJh00tLwyNfbnn1ngGEx6Z8ZNLMO79"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="w-7 h-7 rounded-full border-2 border-surface-container-lowest bg-primary font-bold text-[9px] text-white flex items-center justify-center shadow-xs">
                          +12
                        </div>
                      </div>
                      <span className="text-xs text-on-surface-variant font-medium">15/20 Spots Filled</span>
                    </div>
                    {/* Tiny Progress Bar */}
                    <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
