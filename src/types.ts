export interface Student {
  studentId: string;
  name: string;
  grade: string;
  status: 'present' | 'absent' | 'excused' | 'none';
  avatarUrl?: string;
  initials: string;
}

export interface Activity {
  id: string;
  title: string;
  category: 'Athletics' | 'Arts' | 'STEM' | 'Clubs' | 'Academic';
  date: string; // YYYY-MM-DD
  time: string;
  instructor: string;
  location: string;
  description: string;
  students: Student[];
  notes?: string;
  isPrivateNote?: boolean;
}

export interface NewActivityInput {
  title: string;
  category: 'Athletics' | 'Arts' | 'STEM' | 'Clubs' | 'Academic';
  date: string;
  time: string;
  instructor: string;
  location: string;
  description: string;
}

export type ViewType = 'calendar' | 'attendance' | 'reports' | 'settings' | 'dashboard';
