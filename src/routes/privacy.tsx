import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen bg-white py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-1.5 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
            Privacy Policy
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-none italic">
            Your data, your closet.
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            At TruHue, we believe your personal style and wardrobe data belong to you.
          </p>
        </div>

        <div className="prose prose-xl prose-indigo mx-auto text-gray-600 font-medium leading-relaxed space-y-10">
          <section className="space-y-4">
            <h2 className="text-3xl font-black text-gray-900">1. Data Storage</h2>
            <p>
              By default, your wardrobe items, quiz results, and saved outfits are stored in your browser's <strong>localStorage</strong>. This means the data stays on your device and is not sent to our servers unless you choose to create an account or subscribe to our newsletter.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-black text-gray-900">2. Information We Collect</h2>
            <p>
              If you subscribe to our newsletter, we collect your email address. If you create an account, we collect your profile information to sync your wardrobe across devices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-black text-gray-900">3. How We Use Data</h2>
            <p>
              We use your style profile to generate personalized outfit recommendations. We do not sell your personal data to third parties. We may use anonymized, aggregated data to improve our matching algorithms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-black text-gray-900">4. Third-Party Links</h2>
            <p>
              Our recommendations may include affiliate links to clothing retailers (like Amazon). When you click these links, you are subject to the privacy policies of those third-party sites.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-black text-gray-900">5. Updates</h2>
            <p>
              We may update this policy from time to time. The latest version will always be available on this page.
            </p>
          </section>
        </div>

        <div className="text-center pt-12">
           <p className="text-gray-400 font-bold text-sm italic">Last Updated: June 30, 2026</p>
        </div>
      </div>
    </div>
  );
}
