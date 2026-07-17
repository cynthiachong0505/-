import { Activity, Student } from './types';

export const INITIAL_STUDENTS: Student[] = [
  { studentId: 'STU-2024-001', name: 'Marcus Aurelius', grade: 'Grade 4B', status: 'none', initials: 'MA' },
  { studentId: 'STU-2024-042', name: 'Elena Lovelace', grade: 'Grade 5A', status: 'present', initials: 'EL' },
  { studentId: 'STU-2024-118', name: 'Julian Richter', grade: 'Grade 4B', status: 'absent', initials: 'JR' },
  { studentId: 'STU-2024-009', name: 'Sophia Wright', grade: 'Grade 3C', status: 'none', initials: 'SW' },
  { studentId: 'STU-2024-215', name: 'Kai Matsumoto', grade: 'Grade 5B', status: 'none', initials: 'KM' },
  { studentId: 'STU-2024-102', name: 'Chloe Bennett', grade: 'Grade 4A', status: 'none', initials: 'CB' },
  { studentId: 'STU-2024-055', name: 'Liam O\'Connor', grade: 'Grade 3A', status: 'present', initials: 'LO' },
  { studentId: 'STU-2024-192', name: 'Isabella Garcia', grade: 'Grade 5B', status: 'none', initials: 'IG' },
  { studentId: 'STU-2024-088', name: 'Alexander Wu', grade: 'Grade 4C', status: 'excused', initials: 'AW' },
  { studentId: 'STU-2024-143', name: 'Harper Vance', grade: 'Grade 3B', status: 'present', initials: 'HV' },
  { studentId: 'STU-2024-023', name: 'Maya Lin', grade: 'Grade 4A', status: 'present', initials: 'ML' },
  { studentId: 'STU-2024-071', name: 'Ethan Hunt', grade: 'Grade 5A', status: 'none', initials: 'EH' },
  { studentId: 'STU-2024-162', name: 'Lucas Scott', grade: 'Grade 3C', status: 'absent', initials: 'LS' },
  { studentId: 'STU-2024-204', name: 'Aria Montgomery', grade: 'Grade 4B', status: 'present', initials: 'AM' },
  { studentId: 'STU-2024-129', name: 'Noah Miller', grade: 'Grade 5C', status: 'none', initials: 'NM' },
  { studentId: 'STU-2024-098', name: 'Olivia Pope', grade: 'Grade 3A', status: 'present', initials: 'OP' },
  { studentId: 'STU-2024-154', name: 'William Wright', grade: 'Grade 4C', status: 'none', initials: 'WW' },
  { studentId: 'STU-2024-188', name: 'Emma Watson', grade: 'Grade 5B', status: 'present', initials: 'EW' },
  { studentId: 'STU-2024-037', name: 'Daniel Craig', grade: 'Grade 4B', status: 'none', initials: 'DC' },
  { studentId: 'STU-2024-222', name: 'Zoe Saldana', grade: 'Grade 5A', status: 'excused', initials: 'ZS' },
  { studentId: 'STU-2024-110', name: 'Henry Cavill', grade: 'Grade 3B', status: 'present', initials: 'HC' },
  { studentId: 'STU-2024-067', name: 'Lily Collins', grade: 'Grade 4A', status: 'none', initials: 'LC' },
  { studentId: 'STU-2024-177', name: 'James Bond', grade: 'Grade 5C', status: 'present', initials: 'JB' },
  { studentId: 'STU-2024-241', name: 'Penelope Cruz', grade: 'Grade 4B', status: 'present', initials: 'PC' },
];

export const INITIAL_ACTIVITIES: Activity[] = [
  // The active one for Attendance screen (Oct 25, 2024)
  {
    id: 'act-basketball',
    title: 'Basketball Practice - Gym A - Coach Lee',
    category: 'Athletics',
    date: '2024-10-25',
    time: '3:30 PM - 5:00 PM',
    instructor: 'Coach Lee',
    location: 'Gymnasium A',
    description: 'Intermediate Skills & Drills',
    students: [
      { studentId: 'STU-2024-001', name: 'Marcus Aurelius', grade: 'Grade 4B', status: 'none', initials: 'MA' },
      { studentId: 'STU-2024-042', name: 'Elena Lovelace', grade: 'Grade 5A', status: 'present', initials: 'EL' },
      { studentId: 'STU-2024-118', name: 'Julian Richter', grade: 'Grade 4B', status: 'absent', initials: 'JR' },
      { studentId: 'STU-2024-009', name: 'Sophia Wright', grade: 'Grade 3C', status: 'none', initials: 'SW' },
      { studentId: 'STU-2024-215', name: 'Kai Matsumoto', grade: 'Grade 5B', status: 'none', initials: 'KM' },
      { studentId: 'STU-2024-102', name: 'Chloe Bennett', grade: 'Grade 4A', status: 'present', initials: 'CB' },
      { studentId: 'STU-2024-055', name: 'Liam O\'Connor', grade: 'Grade 3A', status: 'present', initials: 'LO' },
      { studentId: 'STU-2024-192', name: 'Isabella Garcia', grade: 'Grade 5B', status: 'absent', initials: 'IG' },
      { studentId: 'STU-2024-088', name: 'Alexander Wu', grade: 'Grade 4C', status: 'excused', initials: 'AW' },
      { studentId: 'STU-2024-143', name: 'Harper Vance', grade: 'Grade 3B', status: 'present', initials: 'HV' },
      { studentId: 'STU-2024-023', name: 'Maya Lin', grade: 'Grade 4A', status: 'present', initials: 'ML' },
      { studentId: 'STU-2024-071', name: 'Ethan Hunt', grade: 'Grade 5A', status: 'present', initials: 'EH' },
      { studentId: 'STU-2024-162', name: 'Lucas Scott', grade: 'Grade 3C', status: 'absent', initials: 'LS' },
      { studentId: 'STU-2024-204', name: 'Aria Montgomery', grade: 'Grade 4B', status: 'present', initials: 'AM' },
      { studentId: 'STU-2024-129', name: 'Noah Miller', grade: 'Grade 5C', status: 'present', initials: 'NM' },
      { studentId: 'STU-2024-098', name: 'Olivia Pope', grade: 'Grade 3A', status: 'present', initials: 'OP' },
      { studentId: 'STU-2024-154', name: 'William Wright', grade: 'Grade 4C', status: 'present', initials: 'WW' },
      { studentId: 'STU-2024-188', name: 'Emma Watson', grade: 'Grade 5B', status: 'present', initials: 'EW' },
      { studentId: 'STU-2024-037', name: 'Daniel Craig', grade: 'Grade 4B', status: 'present', initials: 'DC' },
      { studentId: 'STU-2024-222', name: 'Zoe Saldana', grade: 'Grade 5A', status: 'excused', initials: 'ZS' },
      { studentId: 'STU-2024-110', name: 'Henry Cavill', grade: 'Grade 3B', status: 'present', initials: 'HC' },
      { studentId: 'STU-2024-067', name: 'Lily Collins', grade: 'Grade 4A', status: 'absent', initials: 'LC' },
      { studentId: 'STU-2024-177', name: 'James Bond', grade: 'Grade 5C', status: 'present', initials: 'JB' },
      { studentId: 'STU-2024-241', name: 'Penelope Cruz', grade: 'Grade 4B', status: 'present', initials: 'PC' },
    ],
    notes: 'Gym A floor was polished today; please ensure all students have clean sneakers.',
    isPrivateNote: false
  },
  // Calendar Events (September 2024)
  {
    id: 'cal-sept-1-bball',
    title: 'Basketball Training',
    category: 'Athletics',
    date: '2024-09-01',
    time: '3:30 PM - 5:00 PM',
    instructor: 'Coach Lee',
    location: 'Gymnasium A',
    description: 'Youth fundamental skills practice',
    students: INITIAL_STUDENTS.map(s => ({ ...s, status: Math.random() > 0.3 ? 'present' : 'absent' }))
  },
  {
    id: 'cal-sept-1-chess',
    title: 'Chess Club',
    category: 'Clubs',
    date: '2024-09-01',
    time: '4:00 PM - 5:30 PM',
    instructor: 'Mrs. Sterling',
    location: 'Room 104',
    description: 'Chess tactics and peer matches',
    students: INITIAL_STUDENTS.slice(0, 10).map(s => ({ ...s, status: Math.random() > 0.2 ? 'present' : 'absent' }))
  },
  {
    id: 'cal-sept-2-choir',
    title: 'Choir Practice',
    category: 'Arts',
    date: '2024-09-02',
    time: '08:00 AM - 09:30 AM',
    instructor: 'Mrs. Sterling',
    location: 'Music Room',
    description: 'Harmonies and winter performance preparation',
    students: INITIAL_STUDENTS.slice(2, 15).map(s => ({ ...s, status: Math.random() > 0.2 ? 'present' : 'absent' }))
  },
  {
    id: 'cal-sept-3-swim',
    title: 'Swim Meet',
    category: 'Athletics',
    date: '2024-09-03',
    time: '15:30 PM - 17:00 PM',
    instructor: 'Coach Richardson',
    location: 'Gymnasium A',
    description: 'Friendly internal crawl and relay races',
    students: INITIAL_STUDENTS.map(s => ({ ...s, status: s.studentId === 'STU-2024-042' ? 'present' : s.studentId === 'STU-2024-118' ? 'absent' : 'present' }))
  },
  {
    id: 'cal-sept-3-robot',
    title: 'Robotics',
    category: 'Clubs',
    date: '2024-09-03',
    time: '4:00 PM - 5:30 PM',
    instructor: 'Mr. Cheng',
    location: 'Lab B',
    description: 'Arduino sensor coding',
    students: INITIAL_STUDENTS.slice(4, 18).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-5-art',
    title: 'Art Class',
    category: 'Arts',
    date: '2024-09-05',
    time: '2:00 PM - 3:30 PM',
    instructor: 'Miss Monet',
    location: 'Art Studio B',
    description: 'Watercolor blending techniques',
    students: INITIAL_STUDENTS.slice(0, 12).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-6-math',
    title: 'Math Lab',
    category: 'Academic',
    date: '2024-09-06',
    time: '3:30 PM - 4:30 PM',
    instructor: 'Dr. Gauss',
    location: 'Room 302',
    description: 'Multiplication speed runs and geometry puzzles',
    students: INITIAL_STUDENTS.slice(5, 15).map(s => ({ ...s, status: 'none' }))
  },
  // Add some more distributed across the month for fullness
  {
    id: 'cal-sept-9-math',
    title: 'Math Lab',
    category: 'Academic',
    date: '2024-09-09',
    time: '3:30 PM - 4:30 PM',
    instructor: 'Dr. Gauss',
    location: 'Room 302',
    description: 'Prime numbers investigation',
    students: INITIAL_STUDENTS.slice(5, 15).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-10-art',
    title: 'Art Class',
    category: 'Arts',
    date: '2024-09-10',
    time: '2:00 PM - 3:30 PM',
    instructor: 'Miss Monet',
    location: 'Art Studio B',
    description: 'Clay sculpting workshop',
    students: INITIAL_STUDENTS.slice(0, 12).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-12-math',
    title: 'Math Lab',
    category: 'Academic',
    date: '2024-09-12',
    time: '3:30 PM - 4:30 PM',
    instructor: 'Dr. Gauss',
    location: 'Room 302',
    description: 'Fractions visual representation',
    students: INITIAL_STUDENTS.slice(5, 15).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-15-math',
    title: 'Math Lab',
    category: 'Academic',
    date: '2024-09-15',
    time: '3:30 PM - 4:30 PM',
    instructor: 'Dr. Gauss',
    location: 'Room 302',
    description: 'Equations basics',
    students: INITIAL_STUDENTS.slice(5, 15).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-15-art',
    title: 'Art Class',
    category: 'Arts',
    date: '2024-09-15',
    time: '2:00 PM - 3:30 PM',
    instructor: 'Miss Monet',
    location: 'Art Studio B',
    description: 'Charcoal shading',
    students: INITIAL_STUDENTS.slice(0, 12).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-18-math',
    title: 'Math Lab',
    category: 'Academic',
    date: '2024-09-18',
    time: '3:30 PM - 4:30 PM',
    instructor: 'Dr. Gauss',
    location: 'Room 302',
    description: 'Ratios and percentage games',
    students: INITIAL_STUDENTS.slice(5, 15).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-20-art',
    title: 'Art Class',
    category: 'Arts',
    date: '2024-09-20',
    time: '2:00 PM - 3:30 PM',
    instructor: 'Miss Monet',
    location: 'Art Studio B',
    description: 'Landscape oil pastel sketching',
    students: INITIAL_STUDENTS.slice(0, 12).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-21-math',
    title: 'Math Lab',
    category: 'Academic',
    date: '2024-09-21',
    time: '3:30 PM - 4:30 PM',
    instructor: 'Dr. Gauss',
    location: 'Room 302',
    description: 'Math contest training session',
    students: INITIAL_STUDENTS.slice(5, 15).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-24-math',
    title: 'Math Lab',
    category: 'Academic',
    date: '2024-09-24',
    time: '3:30 PM - 4:30 PM',
    instructor: 'Dr. Gauss',
    location: 'Room 302',
    description: 'Coordinates plane battle games',
    students: INITIAL_STUDENTS.slice(5, 15).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-25-art',
    title: 'Art Class',
    category: 'Arts',
    date: '2024-09-25',
    time: '2:00 PM - 3:30 PM',
    instructor: 'Miss Monet',
    location: 'Art Studio B',
    description: 'Self-portrait pencil drawing',
    students: INITIAL_STUDENTS.slice(0, 12).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-27-math',
    title: 'Math Lab',
    category: 'Academic',
    date: '2024-09-27',
    time: '3:30 PM - 4:30 PM',
    instructor: 'Dr. Gauss',
    location: 'Room 302',
    description: 'Geometric volume models assembly',
    students: INITIAL_STUDENTS.slice(5, 15).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-30-math',
    title: 'Math Lab',
    category: 'Academic',
    date: '2024-09-30',
    time: '3:30 PM - 4:30 PM',
    instructor: 'Dr. Gauss',
    location: 'Room 302',
    description: 'Probability and spinners experiment',
    students: INITIAL_STUDENTS.slice(5, 15).map(s => ({ ...s, status: 'none' }))
  },
  {
    id: 'cal-sept-30-art',
    title: 'Art Class',
    category: 'Arts',
    date: '2024-09-30',
    time: '2:00 PM - 3:30 PM',
    instructor: 'Miss Monet',
    location: 'Art Studio B',
    description: 'Paper mache animals base build',
    students: INITIAL_STUDENTS.slice(0, 12).map(s => ({ ...s, status: 'none' }))
  }
];

export const FACILITY_REMINDERS = [
  'Gym A floor was polished today; please ensure all students have clean sneakers.',
  'Equipment closet key must be returned to the main office by 5:15 PM.',
  'Heavy rain expected; outdoor practices should move to the auxiliary gym.'
];

export const SYSTEM_HELP_TOPICS = [
  {
    title: 'How do I submit attendance?',
    content: 'Ensure all students have an active status (Present or Absent) then click the blue "Submit Attendance" button at the top-right. Submitted sessions are synced with the parent notification system.'
  },
  {
    title: 'What is Check-In Mode?',
    content: 'Check-In Mode starts a simplified, fullscreen kiosk interface designed for students. Students can find their name or enter their ID to quickly check themselves in as they arrive.'
  },
  {
    title: 'Can parents see instructor notes?',
    content: 'By default, notes are public to parents. Check the "Mark as private" box to restrict comments to internal admin and instructors only.'
  },
  {
    title: 'How do I export records?',
    content: 'Go to the "Export Reports" tab in the sidebar. You can filter by date range, category, or class grade, and download the report as a CSV spreadsheet or formatted PDF.'
  }
];
