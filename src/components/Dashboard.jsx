import React, { useState } from "react";
import { API_URL } from "../config";
import { Upload, FileText, ArrowLeft, CheckCircle2, Loader2, Github, BrainCircuit, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ setAnalysisData, setPlatform }) {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState("idle");
  const [progressStep, setProgressStep] = useState(0);

  const steps = [
    { label: "Parsing Resume Data...", icon: <FileText className="text-blue-400" /> },
    { label: "Scanning GitHub Profile...", icon: <Github className="text-white" /> },
    { label: "Analyzing Code Complexity...", icon: <BrainCircuit className="text-purple-400" /> },
    { label: "Verifying Skill Evidence...", icon: <ShieldCheck className="text-green-400" /> }
  ];

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!resume) return;
    setStatus("analyzing");
    setProgressStep(0);

    const progressInterval = setInterval(() => {
      setProgressStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500);

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      // Use API_URL from config
      const res = await fetch(`${API_URL}/parse_resume`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      clearInterval(progressInterval);

      if (!res.ok) {
        alert("Error: " + (data.error || "Analysis failed"));
        setStatus("idle");
        return;
      }

      // Save FULL data object (profile + response)
      setAnalysisData(data);
      setPlatform("GitHub");

      // Pass profile data via state so PlatformAnalysis.jsx can read it
      navigate("/analysis", { state: { profile: data.profile } });

    } catch (err) {
      clearInterval(progressInterval);
      console.error(err);
      alert("Backend error. Is python app.py running?");
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0529] text-white bg-[url('/grid-pattern.svg')] bg-fixed">

      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#0f0529]/90 backdrop-blur text-white">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/")} className="p-2 hover:bg-white/10 rounded-full transition"><ArrowLeft size={20} /></button>
          <h2 className="font-bold text-xl tracking-tight">Dashboard</h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {status === "idle" ? (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Verify Skills. <br /> <span className="text-purple-400">Back It Up.</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Upload a resume to extract skill claims. Our AI will automatically verify them against GitHub activity.
                </p>
              </div>

              <div className="p-8 border-2 border-dashed border-purple-500/30 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-center">
                {!resume ? (
                  <label className="cursor-pointer flex flex-col items-center gap-4 py-8">
                    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Upload size={32} />
                    </div>
                    <span className="text-lg font-semibold block text-white">Click to upload resume</span>
                    <input type="file" hidden onChange={handleFileUpload} accept=".pdf,.docx" />
                  </label>
                ) : (
                  <div className="flex flex-col items-center gap-4 py-6">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                      <FileText size={32} />
                    </div>
                    <p className="text-xl font-medium text-white">{resume.name}</p>

                    <div className="flex gap-3 mt-2">
                      <button onClick={() => setResume(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Remove</button>
                      <button
                        onClick={handleAnalyze}
                        className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-purple-500 transition"
                      >
                        Start Analysis
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center relative">
              <img src="/upload-illustration.png" alt="Upload Illustration" className="relative z-10 w-full max-w-md drop-shadow-2xl" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-full max-w-md bg-slate-900 border border-purple-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-loading-bar"></div>
              <h2 className="text-2xl font-bold text-center mb-8">AI Analysis in Progress</h2>
              <div className="space-y-6">
                {steps.map((step, index) => {
                  const isActive = index === progressStep;
                  const isCompleted = index < progressStep;
                  return (
                    <div key={index} className={`flex items-center gap-4 transition-all duration-500 ${isActive ? "opacity-100 scale-105" : "opacity-50 grayscale"}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isActive ? "border-purple-500 bg-purple-500/20" : isCompleted ? "border-green-500 bg-green-500/20" : "border-slate-700 bg-slate-800"}`}>
                        {isCompleted ? <CheckCircle2 size={20} className="text-green-400" /> : isActive ? <Loader2 size={20} className="animate-spin text-purple-400" /> : step.icon}
                      </div>
                      <div>
                        <p className={`font-semibold ${isActive ? "text-white" : "text-gray-500"}`}>{step.label}</p>
                        {isActive && <p className="text-xs text-purple-400 animate-pulse">Processing...</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-xs text-gray-500 mt-8">This may take up to 60 seconds.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}