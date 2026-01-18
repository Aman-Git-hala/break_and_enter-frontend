// // import React, { useState } from "react";
// // import { Bar, Radar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   RadialLinearScale,
// //   PointElement,
// //   LineElement,
// //   Tooltip,
// //   Legend
// // } from "chart.js";

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   RadialLinearScale,
// //   PointElement,
// //   LineElement,
// //   Tooltip,
// //   Legend
// // );

// // const levelMap = {
// //   Low: 30,
// //   Medium: 60,
// //   High: 90,
// //   Experimental: 40,
// //   Stable: 80,
// //   Occasional: 50,
// //   Consistent: 85,
// //   "One-off": 30,
// //   Active: 90,
// //   Stale: 40
// // };

// // export default function PlatformAnalysis({ platform, analysis }) {
// //   const [selectedSkill, setSelectedSkill] = useState(null);

// //   const skills = Object.keys(analysis);

// //   const barData = {
// //     labels: skills,
// //     datasets: [
// //       {
// //         label: "Score %",
// //         data: skills.map(s => analysis[s].semantic_similarity.score * 100),
// //         backgroundColor: "#6366f1"
// //       }
// //     ]
// //   };

// //   const radarData = selectedSkill && {
// //     labels: ["Complexity", "Maturity", "Consistency", "Recency"],
// //     datasets: [
// //       {
// //         label: selectedSkill,
// //         data: [
// //           levelMap[analysis[selectedSkill].complexity],
// //           levelMap[analysis[selectedSkill].project_maturity],
// //           levelMap[analysis[selectedSkill].consistency],
// //           levelMap[analysis[selectedSkill].recency]
// //         ],
// //         backgroundColor: "rgba(99,102,241,0.3)",
// //         borderColor: "#6366f1"
// //       }
// //     ]
// //   };

// //   return (
// //     <div className="min-w-full bg-slate-900 text-white p-6 rounded-xl shadow-xl">
// //       <h2 className="text-2xl font-bold mb-4">{platform} Analysis</h2>

// //       {/* Skill cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// //         {skills.map(skill => (
// //           <div
// //             key={skill}
// //             onClick={() => setSelectedSkill(skill)}
// //             className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:bg-slate-700 transition"
// //           >
// //             <h3 className="text-lg font-semibold">{skill}</h3>
// //             <p className="text-indigo-400 text-xl">
// //               {(analysis[skill].semantic_similarity.score * 100).toFixed(0)}%
// //             </p>
// //             <p className="text-sm text-gray-400">
// //               {analysis[skill].semantic_similarity.evidence}
// //             </p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Bar chart */}
// //       <div className="bg-slate-800 p-4 rounded-lg">
// //         <Bar data={barData} />
// //       </div>

// //       {/* Skill detail modal */}
// //       {selectedSkill && (
// //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
// //           <div className="bg-slate-900 p-6 rounded-xl w-[90%] md:w-[600px]">
// //             <h3 className="text-xl font-bold mb-4">
// //               {selectedSkill} – Detailed Analysis
// //             </h3>

// //             <Radar data={radarData} />

// //             <div className="mt-4 text-sm space-y-1">
// //               <p>Complexity: {analysis[selectedSkill].complexity}</p>
// //               <p>Maturity: {analysis[selectedSkill].project_maturity}</p>
// //               <p>Consistency: {analysis[selectedSkill].consistency}</p>
// //               <p>Recency: {analysis[selectedSkill].recency}</p>
// //             </div>

// //             <button
// //               onClick={() => setSelectedSkill(null)}
// //               className="mt-4 bg-indigo-600 px-4 py-2 rounded"
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Tooltip,
//   Legend
// );

// const levelMap = {
//   Low: 30,
//   Medium: 60,
//   High: 90,
//   Experimental: 40,
//   Stable: 85,
//   Occasional: 55,
//   Consistent: 85,
//   "One-off": 30,
//   Active: 90,
//   Stale: 40,
//   Dormant: 20
// };

// export default function PlatformAnalysis({ platform, analysis }) {
//   const [selectedSkill, setSelectedSkill] = useState(null);

//   const skills = Object.keys(analysis);

//   // Score chart
//   const scoreChart = {
//     labels: skills,
//     datasets: [
//       {
//         label: "Skill Score %",
//         data: skills.map(s => analysis[s].semantic_similarity.score * 100),
//         backgroundColor: "#6366f1"
//       }
//     ]
//   };

//   const buildSkillData = (skill) => {
//     const s = analysis[skill];
//     return [
//       levelMap[s.complexity],
//       levelMap[s.project_maturity],
//       levelMap[s.consistency],
//       levelMap[s.recency]
//     ];
//   };

//   const paramLabels = ["Complexity", "Maturity", "Consistency", "Recency"];

//   return (
//     <div className="min-w-full bg-slate-900 text-white p-6 rounded-xl shadow-xl">

//       <h2 className="text-2xl font-bold mb-6">{platform} Analysis</h2>

//       {/* Skill Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         {skills.map(skill => (
//           <div
//             key={skill}
//             onClick={() => setSelectedSkill(skill)}
//             className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:bg-slate-700 transition"
//           >
//             <h3 className="text-lg font-semibold">{skill}</h3>
//             <p className="text-indigo-400 text-2xl">
//               {(analysis[skill].semantic_similarity.score * 100).toFixed(0)}%
//             </p>
//             <span className="text-sm text-gray-400">
//               {analysis[skill].semantic_similarity.evidence}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Score Comparison Chart */}
//       <div className="bg-slate-800 p-4 rounded-lg">
//         <Bar data={scoreChart} />
//       </div>

//       {/* Skill Modal */}
//       {selectedSkill && (
//         <SkillModal
//           skill={selectedSkill}
//           analysis={analysis[selectedSkill]}
//           onClose={() => setSelectedSkill(null)}
//         />
//       )}
//     </div>
//   );
// }

// function SkillModal({ skill, analysis, onClose }) {
//   const values = [
//     levelMap[analysis.complexity],
//     levelMap[analysis.project_maturity],
//     levelMap[analysis.consistency],
//     levelMap[analysis.recency]
//   ];

//   const paramChart = {
//     labels: ["Complexity", "Maturity", "Consistency", "Recency"],
//     datasets: [
//       {
//         label: skill,
//         data: values,
//         backgroundColor: "#22c55e"
//       }
//     ]
//   };

//   const trendChart = {
//     labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
//     datasets: [
//       {
//         label: "Skill Strength",
//         data: values.map(v => Math.max(10, v - Math.random() * 20)),
//         borderColor: "#6366f1"
//       }
//     ]
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

//       <div className="bg-slate-900 text-white w-[95%] md:w-[800px] p-6 rounded-xl relative">

//         <button onClick={onClose} className="absolute right-4 top-4 text-xl">✖</button>

//         <h3 className="text-2xl font-bold mb-4">{skill} – Full Analysis</h3>

//         {/* Parameter Chart */}
//         <div className="bg-slate-800 p-4 rounded mb-4">
//           <Bar data={paramChart} />
//         </div>

//         {/* Trend Chart */}
//         <div className="bg-slate-800 p-4 rounded mb-4">
//           <Line data={trendChart} />
//         </div>

//         {/* Heatmap */}
//         <div className="bg-slate-800 p-4 rounded">
//           <h4 className="mb-2 font-semibold">Parameter Heatmap</h4>
//           <div className="grid grid-cols-4 gap-2">
//             {values.map((v, i) => (
//               <div
//                 key={i}
//                 className="h-14 rounded flex items-center justify-center text-sm font-bold"
//                 style={{
//                   background: `rgba(99,102,241,${v / 100})`
//                 }}
//               >
//                 {v}%
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const levelMap = {
  Low: 30,
  Medium: 60,
  High: 90,
  Experimental: 40,
  Stable: 85,
  Occasional: 55,
  Consistent: 85,
  Active: 90,
  Stale: 40
};

const evidenceColor = (evidence) => {
  switch (evidence?.toLowerCase()) {
    case "weak":
      return "border-red-500 bg-red-500/10";
    case "moderate":
      return "border-yellow-500 bg-yellow-500/10";
    case "strong":
      return "border-green-500 bg-green-500/10";
    default:
      return "border-slate-600 bg-slate-800";
  }
};

export default function PlatformAnalysis({ platform, analysis }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const navigate = useNavigate();
  if (!analysis) return <p className="text-white p-10">No data available</p>;

  const skills = Object.keys(analysis);

  const scoreChart = {
    labels: skills,
    datasets: [
      {
        label: "Skill Score %",
        data: skills.map(s => analysis[s].semantic_similarity.score * 100),
        backgroundColor: skills.map(s => {
           const ev = analysis[s].semantic_similarity.evidence?.toLowerCase();
           if (ev === "weak") return "rgba(239,68,68,0.8)";     // red
           if (ev === "moderate") return "rgba(234,179,8,0.8)"; // yellow
           if (ev === "strong") return "rgba(34,197,94,0.8)";   // green
           return "rgba(99,102,241,0.8)";
        })

      }
    ]
  };
  

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      {/* <h2 className="text-3xl font-bold mb-6">{platform} Platform Analysis</h2> */}
      <div className="w-full flex items-center justify-between mb-6">
  <h2 className="text-3xl font-bold">
    {platform} Platform Analysis
  </h2>

  <button
    onClick={() => navigate("/dashboard")}
    className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-full hover:scale-105 transition flex items-center gap-2"
  >
    🏠 Home
  </button>
</div>


      {/* Skill cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {skills.map(skill => {
          const ev = analysis[skill].semantic_similarity.evidence;

          return (
            <div
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`p-4 rounded-lg cursor-pointer border transition hover:scale-105 ${evidenceColor(ev)}`}
            >
              <h3 className="text-lg font-semibold">{skill}</h3>
              <p className="text-2xl font-bold">
                {(analysis[skill].semantic_similarity.score * 100).toFixed(0)}%
              </p>
              <p className="text-sm opacity-80">Evidence: {ev}</p>
              <p className="">Click here to get detailed analysis</p>
            </div>
          );
        })}
      </div>

      {/* Bar chart */}
      <div className="bg-slate-800 p-4 rounded-lg">
        <Bar data={scoreChart} />
      </div>

      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          data={analysis[selectedSkill]}
          onClose={() => setSelectedSkill(null)}
        />
      )}

    </div>
  );
}

function SkillModal({ skill, data, onClose }) {
  const values = [
    levelMap[data.complexity],
    levelMap[data.project_maturity],
    levelMap[data.consistency],
    levelMap[data.recency]
  ];
  const metricColor = (value) => {
  if (value >= 80) return "#22c55e";   // green
  if (value >= 50) return "#facc15";   // yellow
  return "#ef4444";                   // red
 };

  const paramChart = {
    labels: ["Complexity", "Maturity", "Consistency", "Recency"],
    datasets: [
      {
        label: skill,
        data: values,
        backgroundColor: values.map(v => metricColor(v))
      }
    ]
  };


  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-slate-900 p-6 w-[95%] md:w-225 rounded-xl relative">

        <button onClick={onClose} className="absolute top-4 right-4 bg-white text-black rounded-md w-9 h-9 flex items-center justify-center hover:bg-red-500 hover:text-white transition">✖</button>

        <h3 className="text-2xl font-bold mb-4">{skill} – Detailed Analysis</h3>

        {/* summary text like dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-center">
          <Stat label="Complexity" value={data.complexity} />
          <Stat label="Maturity" value={data.project_maturity} />
          <Stat label="Consistency" value={data.consistency} />
          <Stat label="Recency" value={data.recency} />
        </div>

        {/* <div className="grid md:grid-cols-2 gap-4">

          

          <div className="bg-slate-800 p-4 rounded">
            <Line data={trendChart} />
          </div>

        </div> */}
        <div className="bg-slate-800 p-4 rounded">
            <Bar
               data={paramChart}
               options={{
               plugins: {
                legend: { labels: { color: "#e5e7eb" } }
              },
          scales: {
            x: {
              ticks: { color: "#93c5fd" }   // light blue
            },
            y: {
            ticks: { color: "#e5e7eb" }
            }
          }
  }}
/>
        </div>

      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-slate-800 p-3 rounded">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
