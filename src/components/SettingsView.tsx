import { useState } from 'react';
import { Save, Bell, Shield, Database, Sparkles, Check } from 'lucide-react';

export default function SettingsView() {
  const [notifyParents, setNotifyParents] = useState(true);
  const [allowSelfCheck, setAllowSelfCheck] = useState(true);
  const [emailDigest, setEmailDigest] = useState('daily');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
        <div>
          <h2 className="font-display text-3xl font-bold text-on-surface tracking-tight mb-1">
            System Settings
          </h2>
          <p className="text-on-surface-variant font-medium text-sm">
            Configure system rules, notification schemas, and access keys
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold shadow-md shadow-primary/10 hover:bg-primary-container transition-all flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-secondary-container/20 border-l-4 border-secondary text-on-secondary-container rounded-r-xl flex items-center gap-2 text-sm font-semibold shadow-2xs">
          <Check className="w-4 h-4 text-secondary shrink-0" />
          <span>System configuration updated successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Parent Sync settings */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-2xs space-y-5">
          <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <span>Communications &amp; Sync</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface block">
                  Automate parent SMS/Email notifications
                </label>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Automatically notify parents or emergency contacts immediately when a student is marked as Absent or Excused.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifyParents}
                onChange={(e) => setNotifyParents(e.target.checked)}
                className="w-10 h-6 bg-surface-container-high rounded-full border border-outline-variant text-primary focus:ring-primary cursor-pointer shrink-0"
              />
            </div>

            <div className="flex items-start justify-between gap-4 pt-4 border-t border-outline-variant/40">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface block">
                  Weekly digestive email report
                </label>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Select frequency for school administration to receive compiled reports.
                </p>
              </div>
              <select
                className="px-2 py-1 bg-surface border border-outline-variant rounded text-xs font-medium focus:outline-hidden"
                value={emailDigest}
                onChange={(e) => setEmailDigest(e.target.value)}
              >
                <option value="daily">Daily Summary</option>
                <option value="weekly">Weekly Compilation</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Card: Security & Auth rules */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-2xs space-y-5">
          <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Kiosk Mode Security</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface block">
                  Allow students to self-check-in
                </label>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Permit students to find their name or ID in Kiosk Mode to toggle status. Turn off to restrict Kiosk control to staff only.
                </p>
              </div>
              <input
                type="checkbox"
                checked={allowSelfCheck}
                onChange={(e) => setAllowSelfCheck(e.target.checked)}
                className="w-10 h-6 bg-surface-container-high rounded-full border border-outline-variant text-primary focus:ring-primary cursor-pointer shrink-0"
              />
            </div>

            <div className="flex items-start justify-between gap-4 pt-4 border-t border-outline-variant/40">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface block">
                  Instructor PIN protection
                </label>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Requires entering a 4-digit PIN to exit Kiosk Mode back to the administrative portal.
                </p>
              </div>
              <span className="text-[11px] text-secondary font-bold bg-secondary/10 px-2 py-1 rounded">
                Active: 1234
              </span>
            </div>
          </div>
        </div>

        {/* Full-width Card: Database back up */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-2xs space-y-4 md:col-span-2">
          <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            <span>Database Backup &amp; Resets</span>
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            All logs and data scheduled are persisted in your client browser cache database (<code className="font-mono bg-surface-container-high px-1 rounded font-bold">localStorage</code>) to maintain persistent user actions across sessions.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-4 py-2 bg-error/10 text-error border border-error/30 hover:bg-error/20 rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              Reset to Factory Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
