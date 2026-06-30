import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useLocation,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TruHue — Accessible Style" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: () => <div>Page not found</div>,
  component: RootComponent,
});

function Header() {
  return (
    <header className="px-6 h-20 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <Link className="flex items-center gap-2 group" to="/">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
          <span className="text-white font-black text-2xl">T</span>
        </div>
        <span className="font-black text-2xl tracking-tighter text-gray-900">TruHue</span>
      </Link>
      <nav className="hidden md:flex gap-8">
        <Link className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors" to="/quiz">
          Style Quiz
        </Link>
        <Link className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors" to="/wardrobe">
          Wardrobe Tool
        </Link>
        <Link className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors" to="/match">
          Outfit Matcher
        </Link>
        <Link className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors" to="/recommendations">
          Recommendations
        </Link>
        <Link className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors" to="/blog">
          Blog
        </Link>
      </nav>
      <Link 
        to="/quiz" 
        className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg hover:scale-105 active:scale-95"
      >
        Get Started
      </Link>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-20 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <Link className="flex items-center gap-2 group" to="/">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">T</span>
              </div>
              <span className="font-black text-xl tracking-tighter">TruHue</span>
            </Link>
            <p className="text-gray-400 font-medium">
              Mastering style for the colorblind community.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-black text-lg">Tools</h4>
            <nav className="flex flex-col gap-4">
              <Link className="text-gray-400 hover:text-white transition-colors" to="/quiz">Style Quiz</Link>
              <Link className="text-gray-400 hover:text-white transition-colors" to="/wardrobe">Wardrobe Tool</Link>
              <Link className="text-gray-400 hover:text-white transition-colors" to="/match">Outfit Matcher</Link>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-lg">Company</h4>
            <nav className="flex flex-col gap-4">
              <Link className="text-gray-400 hover:text-white transition-colors" to="/about">About Us</Link>
              <Link className="text-gray-400 hover:text-white transition-colors" to="/blog">Blog & Guides</Link>
              <Link className="text-gray-400 hover:text-white transition-colors" to="/recommendations">Recommendations</Link>
              <Link className="text-gray-400 hover:text-white transition-colors" to="/privacy">Privacy Policy</Link>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-lg">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="bg-gray-900 border-none rounded-xl px-4 py-3 flex-1 focus:ring-2 focus:ring-indigo-600 outline-none"
              />
              <button className="bg-indigo-600 px-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors">→</button>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-gray-500">
          <p>© 2026 TruHue. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/" className="hover:text-white">Twitter</Link>
            <Link to="/" className="hover:text-white">Instagram</Link>
            <Link to="/" className="hover:text-white">Discord</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const location = useLocation();
  const isQuiz = location.pathname === "/quiz";

  return (
    <RootDocument>
      {!isQuiz && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isQuiz && <Footer />}
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
        <Scripts />
      </body>
    </html>
  );
}
