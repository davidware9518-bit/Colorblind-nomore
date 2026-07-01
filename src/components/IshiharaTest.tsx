import { useState, useMemo, useEffect, useRef } from "react";

// Seeded random for consistent plate rendering
function createRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export type PlateType = "control" | "transformation" | "vanishing" | "tritan";

export type PlateConfig = {
  id: number;
  number: string;
  altNumber?: string; // What colorblind people might see
  type: PlateType;
  description: string;
  colors: {
    bg: string[];
    fg: string[];
    alt?: string[]; // Colors for the "alt" number or confusable parts
  };
};

export const PLATES: PlateConfig[] = [
  {
    id: 1,
    number: "12",
    type: "control",
    description: "Everyone should see 12",
    colors: {
      bg: ["#7FB069", "#94C973", "#5D8A4C", "#A8D5BA"],
      fg: ["#E74C3C", "#C0392B", "#D35400", "#E67E22"]
    }
  },
  {
    id: 2,
    number: "74",
    type: "control",
    description: "Everyone should see 74",
    colors: {
      bg: ["#5DADE2", "#3498DB", "#2E86C1", "#85C1E9"],
      fg: ["#F4D03F", "#F1C40F", "#D4AC0D", "#B7950B"]
    }
  },
  {
    id: 3,
    number: "8",
    altNumber: "3",
    type: "transformation",
    description: "Normal sees 8, Red-Green sees 3",
    colors: {
      bg: ["#27AE60", "#2ECC71", "#1E8449", "#52BE80"],
      fg: ["#E67E22", "#D35400", "#F39C12"], // The '3' part
      alt: ["#45B39D", "#16A085", "#1ABC9C"] // The extra parts of '8' that look like BG to RG-blind
    }
  },
  {
    id: 4,
    number: "29",
    altNumber: "70",
    type: "transformation",
    description: "Normal sees 29, Red-Green sees 70",
    colors: {
      bg: ["#8D6E63", "#795548", "#6D4C41", "#5D4037"],
      fg: ["#EC407A", "#D81B60", "#AD1457"], // The '70' part? Wait, 29->70 means they see 70.
      alt: ["#7E57C2", "#5E35B1", "#4527A0"] // The parts that make 29 look like 29 to normal
    }
  },
  {
    id: 5,
    number: "5",
    altNumber: "2",
    type: "transformation",
    description: "Normal sees 5, Red-Green sees 2",
    colors: {
      bg: ["#CDDC39", "#D4E157", "#C0CA33", "#AFB42B"],
      fg: ["#8E44AD", "#9B59B6", "#7D3C98"], // The '2' part
      alt: ["#FBC02D", "#F9A825", "#F57F17"] // The parts that make 5 look like 5
    }
  },
  {
    id: 6,
    number: "3",
    altNumber: "5",
    type: "transformation",
    description: "Normal sees 3, Red-Green sees 5",
    colors: {
      bg: ["#1ABC9C", "#16A085", "#48C9B0", "#76D7C4"],
      fg: ["#FF5722", "#E64A19", "#D84315"], // The '5' part
      alt: ["#2ECC71", "#27AE60", "#239B56"] // The parts that make 3 look like 3
    }
  },
  {
    id: 7,
    number: "15",
    type: "vanishing",
    description: "Normal sees 15, Red-Green sees nothing",
    colors: {
      bg: ["#27AE60", "#2ECC71", "#1E8449", "#52BE80"],
      fg: ["#795548", "#8D6E63", "#6D4C41"] // Confusable with green for RG-blind
    }
  },
  {
    id: 8,
    number: "6",
    type: "tritan",
    description: "Normal sees 6, Tritan sees nothing",
    colors: {
      bg: ["#3498DB", "#5DADE2", "#2E86C1", "#85C1E9"],
      fg: ["#1ABC9C", "#16A085", "#48C9B0"] // Blue-Green confusion for Tritan
    }
  },
  {
    id: 9,
    number: "9",
    type: "tritan",
    description: "Normal sees 9, Tritan sees nothing",
    colors: {
      bg: ["#9B59B6", "#8E44AD", "#A569BD", "#BB8FCE"],
      fg: ["#F06292", "#EC407A", "#E91E63"] // Purple-Pink confusion for Tritan
    }
  },
  {
    id: 10,
    number: "42",
    type: "vanishing",
    description: "Normal sees 42, Red-Green sees nothing",
    colors: {
      bg: ["#F1C40F", "#F4D03F", "#D4AC0D", "#B7950B"],
      fg: ["#2ECC71", "#27AE60", "#1E8449"] // Yellow-Green confusion
    }
  }
];

type Dot = {
  x: number;
  y: number;
  r: number;
  color: string;
};

export function IshiharaPlate({ plate }: { plate: PlateConfig }) {
  const [dots, setDots] = useState<Dot[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Helper to check if a point is in a number
    const checkMask = (num: string, x: number, y: number) => {
      ctx.clearRect(0, 0, 100, 100);
      ctx.fillStyle = "black";
      ctx.font = "bold 65px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(num, 50, 52); // Slight offset for better centering
      const data = ctx.getImageData(x, y, 1, 1).data;
      return data[3] > 128;
    };

    const rng = createRandom(plate.id * 1000);
    const newDots: Dot[] = [];
    const maxAttempts = 5000;
    const targetDots = 1200;

    for (let i = 0; i < maxAttempts && newDots.length < targetDots; i++) {
      const x = rng() * 100;
      const y = rng() * 100;
      const r = 1.0 + rng() * 2.5; // Radius 1.0 to 3.5 (Diameter 2 to 7)

      // Keep within the plate circle
      const dist = Math.sqrt((x - 50) ** 2 + (y - 50) ** 2);
      if (dist > 47) continue;

      // Collision detection
      let collision = false;
      for (const d of newDots) {
        const dDist = Math.sqrt((x - d.x) ** 2 + (y - d.y) ** 2);
        if (dDist < (r + d.r) * 0.95) {
          collision = true;
          break;
        }
      }
      if (collision) continue;

      // Determine color
      let colorList = plate.colors.bg;
      
      const isInPrimary = checkMask(plate.number, x, y);
      const isInAlt = plate.altNumber ? checkMask(plate.altNumber, x, y) : false;

      if (plate.type === "transformation" && plate.altNumber) {
        if (isInAlt) {
          colorList = plate.colors.fg; // Part seen by both (or just colorblind)
        } else if (isInPrimary) {
          colorList = plate.colors.alt || plate.colors.fg; // Part seen only by normal
        }
      } else {
        if (isInPrimary) {
          colorList = plate.colors.fg;
        }
      }

      const color = colorList[Math.floor(rng() * colorList.length)];
      newDots.push({ x, y, r, color });
    }

    setDots(newDots);
  }, [plate]);

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto bg-white rounded-full p-2 shadow-2xl border-8 border-gray-100 flex items-center justify-center">
      <div className="w-full h-full rounded-full overflow-hidden bg-gray-50 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {dots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={dot.r}
              fill={dot.color}
              className="transition-colors duration-500"
            />
          ))}
        </svg>
      </div>
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
    let rgAltHits = 0;
    let vanishingMisses = 0;
    let tritanMisses = 0;
    let controlErrors = 0;

    PLATES.forEach((plate, i) => {
      const answer = finalAnswers[i]?.trim();
      const isCorrect = answer === plate.number;
      const isAlt = plate.altNumber && answer === plate.altNumber;

      if (plate.type === "control") {
        if (!isCorrect) controlErrors++;
      } else if (plate.type === "transformation") {
        if (isAlt) rgAltHits++;
      } else if (plate.type === "vanishing") {
        if (answer === "" || answer.toLowerCase() === "nothing" || (!isCorrect && !isAlt)) {
          vanishingMisses++;
        }
      } else if (plate.type === "tritan") {
        if (answer === "" || answer.toLowerCase() === "nothing" || !isCorrect) {
          tritanMisses++;
        }
      }
    });

    let result = "Normal Vision";
    if (controlErrors >= 1) {
      result = "Inconclusive (Reliability low)";
    } else if (rgAltHits >= 3 || (rgAltHits >= 1 && vanishingMisses >= 1)) {
      result = "Red-Green Color Vision Deficiency (Protan/Deutan)";
    } else if (tritanMisses >= 1) {
      result = "Blue-Yellow Color Vision Deficiency (Tritan)";
    }

    onComplete(result);
  };

  const currentPlate = PLATES[step];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-none italic">Vision Screening</h2>
        <p className="text-indigo-600 font-black uppercase tracking-[0.2em] text-xs">Plate {step + 1} of {PLATES.length}</p>
      </div>

      <IshiharaPlate plate={currentPlate} />

      <div className="max-w-md mx-auto space-y-8">
        <div className="space-y-4">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest block text-center">What number is hidden in the dots?</label>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setRawInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            autoFocus
            placeholder="Type number..."
            className="w-full p-8 bg-gray-50 rounded-[2rem] border-4 border-transparent focus:border-indigo-600 outline-none text-4xl font-black text-center transition-all shadow-inner placeholder:text-gray-200"
          />
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => { setRawInputValue("nothing"); handleNext(); }}
            className="flex-1 py-6 bg-white border-4 border-gray-100 text-gray-400 font-black rounded-2xl hover:border-indigo-100 hover:text-indigo-600 transition-all uppercase tracking-widest text-xs"
          >
            I see nothing
          </button>
          <button 
            onClick={handleNext}
            className="flex-[2] py-6 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-2xl transition-all uppercase tracking-widest text-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            Next Plate →
          </button>
        </div>
      </div>

      <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
        <p className="text-[11px] text-amber-700 font-bold text-center leading-relaxed">
          Tip: Look at the plate from a slight distance. If you see two numbers, type the one that stands out the most.
        </p>
      </div>
    </div>
  );
}
