import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Camera, CameraResultType } from '@capacitor/camera';

export const Route = createFileRoute("/wardrobe")({
  component: Wardrobe,
});

type WardrobeItem = {
  id: string;
  name: string;
  category: string;
  color: string;
  colorHex?: string;
  url?: string;
  tags?: string[];
};

const CATEGORIES = ["Shirts", "Pants", "Shoes", "Outerwear", "Accessories", "Other"];

const COLOR_MAP: Record<string, string> = {
  white: "#FFFFFF",
  black: "#000000",
  gray: "#808080",
  charcoal: "#36454F",
  navy: "#000080",
  blue: "#0000FF",
  "light blue": "#ADD8E6",
  khaki: "#C3B091",
  tan: "#D2B48C",
  brown: "#8B4513",
  olive: "#808000",
  green: "#008000",
  red: "#FF0000",
  burgundy: "#800020",
  pink: "#FFC0CB",
  yellow: "#FFFF00",
  orange: "#FFA500",
};

const PRESETS = {
  Shirts: ["White T-shirt", "Black T-shirt", "Gray T-shirt", "Navy T-shirt", "White button-down", "Light blue button-down", "Navy polo", "Gray polo", "Black polo", "Plaid shirt", "Flannel shirt", "Sweater", "Hoodie"],
  Pants: ["Dark jeans", "Light jeans", "Black jeans", "Khaki chinos", "Navy chinos", "Gray pants", "Black pants", "Olive pants", "Dress pants", "Shorts"],
  Shoes: ["White sneakers", "Black sneakers", "Casual sneakers", "Brown boots", "Black boots", "Brown dress shoes", "Black dress shoes", "Loafers", "Sandals"],
  Outerwear: ["Navy blazer", "Gray hoodie", "Black jacket", "Brown jacket", "Denim jacket", "Sport coat", "Vest", "Coat"],
  Accessories: ["Brown belt", "Black belt", "Watch", "Tie", "Hat", "Socks"],
};

function Wardrobe() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [rawInput, setRawInput] = useState("");
  const [activeTab, setActiveTab] = useState<"view" | "add-text" | "add-preset" | "add-manual">("view");

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Capacitor?.isNative) {
      setIsNative(true);
    }
    const saved = localStorage.getItem("truhue_wardrobe");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("truhue_wardrobe", JSON.stringify(items));
  }, [items]);

  const parseText = (text: string) => {
    const lines = text.split(/[,\n]/).map(s => s.trim().toLowerCase()).filter(Boolean);
    const newItems: WardrobeItem[] = lines.map(line => {
      let category = "Other";
      if (line.match(/shirt|polo|button-down|sweater|hoodie|tee|tank|top/)) category = "Shirts";
      else if (line.match(/pants|jeans|chinos|trousers|shorts|slacks|khaki/)) category = "Pants";
      else if (line.match(/shoes|sneakers|boots|loafers|sandals|trainers|oxfords/)) category = "Shoes";
      else if (line.match(/jacket|coat|blazer|vest|cardigan|outerwear/)) category = "Outerwear";
      else if (line.match(/belt|watch|tie|hat|socks|scarf|sunglasses/)) category = "Accessories";

      let color = "unknown";
      let colorHex = undefined;
      for (const [name, hex] of Object.entries(COLOR_MAP)) {
        if (line.includes(name)) {
          color = name;
          colorHex = hex;
          break;
        }
      }

      return {
        id: Math.random().toString(36).substr(2, 9),
        name: line.charAt(0).toUpperCase() + line.slice(1),
        category,
        color,
        colorHex,
      };
    });
    setItems(prev => [...newItems, ...prev]);
    setRawInput("");
    setActiveTab("view");
  };

  const togglePreset = (preset: string, category: string) => {
    const existing = items.find(i => i.name === preset);
    if (existing) {
      setItems(items.filter(i => i.id !== existing.id));
    } else {
      let color = "unknown";
      let colorHex = undefined;
      for (const [name, hex] of Object.entries(COLOR_MAP)) {
        if (preset.toLowerCase().includes(name)) {
          color = name;
          colorHex = hex;
          break;
        }
      }
      setItems(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        name: preset,
        category,
        color,
        colorHex,
      }, ...prev]);
    }
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const processPhoto = (url: string) => {
    const newItem: WardrobeItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: "Photo Item",
      category: "Other",
      color: "Auto-detected",
      url,
    };
    setItems(prev => [newItem, ...prev]);
    setActiveTab("view");
  };

  const handleNativeCamera = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      if (image.webPath) processPhoto(image.webPath);
    } catch (error) {
      console.error("Camera error:", error);
    }
  };

  const handleWebUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') processPhoto(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, WardrobeItem[]> = {};
    CATEGORIES.forEach(cat => grouped[cat] = []);
    items.forEach(item => {
      if (grouped[item.category]) grouped[item.category].push(item);
      else grouped["Other"].push(item);
    });
    return grouped;
  }, [items]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none italic">
              Digital Wardrobe
            </h1>
            <p className="text-xl text-gray-500 font-medium">
              The more items you add, the better your recommendations.
            </p>
          </div>
          <div className="flex bg-white p-2 rounded-2xl shadow-md border border-gray-100">
            {(["view", "add-text", "add-preset"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === tab ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-indigo-600"
                }`}
              >
                {tab === "view" ? "My Closet" : tab === "add-text" ? "Plain English" : "Presets"}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "add-text" && (
          <div className="max-w-3xl mx-auto bg-white p-10 rounded-[3rem] shadow-2xl border border-indigo-50 space-y-8 animate-in zoom-in-95 duration-300">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900">List Your Clothes</h2>
              <p className="text-gray-500 font-medium italic">Type what you own, separated by commas or lines.</p>
              <textarea
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder="e.g. dark jeans, khaki pants, white sneakers, brown boots, navy polo, gray hoodie..."
                className="w-full h-48 p-8 bg-gray-50 border-4 border-transparent focus:border-indigo-600 rounded-[2rem] outline-none text-xl font-medium placeholder:text-gray-300 transition-all"
              />
            </div>
            <button
              onClick={() => parseText(rawInput)}
              className="w-full py-6 bg-indigo-600 text-white font-black text-2xl rounded-2xl hover:bg-indigo-700 shadow-xl transition-all"
            >
              Add to Wardrobe
            </button>
          </div>
        )}

        {activeTab === "add-preset" && (
          <div className="space-y-12 animate-in zoom-in-95 duration-300">
            {Object.entries(PRESETS).map(([category, itemsList]) => (
              <div key={category} className="space-y-6">
                <h3 className="text-2xl font-black text-gray-900 ml-2">{category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {itemsList.map(item => (
                    <button
                      key={item}
                      onClick={() => togglePreset(item, category)}
                      className={`p-6 rounded-3xl border-4 transition-all text-left space-y-3 shadow-sm ${
                        items.some(i => i.name === item)
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-white bg-white hover:border-indigo-100"
                      }`}
                    >
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                        {category === "Shirts" ? "👕" : category === "Pants" ? "👖" : category === "Shoes" ? "👟" : category === "Outerwear" ? "🧥" : "🎩"}
                      </div>
                      <div className="font-black text-sm text-gray-900 leading-tight">{item}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setActiveTab("view")}
                className="px-12 py-5 bg-gray-900 text-white font-black text-xl rounded-2xl hover:bg-black shadow-xl transition-all"
              >
                Done Adding
              </button>
            </div>
          </div>
        )}

        {activeTab === "view" && (
          <div className="space-y-16 animate-in fade-in duration-500">
            {items.length === 0 ? (
              <div className="bg-white border-8 border-dashed border-gray-100 rounded-[4rem] p-24 text-center space-y-8 shadow-sm">
                <div className="w-40 h-40 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-6xl shadow-inner animate-pulse">
                  👕
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-black text-gray-900 italic">Your closet is empty.</h3>
                  <p className="text-xl text-gray-400 font-medium">Add items using the tabs above to get started.</p>
                </div>
              </div>
            ) : (
              CATEGORIES.map(category => itemsByCategory[category].length > 0 && (
                <div key={category} className="space-y-6">
                  <div className="flex items-center gap-4 px-2">
                    <h3 className="text-3xl font-black text-gray-900">{category}</h3>
                    <span className="px-3 py-1 bg-gray-200 text-gray-500 rounded-full text-xs font-black">
                      {itemsByCategory[category].length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {itemsByCategory[category].map(item => (
                      <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 transition-all hover:shadow-2xl group relative">
                        <div className="aspect-[4/5] relative bg-gray-50 flex items-center justify-center overflow-hidden">
                          {item.url ? (
                            <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div 
                              className="w-full h-full flex flex-col items-center justify-center gap-4 transition-transform group-hover:scale-110"
                              style={{ backgroundColor: item.colorHex + "10" || "#f9fafb" }}
                            >
                              <span className="text-6xl filter grayscale opacity-20">
                                {category === "Shirts" ? "👕" : category === "Pants" ? "👖" : category === "Shoes" ? "👟" : category === "Outerwear" ? "🧥" : "🏷️"}
                              </span>
                              {item.colorHex && (
                                <div className="w-8 h-8 rounded-full shadow-inner border border-white/50" style={{ backgroundColor: item.colorHex }} />
                              )}
                            </div>
                          )}
                          <div className="absolute top-6 right-6 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">
                            {item.color}
                          </div>
                        </div>
                        <div className="p-8">
                          <h4 className="text-xl font-black text-gray-900 mb-6 truncate italic">{item.name}</h4>
                          <div className="flex gap-2">
                            <button className="flex-1 py-3 bg-gray-50 text-gray-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                              Edit Details
                            </button>
                            <button 
                              onClick={() => deleteItem(item.id)}
                              className="px-4 py-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-100 transition-all"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
            
            {/* Quick Actions Floating Bar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-xl px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-8 border border-white/10">
              <div className="flex items-center gap-3 pr-8 border-r border-white/10">
                <span className="text-white font-black text-sm italic">Add New:</span>
                <div className="flex gap-2">
                  <button onClick={() => setActiveTab("add-text")} className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all shadow-lg text-white">📝</button>
                  <button onClick={() => setActiveTab("add-preset")} className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all shadow-lg text-white">➕</button>
                  {isNative ? (
                    <button onClick={handleNativeCamera} className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all shadow-lg text-white">📸</button>
                  ) : (
                    <label className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all shadow-lg text-white cursor-pointer">
                      <span>📷</span>
                      <input type="file" className="hidden" onChange={handleWebUpload} accept="image/*" />
                    </label>
                  )}
                </div>
              </div>
              <Link 
                to="/outfits"
                className="bg-white text-gray-900 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-lg"
              >
                Generate Outfits →
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
