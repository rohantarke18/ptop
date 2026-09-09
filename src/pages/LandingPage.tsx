import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { analyticsService } from '../services/analyticsService';
import { complaintService } from '../services/complaintService';
import { PublicMetrics, Problem } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Lightbulb,
  Vote,
  AlertCircle,
  Building2,
  FileCheck2,
  TrendingUp,
  MapPin,
  ChevronRight,
  Activity,
  Layers,
  FileText,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState<PublicMetrics | null>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [recentResolved, setRecentResolved] = useState<Problem[]>([]);
  const [quickTrackId, setQuickTrackId] = useState('');

  useEffect(() => {
    analyticsService.getPublicMetrics().then(setMetrics);
    analyticsService.getResolutionTrends().then(setTrends);
    complaintService.getComplaints().then((items) => {
      setRecentResolved(items.filter((p) => p.status === 'Resolved' || p.status === 'Citizen Verification').slice(0, 3));
    });
  }, []);

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      navigate(`/track?id=${encodeURIComponent(quickTrackId.trim())}`);
    } else {
      navigate('/track');
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* ===================================================
          1. HERO SECTION
         =================================================== */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-12 lg:pb-20 border-b border-slate-200 bg-white">
        {/* Subtle background coordinate grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>Public Civic Participation & Grievance Governance</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {t.hero.headline}
            </h1>

            {/* Supporting paragraph */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {t.hero.supporting}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/report"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs transition-colors"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
              >
                <span>{t.hero.secondaryCta}</span>
              </Link>
            </div>

            {/* Quick Track Input */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 max-w-md">
              <form onSubmit={handleQuickTrack} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={quickTrackId}
                    onChange={(e) => setQuickTrackId(e.target.value)}
                    placeholder={t.hero.quickTrackPlaceholder}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-md border border-slate-300 bg-slate-50 focus:bg-white focus:outline-blue-600 placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer"
                >
                  {t.hero.quickTrackButton}
                </button>
              </form>
            </div>
          </div>

          {/* Conceptual Journey Visual Diagram (From Protest to Participation) */}
          <div className="mt-12 lg:mt-16 pt-8 border-t border-slate-200">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-4">
              The Accountable Civic Journey
            </div>

            {/* 5-Step Horizontal Flow */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { stage: '01', name: t.hero.journey.report, desc: 'Citizen evidence & geo-tagging', icon: AlertCircle, color: 'text-blue-600 bg-blue-50 border-blue-200' },
                { stage: '02', name: t.hero.journey.action, desc: 'Department SLA dispatch', icon: Building2, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
                { stage: '03', name: t.hero.journey.verification, desc: 'Citizen proof confirmation', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                { stage: '04', name: t.hero.journey.innovation, desc: 'Youth & expert solutions', icon: Lightbulb, color: 'text-amber-600 bg-amber-50 border-amber-200' },
                { stage: '05', name: t.hero.journey.policy, desc: 'Consultative civic bylaws', icon: Vote, color: 'text-purple-600 bg-purple-50 border-purple-200' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.stage}
                    className="relative bg-white p-3.5 rounded-lg border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold text-slate-400">
                          {item.stage}
                        </span>
                        <div className={`p-1.5 rounded ${item.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          2. TRUST / PURPOSE SECTION
         =================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-2xs">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600">
              Transforming Public Grievances
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.trust.heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.trust.subheading}
            </p>
          </div>

          {/* Process Breakdown Visualization */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            {/* The Old Grievance System */}
            <div className="p-5 rounded-lg bg-rose-50/40 border border-rose-100 text-slate-800">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>The Traditional Problem: Broken Redressal</span>
              </div>
              <ul className="mt-4 space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Complaints disappear into bureaucratic black boxes without public SLA transparency.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Cases are marked "closed" on paper without photographic proof or citizen inspection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Zero mechanism for citizens to propose structural community solutions to chronic issues.</span>
                </li>
              </ul>
            </div>

            {/* The CivicBridge Cycle */}
            <div className="p-5 rounded-lg bg-emerald-50/50 border border-emerald-200 text-slate-900">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>The CivicBridge Standard: Verified Accountability</span>
              </div>
              <ul className="mt-4 space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Citizen Verification Lock:</strong> Cases cannot be closed until reporting citizens inspect resolution evidence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Transparent SLAs:</strong> Public escalation countdowns visible to all ward residents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Idea-to-Policy Loop:</strong> Recurring problems trigger municipal innovation challenges and open consultations.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          3. HOW IT WORKS (6 STEPS)
         =================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600">
            Transparent Lifecycle
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.howItWorks.title}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.howItWorks.steps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-mono font-black text-slate-300">
                    {step.num}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-xs font-semibold">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================
          4. MAIN ACTIONS (3 STRONG FEATURE AREAS)
         =================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Action 1: Report a Problem */}
          <div className="bg-white rounded-lg border-2 border-slate-200 hover:border-blue-500 p-6 flex flex-col justify-between transition-all shadow-2xs">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <AlertCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                {t.actions.reportPrompt}
              </span>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {t.actions.reportTitle}
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {t.actions.reportDesc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/report"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors"
              >
                <span>{t.actions.reportBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Action 2: Propose a Solution */}
          <div className="bg-white rounded-lg border-2 border-slate-200 hover:border-amber-500 p-6 flex flex-col justify-between transition-all shadow-2xs">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
                {t.actions.innovatePrompt}
              </span>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {t.actions.innovateTitle}
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {t.actions.innovateDesc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/innovations"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-2xs transition-colors"
              >
                <span>{t.actions.innovateBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Action 3: Shape Policy */}
          <div className="bg-white rounded-lg border-2 border-slate-200 hover:border-purple-500 p-6 flex flex-col justify-between transition-all shadow-2xs">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Vote className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 block">
                {t.actions.policyPrompt}
              </span>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {t.actions.policyTitle}
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {t.actions.policyDesc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/consultations"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-2xs transition-colors"
              >
                <span>{t.actions.policyBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          5. PUBLIC STATS & LIVE CIVIC ACTIVITY
         =================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-xl text-white p-6 sm:p-10 shadow-lg border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                Open Governance Metrics
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t.publicStats.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                {t.publicStats.subtitle}
              </p>
            </div>

            <Link
              to="/public-dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shrink-0"
            >
              <span>{t.publicStats.viewFullDashboard}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Key Stat Blocks */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-8 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400 font-medium block">
                {t.publicStats.reported}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">
                {metrics ? metrics.totalReported.toLocaleString() : '12,481'}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Logged with geo-coordinates
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-medium block">
                {t.publicStats.resolved}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 block">
                {metrics ? metrics.totalResolved.toLocaleString() : '9,842'}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                With photographic proof
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-medium block">
                {t.publicStats.verifiedRate}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 mt-1 block">
                {metrics ? `${metrics.verificationRate}%` : '78.4%'}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Confirmed by reporting citizens
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-medium block">
                {t.publicStats.avgTime}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 block">
                {metrics ? `${metrics.averageResolutionDays} ${t.publicStats.days}` : '3.2 days'}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Average administrative SLA
              </span>
            </div>
          </div>

          {/* Chart Section */}
          <div className="pt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>{t.publicStats.liveActivity}</span>
              </h3>
              <span className="text-[11px] text-slate-400">Monthly Aggregates</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '6px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="reported"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorReported)"
                    name="Problems Reported"
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorResolved)"
                    name="Problems Resolved"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          6. RECENT RESOLVED SHOWCASE
         =================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Verified Public Resolutions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Recent civic issues resolved on the ground with uploaded completion proof.
            </p>
          </div>
          <Link
            to="/track"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Track by ID</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentResolved.map((problem) => (
            <Link
              key={problem.id}
              to={`/problems/${problem.id}`}
              className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    {problem.id}
                  </span>
                  <StatusBadge status={problem.status} size="sm" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-2">
                  {problem.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1.5">
                  {problem.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{problem.location.ward}</span>
                </span>
                <span className="shrink-0 font-medium text-blue-600">Inspect Case →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
