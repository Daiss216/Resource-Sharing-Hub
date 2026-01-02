import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HomePage } from "./pages/HomePage";
import { BrowsePage } from "./pages/BrowsePage";
import { UploadPage } from "./pages/UploadPage";
import { AdminPage } from "./pages/AdminPage";

const TABS = ["Home", "Browse", "Upload", "Admin"];

function App() {
  const [activeTab, setActiveTab] = useState("Home");

  const renderTab = () => {
    switch (activeTab) {
      case "Home":
        return <HomePage />;
      case "Browse":
        return <BrowsePage />;
      case "Upload":
        return <UploadPage />;
      case "Admin":
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="backdrop-blur bg-white/70 border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-sky-400 via-emerald-300 to-indigo-300 shadow-md flex items-center justify-center text-white text-lg font-bold">
              N
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">
                Resource Hub
              </h1>
              <p className="text-xs text-slate-500">
                One cosy place for all your notes & PYQs
              </p>
            </div>
          </div>

          <nav className="flex gap-2 text-sm">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  activeTab === tab
                    ? "bg-sky-500 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Placeholder for user avatar / login later */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-300 to-pink-300 flex items-center justify-center text-xs font-semibold text-slate-700">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-6">{renderTab()}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/70 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 text-xs text-slate-500 flex justify-between">
          <span>Built for our department • 2025</span>
          <span>Made with ♥ and too much chai</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
