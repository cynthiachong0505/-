import { useMemo } from 'react';
import { Calendar, Users, Trophy, Percent, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { Activity } from '../types';

interface DashboardViewProps {
  activities: Activity[];
  onSelectView: (view: any) => void;
  onSelectActivity: (id: string) => void;
}

export default function DashboardView({ activities, onSelectView, onSelectActivity }: DashboardViewProps) {
  // Aggregate stats across September 2024
  const aggregateStats = useMemo(() => {
    let totalRosterSize = 0;
    let totalPresentCount = 0;
    let totalAbsentCount = 0;
    let totalExcusedCount = 0;

    activities.forEach((act) => {
      act.students.forEach((stu) => {
        totalRosterSize++;
        if (stu.status === 'present') totalPresentCount++;
        else if (stu.status === 'absent') totalAbsentCount++;
        else if (stu.status === 'excused') totalExcusedCount++;
      });
    });

    const attendanceRate = totalRosterSize > 0 ? Math.round((totalPresentCount / totalRosterSize) * 100) : 0;

    return { totalPresentCount, totalAbsentCount, totalExcusedCount, attendanceRate, programCount: activities.length };
  }, [activities]);

  const cards = [
    {
      title: 'Attendance Rate',
      value: `${aggregateStats.attendanceRate}%`,
      sub: 'School average across Fall 2024',
      icon: Percent,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    },
    {
      title: 'Total Programs',
      value: String(aggregateStats.programCount),
      sub: 'Active extracurricular classes',
      icon: Trophy,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      title: 'Checked-in Today',
      value: '18 / 24',
      sub: 'Basketball Practice active session',
      icon: Users,
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    },
    {
      title: 'Pending Sessions',
      value: '2',
      sub: 'Needs roster submission today',
      icon: Clock,
      color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    },
  ];

  return (
    <div className="flex-1 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-container text-white p-6 rounded-2xl shadow-xs relative overflow-hidden">
        {/* Ambient glow decoration */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl" />
        <div className="relative z-10 space-y-1 max-w-xl">
          <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Oakwood Principal Suite
          </span>
          <h2 className="font-display text-2xl font-extrabold tracking-tight">
            Extracurricular Hub Dashboard
          </h2>
          <p className="text-sm text-white/80 font-medium">
            Manage attendance verification, facility keys, and parent notifications dynamically in real-time.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className={`bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex items-center justify-between shadow-2xs`}
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold text-on-surface-variant block">{c.title}</span>
                <span className="text-2xl font-extrabold text-on-surface font-display">{c.value}</span>
                <span className="text-[10px] font-semibold text-outline-variant block">{c.sub}</span>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${c.color} shrink-0 ml-2`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of top activities */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-2xs lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
            <h3 className="font-display font-bold text-on-surface text-sm">Upcoming / Current Activities</h3>
            <button
              onClick={() => onSelectView('calendar')}
              className="text-xs text-primary font-bold hover:underline"
            >
              View Calendar
            </button>
          </div>

          <div className="space-y-3.5">
            {activities.slice(0, 4).map((act) => {
              const present = act.students.filter((s) => s.status === 'present').length;
              const total = act.students.length;

              return (
                <div
                  key={act.id}
                  onClick={() => onSelectActivity(act.id)}
                  className="p-3.5 bg-surface hover:bg-surface-container-high border border-outline-variant/60 rounded-xl flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="space-y-1 max-w-md">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-primary/15 text-primary rounded-full text-[9px] font-bold uppercase">
                        {act.category}
                      </span>
                      <span className="text-[11px] font-semibold text-on-surface-variant">
                        {act.date}
                      </span>
                    </div>
                    <h4 className="text-xs font-extrabold text-on-surface group-hover:text-primary transition-colors">
                      {act.title}
                    </h4>
                    <p className="text-[10px] text-outline-variant font-medium">
                      Location: {act.location} • Instructor: {act.instructor}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-on-surface block">
                      {present} / {total}
                    </span>
                    <span className="text-[9px] text-secondary font-bold bg-secondary/10 px-1.5 py-0.5 rounded">
                      Checked-In
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recent alerts or facility updates */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
            <h3 className="font-display font-bold text-on-surface text-sm">System Logs &amp; Alerts</h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-4 text-xs font-medium text-on-surface-variant">
            <div className="flex gap-3 items-start">
              <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-on-surface font-semibold block">Roster sync active</span>
                <p className="text-[10px] leading-relaxed text-outline-variant">
                  Oakwood local cache database completed sync with external Google Cloud storage.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-on-surface font-semibold block">Attendance High in Athletics</span>
                <p className="text-[10px] leading-relaxed text-outline-variant">
                  Basketball and Swim Meet registered over 92% attendance today.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Users className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-on-surface font-semibold block">New Activity created</span>
                <p className="text-[10px] leading-relaxed text-outline-variant">
                  Instructor scheduled "Math Lab" on the academic calendar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
