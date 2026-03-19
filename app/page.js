"use client";
import { useEffect, useMemo, useState } from "react";

// =====================================================================
// CORRESPOND — INTERACTIVE WEBSITE WIREFRAME (V5 — VISA FOCUSED)
// =====================================================================

/* ============================================================
   DEMO DATA
============================================================ */

const demoCandidates = [
  { id: 1, name: "Anna", field: "International Business", availability: "June 2026", level: "B2+", summary: "Analytical, strong communication, interested in e-commerce and operations.", status: "In pipeline" },
  { id: 2, name: "Mark", field: "Hospitality Management", availability: "July 2026", level: "C1", summary: "Guest experience focused, leadership mindset, ready for fast-paced roles.", status: "Available" },
  { id: 3, name: "Sofia", field: "Marketing", availability: "August 2026", level: "C1", summary: "Content + performance, hands-on with social and email campaigns.", status: "Available" },
  { id: 4, name: "Lucas", field: "Finance", availability: "June 2026", level: "B2", summary: "Strong Excel, reporting, and forecasting; interested in corporate finance.", status: "In pipeline" },
  { id: 5, name: "Emma", field: "Computer Science", availability: "September 2026", level: "C1", summary: "Frontend + APIs, practical experience with React and data dashboards.", status: "Available" },
  { id: 6, name: "Noah", field: "Supply Chain", availability: "July 2026", level: "B2+", summary: "Process improvement, logistics, vendor coordination; structured communicator.", status: "Available" },
];

const demoVacancies = [
  { id: 1, title: "Marketing Internship (J-1)", company: "E-commerce Brand", location: "Austin, TX", category: "Marketing", duration: "6 months", text: "Support campaigns and product launches while gaining experience in a growing US company.", bullets: ["Content & social", "Light analytics", "Cross-team projects"] },
  { id: 2, title: "Hospitality Management Trainee", company: "Hotel Group", location: "Miami, FL", category: "Hospitality", duration: "12 months", text: "Learn operations and guest experience management in an international hospitality environment.", bullets: ["Operations", "Guest experience", "Team leadership"] },
  { id: 3, title: "Business Operations Intern", company: "SaaS Company", location: "Denver, CO", category: "Business", duration: "6 months", text: "Assist with reporting, process docs, and internal projects across teams.", bullets: ["Reporting", "Process docs", "Project support"] },
  { id: 4, title: "Front-End Developer Intern", company: "Tech Studio", location: "San Diego, CA", category: "Tech", duration: "6 months", text: "Build UI components and integrate APIs in a small product team.", bullets: ["React", "API integration", "QA + ship"] },
];

const demoBlogPosts = [
  { id: 1, category: "Visa", title: "J-1 Visa Explained: Requirements for Dutch Students", excerpt: "Eligibility, documents and common mistakes students make when applying." },
  { id: 2, category: "Visa", title: "DS-2019 and J-1 Sponsor: What You Need to Know", excerpt: "What the DS-2019 is, who provides it, and how the sponsor process works." },
  { id: 3, category: "Process", title: "Timeline: From Eligibility Check to Embassy Appointment", excerpt: "A realistic timeline so you know when to start and what happens in each phase." },
];

/* ============================================================
   UI PRIMITIVES
============================================================ */

function Chip({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs border bg-white">
      {children}
    </span>
  );
}

function NavItem({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm transition ${
        active ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function Section({ title, subtitle, children, gray }) {
  return (
    <section className={gray ? "bg-gray-50 border-t border-gray-100" : "bg-white"}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        {(title || subtitle) && (
          <div className="mb-10 max-w-2xl">
            {title && <h2 className="text-2xl font-semibold">{title}</h2>}
            {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function PlaceholderImage({ label = "Image" }) {
  return (
    <div className="h-64 rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-200 via-gray-100 to-white flex items-center justify-center text-gray-600">
      <div className="text-center">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-gray-500 mt-1">(presentation placeholder)</div>
      </div>
    </div>
  );
}

function CTAButton({ onClick, children }) {
  return (
    <button onClick={onClick} className="bg-black text-white px-6 py-3 rounded-xl">
      {children}
    </button>
  );
}

/* ============================================================
   HEADER WITH AUDIENCE SWITCH
============================================================ */

function Header({ mode, setMode, page, setPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const switchTo = (nextMode) => {
    setMode(nextMode);
    setPage("home");
  };

  return (
    <header className="sticky top-0 bg-white border-b z-20">
      <div className="border-b bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-2 flex gap-6 text-sm">
          <button
            className={mode === "individuals" ? "font-semibold" : "text-gray-500"}
            onClick={() => switchTo("individuals")}
          >
            For Individuals
          </button>
          <button
            className={mode === "business" ? "font-semibold" : "text-gray-500"}
            onClick={() => switchTo("business")}
          >
            Info for US-based companies
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => setPage("home")} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-semibold">C</div>
          <div className="font-semibold">Correspond</div>
        </button>

        <nav className="hidden md:flex items-center gap-2">
          <NavItem active={page === "home"} onClick={() => setPage("home")}>Home</NavItem>
          <NavItem active={page === "how"} onClick={() => setPage("how")}>
            {mode === "business" ? "How it works (Companies)" : "How it works (Individuals)"}
          </NavItem>
          {mode === "individuals" && (
            <NavItem active={page === "visa"} onClick={() => setPage("visa")}>Visa Application</NavItem>
          )}
          {mode === "individuals" && (
            <NavItem active={page === "vacancies"} onClick={() => setPage("vacancies")}>Vacancies</NavItem>
          )}
          {mode === "business" && (
            <NavItem active={page === "candidates"} onClick={() => setPage("candidates")}>Candidates</NavItem>
          )}
          <NavItem active={page === "faq"} onClick={() => setPage("faq")}>FAQ</NavItem>
          <NavItem active={page === "about"} onClick={() => setPage("about")}>About</NavItem>
          <NavItem active={page === "contact"} onClick={() => setPage("contact")}>Contact</NavItem>
        </nav>

        <button
          onClick={() => { setPage("appointment"); setMobileOpen(false); }}
          className="hidden md:inline-flex bg-black text-white px-4 py-2 rounded-xl text-sm"
        >
          {mode === "business" ? "Make appointment" : "Make free appointment"}
        </button>

        <button className="md:hidden border px-3 py-2 rounded-xl text-sm" onClick={() => setMobileOpen(true)}>Menu</button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl border-l p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Menu</div>
              <button className="border px-3 py-2 rounded-xl text-sm" onClick={() => setMobileOpen(false)}>Close</button>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button className={`text-left px-3 py-2 rounded-lg ${page === "home" ? "bg-gray-100" : "hover:bg-gray-50"}`} onClick={() => { setPage("home"); setMobileOpen(false); }}>Home</button>
              <button className={`text-left px-3 py-2 rounded-lg ${page === "how" ? "bg-gray-100" : "hover:bg-gray-50"}`} onClick={() => { setPage("how"); setMobileOpen(false); }}>
                {mode === "business" ? "How it works (Companies)" : "How it works (Individuals)"}
              </button>
              {mode === "individuals" && (
                <button className={`text-left px-3 py-2 rounded-lg ${page === "visa" ? "bg-gray-100" : "hover:bg-gray-50"}`} onClick={() => { setPage("visa"); setMobileOpen(false); }}>Visa Application</button>
              )}
              {mode === "individuals" && (
                <button className={`text-left px-3 py-2 rounded-lg ${page === "vacancies" ? "bg-gray-100" : "hover:bg-gray-50"}`} onClick={() => { setPage("vacancies"); setMobileOpen(false); }}>Vacancies</button>
              )}
              {mode === "business" && (
                <button className={`text-left px-3 py-2 rounded-lg ${page === "candidates" ? "bg-gray-100" : "hover:bg-gray-50"}`} onClick={() => { setPage("candidates"); setMobileOpen(false); }}>Candidates</button>
              )}
              <button className={`text-left px-3 py-2 rounded-lg ${page === "faq" ? "bg-gray-100" : "hover:bg-gray-50"}`} onClick={() => { setPage("faq"); setMobileOpen(false); }}>FAQ</button>
              <button className={`text-left px-3 py-2 rounded-lg ${page === "about" ? "bg-gray-100" : "hover:bg-gray-50"}`} onClick={() => { setPage("about"); setMobileOpen(false); }}>About</button>
              <button className={`text-left px-3 py-2 rounded-lg ${page === "contact" ? "bg-gray-100" : "hover:bg-gray-50"}`} onClick={() => { setPage("contact"); setMobileOpen(false); }}>Contact</button>
            </div>
            <div className="mt-auto pt-4 border-t">
              <button onClick={() => { setPage("appointment"); setMobileOpen(false); }} className="w-full bg-black text-white px-4 py-3 rounded-xl text-sm">Make free appointment</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HOME — INDIVIDUALS (VISA FOCUSED)
============================================================ */

function HomeIndividuals({ setPage }) {
  return (
    <>
      <Section>
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6">
            <h1 className="text-5xl font-bold leading-tight">
              J-1 visa for the USA — we guide the complete process.
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              From eligibility check to embassy preparation. Whether you already have a company or still need placement — we handle the visa process step by step.
            </p>
            <div className="flex gap-3 mt-6">
              <CTAButton onClick={() => setPage("appointment")}>Check my eligibility</CTAButton>
              <button className="border px-6 py-3 rounded-xl" onClick={() => setPage("visa")}>
                I already have a company
              </button>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              Structured process • Clear documents • Embassy-ready preparation
            </div>
          </div>
          <div className="md:col-span-6">
            <PlaceholderImage label="Homepage hero image (Visa process)" />
          </div>
        </div>
      </Section>

      <Section gray>
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h2 className="text-2xl font-semibold">Download our free brochure</h2>
            <p className="text-gray-600 mt-2">All key information about the J-1 visa process, requirements, and timeline in one document.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <input className="border rounded-xl px-4 py-2 w-48" placeholder="Your name" />
              <input className="border rounded-xl px-4 py-2 w-56" placeholder="Your email" />
              <button className="bg-black text-white px-6 py-2 rounded-xl text-sm">Download brochure (PDF)</button>
            </div>
            <p className="text-xs text-gray-400 mt-3">We'll send you the brochure by email. No spam, ever.</p>
          </div>
          <div className="md:col-span-5">
            <div className="h-40 rounded-2xl border border-gray-200 bg-white flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-3xl mb-1">📄</div>
                <div className="text-sm">Brochure preview</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="border rounded-3xl p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">Live this summer</div>
              <h3 className="text-xl font-semibold">Free live webinar — every week this summer</h3>
              <p className="text-gray-300 mt-2">Ask your questions about the J-1 visa process directly in a live session. Sign up and receive the webinar link by email.</p>
            </div>
            <div className="md:col-span-4 text-right">
              <button className="bg-white text-black px-6 py-3 rounded-xl font-medium">Sign up for the next webinar →</button>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Students currently preparing for the USA"
        subtitle="A snapshot of students in our intake and visa preparation pipeline. Photos shown with permission."
        gray
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {demoCandidates.slice(0, 6).map((c) => (
            <div key={c.id} className="text-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2" />
              <div className="text-sm font-medium">{c.name}</div>
              <div className="text-xs text-gray-500">{c.field}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="How it works" subtitle="Three steps. No mystery.">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Free eligibility check", d: "We confirm if your profile fits J-1 requirements before you invest time or money." },
            { t: "Visa & document preparation", d: "We guide your documents, sponsor coordination, and timeline step by step." },
            { t: "Embassy readiness & departure", d: "Final preparation so you show up confident and ready." },
          ].map((s, i) => (
            <div key={i} className="border rounded-3xl p-6 bg-white">
              <div className="font-semibold">{i + 1}. {s.t}</div>
              <p className="text-sm text-gray-600 mt-2">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button className="text-sm underline" onClick={() => setPage("how")}>View full process</button>
        </div>
      </Section>

      <Section title="Process overview" subtitle="A simplified view of the full journey." gray>
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          {["Eligibility", "Documents", "Sponsor", "Embassy", "Departure"].map((step, i) => (
            <div key={step} className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-xl border bg-white">{step}</div>
              {i < 4 && <div className="text-gray-300">→</div>}
            </div>
          ))}
        </div>
      </Section>

      <Section title="What this process actually involves" subtitle="Clear expectations remove surprises.">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-3xl p-6">
            <div className="font-semibold">What you control</div>
            <ul className="text-sm text-gray-600 mt-3 space-y-2">
              <li>• Your study background</li>
              <li>• Timing and flexibility</li>
              <li>• Preparation effort</li>
              <li>• Company details (if you have one)</li>
            </ul>
          </div>
          <div className="border rounded-3xl p-6">
            <div className="font-semibold">What we guide</div>
            <ul className="text-sm text-gray-600 mt-3 space-y-2">
              <li>• Eligibility assessment</li>
              <li>• Visa & sponsor coordination</li>
              <li>• DS-2019 and document preparation</li>
              <li>• Interview readiness</li>
            </ul>
          </div>
          <div className="border rounded-3xl p-6">
            <div className="font-semibold">What nobody controls</div>
            <ul className="text-sm text-gray-600 mt-3 space-y-2">
              <li>• Embassy decisions</li>
              <li>• Embassy processing times</li>
              <li>• Sponsor processing times</li>
              <li>• External timelines</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        title="Don't have a company yet? We can help."
        subtitle="Finding a paid internship is part of our service. We match you with a US company that fits your study and experience."
        gray
      >
        <div className="grid md:grid-cols-2 gap-6">
          {demoVacancies.slice(0, 2).map((v) => (
            <div key={v.id} className="border rounded-3xl p-6 bg-white">
              <div className="font-semibold">{v.title}</div>
              <div className="text-sm text-gray-500">{v.location} · {v.duration}</div>
              <p className="text-sm text-gray-600 mt-2">{v.text}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                <Chip>{v.category}</Chip>
                {v.bullets.slice(0, 2).map((b) => (
                  <Chip key={b}>{b}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button className="text-sm underline" onClick={() => setPage("vacancies")}>Explore placement options</button>
        </div>
      </Section>

      <Section title="Trust without testimonials" subtitle="New company. Same standard: clarity and accountability.">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Clear eligibility criteria before starting",
            "Transparent timeline + checklist",
            "Realistic expectations about approvals",
            "Direct contact and structured updates",
          ].map((x, i) => (
            <div key={i} className="border rounded-3xl p-6 bg-white">{x}</div>
          ))}
        </div>
      </Section>

      <Section title="Guides & news" subtitle="Articles that answer what students actually search for." gray>
        <div className="grid md:grid-cols-3 gap-6">
          {demoBlogPosts.map((p) => (
            <div key={p.id} className="border rounded-3xl p-6 bg-white">
              <div className="text-xs text-gray-400">{p.category}</div>
              <div className="font-semibold mt-2">{p.title}</div>
              <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
              <button className="mt-4 text-sm underline" onClick={() => setPage("blog")}>Read</button>
            </div>
          ))}
        </div>
      </Section>

      <Section gray>
        <div className="text-center">
          <h3 className="text-xl font-semibold">Not sure if you qualify?</h3>
          <p className="text-gray-600 mt-2">Book a free appointment and we'll tell you honestly if your profile fits.</p>
          <div className="mt-4">
            <CTAButton onClick={() => setPage("appointment")}>Check my eligibility</CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ============================================================
   HOME — BUSINESS
============================================================ */

function HomeBusiness({ setPage }) {
  return (
    <>
      <Section>
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6">
            <h1 className="text-5xl font-bold leading-tight">
              Host motivated international interns with a structured process.
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              We help US companies host international interns and trainees by guiding matching and documentation in a clear, repeatable process.
            </p>
            <div className="flex gap-3 mt-6">
              <CTAButton onClick={() => setPage("appointment")}>Make appointment</CTAButton>
              <button className="border px-6 py-3 rounded-xl" onClick={() => setPage("how")}>See how it works</button>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              Clear responsibilities • Documented steps • Less admin burden
            </div>
          </div>
          <div className="md:col-span-6">
            <PlaceholderImage label="Homepage hero image (Companies)" />
          </div>
        </div>
      </Section>

      <Section gray>
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h2 className="text-2xl font-semibold">Download our free brochure</h2>
            <p className="text-gray-600 mt-2">All key information about hosting international interns — process, responsibilities, and timeline in one document.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <input className="border rounded-xl px-4 py-2 w-48" placeholder="Your name" />
              <input className="border rounded-xl px-4 py-2 w-56" placeholder="Your email" />
              <button className="bg-black text-white px-6 py-2 rounded-xl text-sm">Download brochure (PDF)</button>
            </div>
            <p className="text-xs text-gray-400 mt-3">We'll send you the brochure by email. No spam, ever.</p>
          </div>
          <div className="md:col-span-5">
            <div className="h-40 rounded-2xl border border-gray-200 bg-white flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-3xl mb-1">📄</div>
                <div className="text-sm">Brochure preview</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Why companies work with us">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { t: "Structured onboarding", d: "A repeatable process for roles, paperwork and start dates." },
            { t: "Reduced admin", d: "We keep things organized so your team can focus on the role." },
            { t: "Better matching", d: "Clear intake so candidates fit the work and expectations." },
            { t: "Clear documentation", d: "Templates and checklists that keep steps transparent." },
          ].map((x) => (
            <div key={x.t} className="border rounded-3xl p-6 bg-white">
              <div className="font-semibold">{x.t}</div>
              <p className="text-sm text-gray-600 mt-2">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Available candidates" subtitle="Preview of students currently available. Full CV access is available for verified companies." gray>
        <div className="grid md:grid-cols-2 gap-6">
          {demoCandidates.slice(0, 4).map((c) => (
            <div key={c.id} className="border rounded-3xl p-6 flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-500">{c.field} · {c.level}</div>
                <div className="text-xs text-gray-400 mt-1">Available: {c.availability}</div>
                <p className="text-sm text-gray-600 mt-3">{c.summary}</p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <Chip>{c.status}</Chip>
                  <Chip>J-1 ready intake</Chip>
                </div>
              </div>
              <button className="border px-4 py-2 rounded-xl text-sm" onClick={() => setPage("candidates")}>View</button>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button className="text-sm underline" onClick={() => setPage("candidates")}>View all candidates</button>
        </div>
      </Section>

      <Section title="How hosting works" subtitle="Three steps for companies.">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Define the role", d: "You share the role scope, start date and expectations." },
            { t: "Match candidates", d: "We shortlist candidates that fit the profile and availability." },
            { t: "Documents + onboarding", d: "We guide the documentation steps and help you onboard smoothly." },
          ].map((s, i) => (
            <div key={i} className="border rounded-3xl p-6 bg-white">
              <div className="font-semibold">{i + 1}. {s.t}</div>
              <p className="text-sm text-gray-600 mt-2">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button className="text-sm underline" onClick={() => setPage("how")}>View full process</button>
        </div>
      </Section>

      <Section gray>
        <div className="text-center">
          <h3 className="text-xl font-semibold">Want to host an intern this year?</h3>
          <p className="text-gray-600 mt-2">Schedule a short call. We'll confirm feasibility and next steps.</p>
          <div className="mt-4">
            <CTAButton onClick={() => setPage("appointment")}>Make appointment</CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ============================================================
   HOW IT WORKS — INDIVIDUALS (VISA FOCUSED)
============================================================ */

function HowIndividuals({ setPage }) {
  return (
    <>
      <Section title="How it works (for individuals)" subtitle="Clear steps, realistic timelines, and a structured checklist.">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <div className="space-y-4 text-gray-600">
              <p>
                The J-1 visa process has clear requirements and steps. We start with eligibility, then guide you through documents, sponsor coordination, and embassy preparation. If you don't have a company yet, we can help with placement too.
              </p>
              <p className="text-sm text-gray-500">
                How sponsorship works: Correspond is not a visa sponsor. We work together with officially designated J‑1 sponsors who issue the DS‑2019 required for the visa application. We coordinate preparation and communication so the process stays structured.
              </p>
              <p className="text-sm text-gray-500">
                Note: We provide guidance and preparation. We do not provide legal representation and we do not guarantee approvals.
              </p>
            </div>
            <div className="mt-8 grid gap-4">
              {[
                { t: "1) Eligibility check (free)", d: "We confirm if your study and experience fit J-1 requirements, and we define a realistic timeline." },
                { t: "2) Intake + situation", d: "You share your details, timeline, and whether you already have a company or need placement." },
                { t: "3) Visa & document preparation", d: "We guide sponsor coordination, DS-2019, and your full document checklist." },
                { t: "4) Placement support (if needed)", d: "If you don't have a company yet, we match you based on study and experience." },
                { t: "5) Embassy readiness + departure", d: "Final preparation to help you show up ready and confident." },
              ].map((x) => (
                <div key={x.t} className="border rounded-2xl p-5">
                  <div className="font-semibold text-gray-900">{x.t}</div>
                  <p className="text-sm text-gray-600 mt-2">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="border rounded-3xl p-6 bg-gray-50">
              <div className="font-semibold">What we need from you</div>
              <ul className="text-sm text-gray-600 mt-3 space-y-2">
                <li>• CV (latest)</li>
                <li>• Study details + graduation date</li>
                <li>• Preferred start date + duration</li>
                <li>• Preferred role / industry</li>
                <li>• Company details + offer letter (if you already have one)</li>
                <li>• Short motivation</li>
              </ul>
              <div className="mt-6 border-t pt-5">
                <div className="font-semibold">What you get</div>
                <ul className="text-sm text-gray-600 mt-3 space-y-2">
                  <li>• Eligibility outcome + timeline</li>
                  <li>• Checklist + document guidance</li>
                  <li>• Sponsor coordination + DS-2019 guidance</li>
                  <li>• Interview preparation</li>
                  <li>• Arrival guidance and housing orientation support</li>
                </ul>
              </div>
              <div className="mt-6">
                <CTAButton onClick={() => setPage("appointment")}>Check my eligibility</CTAButton>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Costs & pricing" subtitle="Transparent explanation before you start." gray>
        <div className="max-w-3xl text-gray-600 space-y-4">
          <p>Program costs depend on the sponsor program and placement type. During the free eligibility appointment we explain the expected cost structure, timeline and when costs occur.</p>
          <p className="text-sm text-gray-500">We believe in explaining pricing after eligibility, so you understand feasibility before making decisions.</p>
        </div>
      </Section>

      <Section title="Common pitfalls" gray>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Starting too late", d: "Most delays come from timelines. Start early to keep options open." },
            { t: "Unclear company documentation", d: "If your host company can't provide the required details, it delays the sponsor process." },
            { t: "Incomplete documents", d: "We use checklists so you don't miss required items." },
          ].map((x) => (
            <div key={x.t} className="border rounded-3xl p-6 bg-white">
              <div className="font-semibold">{x.t}</div>
              <p className="text-sm text-gray-600 mt-2">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h3 className="text-xl font-semibold">Want to know if you qualify?</h3>
          <p className="text-gray-600 mt-2">Book a free appointment and we'll confirm feasibility and next steps.</p>
          <div className="mt-4">
            <CTAButton onClick={() => setPage("appointment")}>Check my eligibility</CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ============================================================
   HOW IT WORKS — BUSINESS
============================================================ */

function HowBusiness({ setPage }) {
  return (
    <>
      <Section title="How it works (for companies)" subtitle="A structured hosting process with clear responsibilities and documentation steps.">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <div className="space-y-4 text-gray-600">
              <p>Hosting international interns works best when the role scope, timeline, and documentation steps are clear. We help you define the role, match candidates, and keep the process structured.</p>
              <p className="text-sm text-gray-500">Note: We provide guidance and process structure. We do not provide legal representation.</p>
            </div>
            <div className="mt-8 grid gap-4">
              {[
                { t: "1) Define the role", d: "You share role scope, start date, location, and expectations." },
                { t: "2) Candidate shortlist", d: "We present candidates that fit the role and availability." },
                { t: "3) Training plan + documentation", d: "We guide the steps and templates to keep everything organized." },
                { t: "4) Onboarding", d: "We help coordinate timing and expectations for a smooth start." },
              ].map((x) => (
                <div key={x.t} className="border rounded-2xl p-5">
                  <div className="font-semibold text-gray-900">{x.t}</div>
                  <p className="text-sm text-gray-600 mt-2">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="border rounded-3xl p-6 bg-gray-50">
              <div className="font-semibold">You provide</div>
              <ul className="text-sm text-gray-600 mt-3 space-y-2">
                <li>• Role description + responsibilities</li>
                <li>• Start date + duration</li>
                <li>• Supervisor contact</li>
                <li>• Onboarding plan (basic)</li>
              </ul>
              <div className="mt-6 border-t pt-5">
                <div className="font-semibold">We provide</div>
                <ul className="text-sm text-gray-600 mt-3 space-y-2">
                  <li>• Candidate matching + shortlist</li>
                  <li>• Structured checklist and templates</li>
                  <li>• Timeline coordination</li>
                  <li>• Communication support</li>
                </ul>
              </div>
              <div className="mt-6">
                <CTAButton onClick={() => setPage("appointment")}>Make appointment</CTAButton>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Typical lead times" subtitle="Plan ahead to keep options open." gray>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Matching", d: "1–4 weeks depending on role specificity and start date." },
            { t: "Documentation", d: "2–6 weeks depending on completeness and timing." },
            { t: "Start date", d: "Earlier planning increases candidate availability and fit." },
          ].map((x) => (
            <div key={x.t} className="border rounded-3xl p-6 bg-white">
              <div className="font-semibold">{x.t}</div>
              <p className="text-sm text-gray-600 mt-2">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h3 className="text-xl font-semibold">Want to host an intern?</h3>
          <p className="text-gray-600 mt-2">Schedule a short call to confirm feasibility and next steps.</p>
          <div className="mt-4">
            <CTAButton onClick={() => setPage("appointment")}>Make appointment</CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ============================================================
   VISA APPLICATION (NEW PAGE — INDIVIDUALS)
============================================================ */

function VisaApplication({ setPage }) {
  return (
    <>
      <Section
        title="You have a company — we handle the visa process"
        subtitle="Already matched with a US company? We guide the J-1 visa process from eligibility to embassy preparation."
      >
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <div className="mt-2 grid gap-4">
              {[
                { t: "1) Eligibility check", d: "We verify your profile and company details meet J-1 requirements." },
                { t: "2) Sponsor coordination", d: "We connect you with a designated J-1 sponsor and coordinate the DS-2019." },
                { t: "3) Document preparation", d: "We guide your complete document checklist step by step." },
                { t: "4) Embassy readiness", d: "Final preparation so you're ready and confident." },
              ].map((x) => (
                <div key={x.t} className="border rounded-2xl p-5">
                  <div className="font-semibold text-gray-900">{x.t}</div>
                  <p className="text-sm text-gray-600 mt-2">{x.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <CTAButton onClick={() => setPage("appointment")}>Check my eligibility</CTAButton>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="border rounded-3xl p-6 bg-gray-50">
              <div className="font-semibold">What you need to provide</div>
              <ul className="text-sm text-gray-600 mt-3 space-y-2">
                <li>• Company name + location</li>
                <li>• Offer letter or confirmation</li>
                <li>• Role description + responsibilities</li>
                <li>• Start date + duration</li>
                <li>• Your CV + study details</li>
              </ul>
              <div className="mt-6 border-t pt-5">
                <div className="font-semibold">What you get</div>
                <ul className="text-sm text-gray-600 mt-3 space-y-2">
                  <li>• Eligibility outcome + timeline</li>
                  <li>• Sponsor coordination + DS-2019 guidance</li>
                  <li>• Full document checklist</li>
                  <li>• Embassy preparation</li>
                  <li>• Arrival guidance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="How sponsorship works" gray>
        <div className="max-w-3xl text-gray-600 space-y-4">
          <p>Correspond is not a visa sponsor. We work together with officially designated J-1 sponsors who issue the DS-2019 required for the visa application. We coordinate preparation and communication so the process stays structured.</p>
          <p className="text-sm text-gray-500">Note: We provide guidance and preparation. We do not provide legal representation and we do not guarantee approvals.</p>
        </div>
      </Section>

      <Section>
        <div className="border rounded-3xl p-8 bg-gray-50">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <h3 className="text-lg font-semibold">Don't have a company yet? We can help with placement too.</h3>
              <p className="text-gray-600 mt-2">We match students with US companies based on study field and experience. Placement is part of our service.</p>
            </div>
            <div className="md:col-span-4 text-right">
              <button className="border px-6 py-3 rounded-xl" onClick={() => setPage("vacancies")}>Explore placement options</button>
            </div>
          </div>
        </div>
      </Section>

      <Section gray>
        <div className="text-center">
          <h3 className="text-xl font-semibold">Ready to start your visa process?</h3>
          <p className="text-gray-600 mt-2">Book a free appointment and we'll confirm your eligibility.</p>
          <div className="mt-4">
            <CTAButton onClick={() => setPage("appointment")}>Check my eligibility</CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ============================================================
   CANDIDATES (BUSINESS)
============================================================ */

function CandidatesPage({ setPage }) {
  const [field, setField] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [showGate, setShowGate] = useState(false);
  const [selected, setSelected] = useState(null);
  const [profileId, setProfileId] = useState(null);

  const fields = useMemo(() => {
    const f = new Set(demoCandidates.map((c) => c.field));
    return ["All", ...Array.from(f)];
  }, []);

  const avail = ["All", "June 2026", "July 2026", "August 2026", "September 2026"];

  const filtered = demoCandidates.filter((c) => {
    if (field !== "All" && c.field !== field) return false;
    if (availability !== "All" && c.availability !== availability) return false;
    return true;
  });

  return (
    <>
      <Section title="Available candidates" subtitle="A current overview for verified companies. CV downloads are available after a quick company verification.">
        <div className="flex flex-wrap gap-3 mb-6">
          <label className="text-sm text-gray-600">Field</label>
          <select className="border rounded-xl px-3 py-2 text-sm" value={field} onChange={(e) => setField(e.target.value)}>
            {fields.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
          <label className="text-sm text-gray-600">Availability</label>
          <select className="border rounded-xl px-3 py-2 text-sm" value={availability} onChange={(e) => setAvailability(e.target.value)}>
            {avail.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
          <button className="ml-auto text-sm underline" onClick={() => setPage("appointment")}>Request candidates</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((c) => (
            <div key={c.id} className="border rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-lg">{c.name}</div>
                  <div className="text-sm text-gray-500">{c.field} · {c.level}</div>
                  <div className="text-xs text-gray-400 mt-1">Available: {c.availability}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-200" />
              </div>
              <p className="text-sm text-gray-600 mt-3">{c.summary}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                <Chip>{c.status}</Chip>
                <Chip>Profile reviewed</Chip>
              </div>
              <div className="mt-5 flex gap-3">
                <button className="border px-4 py-2 rounded-xl text-sm" onClick={() => setProfileId(profileId === c.id ? null : c.id)}>
                  {profileId === c.id ? "Hide profile" : "View profile"}
                </button>
                <button className="bg-black text-white px-4 py-2 rounded-xl text-sm" onClick={() => { setSelected(c); setShowGate(true); }}>
                  Download CV
                </button>
              </div>
              {profileId === c.id && (
                <div className="mt-4 border-t pt-4 text-sm text-gray-600 space-y-2">
                  <p><span className="font-medium text-gray-900">Field:</span> {c.field}</p>
                  <p><span className="font-medium text-gray-900">Language level:</span> {c.level}</p>
                  <p><span className="font-medium text-gray-900">Availability:</span> {c.availability}</p>
                  <p><span className="font-medium text-gray-900">Status:</span> {c.status}</p>
                  <p><span className="font-medium text-gray-900">Summary:</span> {c.summary}</p>
                  <p className="text-xs text-gray-400 mt-2">Full CV available after company verification.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {showGate && (
        <Section gray title="CV access">
          <div className="max-w-3xl border rounded-3xl p-6 bg-white">
            <div className="font-semibold">Quick company verification</div>
            <p className="text-sm text-gray-600 mt-2">This is a demo gate to protect candidate privacy. In the real site, verified companies can download CVs.</p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <input className="border rounded-xl px-4 py-2" placeholder="Company name" />
              <input className="border rounded-xl px-4 py-2" placeholder="Company email" />
              <input className="border rounded-xl px-4 py-2" placeholder="Website" />
              <input className="border rounded-xl px-4 py-2" placeholder="Role you're hiring for" />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <button className="text-sm underline" onClick={() => setShowGate(false)}>Cancel</button>
              <button className="bg-black text-white px-5 py-2 rounded-xl text-sm" onClick={() => { setShowGate(false); setSelected(null); }}>Verify & download (demo)</button>
            </div>
            {selected && <div className="mt-4 text-xs text-gray-500">Selected candidate: {selected.name} ({selected.field})</div>}
          </div>
        </Section>
      )}
    </>
  );
}

/* ============================================================
   VACANCIES (INDIVIDUALS)
============================================================ */

function VacanciesPage({ setPage }) {
  const [cat, setCat] = useState("All");
  const [applyTo, setApplyTo] = useState(null);
  const [detailId, setDetailId] = useState(null);

  const cats = ["All", "Marketing", "Hospitality", "Business", "Tech"];
  const filtered = demoVacancies.filter((v) => (cat === "All" ? true : v.category === cat));

  return (
    <>
      <Section title="Vacancies" subtitle="Example internship opportunities at US companies. Matching happens after intake.">
        <div className="flex items-center gap-3 mb-6">
          <label className="text-sm text-gray-600">Category</label>
          <select className="border rounded-xl px-3 py-2 text-sm" value={cat} onChange={(e) => setCat(e.target.value)}>
            {cats.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
          <button className="ml-auto text-sm underline" onClick={() => setPage("appointment")}>Check my eligibility</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((v) => (
            <div key={v.id} className="border rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-lg">{v.title}</div>
                  <div className="text-sm text-gray-500">{v.company} · {v.location}</div>
                  <div className="text-xs text-gray-400 mt-1">{v.duration} · {v.category}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-200" />
              </div>
              <p className="text-sm text-gray-600 mt-3">{v.text}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {v.bullets.map((b) => <Chip key={b}>{b}</Chip>)}
              </div>
              <div className="mt-5 flex gap-3">
                <button className="border px-4 py-2 rounded-xl text-sm" onClick={() => setDetailId(detailId === v.id ? null : v.id)}>
                  {detailId === v.id ? "Hide details" : "View details"}
                </button>
                <button className="bg-black text-white px-4 py-2 rounded-xl text-sm" onClick={() => setApplyTo(v)}>Apply</button>
              </div>
              {detailId === v.id && (
                <div className="mt-4 border-t pt-4 text-sm text-gray-600 space-y-2">
                  <p><span className="font-medium text-gray-900">Duration:</span> {v.duration}</p>
                  <p><span className="font-medium text-gray-900">Location:</span> {v.location}</p>
                  <p><span className="font-medium text-gray-900">Description:</span> {v.text}</p>
                  <p><span className="font-medium text-gray-900">Key areas:</span> {v.bullets.join(", ")}</p>
                  <p className="text-xs text-gray-400 mt-2">Full details available after intake. Matching happens based on study field and availability.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {applyTo && (
        <Section gray title="Apply (demo)">
          <div className="max-w-3xl border rounded-3xl p-6 bg-white">
            <div className="font-semibold">Application for: {applyTo.title}</div>
            <p className="text-sm text-gray-600 mt-2">Demo application form. In production this can connect to email/CRM.</p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <input className="border rounded-xl px-4 py-2" placeholder="Full name" />
              <input className="border rounded-xl px-4 py-2" placeholder="Email" />
              <input className="border rounded-xl px-4 py-2" placeholder="Study / field" />
              <input className="border rounded-xl px-4 py-2" placeholder="Preferred start date" />
              <input className="border rounded-xl px-4 py-2 md:col-span-2" placeholder="Link to CV / portfolio" />
              <textarea className="border rounded-xl px-4 py-2 md:col-span-2" placeholder="Short motivation" />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <button className="text-sm underline" onClick={() => setApplyTo(null)}>Cancel</button>
              <button className="bg-black text-white px-5 py-2 rounded-xl text-sm" onClick={() => setApplyTo(null)}>Submit application (demo)</button>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}

/* ============================================================
   BLOG
============================================================ */

function BlogPage({ setPage }) {
  const [selectedPost, setSelectedPost] = useState(null);

  if (selectedPost) {
    return (
      <Section title={selectedPost.title} subtitle={selectedPost.category}>
        <div className="max-w-3xl">
          <p className="text-gray-600">{selectedPost.excerpt}</p>
          <div className="mt-6 border rounded-3xl p-6 bg-gray-50">
            <p className="text-sm text-gray-500">Full article content placeholder. In production this will contain the complete article with rich formatting, images, and internal links.</p>
          </div>
          <div className="mt-6 flex gap-4">
            <button className="text-sm underline" onClick={() => setSelectedPost(null)}>← Back to all articles</button>
            <button className="text-sm underline" onClick={() => setPage("appointment")}>Check my eligibility</button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Guides & news" subtitle="Articles that help visitors understand the process and prepare.">
      <div className="grid md:grid-cols-3 gap-6">
        {demoBlogPosts.map((p) => (
          <div key={p.id} className="border rounded-3xl p-6">
            <div className="text-xs text-gray-400">{p.category}</div>
            <div className="font-semibold mt-2">{p.title}</div>
            <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
            <button className="mt-4 text-sm underline" onClick={() => setSelectedPost(p)}>Read article</button>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   FAQ / ABOUT / CONTACT
============================================================ */

function FAQ({ mode }) {
  const intro = mode === "business"
    ? "Answers for host companies: process, responsibilities and expectations."
    : "Answers for individuals: eligibility, timelines and what to expect.";

  const questions = mode === "business"
    ? [
        "What do we need to provide as a host company?",
        "How long does the process typically take?",
        "Can we request specific study fields or profiles?",
        "How is candidate privacy handled?",
      ]
    : [
        "Am I guaranteed a visa approval?",
        "How long does the process take?",
        "Do I need to find a company myself?",
        "When should I start?",
        "What if I already have a company?",
        "What is the DS-2019 and who provides it?",
      ];

  return (
    <Section title="Frequently asked questions" subtitle={intro}>
      <div className="space-y-4 max-w-3xl">
        {questions.map((q, i) => (
          <div key={i} className="border rounded-2xl p-4">
            <div className="font-medium">{q}</div>
            <div className="text-sm text-gray-600 mt-2">Placeholder answer. In production this becomes an accordion with clear, short answers.</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function About({ mode, setPage }) {
  const headline = mode === "business" ? "About Correspond (for companies)" : "About Correspond";
  const lead = mode === "business"
    ? "We make hosting international interns clear, structured, and less time-consuming."
    : "We make the J-1 visa process clear, structured, and realistic — whether you have a company or need placement.";

  return (
    <>
      <Section title={headline} subtitle={lead}>
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7 text-gray-600 space-y-4">
            <p>Correspond focuses on transparency: eligibility first, structured steps, and clear communication. Instead of marketing claims, we show the process and set realistic expectations.</p>
            <p>As the company grows, we'll add verified outcomes and case studies. Until then, we focus on being clear and consistent.</p>
            <div className="mt-6">
              <CTAButton onClick={() => setPage("appointment")}>
                {mode === "business" ? "Make appointment" : "Check my eligibility"}
              </CTAButton>
            </div>
          </div>
          <div className="md:col-span-5">
            <PlaceholderImage label="About page team / office photo" />
          </div>
        </div>
      </Section>

      <Section title="Our principles" gray>
        <div className="grid md:grid-cols-3 gap-6">
          {["Clarity", "Structure", "Realistic expectations"].map((x) => (
            <div key={x} className="border rounded-3xl p-6 bg-white">
              <div className="font-semibold">{x}</div>
              <p className="text-sm text-gray-600 mt-2">Short explanation placeholder.</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function Contact({ mode, setPage }) {
  const title = mode === "business" ? "Contact (companies)" : "Contact";
  const subtitle = mode === "business"
    ? "Tell us the role you want to host and your ideal start date."
    : "Tell us your study, timing, and what you want to do in the USA.";

  const right = mode === "business"
    ? ["Company email: info@correspond.info", "Location: US / NL", "Response: within 1–2 business days (demo)"]
    : ["Email: info@correspond.info", "Location: US / NL", "Response: within 1–2 business days (demo)"];

  return (
    <Section title={title} subtitle={subtitle}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-3xl p-6 space-y-3">
          <input className="border rounded-xl px-4 py-2 w-full" placeholder={mode === "business" ? "Company name" : "Name"} />
          <input className="border rounded-xl px-4 py-2 w-full" placeholder={mode === "business" ? "Company email" : "Email"} />
          <input className="border rounded-xl px-4 py-2 w-full" placeholder={mode === "business" ? "Role you want to host" : "Study / field"} />
          {mode === "individuals" && (
            <select className="border rounded-xl px-4 py-2 w-full text-gray-500">
              <option>Do you already have a company?</option>
              <option>Yes — I have a company</option>
              <option>No — I need placement</option>
            </select>
          )}
          <textarea className="border rounded-xl px-4 py-2 w-full" placeholder="Message" />
          <button className="bg-black text-white px-4 py-2 rounded-xl">Send</button>
          <button className="text-sm underline" onClick={() => setPage("appointment")}>
            Prefer booking? Make an appointment
          </button>
        </div>
        <div className="border rounded-3xl p-6 bg-gray-50">
          <div className="font-semibold">Contact details</div>
          <div className="text-sm text-gray-600 mt-3 space-y-2">
            {right.map((x) => <div key={x}>{x}</div>)}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   APPOINTMENT
============================================================ */

function Appointment({ mode, setPage }) {
  const title = mode === "business" ? "Make an appointment" : "Make a free appointment";
  const subtitle = mode === "business"
    ? "A short intro call to confirm feasibility and next steps."
    : "A free eligibility check to confirm feasibility and next steps.";

  return (
    <Section title={title} subtitle={subtitle}>
      <div className="grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-7">
          <div className="border rounded-3xl p-6">
            <div className="font-semibold">Booking widget placeholder</div>
            <p className="text-sm text-gray-600 mt-2">In production this can embed Calendly or a custom booking flow.</p>
            <div className="mt-6 h-56 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-500">Calendar UI placeholder</div>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="border rounded-3xl p-6 bg-gray-50">
            <div className="font-semibold">What we'll cover</div>
            <ul className="text-sm text-gray-600 mt-3 space-y-2">
              {mode === "business" ? (
                <>
                  <li>• Your role + start date</li>
                  <li>• Candidate availability</li>
                  <li>• Process overview + responsibilities</li>
                </>
              ) : (
                <>
                  <li>• Your eligibility</li>
                  <li>• Timeline + checklist</li>
                  <li>• Visa process overview</li>
                </>
              )}
            </ul>
            <div className="mt-6 border-t pt-5">
              <div className="font-semibold">Or send a message</div>
              <button className="mt-3 border px-4 py-2 rounded-xl text-sm" onClick={() => setPage("contact")}>Go to contact</button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   FOOTER
============================================================ */

function Footer({ mode, setPage }) {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-semibold text-white mb-2">Correspond</div>
          <p>Visa guidance and process support for students and host companies. Clear steps, realistic timelines, structured communication.</p>
        </div>

        <div>
          <div className="font-semibold text-white mb-2">{mode === "business" ? "Companies" : "Individuals"}</div>
          <ul className="space-y-2">
            <li><button className="underline" onClick={() => setPage("how")}>How it works</button></li>
            {mode === "individuals" && (
              <li><button className="underline" onClick={() => setPage("visa")}>Visa Application</button></li>
            )}
            {mode === "business" ? (
              <li><button className="underline" onClick={() => setPage("candidates")}>Candidates</button></li>
            ) : (
              <li><button className="underline" onClick={() => setPage("vacancies")}>Vacancies</button></li>
            )}
            <li><button className="underline" onClick={() => setPage("faq")}>FAQ</button></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white mb-2">Resources</div>
          <ul className="space-y-2">
            <li><button className="underline" onClick={() => setPage("blog")}>Blog</button></li>
            {mode === "individuals" && (
              <li><button className="underline">Webinar</button></li>
            )}
            <li><button className="underline" onClick={() => setPage("about")}>About</button></li>
            <li><button className="underline" onClick={() => setPage("contact")}>Contact</button></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white mb-2">Contact</div>
          <ul className="space-y-2">
            <li>info@correspond.info</li>
            <li>Dallas, TX (US) / Netherlands</li>
            <li><button className="underline" onClick={() => setPage("appointment")}>Make appointment</button></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-6">
        © Correspond — Interactive wireframe (presentation)
      </div>
    </footer>
  );
}

/* ============================================================
   APP
============================================================ */

function PresentationBadge() {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-black text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        Presentation Wireframe V5 — Visa-Focused
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("individuals");
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const renderHome = () => (mode === "business" ? <HomeBusiness setPage={setPage} /> : <HomeIndividuals setPage={setPage} />);
  const renderHow = () => (mode === "business" ? <HowBusiness setPage={setPage} /> : <HowIndividuals setPage={setPage} />);

  return (
    <div className="font-sans text-gray-900">
      <Header mode={mode} setMode={setMode} page={page} setPage={setPage} />

      {page === "home" && renderHome()}
      {page === "how" && renderHow()}

      {page === "visa" && mode === "individuals" && <VisaApplication setPage={setPage} />}
      {page === "vacancies" && mode === "individuals" && <VacanciesPage setPage={setPage} />}
      {page === "candidates" && mode === "business" && <CandidatesPage setPage={setPage} />}

      {page === "blog" && <BlogPage setPage={setPage} />}
      {page === "faq" && <FAQ mode={mode} />}
      {page === "about" && <About mode={mode} setPage={setPage} />}
      {page === "contact" && <Contact mode={mode} setPage={setPage} />}
      {page === "appointment" && <Appointment mode={mode} setPage={setPage} />}

      <Footer mode={mode} setPage={setPage} />
      <PresentationBadge />
    </div>
  );
}
