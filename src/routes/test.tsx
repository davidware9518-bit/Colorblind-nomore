import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { IshiharaTest } from "~/components/IshiharaTest";

export const Route = createFileRoute("/test")({
  component: ColorblindTestPage,
});

function ColorblindTestPage() {
  const [showResult, setShowResult] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleComplete = (result: string) => {
    setTestResult(result);
    localStorage.setItem("obvistyle_color_result", result);
    setShowResult(true);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-6 font-sans">
        <div className="max-w-2xl mx-auto bg-white p-12 rounded-[3rem] shadow-2xl space-y-8 border border-indigo-100 text-center">
          <div className="text-6xl">🔍</div>
          <h2 className="text-4xl font-black text-gray-900 leading-tight">Your Vision Results</h2>
          <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 inline-block">
             <p className="text-2xl font-black text-indigo-600">{testResult}</p>
          </div>
          <p className="text-gray-500 font-medium leading-relaxed">
            This screening is based on Ishihara-style patterns. For a professional diagnosis, please consult an eye care specialist.
          </p>
          <div className="flex flex-col gap-4 pt-4">
            <Link 
              to="/quiz" 
              className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-xl transition-all"
            >
              Take the Style Quiz
            </Link>
            <Link to="/" className="text-gray-400 font-bold hover:text-gray-600 transition-colors uppercase tracking-widest text-xs">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50/50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-xl bg-white p-10 rounded-[3rem] shadow-2xl space-y-8 border border-indigo-100 relative overflow-hidden">
        <IshiharaTest onComplete={handleComplete} />
      </div>
    </div>
  );
}
