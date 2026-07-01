import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";

export const Route = createFileRoute("/match")({
  component: OutfitMatcher,
});

type Color = {
  name: string;
  hex: string;
};

const COLORS: Color[] = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
  { name: "Navy", hex: "#000080" },
  { name: "Slate Gray", hex: "#708090" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Khaki", hex: "#C3B091" },
  { name: "Tan", hex: "#D2B48C" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Olive", hex: "#808000" },
  { name: "Light Blue", hex: "#ADD8E6" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Forest Green", hex: "#228B22" },
  { name: "Red", hex: "#FF0000" },
  { name: "Pink", hex: "#FFC0CB" },
];

const SAFE_PAIRS = [
  ["navy", "khaki"], ["light blue", "khaki"], ["white", "any"], ["gray", "any"],
  ["navy", "gray"], ["black", "white"], ["brown", "khaki"], ["navy", "white"],
  ["charcoal", "white"], ["navy", "tan"], ["black", "gray"], ["slate gray", "white"]
];

const CAUTION_PAIRS = [
  ["olive", "brown"], ["navy", "black"], ["gray", "brown"], ["green", "red"],
  ["blue", "purple"], ["pink", "gray"]
];

function OutfitMatcher() {
  const [item1, setItem1] = useState(COLORS[2]); // Navy
  const [item2, setItem2] = useState(COLORS[5]); // Khaki
  const [isMatching, setIsMatching] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const matchResult = useMemo(() => {
    const c1 = item1.name.toLowerCase();
    const c2 = item2.name.toLowerCase();

    if (c1 === c2) return { 
      status: "Safe", 
      title: "Monochrome Look", 
      desc: "Matching the same color is a reliable way to create a clean, intentional outfit. Just ensure the textures differ slightly!",
      score: 100,
      icon: "✅"
    };

    if (c1 === "white" || c2 === "white" || c1.includes("gray") || c2.includes("gray")) return {
      status: "Safe",
      title: "Perfect Match!",
      desc: "Neutrals like white and gray act as a 'blank canvas' and pair safely with almost any color. This is a high-confidence choice.",
      score: 95,
      icon: "✅"
    };

    if (SAFE_PAIRS.some(p => (p[0] === c1 && (p[1] === c2 || p[1] === "any")) || (p[0] === c2 && (p[1] === c1 || p[1] === "any")))) return {
      status: "Safe",
      title: "Classic Combination",
      desc: "These colors are time-tested and provide excellent contrast. They are easily distinguishable for most vision types.",
      score: 90,
      icon: "✅"
    };

    if (CAUTION_PAIRS.some(p => (p[0] === c1 && p[1] === c2) || (p[0] === c2 && p[1] === c1))) return {
      status: "Risky",
      title: "Use Caution",
      desc: "These colors may appear very similar under certain lighting or for specific types of colorblindness. High risk of clashing.",
      score: 30,
      icon: "⚠️"
    };

    return {
      status: "Smart",
      title: "Solid Match",
      desc: "This is a modern, stylish pairing. While not 'safest', it's a smart choice that shows style confidence.",
      score: 75,
      icon: "👍"
    };
  }, [item1, item2]);

  const handleCheck = () => {
    setIsMatching(true);
    setHasChecked(false);
    setShowPaywall(false);
    setTimeout(() => {
      setIsMatching(false);
      setHasChecked(true);
    }, 600);
  };

  const handlePhotoMatch = () => {
     setShowPaywall(true);
     setHasChecked(false);
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
            Color Logic
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none italic">Does It Match?</h1>
          <p className="text-xl text-gray-500 font-medium max-w-xl mx-auto">
            Instant color-matching decisions for your daily wardrobe.
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
             <div className="px-6 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
               Free: Text Match
             </div>
             <div className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-2">
               <span>Pro: Photo Match</span>
               <span className="text-xs">🔒</span>
             </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-[4rem] p-12 md:p-20 shadow-inner border-8 border-white space-y-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="space-y-6 flex-1 w-full">
              <div 
                className="aspect-square w-full rounded-[3.5rem] shadow-2xl transition-all duration-500 transform hover:scale-105 border-[12px] border-white"
                style={{ backgroundColor: item1.hex }}
              ></div>
              <div className="relative group">
                <select 
                  className="w-full p-6 bg-white rounded-2xl font-black text-gray-900 shadow-xl border-none focus:ring-4 focus:ring-indigo-600 transition-all appearance-none text-center text-lg"
                  value={item1.name}
                  onChange={(e) => {
                    setItem1(COLORS.find(c => c.name === e.target.value)!);
                    setHasChecked(false);
                    setShowPaywall(false);
                  }}
                >
                  {COLORS.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
                <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-gray-300">▼</div>
              </div>
            </div>

            <div className="text-5xl font-black text-indigo-100 italic">vs</div>

            <div className="space-y-6 flex-1 w-full">
              <div 
                className="aspect-square w-full rounded-[3.5rem] shadow-2xl transition-all duration-500 transform hover:scale-105 border-[12px] border-white"
                style={{ backgroundColor: item2.hex }}
              ></div>
              <div className="relative group">
                <select 
                  className="w-full p-6 bg-white rounded-2xl font-black text-gray-900 shadow-xl border-none focus:ring-4 focus:ring-indigo-600 transition-all appearance-none text-center text-lg"
                  value={item2.name}
                  onChange={(e) => {
                    setItem2(COLORS.find(c => c.name === e.target.value)!);
                    setHasChecked(false);
                    setShowPaywall(false);
                  }}
                >
                  {COLORS.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
                <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-gray-300">▼</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleCheck}
              disabled={isMatching}
              className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-2xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 active:scale-95 disabled:opacity-50"
            >
              {isMatching ? "Analyzing Contrast..." : "Check Combination"}
            </button>
            <button 
              onClick={handlePhotoMatch}
              className="w-full py-4 bg-white text-indigo-600 border-4 border-indigo-50 rounded-2xl font-black text-lg hover:border-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <span>📸 Use Camera Match</span>
              <span className="px-2 py-0.5 bg-indigo-100 rounded text-[10px] uppercase tracking-widest">Pro</span>
            </button>
          </div>
        </div>

        {hasChecked && !isMatching && (
          <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-2xl animate-in fade-in zoom-in duration-500 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-2 h-full ${
              matchResult.status === "Safe" ? "bg-green-500" : 
              matchResult.status === "Risky" ? "bg-red-500" : "bg-indigo-600"
            }`} />
            
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className={`w-28 h-28 rounded-full flex items-center justify-center text-5xl shadow-inner shrink-0 ${
                matchResult.status === "Safe" ? "bg-green-50" : 
                matchResult.status === "Risky" ? "bg-red-50" : "bg-indigo-50"
              }`}>
                {matchResult.icon}
              </div>
              <div className="space-y-4 text-center md:text-left flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-4xl font-black text-gray-900 italic">{matchResult.title}</h3>
                  <span className="text-xs font-black text-gray-300 uppercase tracking-widest">Match Score: {matchResult.score}%</span>
                </div>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  {matchResult.desc}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                  <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    matchResult.status === "Safe" ? "bg-green-500 text-white" : 
                    matchResult.status === "Risky" ? "bg-red-500 text-white" : "bg-indigo-600 text-white"
                  }`}>
                    {matchResult.status} Decision
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">
                    Contrast Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {showPaywall && (
           <div className="bg-gray-900 text-white p-16 rounded-[4rem] shadow-2xl animate-in fade-in zoom-in duration-500 space-y-8 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
             <div className="text-6xl">✨</div>
             <div className="space-y-4">
                <h2 className="text-4xl font-black italic tracking-tight">Unlock Photo Matching</h2>
                <p className="text-xl text-gray-400 font-medium max-w-xl mx-auto leading-relaxed">
                  Standalone photo upload "Does This Match?" is available exclusively in <span className="text-white font-black">ObviStyle Pro</span>.
                </p>
             </div>
             <div className="bg-white/10 backdrop-blur rounded-3xl p-8 max-w-sm mx-auto space-y-6 border border-white/10">
                <div className="text-3xl font-black">$4.99<span className="text-sm font-medium text-gray-400">/mo</span></div>
                <ul className="text-left text-sm space-y-3 font-bold text-gray-300">
                  <li className="flex items-center gap-2">✅ Standalone Photo Match</li>
                  <li className="flex items-center gap-2">✅ Unlimited Closet Items</li>
                  <li className="flex items-center gap-2">✅ Advanced Color Guidance</li>
                  <li className="flex items-center gap-2">✅ Event-Specific Planning</li>
                </ul>
                <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl">
                  Upgrade to Pro
                </button>
             </div>
             <button onClick={() => setShowPaywall(false)} className="text-sm font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
               Keep Using Text Match (Free)
             </button>
           </div>
        )}

        <div className="bg-indigo-600 rounded-[4rem] p-16 text-white text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <h2 className="text-4xl font-black italic tracking-tight">Shopping in Person?</h2>
          <p className="text-xl text-indigo-100 font-medium max-w-2xl mx-auto leading-relaxed">
            Use the text-based matcher to verify colors with store associates, or take a quick photo with ObviStyle Pro to get an instant AI decision.
          </p>
        </div>
      </div>
    </div>
  );
}
