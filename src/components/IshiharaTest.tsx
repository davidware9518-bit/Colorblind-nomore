import { useState, useMemo, useEffect } from "react";

export type Plate = {
  id: number;
  number: string;
  type: "control" | "transformation" | "vanishing" | "tritan";
  description: string;
  colors: {
    bg: string[];
    fg: string[];
  };
};

export const PLATES: Plate[] = [
  { 
    id: 1, number: "12", type: "control", description: "Visible to everyone",
    colors: { bg: ["#81C784", "#4CAF50", "#2E7D32"], fg: ["#E57373", "#F44336", "#C62828"] }
  },
  { 
    id: 2, number: "74", type: "control", description: "Visible to everyone",
    colors: { bg: ["#64B5F6", "#2196F3", "#1565C0"], fg: ["#FFD54F", "#FFC107", "#FF8F00"] }
  },
  { 
    id: 3, number: "8", type: "transformation", description: "Normal see 8, Red-Green see 3",
    colors: { bg: ["#AED581", "#8BC34A", "#558B2F"], fg: ["#FFB74D", "#FF9800", "#EF6C00"] }
  },
  { 
    id: 4, number: "29", type: "transformation", description: "Normal see 29, Red-Green see 70",
    colors: { bg: ["#A1887F", "#795548", "#4E342E"], fg: ["#9575CD", "#673AB7", "#4527A0"] }
  },
  { 
    id: 5, number: "5", type: "transformation", description: "Normal see 5, Red-Green see 2",
    colors: { bg: ["#DCE775", "#CDDC39", "#9E9D24"], fg: ["#BA68C8", "#9C27B0", "#7B1FA2"] }
  },
  { 
    id: 6, number: "3", type: "transformation", description: "Normal see 3, Red-Green see 5",
    colors: { bg: ["#4DB6AC", "#009688", "#00695C"], fg: ["#FF8A65", "#FF5722", "#D84315"] }
  },
  { 
    id: 7, number: "15", type: "vanishing", description: "Normal see 15, Red-Green see nothing",
    colors: { bg: ["#81C784", "#4CAF50", "#388E3C"], fg: ["#8D6E63", "#6D4C41", "#4E342E"] }
  },
  { 
    id: 8, number: "42", type: "vanishing", description: "Normal see 42, Red-Green see nothing",
    colors: { bg: ["#FFF176", "#FFEB3B", "#FBC02D"], fg: ["#81C784", "#4CAF50", "#2E7D32"] }
  },
  { 
    id: 9, number: "6", type: "tritan", description: "Normal see 6, Tritan see nothing",
    colors: { bg: ["#4FC3F7", "#03A9F4", "#0288D1"], fg: ["#B2DFDB", "#80CBC4", "#4DB6AC"] }
  },
  { 
    id: 10, number: "9", type: "tritan", description: "Normal see 9, Tritan see nothing",
    colors: { bg: ["#9575CD", "#673AB7", "#512DA8"], fg: ["#E1BEE7", "#CE93D8", "#BA68C8"] }
  },
];

export function IshiharaPlate({ plate }: { plate: Plate }) {
  const dots = useMemo(() => {
    const d = [];
    for (let i = 0; i < 400; i++) {
      d.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        color: plate.colors.bg[Math.floor(Math.random() * plate.colors.bg.length)],
      });
    }
    return d;
  }, [plate]);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto bg-gray-100 rounded-full overflow-hidden shadow-inner border-8 border-white">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {dots.map((dot) => (
          <circle key={dot.id} cx={dot.x} cy={dot.y} r={dot.size} fill={dot.color} opacity="0.8" />
        ))}
        <mask id={`mask-${plate.id}`}>
           <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fontSize="40" fontWeight="900" fill="white" style={{ fontFamily: "serif" }}>
            {plate.number}
           </text>
        </mask>
        <g mask={`url(#mask-${plate.id})`}>
          {Array.from({ length: 180 }).map((_, i) => (
            <circle 
              key={`fg-${i}`} 
              cx={Math.random() * 100} 
              cy={Math.random() * 100} 
              r={1 + Math.random() * 2.5} 
              fill={plate.colors.fg[Math.floor(Math.random() * plate.colors.fg.length)]} 
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export function IshiharaTest({ onComplete }: { onComplete: (result: string) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setRawInputValue] = useState("");

  const handleNext = () => {
    const newAnswers = [...answers, inputValue];
    setAnswers(newAnswers);
    setRawInputValue("");
    if (step < PLATES.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    let rgScore = 0;
    let tritanScore = 0;
    let controlPassed = true;

    PLATES.forEach((plate, i) => {
      const answer = finalAnswers[i]?.trim();
      const isCorrect = answer === plate.number;

      if (plate.type === "control" && !isCorrect) controlPassed = false;
      if (plate.type === "transformation" && !isCorrect) rgScore++;
      if (plate.type === "vanishing" && (answer === "" || answer === "nothing" || !isCorrect)) rgScore++;
      if (plate.type === "tritan" && (answer === "" || answer === "nothing" || !isCorrect)) tritanScore++;
    });

    let result = "Normal Vision";
    if (!controlPassed) {
      result = "Inconclusive";
    } else if (rgScore >= 3) {
      result = "Red-Green Color Vision Deficiency (Protan/Deutan)";
    } else if (tritanScore >= 1) {
      result = "Blue-Yellow Color Vision Deficiency (Tritan)";
    }

    onComplete(result);
  };

  const currentPlate = PLATES[step];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-gray-900 leading-tight">Vision Screening</h2>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Plate {step + 1} of {PLATES.length}</p>
      </div>

      <IshiharaPlate plate={currentPlate} />

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-black text-gray-700 uppercase tracking-widest block text-center">What number do you see?</label>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setRawInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            autoFocus
            placeholder="Type number here..."
            className="w-full p-6 bg-gray-50 rounded-2xl border-4 border-transparent focus:border-indigo-600 outline-none text-2xl font-black text-center transition-all"
          />
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => { setRawInputValue("nothing"); handleNext(); }}
            className="flex-1 py-5 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs"
          >
            I see nothing
          </button>
          <button 
            onClick={handleNext}
            className="flex-[2] py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-lg transition-all uppercase tracking-widest"
          >
            Next Plate →
          </button>
        </div>
      </div>

      <p className="text-[10px] text-gray-300 font-medium text-center uppercase tracking-widest italic">
        Tip: If you see two numbers, type the first one that appears most clearly.
      </p>
    </div>
  );
}
