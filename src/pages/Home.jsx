import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BRAND_ICONS = [
  {
    color: 'bg-iris-violet',
    // Message/Speech bubble icon
    svg: (
      <svg className="w-8 h-8 text-pitch-black" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
      </svg>
    )
  },
  {
    color: 'bg-toxic-green',
    // Check mark / shield icon
    svg: (
      <svg className="w-8 h-8 text-pitch-black" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
      </svg>
    )
  },
  {
    color: 'bg-ember-orange',
    // Spark/Lightning icon
    svg: (
      <svg className="w-8 h-8 text-pitch-black" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c0 .83.67 1.5 1.5 1.5h1c.83 0 1.5-.67 1.5-1.5v-3c4.69 0 8.5-3.81 8.5-8.5S20.69 2 16 2h-4.5zm2.5 11.5H9.5v-2h4.5v2zm2-4H8.5v-2h7.5v2z"/>
      </svg>
    )
  },
  {
    color: 'bg-schoolbus-yellow',
    // Lock icon
    svg: (
      <svg className="w-8 h-8 text-pitch-black" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
      </svg>
    )
  },
  {
    color: 'bg-cobalt-blue',
    // Bar chart icon
    svg: (
      <svg className="w-8 h-8 text-pitch-black" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
      </svg>
    )
  }
];

const FAQS = [
  {
    question: "How do I file a new complaint?",
    answer: "Simply log in to your student account, click on 'Submit Complaint' from the sidebar, fill out the form fields (Title, Category, Location, and Description) and hit submit. The administration will receive it instantly."
  },
  {
    question: "Who reviews my submissions?",
    answer: "All complaints are routed directly to the campus administration desk. They categorize the severity and assign the complaint to the respective engineering or service departments (e.g. IT support, facilities, electrical dept)."
  },
  {
    question: "Can I edit a complaint after filing it?",
    answer: "Yes, you can edit the details of your complaint as long as it is still in the 'Pending' status. Once a staff member starts working on it (status changes to 'In Progress' or 'Resolved'), edits are locked to prevent workflow disruption."
  },
  {
    question: "Is my identity visible to everyone?",
    answer: "Your identity is visible only to the administrators and engineers resolving your issue to facilitate official communication. It is not shared publicly with other students."
  }
];

function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [themeDark, setThemeDark] = useState(true);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={`min-h-screen ${themeDark ? 'bg-pitch-black text-warm-cream' : 'bg-warm-cream text-pitch-black'} transition-colors duration-500`}>
      {/* 1. HERO BAND (Dark) */}
      <section className="min-h-[85vh] flex flex-col justify-between px-6 pt-32 pb-16 bg-pitch-black text-warm-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        {/* Floating Brand Elements */}
        <div className="max-w-6xl mx-auto w-full text-center flex-1 flex flex-col justify-center items-center">
          <div className="mb-6 flex justify-center items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-acid-lime animate-pulse" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-acid-lime font-aeonik">CAMPUS REGISTRY V2</span>
          </div>

          <h1 className="text-7xl sm:text-[120px] md:text-[145px] font-black uppercase tracking-[-0.04em] leading-[0.8] font-oldschoolgrotesk select-none text-warm-cream">
            BANA<br />
            <span className="text-acid-lime">nana</span>
          </h1>

          <p className="mt-8 text-sm sm:text-base text-ash/80 max-w-lg mx-auto tracking-wide leading-relaxed font-aeonik font-light">
            A high-contrast grotesque complaint board. Submit reports, track department progress in real-time, and make your voice count.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/register"
              className="w-full sm:w-auto rounded-full bg-acid-lime px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-pitch-black hover:bg-lime-400 transition-all uppercase text-center cursor-pointer shadow-sm"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto rounded-full border-2 border-acid-lime text-acid-lime hover:bg-acid-lime hover:text-pitch-black px-8 py-3 text-xs font-bold tracking-[0.2em] transition-all duration-300 uppercase text-center cursor-pointer"
            >
              Sign In ↗
            </Link>
          </div>
        </div>

        {/* Quintet Brand Icons Row */}
        <div className="w-full max-w-lg mx-auto mt-16">
          <div className="flex justify-between items-center gap-4">
            {BRAND_ICONS.map((icon, idx) => (
              <div
                key={idx}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] ${icon.color} flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-300`}
              >
                {icon.svg}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TRANSITION FEATURE BAND (Cream) */}
      <section className="bg-warm-cream text-pitch-black py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-pitch-black/60 uppercase font-aeonik">FEATURES</span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] font-oldschoolgrotesk">
              CAMPUS ISSUES<br />
              <span className="text-ember-orange">RESOLVED</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-[25px] bg-pitch-black p-8 text-warm-cream shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-acid-lime uppercase font-aeonik">STEP 01</span>
                <h3 className="text-lg font-black uppercase tracking-tight mt-4 font-oldschoolgrotesk">Easy Reporting</h3>
                <p className="mt-3 text-xs text-ash/80 leading-relaxed font-light font-aeonik">
                  Submit detailed descriptions, select categories, and pinpoint room/building locations in seconds.
                </p>
              </div>
              <div className="text-right mt-6">
                <span className="text-xl text-acid-lime font-mono">↗</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-[25px] bg-pitch-black p-8 text-warm-cream shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-acid-lime uppercase font-aeonik">STEP 02</span>
                <h3 className="text-lg font-black uppercase tracking-tight mt-4 font-oldschoolgrotesk">Real-time Tracking</h3>
                <p className="mt-3 text-xs text-ash/80 leading-relaxed font-light font-aeonik">
                  Follow progress directly through interactive badges showing Pending, In Progress, or Resolved statuses.
                </p>
              </div>
              <div className="text-right mt-6">
                <span className="text-xl text-acid-lime font-mono">↗</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="rounded-[25px] bg-pitch-black p-8 text-warm-cream shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-acid-lime uppercase font-aeonik">STEP 03</span>
                <h3 className="text-lg font-black uppercase tracking-tight mt-4 font-oldschoolgrotesk">Analytics Board</h3>
                <p className="mt-3 text-xs text-ash/80 leading-relaxed font-light font-aeonik">
                  Help administrators identify frequent hotspots and departments with delay bottlenecks.
                </p>
              </div>
              <div className="text-right mt-6">
                <span className="text-xl text-acid-lime font-mono">↗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ ACCORDION BAND (Ember Orange) */}
      <section className="bg-ember-orange text-pitch-black py-24 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-pitch-black/70 uppercase font-aeonik">FAQ</span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] font-oldschoolgrotesk">
              MOST COMMON<br />
              QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="space-y-2">
                  {/* Question Pill */}
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between bg-pitch-black text-warm-cream rounded-full py-4.5 px-6.5 text-left text-xs font-bold uppercase tracking-wider hover:bg-charcoal-900 transition-colors cursor-pointer select-none"
                  >
                    <span>{faq.question}</span>
                    <span className={`text-sm transition-transform duration-300 ${isOpen ? 'rotate-180 text-acid-lime' : 'text-warm-cream/50'}`}>
                      ▼
                    </span>
                  </button>

                  {/* Expanded Answer Card */}
                  {isOpen && (
                    <div className="bg-warm-cream text-pitch-black rounded-[25px] p-6 text-xs font-medium leading-relaxed shadow-md animate-in slide-in-from-top-2 duration-300 border border-pitch-black/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FOOTER / DECORATIVE BAR */}
      <footer className="bg-pitch-black text-warm-cream py-16 px-6 relative border-t border-charcoal-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[8px] bg-ember-orange flex items-center justify-center font-black text-pitch-black text-xs font-oldschoolgrotesk tracking-tighter">
              B
            </div>
            <span className="font-oldschoolgrotesk font-black text-sm tracking-wider text-warm-cream uppercase">
              BANANANA
            </span>
          </div>

          <div className="text-xs text-ash/60 font-aeonik font-light">
            © 2026 BANANANA campus registry. Designed for visual utility.
          </div>

          {/* Theme Switcher Widget */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-widest text-ash uppercase font-aeonik">CONTRAST MODE</span>
            <button
              onClick={() => setThemeDark(!themeDark)}
              className="w-12 h-6 bg-charcoal-900 rounded-full p-0.5 flex items-center justify-between border border-smoke-plate relative cursor-pointer"
            >
              <div className={`w-5 h-5 rounded-full bg-acid-lime transition-transform duration-300 ${themeDark ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;