import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Shield, UserCheck, HelpCircle, X, ChevronRight } from 'lucide-react';

export const RoleSwitcherBanner: React.FC = () => {
  const { role, switchRoleForDemo, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const roles: { key: UserRole; label: string; desc: string }[] = [
    { key: 'citizen', label: 'Citizen', desc: 'Report, track, submit solutions & verify resolution' },
    { key: 'officer', label: 'Executive Officer', desc: 'Inspect cases, upload evidence & update status' },
    { key: 'department_admin', label: 'Department Admin', desc: 'Triage, assign officers & monitor SLAs' },
    { key: 'expert', label: 'Civic Expert', desc: 'Score & evaluate citizen innovation proposals' },
    { key: 'super_admin', label: 'Super Admin', desc: 'Full municipal system audit & cross-dept access' },
  ];

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-3 left-3 z-50 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-slate-700 flex items-center gap-1.5 hover:bg-slate-800 cursor-pointer"
        title="Open Role Simulator"
      >
        <Shield className="w-3.5 h-3.5 text-amber-400" />
        <span className="font-semibold uppercase tracking-wider text-[10px]">Persona: {role}</span>
      </button>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-amber-400 uppercase tracking-wider text-[10px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
            <Shield className="w-3 h-3" />
            Evaluation Persona Switcher
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Active: <strong className="text-white">{user?.name}</strong> ({role.replace('_', ' ')})
          </span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          {roles.map((r) => (
            <button
              key={r.key}
              onClick={() => switchRoleForDemo(r.key)}
              type="button"
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer whitespace-nowrap ${
                role === r.key
                  ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
              title={r.desc}
            >
              {r.label}
            </button>
          ))}

          <button
            onClick={() => setCollapsed(true)}
            className="p-1 text-slate-400 hover:text-white ml-2"
            title="Minimize Persona Switcher"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
