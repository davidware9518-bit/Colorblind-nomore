import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/blog")({
  component: Blog,
});

const POSTS = [
  {
    id: 1,
    title: "Mastering Monochromatic Style",
    excerpt: "Why dressing in shades of a single color is a game-changer for people with color vision deficiency.",
    date: "June 28, 2026",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80",
    category: "Guides",
  },
  {
    id: 2,
    title: "Lighting Matters: Dressing for Every Environment",
    excerpt: "How different lighting conditions affect color perception and how to choose clothes that look good everywhere.",
    date: "June 25, 2026",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80",
    category: "Science",
  },
  {
    id: 3,
    title: "5 Capsule Wardrobe Essentials",
    excerpt: "The foundational pieces every colorblind individual needs to build a versatile, foolproof closet.",
    date: "June 20, 2026",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&q=80",
    category: "Fashion",
  },
  {
    id: 4,
    title: "The Physics of Contrast",
    excerpt: "Understanding why luminence contrast is more important than color hue for accessible styling.",
    date: "June 15, 2026",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80",
    category: "Science",
  },
  {
    id: 5,
    title: "Traveling with Colorblindness",
    excerpt: "Tips for packing a travel wardrobe that ensures you always look sharp without asking for help.",
    date: "June 10, 2026",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80",
    category: "Lifestyle",
  },
];

function Blog() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    const subscribers = JSON.parse(localStorage.getItem("truhue_subscribers") || "[]");
    localStorage.setItem("truhue_subscribers", JSON.stringify([...subscribers, email]));
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-24">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
            TruHue Journal
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none italic">Style Insights.</h1>
          <p className="text-xl text-gray-500 font-medium max-w-xl mx-auto">
            Expert advice and community stories for navigating fashion with colorblindness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {POSTS.map((post) => (
            <article key={post.id} className="flex flex-col gap-6 group cursor-pointer hover:-translate-y-2 transition-all duration-500">
              <div className="aspect-[16/10] overflow-hidden rounded-[3rem] shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="space-y-4 px-4">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full">{post.category}</span>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{post.date}</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight italic">
                  {post.title}
                </h3>
                <p className="text-gray-400 font-medium leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="pt-2">
                  <button className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors">Read Article →</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="bg-indigo-600 rounded-[4rem] p-16 md:p-24 text-center text-white space-y-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="relative z-10 space-y-8">
            {subscribed ? (
              <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="text-6xl">🎉</div>
                <h2 className="text-4xl font-black italic">You're on the list!</h2>
                <p className="text-xl text-indigo-100 font-medium">Thank you for joining the TruHue community.</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight italic">Stay updated on <br/> accessible style.</h2>
                  <p className="text-xl text-indigo-100 font-medium max-w-lg mx-auto">
                    Weekly tips on colorblind-friendly fashion, science, and product news delivered to your inbox.
                  </p>
                </div>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email" 
                    className="flex-1 px-8 py-5 rounded-2xl bg-white/10 border-2 border-white/10 text-white font-black text-lg focus:bg-white focus:text-gray-900 focus:outline-none transition-all placeholder:text-indigo-300"
                  />
                  <button className="px-10 py-5 bg-white text-indigo-600 font-black text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-xl active:scale-95">
                    Join Now
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
