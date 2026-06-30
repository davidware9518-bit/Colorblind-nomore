import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";

export const Route = createFileRoute("/recommendations")({
  component: Recommendations,
});

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  reason: string;
  confidence: "Safe" | "Smart" | "Bold";
  link: string;
  image: string;
};

const PRODUCT_DATABASE: Product[] = [
  {
    id: "p1",
    name: "Classic White Oxford Shirt",
    category: "Shirts",
    price: "$45",
    reason: "The ultimate neutral base for any outfit. High contrast against all dark pants.",
    confidence: "Safe",
    link: "https://amzn.to/example-white-oxford",
    image: "👕",
  },
  {
    id: "p2",
    name: "Slim Fit Khaki Chinos",
    category: "Pants",
    price: "$58",
    reason: "Essential for creating contrast with navy and black tops.",
    confidence: "Safe",
    link: "https://amzn.to/example-khaki-chinos",
    image: "👖",
  },
  {
    id: "p3",
    name: "Navy Merino Wool Sweater",
    category: "Shirts",
    price: "$75",
    reason: "Versatile layer that works over a white or light blue shirt.",
    confidence: "Smart",
    link: "https://amzn.to/example-navy-sweater",
    image: "🧶",
  },
  {
    id: "p4",
    name: "Charcoal Gray Blazer",
    category: "Outerwear",
    price: "$145",
    reason: "Professional layer that avoids common red/green color confusion.",
    confidence: "Safe",
    link: "https://amzn.to/example-charcoal-blazer",
    image: "🧥",
  },
  {
    id: "p5",
    name: "Brown Leather Chelsea Boots",
    category: "Shoes",
    price: "$120",
    reason: "Pairs perfectly with both jeans and chinos. Solid anchor for outfits.",
    confidence: "Safe",
    link: "https://amzn.to/example-brown-boots",
    image: "👞",
  },
  {
    id: "p6",
    name: "Light Blue Button-Down",
    category: "Shirts",
    price: "$40",
    reason: "Easier to distinguish from white than light pink or green.",
    confidence: "Safe",
    link: "https://amzn.to/example-blue-shirt",
    image: "👔",
  }
];

function Recommendations() {
  const [visionType, setVisionType] = useState<string>("unknown");
  const [wardrobe, setWardrobe] = useState<any[]>([]);

  useEffect(() => {
    const profile = localStorage.getItem("truhue_style_profile");
    if (profile) {
      const parsed = JSON.parse(profile);
      setVisionType(parsed.vision_type || "unknown");
    }
    const saved = localStorage.getItem("truhue_wardrobe");
    if (saved) setWardrobe(JSON.parse(saved));
  }, []);

  const personalizedRecs = useMemo(() => {
    // Basic logic: prioritize items they don't have
    const lowerWardrobe = wardrobe.map(i => i.name.toLowerCase());
    return PRODUCT_DATABASE.sort((a, b) => {
      const hasA = lowerWardrobe.some(name => name.includes(a.name.split(' ')[0].toLowerCase()));
      const hasB = lowerWardrobe.some(name => name.includes(b.name.split(' ')[0].toLowerCase()));
      if (!hasA && hasB) return -1;
      if (hasA && !hasB) return 1;
      return 0;
    });
  }, [wardrobe]);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
              Curated Shop
            </div>
            <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none italic">
              Recommended for You
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-xl">
              Clothing essentials selected for <span className="text-indigo-600 font-black">{visionType}</span> vision and your current style profile.
            </p>
          </div>
          <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <Link to="/gaps" className="px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600">View Gaps</Link>
            <div className="px-6 py-3 text-xs font-black uppercase tracking-widest bg-indigo-600 text-white rounded-xl shadow-md">All Products</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {personalizedRecs.map((product) => (
            <div key={product.id} className="bg-white rounded-[3.5rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col group hover:shadow-2xl transition-all">
              <div className="aspect-square bg-gray-50 flex items-center justify-center text-8xl relative group-hover:scale-105 transition-transform">
                {product.image}
                <div className="absolute top-8 right-8">
                  <div className={`px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm ${
                    product.confidence === "Safe" ? "bg-green-500 text-white" : 
                    product.confidence === "Smart" ? "bg-indigo-600 text-white" : "bg-orange-500 text-white"
                  }`}>
                    {product.confidence} Choice
                  </div>
                </div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black text-gray-900 leading-tight italic">{product.name}</h3>
                    <span className="text-xl font-black text-indigo-600">{product.price}</span>
                  </div>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{product.category}</p>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl">
                  <p className="text-gray-700 font-bold text-sm leading-relaxed">
                    {product.reason}
                  </p>
                </div>

                <div className="pt-4 mt-auto">
                  <a 
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-5 bg-gray-950 text-white text-center rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
                  >
                    View on Amazon
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-indigo-600 rounded-[4rem] p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="space-y-6 flex-1 text-center md:text-left">
              <h2 className="text-4xl font-black italic tracking-tight leading-tight">Can't find a specific color?</h2>
              <p className="text-xl text-indigo-100 font-medium">
                If you're shopping in person and unsure about a color, use our "Does It Match?" tool to check it against your current wardrobe.
              </p>
            </div>
            <Link 
              to="/match"
              className="bg-white text-indigo-600 px-12 py-6 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all shadow-xl whitespace-nowrap active:scale-95"
            >
              Check a Color Match
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
