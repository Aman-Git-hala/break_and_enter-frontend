import React, { useState, useEffect } from "react";
import { Radar, Doughnut } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, RadialLinearScale,
  PointElement, LineElement, ArcElement, Tooltip, Legend, Filler
} from "chart.js";
import {
  ArrowLeft, CheckCircle2, Award, User, Mail, Phone, GraduationCap,
  Linkedin, Briefcase, Loader2, Github, BrainCircuit, ShieldCheck, Lock, Code,
  FileText, ChevronDown, ChevronUp, Copy
} from "lucide-react";
import { API_URL } from "../config"; // <--- 1. IMPORT CONFIG

ChartJS.register(CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

// Animation Steps
const STEPS = [
  { label: "Scanning Resume Structure...", icon: <Briefcase className="text-blue-400" /> },
  { label: "Validating GitHub Activity...", icon: <Github className="text-white" /> },
  { label: "Computing Skill Complexity...", icon: <BrainCircuit className="text-purple-400" /> },
  { label: "Finalizing Verification...", icon: <ShieldCheck className="text-green-400" /> }
];

const levelMap = { Low: 30, Medium: 60, High: 90, Experimental: 40, Stable: 85, Occasional: 55, Consistent: 85, Active: 90, Stale: 40, Dormant: 10, "One-off": 20 };

export default function PlatformAnalysis() {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location.state?.profile; // Get data passed from Dashboard

  const [aiResults, setAiResults] = useState(null);
  const [loadingAI, setLoadingAI] = useState(true);
  const [error, setError] = useState(null); // New Error State
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [progressStep, setProgressStep] = useState(0);
  const [revealContent, setRevealContent] = useState(false);
  const [showResume, setShowResume] = useState(false);

  // 1. Redirect if no profile data (prevent crash on refresh)
  useEffect(() => {
    if (!profile) navigate("/dashboard");
  }, [profile, navigate]);

  // 2. Animation Logic
  useEffect(() => {
    if (!profile) return;
    const stepInterval = setInterval(() => {
      setProgressStep(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1500);
    const transitionTimeout = setTimeout(() => {
      setShowIntro(false);
      setTimeout(() => setRevealContent(true), 500);
    }, 4000);
    return () => { clearInterval(stepInterval); clearTimeout(transitionTimeout); };
  }, [profile]);

  // 3. FETCH AI ANALYSIS FROM RENDER
  useEffect(() => {
    if (!profile) return;
    const fetchAI = async () => {
      try {
        setError(null);
        // Direct call to AI Microservice to avoid backend timeouts
        const AI_URL = "https://ror-12-skill-engine.hf.space/analyze/github";

        const res = await fetch(AI_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            github_username: profile.user,
            skills: profile.skills_found
          })
        });

        // CRITICAL: Parse NDJSON/Smashed JSON manually
        const rawText = await res.text();
        if (!rawText.trim()) throw new Error("Empty response from AI");

        // 1. Sanitize the string
        let cleanText = rawText.replace(/\n/g, "").trim(); // Remove newlines
        cleanText = cleanText.replace(/}{/g, "},{");      // Fix smashed objects

        // 2. Wrap in brackets if missing
        if (!cleanText.startsWith("[")) {
          cleanText = `[${cleanText}]`;
        }

        // 3. Parse JSON Array
        let streamData;
        try {
          streamData = JSON.parse(cleanText);
        } catch (e) {
          console.error("JSON Parse Error:", e, "Raw:", rawText);
          throw new Error("Invalid JSON format from AI");
        }

        // 4. Transform Array -> Object Map (to match previous backend format)
        const finalResults = {};
        if (Array.isArray(streamData)) {
          streamData.forEach(item => {
            if (item.status) return; // Skip status messages
            // Merge skill objects into final results
            Object.assign(finalResults, item);
          });
        } else {
          // Fallback if it somehow returned a single object
          Object.assign(finalResults, streamData);
        }

        if (Object.keys(finalResults).length === 0) {
          throw new Error("No analysis data found in response");
        }

        setAiResults(finalResults);
      } catch (err) {
        console.error("AI Fetch Error:", err);
        setError(err.message);
      }
      finally { setLoadingAI(false); }
    };
    fetchAI();
  }, [profile]);

  if (!profile) return null;

  const skillsList = aiResults ? Object.keys(aiResults) : [];
  const educationList = profile.education || [];
  const experienceList = profile.experience || [];

  // Chart Helpers
  const getScoreLevel = (score) => {
    const percent = score * 100;
    if (percent > 50) return { label: "Skilled", color: "text-green-400", border: "border-green-500/50", bg: "bg-green-500/10" };
    if (percent >= 40) return { label: "Moderate", color: "text-yellow-400", border: "border-yellow-500/50", bg: "bg-yellow-500/10" };
    return { label: "Beginner", color: "text-red-400", border: "border-red-500/50", bg: "bg-red-500/10" };
  };

  const getChartData = () => {
    if (!aiResults) return null;
    const skilled = skillsList.filter(s => (aiResults[s].semantic_similarity.score * 100) > 50).length;
    const moderate = skillsList.filter(s => (aiResults[s].semantic_similarity.score * 100) >= 40 && (aiResults[s].semantic_similarity.score * 100) <= 50).length;
    const beginner = skillsList.length - skilled - moderate;
    return {
      labels: ["Skilled", "Moderate", "Beginner"],
      datasets: [{
        data: [skilled, moderate, beginner],
        backgroundColor: ["#4ade80", "#facc15", "#f87171"],
        borderColor: "#0f0529",
        borderWidth: 2
      }]
    };
  };

  const topSkill = skillsList.length > 0
    ? skillsList.reduce((a, b) => aiResults[a].semantic_similarity.score > aiResults[b].semantic_similarity.score ? a : b)
    : "N/A";

  return (
    <div className="min-h-screen bg-[#0f0529] text-white p-6 bg-[url('/grid-pattern.svg')] bg-fixed overflow-x-hidden">

      {/* Header */}
      <div className={`max-w-7xl mx-auto flex items-center justify-between mb-8 pb-4 border-b border-white/10 transition-opacity duration-1000 ${showIntro ? "opacity-0" : "opacity-100"}`}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="p-2 hover:bg-white/10 rounded-full transition"><ArrowLeft /></button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Analysis Report</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative">

        {/* Intro Loading Card */}
        <div className={`transition-all duration-1000 ease-in-out ${showIntro ? "fixed inset-0 z-50 flex items-center justify-center bg-[#0f0529]/95 backdrop-blur-sm" : "hidden"}`}>
          <div className="w-full max-w-md bg-slate-900 border border-purple-500/30 rounded-2xl p-8 shadow-2xl scale-110">
            <h3 className="text-xl font-bold mb-6 text-center text-white flex items-center justify-center gap-2">
              <Loader2 className="animate-spin text-purple-400" /> Processing Profile
            </h3>
            <div className="space-y-5">
              {STEPS.map((step, index) => {
                const isActive = index === progressStep;
                const isCompleted = index < progressStep;
                return (
                  <div key={index} className={`flex items-center gap-4 transition-all duration-500 ${isActive || isCompleted ? "opacity-100" : "opacity-30"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isActive ? "border-purple-500 bg-purple-500/20" : isCompleted ? "border-green-500 bg-green-500/20" : "border-slate-700"}`}>
                      {isCompleted ? <CheckCircle2 size={16} className="text-green-400" /> : isActive ? <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" /> : step.icon}
                    </div>
                    <p className={`text-sm ${isActive ? "text-purple-300 font-medium" : "text-gray-400"}`}>{step.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`space-y-8 transition-all duration-1000 ${revealContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          {/* Profile Section */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Candidate Profile</p>
              <h2 className="text-3xl font-bold text-white mb-2">{profile.user}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-2"><Mail size={14} className="text-blue-400" /> {profile.email}</span>
                <span className="flex items-center gap-2"><Phone size={14} className="text-green-400" /> {profile.phone}</span>
              </div>
            </div>
            <div className="bg-white/5 px-6 py-3 rounded-xl border border-white/5">
              <p className="text-xs text-gray-400 mb-1">Education</p>
              <div className="flex items-center gap-2 font-medium text-yellow-100">
                <GraduationCap size={18} className="text-yellow-400" />
                {educationList[0] || "N/A"}
              </div>
            </div>
          </div>



          {/* Resume Raw Text (Collapsible) */}
          {profile.raw_text && (
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => setShowResume(!showResume)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    <FileText size={20} />
                  </div>
                  <span className="font-semibold text-gray-200">Parsed Resume Content</span>
                </div>
                {showResume ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
              </button>

              {showResume && (
                <div className="p-6 border-t border-white/10 bg-[#0a0a0a] relative group">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(profile.raw_text); }}
                    className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition opacity-0 group-hover:opacity-100"
                    title="Copy Text"
                  >
                    <Copy size={16} className="text-gray-300" />
                  </button>
                  <pre className="whitespace-pre-wrap text-sm text-green-400/80 font-mono leading-relaxed max-h-96 overflow-y-auto custom-scrollbar">
                    {profile.raw_text}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Github Analysis */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Github className="text-white" /> GitHub Analysis</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Charts */}
              <div className="space-y-6">
                <div className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold mb-4 text-center">Skill Distribution</h3>
                  <div className="h-56 flex justify-center">
                    {loadingAI ? (
                      <div className="h-40 w-40 rounded-full border-4 border-slate-700 border-t-purple-500 animate-spin"></div>
                    ) : error ? (
                      <div className="text-center">
                        <p className="text-red-400 font-bold mb-2">Analysis Failed</p>
                        <p className="text-xs text-red-300 max-w-[200px]">{error}</p>
                      </div>
                    ) : aiResults ? (
                      <Doughnut data={getChartData()} options={{ plugins: { legend: { position: 'bottom', labels: { color: 'white' } } } }} />
                    ) : (
                      <p className="text-gray-500 text-sm mt-10">No data available</p>
                    )}
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold mb-4">Summary</h3>
                  {loadingAI ? <div className="space-y-3 animate-pulse"><div className="h-10 bg-slate-800 rounded"></div><div className="h-10 bg-slate-800 rounded"></div></div> : (
                    <div className="space-y-4">
                      <StatRow label="Top Skill" value={topSkill} icon={<Award className="text-yellow-400" />} />
                      <StatRow label="Total Skills" value={skillsList.length} icon={<CheckCircle2 className="text-purple-400" />} />
                    </div>
                  )}
                </div>
              </div>

              {/* Skill Cards */}
              <div className="lg:col-span-2">
                {loadingAI ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="bg-slate-800/50 h-32 rounded-xl animate-pulse"></div>)}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
                    {skillsList.map((skill) => {
                      const data = aiResults[skill];
                      const score = data.semantic_similarity.score;
                      const level = getScoreLevel(score);
                      return (
                        <div key={skill} onClick={() => setSelectedSkill(skill)} className={`relative p-5 rounded-xl border cursor-pointer transition hover:scale-[1.02] hover:shadow-lg backdrop-blur-md ${level.border} ${level.bg}`}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold">{skill}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-bold bg-black/30 ${level.color}`}>{level.label}</span>
                          </div>
                          <div className="flex items-end gap-2 mb-2"><span className="text-4xl font-bold">{(score * 100).toFixed(0)}%</span><span className="text-sm text-gray-400 mb-1">Confidence</span></div>
                          <p className="text-sm text-gray-300">Evidence: <span className="text-white font-medium">{data.semantic_similarity.evidence || "None"}</span></p>
                          <p className="text-xs text-blue-300 mt-2">Click for details →</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Integrations & Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6 flex flex-col items-center text-center opacity-60 hover:opacity-100 transition cursor-not-allowed">
                <Linkedin size={40} className="text-blue-500 mb-3" />
                <h3 className="text-lg font-bold">LinkedIn Analysis</h3>
                <div className="mt-2 flex items-center gap-1 text-xs text-yellow-500"><Lock size={12} /> Coming Soon</div>
              </div>
              <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6 flex flex-col items-center text-center opacity-60 hover:opacity-100 transition cursor-not-allowed">
                <Code size={40} className="text-orange-500 mb-3" />
                <h3 className="text-lg font-bold">LeetCode Analysis</h3>
                <div className="mt-2 flex items-center gap-1 text-xs text-yellow-500"><Lock size={12} /> Coming Soon</div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-slate-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-cyan-300"><Briefcase size={20} /> Professional Experience</h2>
              {experienceList.length > 0 ? (
                <div className="relative border-l-2 border-cyan-500/30 ml-2 space-y-8">
                  {experienceList.map((e, i) => (
                    <div key={i} className="ml-6 relative">
                      <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500"></span>
                      <p className="text-sm text-gray-200 bg-white/5 p-4 rounded-lg border border-white/5 shadow-sm animate-slide-in" style={{ animationDelay: `${i * 100}ms` }}>
                        {e}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic text-center py-4">No experience extracted from resume.</p>
              )}
            </div>

          </div>
        </div>
      </div >

      {selectedSkill && aiResults && (
        <SkillModal skill={selectedSkill} data={aiResults[selectedSkill]} onClose={() => setSelectedSkill(null)} />
      )
      }
    </div >
  );
}

// Helpers
function StatRow({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
      <div className="flex items-center gap-3">{icon}<span className="text-gray-300">{label}</span></div>
      <span className="font-bold text-lg">{value}</span>
    </div>
  );
}

function SkillModal({ skill, data, onClose }) {
  const radarData = {
    labels: ['Complexity', 'Maturity', 'Consistency', 'Recency'],
    datasets: [{
      label: skill,
      data: [levelMap[data.complexity] || 20, levelMap[data.project_maturity] || 20, levelMap[data.consistency] || 20, levelMap[data.recency] || 20],
      backgroundColor: 'rgba(168, 85, 247, 0.4)',
      borderColor: '#a855f7',
      borderWidth: 2,
      pointBackgroundColor: '#fff',
    }]
  };
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-[#1a103c] border border-purple-500/30 w-full max-w-lg rounded-2xl p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✖</button>
        <h2 className="text-2xl font-bold mb-1">{skill}</h2>
        <p className="text-purple-400 text-sm mb-6">Detailed Metrics Breakdown</p>
        <div className="h-64"><Radar data={radarData} options={{ scales: { r: { angleLines: { color: 'rgba(255, 255, 255, 0.1)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }, pointLabels: { color: '#e5e7eb', font: { size: 12 } }, ticks: { display: false } } } }} /></div>
        <div className="grid grid-cols-2 gap-3 mt-6">
          <DetailBox label="Complexity" value={data.complexity} />
          <DetailBox label="Maturity" value={data.project_maturity} />
          <DetailBox label="Consistency" value={data.consistency} />
          <DetailBox label="Recency" value={data.recency} />
        </div>
      </div>
    </div>
  );
}

function DetailBox({ label, value }) {
  return (
    <div className="bg-white/5 p-2 rounded text-center border border-white/5">
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}