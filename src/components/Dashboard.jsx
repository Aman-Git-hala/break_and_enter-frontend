// import { useEffect, useState } from "react";
// import ProfileModal from "./ProfileModal";
// import PlatformAnalysis from "./PlatformAnalysis";
// import { githubAnalysis } from "../data/githubMock";
// function Dashboard() {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetchResults();
//     fetchProfile();
//   }, []);

//   // ================= API CALLS =================
//   const fetchResults = async () => {
//     try {
//       const res = await fetch("/api/results");
//       const data = await res.json();
//       setResults(data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProfile = async () => {
//     try {
//       const res = await fetch("/api/user/profile");
//       const data = await res.json();
//       setUser(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ================= FILE UPLOAD HANDLERS =================
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("resume", file);

//     try {
//       setUploading(true);

//       await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       setFile(null);
//       fetchResults();
//     } catch (err) {
//       console.error("Upload failed", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-100 flex flex-col">

//       {/* Navbar */}
//       <div className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">
//         <h1 className="text-lg font-semibold">Resume Dashboard</h1>
//         <button
//           onClick={() => setShowProfile(true)}
//           className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium"
//         >
//           Profile
//         </button>
//       </div>

//       {/* Content */}
//       <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Previous Results */}
//         <div className="bg-white rounded-lg shadow p-5">
//           <h2 className="font-semibold text-lg mb-4">Previous Results</h2>

//           {loading ? (
//             <p>Loading...</p>
//           ) : results.length === 0 ? (
//             <p className="text-gray-500">No results yet</p>
//           ) : (
//             <div className="space-y-3">
//               {results.map((r) => (
//                 <div
//                   key={r.id}
//                   className="border p-3 rounded flex justify-between items-center"
//                 >
//                   <div>
//                     <p className="font-medium">{r.filename}</p>
//                     <p className="text-sm text-gray-500">Score: {r.score}%</p>
//                   </div>
//                   <span className="text-xs text-gray-400">{r.date}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Upload Area */}
//         <div className="md:col-span-2 bg-blue-500 rounded-lg shadow flex items-center justify-center p-10">
//           <div className="border-2 border-dashed border-white/50 rounded-lg w-full h-full flex flex-col items-center justify-center text-white text-center">

//             <div className="text-4xl mb-3">☁️</div>
//             <h2 className="text-xl font-semibold mb-1">Upload Resume</h2>
//             <p className="text-sm mb-4">Drag and drop or browse files</p>

//             {!file ? (
//               <label className="bg-white text-blue-600 px-5 py-2 rounded cursor-pointer">
//                 Choose File
//                 <input
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={handleFileChange}
//                   hidden
//                 />
//               </label>
//             ) : (
//               <button
//                 onClick={handleUpload}
//                 disabled={uploading}
//                 className="bg-white text-blue-600 px-6 py-2 rounded font-medium hover:bg-gray-100"
//               >
//                 {uploading ? "Analyzing..." : "Analyze Resume"}
//               </button>
//             )}

//             {file && (
//               <p className="mt-3 text-sm">Selected: {file.name}</p>
//             )}
//           </div>
//         </div>

//       </div>

//       {/* Profile Modal */}
//       {showProfile && user && (
//         <ProfileModal
//           user={user}
//           onClose={() => setShowProfile(false)}
//         />
//       )}

//     </div>
//   );
// }

// export default Dashboard;

// export default function Dashboard() {
//   return (
//     <div className="p-6">
//       <div className="flex gap-6 overflow-x-auto">
//         <PlatformAnalysis platform="GitHub" analysis={githubAnalysis} />
//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { User, FileText, Upload, History } from "lucide-react";

// export default function Dashboard() {
//   const [resume, setResume] = useState(null);
//   const [showProfile, setShowProfile] = useState(false);
//   const [showHistory, setShowHistory] = useState(false);

//   const [user, setUser] = useState({
//     email: "guest@user.com",
//     name: "Guest User",
//     experience: 0
//   });

//   const [previousResumes, setPreviousResumes] = useState([]);
//   const fetchPreviousResumes = async () => {
//   try {
//     const res = await fetch("http://localhost:5000/resumes", {
//       credentials: "include"
//     });

//     const data = await res.json();
//     setPreviousResumes(data);

//   } catch (err) {
//     console.error(err);
//   }
// };



//   const handleFileUpload = (e) => {
//     setResume(e.target.files[0]);
//   };

//   // const handleAnalyze = () => {
//   //   alert("Resume sent to backend for analysis 🚀");
//   // };
//   const handleAnalyze = async () => {
//   if (!resume) return;

//   const formData = new FormData();
//   formData.append("resume", resume);

//   try {
//     const res = await fetch("http://localhost:5000/analyze", {
//       method: "POST",
//       credentials: "include", // VERY IMPORTANT for session
//       body: formData
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.error || "Analysis failed");
//       return;
//     }

//     alert("Resume analyzed successfully ✅");
//     console.log("ML Response:", data);

//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };


//   return (
//     <div className="min-h-screen bg-slate-950 text-white">

//       {/* Top Bar */}
//       <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800">
        
//         {/* Left */}
//         <button
//           onClick={() => {
//             fetchPreviousResumes();
//             setShowHistory(true);
//           }}

//           className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100"
//         >
//           <History size={18} /> Previous Analysis
//         </button>

//         {/* Right */}
//         <button
//           onClick={() => setShowProfile(true)}
//           className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100"
//         >
//           <User size={18} /> {user.name}
//         </button>
//       </div>

//       {/* Main Upload Section */}
//       <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 gap-10">

//         {/* Left Text */}
//         <div className="max-w-xl">
//           <h1 className="text-4xl font-bold mb-4">Upload Your Files</h1>
//           <p className="text-gray-400 mb-6">
//             Upload your resume and get AI‑powered insights from GitHub, LeetCode and more platforms.
//           </p>

//           {!resume ? (
//             <label className="inline-flex items-center gap-2 bg-indigo-600 px-6 py-3 rounded-lg cursor-pointer hover:bg-indigo-700">
//               <Upload size={18} /> Upload Resume
//               <input type="file" hidden onChange={handleFileUpload} />
//             </label>
//           ) : (
//             <button
//               onClick={handleAnalyze}
//               className="bg-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-700"
//             >
//               Analyze Resume
//             </button>
//           )}

//           {resume && (
//             <p className="mt-3 text-sm text-gray-400">Selected: {resume.name}</p>
//           )}
//         </div>

//         {/* Right Illustration */}
//         <div className="flex justify-center w-full md:w-1/2 px-6 md:px-16">
//           <img src="/upload-illustration.png" alt="upload" className="w-75 md:w-105"/>
          
//         </div>
//       </div>

//       {/* Profile Modal */}
//       {showProfile && (
//         <Modal title="Profile" onClose={() => setShowProfile(false)}>
//           <div className="space-y-4">
//             <div>
//               <label>Email</label>
//               <input
//                 value={user.email}
//                 disabled
//                 className="w-full bg-slate-800 p-2 rounded mt-1"
//               />
//             </div>

//             <div>
//               <label>Name</label>
//               <input
//                 value={user.name}
//                 onChange={(e) => setUser({ ...user, name: e.target.value })}
//                 className="w-full bg-slate-800 p-2 rounded mt-1"
//               />
//             </div>

//             <div>
//               <label>Experience (years)</label>
//               <input
//                 type="number"
//                 value={user.experience}
//                 onChange={(e) => setUser({ ...user, experience: e.target.value })}
//                 className="w-full bg-slate-800 p-2 rounded mt-1"
//               />
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* History Modal */}
//       {showHistory && (
//         <Modal title="Previous Analysis" onClose={() => setShowHistory(false)}>
//           <div className="space-y-3">
//             {/* {previousResumes.map((r) => (
//               <div
//                 key={r.id}
//                 className="flex items-center justify-between bg-slate-800 p-3 rounded hover:bg-slate-700 cursor-pointer"
//               >
//                 <div className="flex items-center gap-2">
//                   <FileText size={16} /> {r.name}
//                 </div>
//                 <button className="text-indigo-400">View</button>
//               </div>
//             ))} */}
//             {previousResumes.map((r) => (
//                <div key={r.resume_id} className="flex justify-between bg-slate-800 p-3 rounded">

//                <span>Resume #{r.resume_id}</span>

//                <button
//                className="text-indigo-400"
//                 onClick={() => fetchResumeAnalysis(r.resume_id)}
//                  >
//                View
//               </button>

//             </div>
//         ))}
//           </div>
//         </Modal>
//       )}

//     </div>
//   );

// }


// function Modal({ title, children, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      
//       <div className="bg-slate-900 w-[90%] md:w-100 p-6 rounded-xl relative text-white">

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-white">{title}</h2>

//           <button
//             onClick={onClose}
//             className=" text-red-400 text-xl font-bold"
//           >
//             ✖
//           </button>
//         </div>

//         {children}

//       </div>
//     </div>
//   );
// }


import React, { useState ,useEffect} from "react";
import { User, FileText, Upload, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({setAnalysisData, setPlatform}) {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [previousResumes, setPreviousResumes] = useState([]);

  const [user, setUser] = useState({
    email: "",
    name: "",
    experience: 0
  });

  // ================= Resume Upload =================

  const handleFileUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!resume) return;

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        credentials: "include",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Analysis failed");
        return;
      }

      alert("Resume analyzed successfully ✅");
      if (data.message === "Resume analyzed successfully") {
      setPlatform(data.platform);
      setAnalysisData(data.response);

      navigate("/analysis");   // 🚀 redirect
    }
      
      console.log("ML Result:", data);

    } catch (err) {
      console.error(err);
      alert("Backend not reachable");
    }
  };

  // ================= History =================

  const fetchPreviousResumes = async () => {
    try {
      const res = await fetch("http://localhost:5000/resumes", {
        credentials: "include"
      });
      const data = await res.json();
      setPreviousResumes(data);
    } catch (err) {
      console.error(err);
    }
  };

  // const fetchResumeAnalysis = async (id) => {
  //   try {
  //     const res = await fetch(`http://localhost:5000/resume/${id}`, {
  //       credentials: "include"
  //     });
  //     const data = await res.json();
  //     console.log("Analysis:", data);
  //     alert("Check console for analysis result");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const fetchResumeAnalysis = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/resume/${id}`, {
      credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to load analysis");
      return;
    }

    // Save to global state
    setPlatform(data.platform);
    setAnalysisData(data.response);

    // Close modal
    setShowHistory(false);

    // Redirect
    navigate("/analysis");

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  // ================= Profile =================

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/profile", {
        credentials: "include"
      });
      const data = await res.json();

      setUser({
        email: "",
        name: data.full_name,
        experience: data.experience_years
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateProfile = async () => {
    try {
      await fetch("http://localhost:5000/profile/update", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: user.name,
          experience_years: user.experience
        })
      });

      alert("Profile updated ✅");
    } catch (err) {
      console.error(err);
    }
  };
  // log out
  const handleLogout = async () => {
  try {
    await fetch("http://localhost:5000/logout", {
      credentials: "include"
    });

    navigate("/"); // or "/login" depending on your routes
  } catch (err) {
    console.error(err);
    alert("Logout failed");
  }
};

  // ================= UI =================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800">

        <button
          onClick={() => {
            fetchPreviousResumes();
            setShowHistory(true);
          }}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100 flex gap-2 items-center"
        >
          <History size={18} /> Previous Analysis
        </button>

        {/* <button
          onClick={() => {
            fetchProfile();
            setShowProfile(true);
          }}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100 flex gap-2 items-center"
        >
          <User size={18} /> Profile
        </button> */}
        <div className="flex gap-3">
    <button
      onClick={() => {
        fetchProfile();
        setShowProfile(true);
      }}
      className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100 flex gap-2 items-center"
    >
      <User size={18} /> Profile
    </button>

    <button
      onClick={handleLogout}
      className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium shadow hover:bg-red-600 flex gap-2 items-center"
    >
      Logout
    </button>
  </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 gap-10">

        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4">Upload Your Resume</h1>
          <p>Our platform works by analyzing the resume to identify skill claims. For each identified claim, the platform automatically checks relevant online platforms like GitHub, leetCode to find real evidence related to that skill.</p>
          {!resume ? (
            <label className="inline-flex items-center gap-2 bg-indigo-600 px-6 py-3 rounded-lg cursor-pointer hover:bg-indigo-700">
              <Upload size={18} /> Upload Resume
              <input type="file" hidden onChange={handleFileUpload} />
            </label>
          ) : (
            <button
              onClick={handleAnalyze}
              className="mt-8 bg-white text-purple-700 font-semibold px-6 py-3 rounded-full hover:scale-105 transition"
            >
              Analyze Resume
            </button>
          )}

          {resume && (
            <p className="mt-3 text-sm text-gray-400">Selected: {resume.name}</p>
          )}
        </div>

        <div className="flex justify-center w-full md:w-1/2 px-6 md:px-16">
          <img src="/upload-illustration.png" alt="upload" className="w-80" />
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <Modal title="Profile" onClose={() => setShowProfile(false)}>
          <div className="space-y-4">
            <div>
              <label>Name</label>
              <input
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full bg-slate-800 p-2 rounded mt-1"
              />
            </div>

            <div>
              <label>Experience (years)</label>
              <input
                type="number"
                value={user.experience}
                onChange={(e) => setUser({ ...user, experience: e.target.value })}
                className="w-full bg-slate-800 p-2 rounded mt-1"
              />
            </div>

            <button
              onClick={updateProfile}
              className="mt-8 bg-white text-purple-700 font-semibold px-6 py-3 rounded-full hover:scale-105 transition"
            >
              Save
            </button>
          </div>
        </Modal>
      )}

      {/* History Modal */}
      {showHistory && (
        <Modal title="Previous Analysis" onClose={() => setShowHistory(false)}>
          <div className="space-y-3">
            {previousResumes.length === 0 && (
              <p className="text-gray-400">No resumes found</p>
            )}

            {previousResumes.map((r) => (
              <div
                key={r.resume_id}
                className="flex items-center justify-between bg-slate-800 p-3 rounded"
              >
                <span>Resume #{r.resume_id}</span>

                <button
                  className="text-indigo-400"
                  onClick={() => fetchResumeAnalysis(r.resume_id)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div> 
  );
}

// ================= Modal =================

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-900 w-[90%] md:w-96 p-6 rounded-xl relative text-white">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-red-400 text-xl font-bold">
            ✖
          </button>
        </div>

        {children}

      </div>
    </div>
  );
}
