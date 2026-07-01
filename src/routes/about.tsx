import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-white py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
            Our Mission
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none italic">
            Style for Everyone.
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            ObviStyle was founded with a simple goal: to help the 300 million colorblind people worldwide dress with absolute confidence.
          </p>
        </div>

        <div className="prose prose-xl prose-indigo mx-auto text-gray-600 font-medium leading-relaxed space-y-8">
          <p>
            For many, choosing an outfit is a mindless daily routine. But for those with color vision deficiency, it can be a source of stress, uncertainty, and constant second-guessing.
          </p>
          <p>
            ObviStyle uses accessibility-first technology to bridge the gap between color perception and style. We believe that style is a form of self-expression that shouldn't be limited by how you see the visible spectrum.
          </p>
          
          <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 not-prose space-y-6">
            <h2 className="text-3xl font-black text-gray-900 italic">Our Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h3 className="font-black text-indigo-600 uppercase tracking-widest text-xs">Accessibility First</h3>
                <p className="text-sm font-bold">Every feature we build is tested against Protan, Deutan, and Tritan vision profiles.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-indigo-600 uppercase tracking-widest text-xs">Confidence Building</h3>
                <p className="text-sm font-bold">We don't just tell you what matches; we explain why, so you can learn and grow your style.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-indigo-600 uppercase tracking-widest text-xs">Practical Utility</h3>
                <p className="text-sm font-bold">No fluff. We focus on the core essentials that make a difference in your daily life.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-black text-indigo-600 uppercase tracking-widest text-xs">Privacy Respected</h3>
                <p className="text-sm font-bold">Your wardrobe is personal. We store your data locally whenever possible.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-12">
           <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs mb-8 italic">"Color is a tool, but style is an identity."</p>
        </div>
      </div>
    </div>
  );
}
