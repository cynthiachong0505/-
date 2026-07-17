import { useState, useRef, useEffect } from 'react';
import { Search, Bell, HelpCircle, ShieldCheck, Check, Info } from 'lucide-react';
import { ViewType } from '../types';
import { SYSTEM_HELP_TOPICS } from '../data';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onCheckInModeClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  notificationCount: number;
  onClearNotifications: () => void;
  notifications: string[];
}

export default function Header({
  currentView,
  onViewChange,
  onCheckInModeClick,
  searchQuery,
  onSearchChange,
  notificationCount,
  onClearNotifications,
  notifications,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setShowHelp(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      className="fixed top-0 right-0 w-[calc(100%-256px)] h-16 bg-surface border-b border-outline-variant z-40 flex justify-between items-center px-6"
      id="top-bar"
    >
      <div className="flex items-center gap-8">
        {/* Search Field */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input
            className="pl-9 pr-4 py-1.5 bg-surface-container-low border border-outline-variant/30 rounded-full w-64 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-xs font-medium placeholder:text-on-surface-variant/50 text-on-surface transition-all"
            placeholder={
              currentView === 'calendar'
                ? 'Search activities...'
                : currentView === 'attendance'
                ? 'Search students...'
                : 'Search records...'
            }
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            id="header-search-input"
          />
        </div>

        {/* View Selection (Dashboard vs Staff Portal) */}
        <nav className="flex items-center gap-6" id="header-nav">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`font-sans text-sm font-semibold transition-all relative py-1 ${
              currentView === 'dashboard'
                ? 'text-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="header-tab-dashboard"
          >
            Dashboard
            {currentView === 'dashboard' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
          <button
            onClick={() => onViewChange('calendar')}
            className={`font-sans text-sm font-semibold transition-all relative py-1 ${
              currentView !== 'dashboard'
                ? 'text-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="header-tab-staff-portal"
          >
            Staff Portal
            {currentView !== 'dashboard' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-5">
        {/* Check-in Mode Badge Button */}
        <button
          onClick={onCheckInModeClick}
          className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-semibold text-xs flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all shadow-xs border border-secondary/20"
          id="header-checkin-mode-btn"
        >
          <ShieldCheck className="w-4 h-4 text-on-secondary-container" />
          <span>Check-in Mode</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowHelp(false);
              }}
              className={`p-2 rounded-full transition-all relative ${
                showNotifications ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
              title="Notifications"
              id="header-notifications-btn"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface" />
              )}
            </button>

            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-80 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg py-2 z-50 text-left overflow-hidden"
                id="notifications-dropdown"
              >
                <div className="px-4 py-2 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                  <span className="font-semibold text-sm text-on-surface font-display">Recent Activities</span>
                  {notificationCount > 0 && (
                    <button
                      onClick={onClearNotifications}
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-outline-variant/30">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-on-surface-variant/60 text-xs font-semibold flex flex-col items-center gap-1">
                      <Check className="w-8 h-8 text-secondary/40" />
                      <span>No new system logs.</span>
                    </div>
                  ) : (
                    notifications.map((notif, index) => (
                      <div key={index} className="p-3 text-xs text-on-surface-variant hover:bg-surface-container-low transition-colors">
                        <div className="flex gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                          <span>{notif}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Help Center Dropdown */}
          <div className="relative" ref={helpRef}>
            <button
              onClick={() => {
                setShowHelp(!showHelp);
                setShowNotifications(false);
              }}
              className={`p-2 rounded-full transition-all relative ${
                showHelp ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
              title="Help Documentation"
              id="header-help-btn"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {showHelp && (
              <div
                className="absolute right-0 mt-2 w-80 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg py-3 z-50 text-left overflow-hidden"
                id="help-dropdown"
              >
                <div className="px-4 pb-2 border-b border-outline-variant flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm text-on-surface font-display">System Documentation</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-outline-variant/30 custom-scrollbar">
                  {SYSTEM_HELP_TOPICS.map((topic, idx) => (
                    <div key={idx} className="p-4 space-y-1 hover:bg-surface-container-low transition-colors">
                      <h4 className="text-xs font-bold text-on-surface">{topic.title}</h4>
                      <p className="text-[11px] leading-relaxed text-on-surface-variant">{topic.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Teacher Avatar and Info badge */}
        <div className="flex items-center gap-3 pl-3 border-l border-outline-variant">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant shadow-xs shrink-0">
            <img
              className="w-full h-full object-cover"
              alt="Educator professional headshot"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrJbjvKvc6-1SWEQ3zKTmsKT925fJSdEoOpyrvAaZfzpm4RCCr4mcjfkZjsbK-AV5W0xiczGG5gFHLKaQZltFRigQ5eUL6ISCR6638sGorVaLeFpUCBkZOpWVfxosPa5zmcTo9ySV8ctc3tBb1FpbvNYiLzvo5_1_t0hJYLHKZYuC4YC9G_2NkDbV2fZNk5dCzNzD9ptURCTSjVKpC5dlEFjL7Wr0MF2TQ4TzvIpqsh5XGEiN9MuSG"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
