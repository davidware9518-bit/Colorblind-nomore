import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";

export const Route = createFileRoute("/outfits")({
  component: Outfits,
});

type WardrobeItem = {
  id: string;
  name: string;
  category: string;
  color: string;
  colorHex?: string;
  url?: string;
};

type Outfit = {
  id: string;
  type: string;
  items: WardrobeItem[];
  occasion: string;
  why: string;
  note: string;
  confidence: "Safe" | "Smart" | "Bold" | "Risky";
  score: number;
};

const SAFE_PAIRS = [
  ["navy", "khaki"], ["light blue", "khaki"], ["white", "any"], ["gray", "any"],
  ["navy", "gray"], ["black", "white"], ["brown", "khaki"], ["navy", "white"],
  ["charcoal", "white"], ["navy", "tan"], ["black", "gray"]
];

const CAUTION_PAIRS = [
  ["olive", "brown"], ["navy", "black"], ["gray", "brown"], ["green", "red"],
  ["blue", "purple"], ["pink", "gray"]
];

function Outfits() {
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);
  const [visionType, setVisionType] = useState<string>("unknown");
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const savedWardrobe = localStorage.getItem("truhue_wardrobe");
    if (savedWardrobe) setWardrobe(JSON.parse(savedWardrobe));

    const profile = localStorage.getItem("truhue_style_profile");
    if (profile) {
      const parsed = JSON.parse(profile);
      setVisionType(parsed.vision_type || "unknown");
    }

    const saved = localStorage.getItem("truhue_saved_outfits");
    if (saved) setSavedOutfits(JSON.parse(saved));
  }, []);

  const saveOutfit = (outfit: Outfit) => {
    if (savedOutfits.some(o => o.id === outfit.id)) return;
    const newSaved = [outfit, ...savedOutfits];
    setSavedOutfits(newSaved);
    localStorage.setItem("truhue_saved_outfits", JSON.stringify(newSaved));
  };

  const removeOutfit = (id: string) => {
    const newSaved = savedOutfits.filter(o => o.id !== id);
    setSavedOutfits(newSaved);
    localStorage.setItem("truhue_saved_outfits", JSON.stringify(newSaved));
  };

  const generatedOutfits = useMemo(() => {
    if (wardrobe.length < 2) return [];

    const shirts = wardrobe.filter(i => i.category === "Shirts");
    const pants = wardrobe.filter(i => i.category === "Pants");
    const shoes = wardrobe.filter(i => i.category === "Shoes");

    if (shirts.length === 0 || pants.length === 0) return [];

    const outfits: Outfit[] = [];

    const getMatchQuality = (c1: string, c2: string) => {
      c1 = c1.toLowerCase();
      c2 = c2.toLowerCase();
      if (c1 === "white" || c2 === "white" || c1 === "gray" || c2 === "gray") return { label: "Safe", score: 95 };
      if (SAFE_PAIRS.some(p => (p[0] === c1 && p[1] === c2) || (p[0] === c2 && p[1] === c1))) return { label: "Safe", score: 90 };
      if (CAUTION_PAIRS.some(p => (p[0] === c1 && p[1] === c2) || (p[0] === c2 && p[1] === c1))) return { label: "Risky", score: 40 };
      return { label: "Smart", score: 75 };
    };

    // Safest
    for (const shirt of shirts) {
      for (const pant of pants) {
        const mq = getMatchQuality(shirt.color, pant.color);
        if (mq.label === "Safe") {
          const shoe = shoes[0] || { name: "Your favorite shoes", color: "neutral" };
          outfits.push({
            id: `safe-${shirt.id}-${pant.id}`,
            type: "Safest Outfit",
            items: [shirt, pant, shoe as WardrobeItem],
            occasion: "Everyday Professional",
            why: `Classic high-confidence combination of ${shirt.color} and ${pant.color}.`,
            note: "These colors have high contrast and are easily distinguishable.",
            confidence: "Safe",
            score: mq.score,
          });
          break;
        }
      }
      if (outfits.length > 0) break;
    }

    // Best Casual
    const casualShirt = shirts.find(s => s.name.toLowerCase().includes("t-shirt") || s.name.toLowerCase().includes("polo")) || shirts[0];
    const casualPant = pants.find(p => p.name.toLowerCase().includes("jeans") || p.name.toLowerCase().includes("shorts")) || pants[0];
    if (casualShirt && casualPant) {
      const mq = getMatchQuality(casualShirt.color, casualPant.color);
      outfits.push({
        id: `casual-${casualShirt.id}-${casualPant.id}`,
        type: "Best Casual Outfit",
        items: [casualShirt, casualPant, shoes.find(s => s.name.toLowerCase().includes("sneakers")) || shoes[0] || { name: "Sneakers", color: "white" } as WardrobeItem],
        occasion: "Weekend / Errands",
        why: `Reliable ${casualShirt.color} and ${casualPant.color} pairing for a relaxed look.`,
        note: "Low-stress matching that always looks intentional.",
        confidence: mq.label as any,
        score: mq.score - 5,
      });
    }

    // Best Work
    const workShirt = shirts.find(s => s.name.toLowerCase().includes("button-down") || s.name.toLowerCase().includes("oxford")) || shirts[0];
    const workPant = pants.find(p => p.name.toLowerCase().includes("chinos") || p.name.toLowerCase().includes("dress")) || pants[0];
    if (workShirt && workPant) {
      const mq = getMatchQuality(workShirt.color, workPant.color);
      outfits.push({
        id: `work-${workShirt.id}-${workPant.id}`,
        type: "Best Work Outfit",
        items: [workShirt, workPant, shoes.find(s => s.name.toLowerCase().includes("boots") || s.name.toLowerCase().includes("dress")) || shoes[0] || { name: "Dress Shoes", color: "brown" } as WardrobeItem],
        occasion: "Office / Meetings",
        why: `Professional ${workShirt.color} and ${workPant.color} combination.`,
        note: "Polished and safe for business environments.",
        confidence: mq.label as any,
        score: mq.score,
      });
    }

    return outfits;
  }, [wardrobe]);

  const dailyOutfit = useMemo(() => {
    if (generatedOutfits.length === 0) return null;
    return generatedOutfits[0];
  }, [generatedOutfits]);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 font-sans pb-32">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
              AI Stylist
            </div>
            <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none italic">
              {showSaved ? "Saved Looks" : "Daily Outfits"}
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-xl">
              Optimized for <span className="text-indigo-600 font-black">{visionType}</span> vision.
            </p>
          </div>
          <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <button 
              onClick={() => setShowSaved(false)}
              className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${!showSaved ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-indigo-600"}`}
            >
              Recommended
            </button>
            <button 
              onClick={() => setShowSaved(true)}
              className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${showSaved ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-indigo-600"}`}
            >
              Saved ({savedOutfits.length})
            </button>
          </div>
        </div>

        {!showSaved && dailyOutfit && (
          <div className="bg-indigo-900 rounded-[4rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="space-y-4">
                  <span className="text-xs font-black text-indigo-300 uppercase tracking-[0.3em]">Today's Top Choice</span>
                  <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none">The Morning Pick.</h2>
                  <p className="text-xl text-indigo-100 font-medium max-w-xl">
                    Based on today's goal and your vision profile, this is your highest-confidence look.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                   <button 
                    onClick={() => saveOutfit(dailyOutfit)}
                    className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-black text-xl hover:bg-indigo-50 transition-all shadow-xl active:scale-95"
                  >
                    Save This Look
                  </button>
                  <Link to="/match" className="bg-indigo-800 text-white border-2 border-indigo-700 px-10 py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all">
                    Check Colors
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-96 bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20 shadow-3xl space-y-8">
                {dailyOutfit.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6">
                    <div className="w-16 h-20 bg-white/10 rounded-xl flex items-center justify-center text-3xl">
                       {item.category === "Shirts" ? "👕" : item.category === "Pants" ? "👖" : "👟"}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-white text-lg leading-tight">{item.name}</h4>
                      <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">{item.color}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {(showSaved ? savedOutfits : generatedOutfits).map((outfit) => (
            <div key={outfit.id} className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-gray-100 flex flex-col gap-10 relative overflow-hidden group hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 p-6">
                <div className={`px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm ${
                  outfit.confidence === "Safe" ? "bg-green-500 text-white" : 
                  outfit.confidence === "Smart" ? "bg-indigo-600 text-white" :
                  outfit.confidence === "Risky" ? "bg-red-500 text-white" : "bg-orange-500 text-white"
                }`}>
                  {outfit.confidence}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest">{outfit.type}</h3>
                <h4 className="text-2xl font-black text-gray-900 italic">{outfit.occasion}</h4>
              </div>

              <div className="space-y-6 flex-1">
                {outfit.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 group/item">
                    <div className="w-20 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border-2 border-gray-100 shadow-sm relative">
                      {item.url ? (
                        <img src={item.url} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl opacity-20 filter grayscale">
                          {item.category === "Shirts" ? "👕" : item.category === "Pants" ? "👖" : "👟"}
                        </div>
                      )}
                      {item.colorHex && (
                         <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: item.colorHex }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-black text-gray-900 text-lg leading-tight">{item.name}</h5>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.color}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-50 space-y-4">
                <div className="p-5 bg-gray-50 rounded-2xl space-y-2">
                   <p className="text-sm font-bold text-gray-700 leading-relaxed">
                    {outfit.why}
                  </p>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                    Vision Note: {outfit.note}
                  </p>
                </div>
              </div>

              {showSaved ? (
                <button 
                  onClick={() => removeOutfit(outfit.id)}
                  className="w-full py-5 bg-red-50 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all active:scale-95"
                >
                  Remove From Saved
                </button>
              ) : (
                <button 
                  onClick={() => saveOutfit(outfit)}
                  className="w-full py-5 bg-gray-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50"
                  disabled={savedOutfits.some(o => o.id === outfit.id)}
                >
                  {savedOutfits.some(o => o.id === outfit.id) ? "Saved to Closet" : "Save to Favorites"}
                </button>
              )}
            </div>
          ))}
          
          {(showSaved ? savedOutfits : generatedOutfits).length === 0 && (
            <div className="col-span-full bg-white rounded-[4rem] p-24 text-center space-y-8 shadow-sm border border-gray-100">
              <div className="w-40 h-40 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-6xl shadow-inner">
                {showSaved ? "⭐" : "🧥"}
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-black text-gray-900 italic">{showSaved ? "No saved looks yet." : "Need more data..."}</h3>
                <p className="text-xl text-gray-400 font-medium max-w-md mx-auto">
                  {showSaved ? "Save your favorite recommendations to see them here." : "Add at least one shirt and one pair of pants to your digital wardrobe to see recommendations."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
