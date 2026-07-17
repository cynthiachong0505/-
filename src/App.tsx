import { useState, useEffect } from 'react';
import { ViewType, Activity, NewActivityInput } from './types';
import { INITIAL_ACTIVITIES } from './data';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CalendarView from './components/CalendarView';
import AttendanceView from './components/AttendanceView';
import ExportReports from './components/ExportReports';
import SettingsView from './components/SettingsView';
import DashboardView from './components/DashboardView';
import CheckInMode from './components/CheckInMode';
import NewActivityModal from './components/NewActivityModal';
import LoginScreen from './components/LoginScreen';

const ACTIVITIES_STORAGE_KEY = 'oakwood_activity_hub_activities_v1';
const VIEW_STORAGE_KEY = 'oakwood_activity_hub_current_view_v1';
const USER_STORAGE_KEY = 'oakwood_activity_hub_user_v1';

export default function App() {
  // Authentication State
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem(USER_STORAGE_KEY);
  });

  // Activities State (loaded from localStorage with fallback seed)
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing activities from local storage', e);
      }
    }
    return INITIAL_ACTIVITIES;
  });

  // Save activities state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
  }, [activities]);

  // View state
  const [view, setView] = useState<ViewType>(() => {
    const saved = localStorage.getItem(VIEW_STORAGE_KEY);
    return (saved as ViewType) || 'attendance';
  });

  // Save current view state
  const handleViewChange = (newView: ViewType) => {
    setView(newView);
    localStorage.setItem(VIEW_STORAGE_KEY, newView);
  };

  // Active Selected Activity ID (for attendance list)
  const [activeActivityId, setActiveActivityId] = useState<string>('act-basketball');

  // Interactive search state
  const [searchQuery, setSearchQuery] = useState('');

  // Kiosk self-check-in screen toggle
  const [isKioskMode, setIsKioskMode] = useState(false);

  // New activity scheduling modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Action log notifications list
  const [notifications, setNotifications] = useState<string[]>([
    'Welcome back to Oakwood Principal Suite!',
    'Facility Key for Gym A registered out to Coach Lee.',
    'Enrollment snapshot for Basketball Practice updated.'
  ]);

  // Handle successful login
  const handleLoginSuccess = (username: string) => {
    setUser(username);
    localStorage.setItem(USER_STORAGE_KEY, username);
    handleAddNotification(`Authorized session established for administrator "${username}"`);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    setIsKioskMode(false);
  };

  // Log notifications
  const handleAddNotification = (message: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setNotifications((prev) => [`[${timestamp}] ${message}`, ...prev]);
  };

  // Clear system notifications
  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Update specific activity in list
  const handleUpdateActivity = (updatedAct: Activity) => {
    setActivities((prev) => prev.map((act) => (act.id === updatedAct.id ? updatedAct : act)));
  };

  // Quick kiosk mode student present toggle
  const handleCheckInStudent = (studentId: string) => {
    const currentAct = activities.find((act) => act.id === activeActivityId);
    if (!currentAct) return;

    const updatedStudents = currentAct.students.map((s) => {
      if (s.studentId === studentId) {
        return { ...s, status: 'present' as const };
      }
      return s;
    });

    const updatedAct = { ...currentAct, students: updatedStudents };
    handleUpdateActivity(updatedAct);
  };

  // Schedule new calendar activity
  const handleAddActivity = (input: NewActivityInput) => {
    // We deep-copy our standard initial student list to seed the new activity roster
    const defaultStudents = INITIAL_ACTIVITIES[0].students.map((s) => ({
      ...s,
      status: 'none' as const,
    }));

    const newAct: Activity = {
      id: `act-${Date.now()}`,
      title: input.title,
      category: input.category,
      date: input.date,
      time: input.time,
      instructor: input.instructor,
      location: input.location,
      description: input.description,
      students: defaultStudents,
    };

    setActivities((prev) => [newAct, ...prev]);
    handleAddNotification(`Scheduled new program: "${input.title}" on ${input.date}`);
  };

  // Select a calendar activity to view in Attendance
  const handleSelectActivity = (activityId: string) => {
    setActiveActivityId(activityId);
    handleViewChange('attendance');
  };

  // Find active selected activity
  const activeActivity = activities.find((act) => act.id === activeActivityId) || activities[0];

  // If user is not authenticated, display login screen
  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // Display fullscreen Student Kiosk check-in mode
  if (isKioskMode) {
    return (
      <CheckInMode
        activity={activeActivity}
        onCheckInStudent={handleCheckInStudent}
        onExit={() => setIsKioskMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface select-none font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={view}
        onViewChange={handleViewChange}
        onNewActivityClick={() => setIsModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Top Header Navigation */}
      <Header
        currentView={view}
        onViewChange={handleViewChange}
        onCheckInModeClick={() => setIsKioskMode(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        notificationCount={notifications.length}
        onClearNotifications={handleClearNotifications}
        notifications={notifications}
      />

      {/* Main Screen Content Frame */}
      <main className="ml-64 pt-24 px-10 pb-12 min-h-screen max-w-7xl mx-auto">
        {view === 'calendar' && (
          <CalendarView
            activities={activities}
            onSelectActivity={handleSelectActivity}
            onNewActivityClick={() => setIsModalOpen(true)}
            searchQuery={searchQuery}
          />
        )}

        {view === 'attendance' && (
          <AttendanceView
            activity={activeActivity}
            onUpdateActivity={handleUpdateActivity}
            searchQuery={searchQuery}
            onAddNotification={handleAddNotification}
          />
        )}

        {view === 'reports' && <ExportReports activities={activities} />}

        {view === 'settings' && <SettingsView />}

        {view === 'dashboard' && (
          <DashboardView
            activities={activities}
            onSelectView={handleViewChange}
            onSelectActivity={handleSelectActivity}
          />
        )}
      </main>

      {/* Schedule New Activity Modal Form */}
      <NewActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddActivity}
      />
    </div>
  );
}
