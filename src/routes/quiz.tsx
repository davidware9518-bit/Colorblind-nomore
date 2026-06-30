import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/quiz")({
  component: StyleQuiz,
});

type Question = {
  id: string;
  section: string;
  question: string;
  options?: string[];
  icons?: string[];
  type?: "select" | "multi-select" | "textarea" | "scale";
  disclaimer?: string;
  placeholder?: string;
};

const QUESTIONS: Question[] = [
  // Section 1 - Color Vision Context
  {
    id: "vision_type",
    section: "Color Vision Context",
    question: "Do you know what type of colorblindness you have?",
    options: ["Red-green (Protan/Deutan)", "Blue-yellow (Tritan)", "Complete (Achromatopsia)", "Not sure"],
    icons: ["🔴", "🔵", "⚫", "❓"],
    type: "select",
    disclaimer: "This tool is for style guidance, not medical diagnosis.",
  },
  {
    id: "trouble_colors",
    section: "Color Vision Context",
    question: "What colors give you the most trouble?",
    options: ["Red/Green", "Blue/Purple", "Brown/Green", "Pink/Gray", "Orange/Red"],
    icons: ["🍎", "🍇", "🌲", "🌸", "🍊"],
    type: "multi-select",
  },
  {
    id: "match_frequency",
    section: "Color Vision Context",
    question: "How often do you second-guess whether your clothes match?",
    options: ["Rarely", "Sometimes", "Often", "Almost every day"],
    icons: ["😌", "🤔", "😟", "😩"],
    type: "select",
  },
  {
    id: "ask_help",
    section: "Color Vision Context",
    question: "Do you usually ask someone else if your clothes match?",
    options: ["Yes, often", "Sometimes", "Rarely", "No, I go solo"],
    icons: ["🗣️", "💬", "🔇", "😎"],
    type: "select",
  },
  // Section 2 - Style Confidence
  {
    id: "confidence_level",
    section: "Style Confidence",
    question: "On a scale of 1-10, how confident do you feel about your daily outfits?",
    type: "scale",
  },
  {
    id: "style_struggle",
    section: "Style Confidence",
    question: "What's your biggest style struggle?",
    options: ["Choosing matching colors", "Identifying item colors", "Shopping for new items", "Finding my personal style"],
    icons: ["🎨", "🏷️", "🛍️", "👤"],
    type: "select",
  },
  {
    id: "help_type",
    section: "Style Confidence",
    question: "What would help you most?",
    options: ["Instant 'Does this match?' check", "Pre-built color-safe outfits", "A personalized shopping list", "Better lighting/labels"],
    icons: ["✅", "👕", "📝", "💡"],
    type: "select",
  },
  // Section 3 - Personal Style
  {
    id: "style_archetype",
    section: "Personal Style",
    question: "Which aesthetic best describes your goal?",
    options: ["Timeless & Classic", "Modern Minimalist", "Streetwear & Bold", "Business Professional", "Relaxed & Casual"],
    icons: ["👔", "👕", "👟", "💼", "👖"],
    type: "select",
  },
  {
    id: "daily_occasion",
    section: "Personal Style",
    question: "Where do you spend most of your time?",
    options: ["Corporate Office", "Creative Studio", "Active/Outdoors", "Home/Remote Work", "Social/Evening Events"],
    icons: ["🏢", "🎨", "🧗", "🏠", "✨"],
    type: "select",
  },
  {
    id: "color_adventurousness",
    section: "Personal Style",
    question: "How adventurous are you with colors?",
    options: ["Stick to safe neutrals", "I like a pop of color", "Want bold combinations", "Not sure what works"],
    icons: ["⚪", "🌈", "🔥", "🧐"],
    type: "select",
  },
  {
    id: "result_type",
    section: "Personal Style",
    question: "What are you looking for today?",
    options: ["A few safe outfits", "A complete capsule wardrobe", "Check my current closet"],
    icons: ["👔", "📦", "🔍"],
    type: "select",
  },
  // Section 4 - Wardrobe Input
  {
    id: "wardrobe_raw",
    section: "Your Wardrobe",
    question: "Tell us what you own. (Plain-English)",
    type: "textarea",
    placeholder: "e.g. dark jeans, khaki pants, white sneakers, brown boots, navy polo, gray hoodie, light blue button-down",
  },
  // Section 5 - Shopping Preferences
  {
    id: "budget",
    section: "Shopping Preferences",
    question: "What's your typical budget for a new clothing item?",
    options: ["$25-50", "$50-100", "$100-200", "$200+"],
    icons: ["💸", "💵", "💰", "💎"],
    type: "select",
  },
  {
    id: "favorite_stores",
    section: "Shopping Preferences",
    question: "Where do you usually shop?",
    options: ["Uniqlo/Everlane", "J.Crew/Zara", "Nike/Adidas", "Luxury Brands", "Thrift/Secondhand"],
    icons: ["👕", "👗", "👟", "💅", "♻️"],
    type: "multi-select",
  },
  {
    id: "shopping_goal",
    section: "Shopping Preferences",
    question: "What do you want help buying most?",
    options: ["Versatile basics", "Statement pieces", "Shoes & Accessories", "Professional workwear"],
    icons: ["📦", "✨", "👞", "💼"],
    type: "select",
  },
];

function StyleQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const navigate = useNavigate();

  const currentQuestion = QUESTIONS[step];

  const handleSelect = (option: string) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(nextAnswers);
    goToNext(nextAnswers);
  };

  const handleMultiSelectToggle = (option: string) => {
    setMultiSelect((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleMultiSelectSubmit = () => {
    const nextAnswers = { ...answers, [currentQuestion.id]: multiSelect };
    setAnswers(nextAnswers);
    setMultiSelect([]);
    goToNext(nextAnswers);
  };

  const handleTextSubmit = (text: string) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: text };
    setAnswers(nextAnswers);
    goToNext(nextAnswers);
  };

  const goToNext = (currentAnswers: Record<string, any>) => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      finishQuiz(currentAnswers);
    }
  };

  const goToPrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const finishQuiz = (finalAnswers: Record<string, any>) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("truhue_style_profile", JSON.stringify(finalAnswers));
    }
    navigate({ to: "/quiz/result" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-indigo-50/50">
      <div className="w-full max-w-2xl p-10 bg-white rounded-[2.5rem] shadow-2xl space-y-10 border border-indigo-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <button 
            onClick={goToPrev}
            className={`text-gray-400 font-bold flex items-center gap-2 hover:text-indigo-600 transition-colors ${step === 0 ? 'invisible' : ''}`}
          >
            ← Back
          </button>
          <div className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest">
            {currentQuestion.section}
          </div>
          <div className="text-gray-300 font-black text-xs uppercase tracking-widest">
            {step + 1} / {QUESTIONS.length}
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
              {currentQuestion.question}
            </h2>
            {currentQuestion.disclaimer && (
              <p className="text-xs text-gray-400 font-medium italic">
                {currentQuestion.disclaimer}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {currentQuestion.type === "select" && (
              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options?.map((option, idx) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className="w-full p-6 text-left border-4 border-gray-50 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 transition-all group flex items-center gap-6"
                  >
                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform border border-gray-100">
                      {currentQuestion.icons?.[idx]}
                    </div>
                    <span className="text-xl font-black text-gray-700 group-hover:text-indigo-700">
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "multi-select" && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  {currentQuestion.options?.map((option, idx) => (
                    <button
                      key={option}
                      onClick={() => handleMultiSelectToggle(option)}
                      className={`p-6 text-center border-4 rounded-2xl transition-all group space-y-4 ${
                        multiSelect.includes(option)
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-gray-50 hover:border-indigo-100"
                      }`}
                    >
                      <div className="text-3xl">{currentQuestion.icons?.[idx]}</div>
                      <div className="font-black text-gray-700">{option}</div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleMultiSelectSubmit}
                  disabled={multiSelect.length === 0}
                  className="w-full py-5 bg-indigo-600 text-white font-black text-xl rounded-2xl hover:bg-indigo-700 shadow-xl transition-all disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            )}

            {currentQuestion.type === "scale" && (
              <div className="space-y-12 py-8">
                <div className="flex justify-between gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleSelect(num.toString())}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-gray-50 font-black text-gray-400 hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center"
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-widest px-2">
                  <span>Not at all</span>
                  <span>Extremely Confident</span>
                </div>
              </div>
            )}

            {currentQuestion.type === "textarea" && (
              <div className="space-y-8">
                <textarea
                  className="w-full h-48 p-6 bg-gray-50 border-4 border-transparent focus:border-indigo-600 rounded-3xl outline-none text-xl font-medium placeholder:text-gray-300 transition-all"
                  placeholder={currentQuestion.placeholder}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.metaKey) {
                      handleTextSubmit((e.target as HTMLTextAreaElement).value);
                    }
                  }}
                  id="wardrobe-input"
                />
                <div className="flex justify-between items-center">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                     Tip: List items separated by commas
                   </p>
                  <button
                    onClick={() => {
                      const el = document.getElementById("wardrobe-input") as HTMLTextAreaElement;
                      handleTextSubmit(el.value);
                    }}
                    className="px-10 py-5 bg-indigo-600 text-white font-black text-xl rounded-2xl hover:bg-indigo-700 shadow-xl transition-all"
                  >
                    Submit Wardrobe
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
