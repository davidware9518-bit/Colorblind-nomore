import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";

export const Route = createFileRoute("/gaps")({
  component: WardrobeGaps,
});

type WardrobeItem = {
  id: string;
  name: string;
  category: string;
  color: string;
};

type Gap = {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  reason: string;
  unlocks: string;
};

function WardrobeGaps() {
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("truhue_wardrobe");
    if (saved) setWardrobe(JSON.parse(saved));
  }, []);

  const analyzedGaps = useMemo(() => {
    if (wardrobe.length === 0) return [];

    const gaps: Gap[] = [];
    const lowerWardrobe = wardrobe.map(i => ({ ...i, name: i.name.toLowerCase(), color: i.color.toLowerCase() }));

    const hasWhiteShirt = lowerWardrobe.some(i => i.category === "Shirts" && (i.color === "white" || i.name.includes("white")));
    const hasLightBlueShirt = lowerWardrobe.some(i => i.category === "Shirts" && (i.color === "light blue" || i.name.includes("light blue")));
    const hasKhakis = lowerWardrobe.some(i => i.category === "Pants" && (i.color === "khaki" || i.name.includes("khaki") || i.color === "tan"));
    const hasNavyBlazer = lowerWardrobe.some(i => i.category === "Outerwear" && (i.name.includes("blazer") || (i.name.includes("jacket") && i.color === "navy")));
    const hasDarkJeans = lowerWardrobe.some(i => i.category === "Pants" && i.name.includes("jeans") && (i.color === "navy" || i.color === "black" || i.name.includes("dark")));
    
    const darkShirts = lowerWardrobe.filter(i => i.category === "Shirts" && ["black", "navy", "charcoal", "dark"].some(c => i.color.includes(c) || i.name.includes(c)));
    const lightShirts = lowerWardrobe.filter(i => i.category === "Shirts" && ["white", "light blue", "gray", "tan", "off-white"].some(c => i.color.includes(c) || i.name.includes(c)));

    if (!hasWhiteShirt) {
      gaps.push({
        title: "White Oxford / T-Shirt",
        description: "A crisp white shirt is the ultimate neutral. It matches every pair of pants you own.",
        priority: "High",
        reason: "You currently lack a pure white base layer.",
        unlocks: "Unlocks 10+ new combinations with your current pants."
      });
    }

    if (!hasKhakis) {
      gaps.push({
        title: "Khaki Chinos",
        description: "Khaki provides the perfect contrast for navy, black, and forest green tops.",
        priority: "High",
        reason: "Your pants are mostly dark, making it hard to create high-contrast outfits.",
        unlocks: "Essential for business casual and smart weekend looks."
      });
    }

    if (darkShirts.length > lightShirts.length * 2) {
      gaps.push({
        title: "Light Neutral Shirts",
        description: "You have a lot of dark tops. Adding light blue or light gray will balance your wardrobe.",
        priority: "Medium",
        reason: "Over-represented dark colors can make your wardrobe feel heavy and hard to distinguish.",
        unlocks: "Makes matching with dark jeans and navy pants much easier."
      });
    }

    if (!hasNavyBlazer) {
      gaps.push({
        title: "Navy Blazer",
        description: "The most versatile piece of outerwear. Dress it up with khakis or down with jeans.",
        priority: "Medium",
        reason: "You're missing a key 'smart' layer for dinners or meetings.",
        unlocks: "Unlocks the 'Best Work' and 'Date Night' outfit categories."
      });
    }

    return gaps;
  }, [wardrobe]);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
              Closet Audit
            </div>
            <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none italic">
              Wardrobe Gaps
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-xl">
              We've scanned your closet. Here's what's missing to unlock your full style potential.
            </p>
          </div>
        </div>

        {wardrobe.length === 0 ? (
          <div className="bg-white rounded-[4rem] p-24 text-center space-y-8 shadow-sm border border-gray-100">
            <div className="w-40 h-40 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-6xl shadow-inner">
              🔍
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-gray-900 italic">No analysis possible.</h3>
              <p className="text-xl text-gray-400 font-medium max-w-md mx-auto">
                Digitize your closet first so we can find the gaps in your wardrobe.
              </p>
              <Link
                to="/wardrobe"
                className="inline-block bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl mt-4"
              >
                Go to Wardrobe
              </Link>
            </div>
          </div>
        ) : analyzedGaps.length === 0 ? (
          <div className="bg-white rounded-[4rem] p-24 text-center space-y-8 shadow-sm border border-gray-100">
            <div className="w-40 h-40 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto text-6xl shadow-inner">
              ✨
            </div>
            <h3 className="text-4xl font-black text-gray-900 italic">Your wardrobe is balanced!</h3>
            <p className="text-xl text-gray-400 font-medium">You have all the core essentials. Focus on adding personality pieces now.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {analyzedGaps.map((gap, i) => (
              <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-indigo-50 flex flex-col md:flex-row items-center gap-12 group hover:border-indigo-200 transition-all">
                <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center text-4xl shrink-0 font-black shadow-inner group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <div className="space-y-2">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <h3 className="text-3xl font-black text-gray-900 italic">{gap.title}</h3>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${gap.priority === 'High' ? 'bg-red-500 text-white' : gap.priority === 'Medium' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'}`}>
                        {gap.priority} Priority
                      </span>
                    </div>
                    <p className="text-xl text-gray-400 font-medium">{gap.reason}</p>
                  </div>
                  
                  <div className="p-6 bg-gray-50 rounded-2xl space-y-2">
                    <p className="text-gray-600 font-bold leading-relaxed">{gap.description}</p>
                    <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">🚀 {gap.unlocks}</p>
                  </div>
                </div>
                <Link
                  to="/recommendations"
                  className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl whitespace-nowrap active:scale-95"
                >
                  Shop This Gap
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="bg-gray-900 rounded-[4rem] p-16 text-white text-center space-y-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="space-y-4">
             <h2 className="text-4xl font-black tracking-tight leading-none italic">"The well-dressed man is he whose clothes you never notice."</h2>
             <p className="text-indigo-400 font-black uppercase tracking-[0.2em] text-xs">— Somerset Maugham</p>
          </div>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
            True style isn't about having more clothes; it's about having the <span className="text-white">right</span> ones that work together effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
}
