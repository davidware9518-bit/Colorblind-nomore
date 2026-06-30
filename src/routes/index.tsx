import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden bg-gray-50">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-10">
              <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest animate-fade-in">
                Now Live: The AI Wardrobe Assistant
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.05]">
                Stop Guessing If Your <br />
                <span className="text-indigo-600">Clothes Match.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto">
                An AI wardrobe assistant built for colorblind people. Tell us what you own, get color-safe outfit combinations, and know what to buy next.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/quiz"
                  className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  Take the Free Style Quiz
                </Link>
                <Link
                  to="/wardrobe"
                  className="px-10 py-5 bg-white border-4 border-gray-100 text-gray-900 rounded-2xl font-black text-xl hover:border-indigo-100 shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  Build My Wardrobe
                </Link>
              </div>
            </div>
          </div>
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-20 -left-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-20 -right-20 w-96 h-96 bg-pink-200/20 rounded-full blur-[100px]"></div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 bg-white border-y border-gray-100">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Getting dressed should not <br/> feel like guessing.</h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                For millions of colorblind individuals, choosing an outfit is a daily exercise in uncertainty. TruHue removes the guesswork by using accessibility-first AI to analyze your closet based on how YOU see the world.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                <div className="space-y-4">
                  <div className="text-4xl">🤷‍♂️</div>
                  <h3 className="text-xl font-black">No More Clashing</h3>
                  <p className="text-sm text-gray-400 font-bold">Instantly know if that shirt actually goes with those pants.</p>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl">🕶️</div>
                  <h3 className="text-xl font-black">Personalized Vision</h3>
                  <p className="text-sm text-gray-400 font-bold">Recommendations tuned to Protan, Deutan, or Tritan profiles.</p>
                </div>
                <div className="space-y-4">
                  <div className="text-4xl">💪</div>
                  <h3 className="text-xl font-black">Total Confidence</h3>
                  <p className="text-sm text-gray-400 font-bold">Step out of the house knowing your style is on point.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black tracking-tight mb-4 text-gray-900 uppercase">How it Works</h2>
              <div className="w-20 h-2 bg-indigo-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Style Quiz", desc: "Define your aesthetic and vision type in under 2 minutes." },
                { step: "02", title: "Tell us what you own", desc: "List your clothes in plain English. No photos required." },
                { step: "03", title: "Get Outfits", desc: "See color-safe combinations from your existing closet." },
                { step: "04", title: "See what to buy", desc: "Identify gaps and get smart shopping suggestions." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 hover:-translate-y-2 transition-all">
                  <div className="text-indigo-600 font-black text-3xl mb-6">{item.step}</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* No Photo Required Banner */}
        <section className="py-20 bg-indigo-600 overflow-hidden relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
              <div className="flex-1 space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">No camera? <br/> No problem.</h2>
                <p className="text-xl text-indigo-100 font-medium max-w-md">
                  Digitize your closet in seconds. Just type what you own, and TruHue does the heavy lifting.
                </p>
              </div>
              <div className="flex-1 w-full max-w-xl">
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                      <span className="text-2xl">✍️</span>
                      <span className="text-white font-bold italic">"I own dark jeans, white sneakers, and a navy polo..."</span>
                    </div>
                    <div className="text-center text-indigo-200 font-black text-xl">↓</div>
                    <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">Safe Combination</span>
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Confidence: 100%</span>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-12 h-16 bg-indigo-900 rounded-lg"></div>
                        <div className="w-12 h-16 bg-blue-900 rounded-lg"></div>
                        <div className="w-12 h-16 bg-gray-100 rounded-lg"></div>
                      </div>
                      <p className="text-sm font-black text-gray-900">Your navy polo pairs perfectly with your dark jeans and white sneakers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -mr-64 -mt-64"></div>
        </section>

        {/* Outfit Recommendations Preview */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="space-y-4">
                <h2 className="text-5xl font-black tracking-tight text-gray-900">Outfit Inspiration</h2>
                <p className="text-xl text-gray-500 font-medium">Smart combos generated specifically for your vision profile.</p>
              </div>
              <Link to="/outfits" className="text-indigo-600 font-black text-sm uppercase tracking-widest hover:underline">View Your Outfits →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "The Modern Professional", label: "Safest Outfit", labelClass: "bg-green-50 text-green-600", items: ["Navy Oxford", "Khaki Chinos", "Brown Loafers"], icon: "💼" },
                { title: "Weekend Casual", label: "Best Casual Outfit", labelClass: "bg-blue-50 text-blue-600", items: ["Gray Hoodie", "Black Jeans", "White Sneakers"], icon: "🏠" },
                { title: "Evening Out", label: "Date Night Outfit", labelClass: "bg-purple-50 text-purple-600", items: ["Burgundy Sweater", "Slate Trousers", "Black Boots"], icon: "✨" },
                { title: "Experimental Mix", label: "Use Caution", labelClass: "bg-amber-50 text-amber-600", items: ["Olive Jacket", "Sand Shirt", "Navy Pants"], icon: "⚠️" }
              ].map((outfit, i) => (
                <div key={i} className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100 space-y-8 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                      {outfit.icon}
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${outfit.labelClass}`}>
                      {outfit.label}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-gray-900 leading-tight">{outfit.title}</h3>
                    <div className="flex flex-col gap-2">
                      {outfit.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                          <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest group-hover:bg-indigo-600 transition-colors">
                    Try This Combo
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wardrobe Gaps & Shopping Preview */}
        <section className="py-32 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Gaps Preview */}
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-gray-900 tracking-tight">Identify Your <br/> Wardrobe Gaps</h2>
                  <p className="text-xl text-gray-500 font-medium">We analyze what you're missing to complete your style.</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-6 border-l-8 border-red-500">
                    <div className="text-3xl">🧥</div>
                    <div className="flex-1">
                      <h4 className="font-black text-gray-900">Outerwear Shortage</h4>
                      <p className="text-sm text-gray-400 font-bold">You need a light neutral layer to match your dark denim.</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-6 border-l-8 border-amber-500">
                    <div className="text-3xl">👔</div>
                    <div className="flex-1">
                      <h4 className="font-black text-gray-900">Texture Needed</h4>
                      <p className="text-sm text-gray-400 font-bold">Add patterned shirts for easier style recognition.</p>
                    </div>
                  </div>
                </div>
                <Link to="/gaps" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-xl font-black hover:bg-indigo-700 transition-all shadow-xl">
                  Analyze My Closet
                </Link>
              </div>

              {/* Shopping Preview */}
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-gray-900 tracking-tight">Smart Shopping <br/> Recommendations</h2>
                  <p className="text-xl text-gray-500 font-medium">Curated pieces that fill your gaps and match your vision.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
                    <div className="aspect-square bg-gray-100 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Item" />
                      <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-full text-[8px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">Capsule Item</div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-black text-gray-900 truncate">Sand Trench Coat</h4>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recommended Match</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
                    <div className="aspect-square bg-gray-100 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Item" />
                      <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-full text-[8px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">High Contrast</div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-black text-gray-900 truncate">Navy Oxford Shirt</h4>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Essential Basic</p>
                    </div>
                  </div>
                </div>
                <Link to="/recommendations" className="inline-block bg-white border-4 border-gray-100 text-gray-900 px-8 py-4 rounded-xl font-black hover:border-indigo-100 transition-all shadow-xl">
                  Shop My Vision
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="bg-gray-950 rounded-[4rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
              <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none italic">Style is a language. <br/> Speak it fluently.</h2>
                <p className="text-xl text-gray-400 font-medium">
                  Stop settling for "good enough." Master your wardrobe and dress with absolute certainty every single day.
                </p>
                <div className="pt-6">
                  <Link
                    to="/quiz"
                    className="inline-block px-12 py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-2xl hover:scale-105 active:scale-95 transition-all"
                  >
                    Get Started Now — It's Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
