import { Calendar, CheckSquare, FileText, Settings, LogOut, Plus, GraduationCap } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onNewActivityClick: () => void;
  onLogout: () => void;
}

export default function Sidebar({ currentView, onViewChange, onNewActivityClick, onLogout }: SidebarProps) {
  const menuItems = [
    {
      id: 'calendar' as ViewType,
      label: 'Calendar',
      icon: Calendar,
    },
    {
      id: 'attendance' as ViewType,
      label: 'Attendance',
      icon: CheckSquare,
    },
    {
      id: 'reports' as ViewType,
      label: 'Export Reports',
      icon: FileText,
    },
    {
      id: 'settings' as ViewType,
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <aside
      className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col py-6 z-50 shadow-sm"
      id="side-nav"
    >
      {/* Brand Header */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-xs">
          <GraduationCap className="w-6 h-6 fill-white/10" />
        </div>
        <div>
          <h1 className="font-display font-extrabold text-on-surface text-lg leading-tight tracking-tight">
            Oakwood Elementary
          </h1>
          <p className="text-on-surface-variant text-xs font-semibold">Fall Semester 2024</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1.5 px-3">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left font-medium ${
                isActive
                  ? 'text-primary bg-primary-container/10 border-r-4 border-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
              }`}
              id={`sidebar-link-${item.id}`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`} />
              <span className="text-sm font-sans">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Action Footer */}
      <div className="px-4 mt-auto space-y-4">
        {/* Schedule New Activity Button */}
        <button
          onClick={onNewActivityClick}
          className="w-full py-3 bg-primary hover:bg-primary-container text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
          id="sidebar-new-activity-btn"
        >
          <Plus className="w-4 h-4" />
          <span>New Activity</span>
        </button>

        {/* Divider & Logout */}
        <div className="border-t border-outline-variant pt-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:text-error hover:bg-error-container/10 transition-colors duration-200 font-medium text-left"
            id="sidebar-logout-btn"
          >
            <LogOut className="w-5 h-5 text-on-surface-variant hover:text-error" />
            <span className="text-sm font-sans">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
