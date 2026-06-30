import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";

export const Route = createFileRoute("/quiz/result")({
  component: QuizResult,
});

function QuizResult() {
  const [results, setResults] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("truhue_style_profile");
    if (data) {
      setResults(JSON.parse(data));
    }
  }, []);

  const profile = useMemo(() => {
    if (!results) return null;

    let name = "The Stylish Explorer";
    let desc = "You're building a versatile wardrobe that works for your unique vision.";
    let safeColors = ["Navy", "Gray", "Black", "White"];

    if (results.style_archetype === "Modern Minimalist") {
      name = "The Modern Simplifier";
      desc = "You value clean lines and a functional, easy-to-manage wardrobe.";
    } else if (results.style_archetype === "Streetwear & Bold") {
      name = "The Bold Urbanite";
      desc = "You aren't afraid to stand out, even if you need a little help with color combos.";
    } else if (results.color_adventurousness === "Stick to safe neutrals") {
      name = "The Neutral Builder";
      desc = "You prefer high-confidence combinations that never fail.";
    }

    if (results.vision_type?.includes("Red-green")) {
      safeColors = ["Navy", "Charcoal", "Sky Blue", "Off-white", "Burgundy"];
    } else if (results.vision_type?.includes("Blue-yellow")) {
      safeColors = ["Red", "Black", "Gray", "Pink", "Teal"];
    }

    return { name, desc, safeColors };
  }, [results]);

  const parsedWardrobe = useMemo(() => {
    if (!results?.wardrobe_raw) return [];
    return results.wardrobe_raw.split(",").map((s: string) => s.trim()).filter(Boolean);
  }, [results]);

  if (!results || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center space-y-4">
          <p className="text-xl font-bold text-gray-500">No profile found.</p>
          <Link to="/quiz" className="text-indigo-600 font-black">Take the quiz →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-widest">
            Your Style Profile
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none italic">
            {profile.name}
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            {profile.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl space-y-8 border border-indigo-100">
            <h2 className="text-2xl font-black text-gray-900">Vision Strategy</h2>
            <div className="space-y-4">
              <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                <div className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">Vision Profile</div>
                <div className="text-xl font-black text-indigo-700">{results.vision_type}</div>
              </div>
              <div className="p-6 bg-green-50 rounded-3xl border border-green-100">
                <div className="text-xs font-black text-green-400 uppercase tracking-widest mb-3">Safest Color Families</div>
                <div className="flex flex-wrap gap-2">
                  {profile.safeColors.map(color => (
                    <span key={color} className="px-3 py-1 bg-white text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-xl space-y-8 border border-indigo-100">
            <h2 className="text-2xl font-black text-gray-900">Current Closet</h2>
            <div className="space-y-4">
              {parsedWardrobe.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {parsedWardrobe.map((item, i) => (
                    <span key={i} className="px-4 py-2 bg-gray-100 text-gray-500 rounded-xl text-xs font-bold uppercase tracking-wide">
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">No items listed yet.</p>
              )}
              <Link to="/wardrobe" className="block text-center py-4 bg-gray-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">
                Edit Digital Wardrobe
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-indigo-600 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10 space-y-10">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-4xl font-black tracking-tight leading-tight">Ready to see your outfits?</h2>
              <p className="text-xl text-indigo-100 font-medium max-w-xl">
                We've combined your style profile with your current closet. Let's see what you should wear today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/outfits"
                className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all text-center shadow-xl"
              >
                Generate My Outfits
              </Link>
              <Link
                to="/recommendations"
                className="bg-indigo-500 text-white border-2 border-indigo-400 px-10 py-5 rounded-2xl font-black text-xl hover:bg-indigo-400 transition-all text-center"
              >
                Shopping List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
