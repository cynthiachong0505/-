import { useState } from 'react';
import { FileDown, Calendar, Filter, FileSpreadsheet, FileText, CheckCircle, Search } from 'lucide-react';
import { Activity } from '../types';

interface ExportReportsProps {
  activities: Activity[];
}

export default function ExportReports({ activities }: ExportReportsProps) {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateRange, setDateRange] = useState('This Month');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState('');

  const filteredActs = activities.filter((act) => {
    const matchesCategory = categoryFilter === 'All' || act.category === categoryFilter;
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleExport = (type: 'csv' | 'pdf') => {
    setDownloadSuccess(`Successfully compiled and exported report as ${type.toUpperCase()}!`);
    setTimeout(() => {
      setDownloadSuccess('');
    }, 4000);
  };

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="font-display text-3xl font-bold text-on-surface tracking-tight mb-1">
          Export Reports
        </h2>
        <p className="text-on-surface-variant font-medium text-sm">
          Compile, filter and export student extracurricular attendance logs
        </p>
      </div>

      {downloadSuccess && (
        <div className="p-4 bg-secondary-container/20 border-l-4 border-secondary text-on-secondary-container rounded-r-xl flex items-center gap-2 text-sm font-semibold shadow-2xs">
          <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Filter panel */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <span>Filter Parameters</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-variant" htmlFor="filter-cat">
              Activity Category
            </label>
            <select
              id="filter-cat"
              className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg text-xs font-medium focus:outline-hidden"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Athletics">Athletics</option>
              <option value="Arts">Arts</option>
              <option value="STEM">STEM</option>
              <option value="Clubs">Clubs</option>
              <option value="Academic">Academic</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-variant" htmlFor="filter-range">
              Date Range
            </label>
            <select
              id="filter-range"
              className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg text-xs font-medium focus:outline-hidden"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="This Month">This Month (Sept 2024)</option>
              <option value="Last Month">Last Month</option>
              <option value="Full Semester">Fall Semester 2024</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-variant" htmlFor="filter-search">
              Keyword Search
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-on-surface-variant/60" />
              <input
                id="filter-search"
                type="text"
                className="w-full pl-8 pr-3 py-2 bg-surface border border-outline-variant rounded-lg text-xs font-medium focus:outline-hidden"
                placeholder="Search training, coach..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-end justify-start gap-2">
            <button
              onClick={() => handleExport('csv')}
              className="flex-1 py-2 bg-primary hover:bg-primary-container text-white rounded-lg text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex-1 py-2 bg-surface border border-outline-variant hover:bg-surface-container-high rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer text-on-surface"
            >
              <FileText className="w-3.5 h-3.5 text-error" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-2xs">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface flex items-center justify-between">
          <span className="font-semibold text-sm text-on-surface">Compiled Records Ready for Export</span>
          <span className="text-xs font-bold text-on-surface-variant/70">
            {filteredActs.length} Programs Found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/40 text-on-surface-variant font-semibold text-xs border-b border-outline-variant">
                <th className="px-6 py-3.5">Activity</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Date &amp; Time</th>
                <th className="px-6 py-3.5">Instructor</th>
                <th className="px-6 py-3.5 text-center">Present / Enrolled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredActs.map((act) => {
                const total = act.students.length;
                const present = act.students.filter((s) => s.status === 'present').length;
                const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

                return (
                  <tr key={act.id} className="hover:bg-primary/5 transition-colors text-xs font-medium text-on-surface-variant">
                    <td className="px-6 py-3.5 font-bold text-on-surface">{act.title}</td>
                    <td className="px-6 py-3.5">{act.category}</td>
                    <td className="px-6 py-3.5">
                      {act.date} • {act.time}
                    </td>
                    <td className="px-6 py-3.5">{act.instructor}</td>
                    <td className="px-6 py-3.5 text-center font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <span>{present} / {total}</span>
                        <span className="text-[10px] text-secondary font-bold bg-secondary/10 px-1.5 py-0.5 rounded">
                          {percentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
