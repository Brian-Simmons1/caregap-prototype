import React, { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Palette                                                            */
/* ------------------------------------------------------------------ */
const C = {
  ink: "#0E2438",
  inkSoft: "#1B3A56",
  paper: "#E9EDEF",
  white: "#FFFFFF",
  teal: "#0F8A8D",
  amber: "#C98A1E",
  slate: "#5C7285",
  line: "#D3DBDF",
  green: "#1E7A5A",
  red: "#A33A2B",
};

const mono = {
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};

/* ------------------------------------------------------------------ */
/*  Inspector                                                          */
/* ------------------------------------------------------------------ */
const LAYER = {
  rule: { label: "RULE", color: C.slate, note: "Deterministic logic on structured data" },
  ai: { label: "AI", color: C.amber, note: "Language model output" },
  yosi: { label: "YOSI", color: C.teal, note: "Data only Yosi has" },
  emr: { label: "EMR", color: C.inkSoft, note: "Read from the practice EMR" },
};

function Tag({ layer, on }) {
  if (!on) return null;
  const l = LAYER[layer];
  return (
    <span
      className="inline-block px-1 py-0.5 rounded align-middle"
      style={{
        ...mono,
        fontSize: "9px",
        letterSpacing: "0.08em",
        background: l.color,
        color: C.white,
      }}
    >
      {l.label}
    </span>
  );
}

function Marked({ layer, on, children, className = "" }) {
  return (
    <div
      className={`relative ${className}`}
      style={
        on
          ? {
              outline: `1px dashed ${LAYER[layer].color}`,
              outlineOffset: "3px",
              borderRadius: "6px",
            }
          : undefined
      }
    >
      {on && (
        <div className="absolute" style={{ top: "-9px", right: "-3px", zIndex: 5 }}>
          <Tag layer={layer} on={on} />
        </div>
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shell pieces                                                       */
/* ------------------------------------------------------------------ */
/* Signal, wifi, battery. Drawn rather than imported so the file stays
   dependency-free and pasteable. */
function StatusIcons() {
  return (
    <div className="flex items-center" style={{ gap: "5px", color: C.ink }}>
      <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
        <rect x="0" y="7.5" width="3" height="3.5" rx="0.8" />
        <rect x="4.6" y="5.2" width="3" height="5.8" rx="0.8" />
        <rect x="9.2" y="2.7" width="3" height="8.3" rx="0.8" />
        <rect x="13.8" y="0" width="3" height="11" rx="0.8" />
      </svg>
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M1.3 4.1a10 10 0 0 1 13.4 0" />
        <path d="M3.7 6.8a6.4 6.4 0 0 1 8.6 0" />
        <path d="M6.2 9.4a2.9 2.9 0 0 1 3.6 0" />
      </svg>
      <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden="true">
        <rect
          x="0.6"
          y="0.6"
          width="21"
          height="10.8"
          rx="3.2"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.2"
        />
        <rect x="2.2" y="2.2" width="15.5" height="7.6" rx="1.9" fill="currentColor" />
        <path
          d="M23.2 4.3v3.4a1.9 1.9 0 0 0 0-3.4z"
          fill="currentColor"
          fillOpacity="0.35"
        />
      </svg>
    </div>
  );
}

function Phone({ children, chrome = "Riverside Primary Care" }) {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: "358px" }}>
      <div
        className="relative"
        style={{
          background: C.ink,
          borderRadius: "46px",
          padding: "9px",
          boxShadow: "0 24px 50px rgba(14,36,56,0.30)",
        }}
      >
        {/* side buttons */}
        <div
          className="absolute"
          style={{ left: "-2px", top: "108px", width: "2px", height: "26px", borderRadius: "2px", background: C.inkSoft }}
        />
        <div
          className="absolute"
          style={{ left: "-2px", top: "146px", width: "2px", height: "26px", borderRadius: "2px", background: C.inkSoft }}
        />
        <div
          className="absolute"
          style={{ right: "-2px", top: "126px", width: "2px", height: "42px", borderRadius: "2px", background: C.inkSoft }}
        />

        <div
          className="relative overflow-hidden"
          style={{ background: C.white, borderRadius: "38px", minHeight: "472px" }}
        >
          {/* dynamic island */}
          <div
            className="absolute left-1/2"
            style={{
              top: "9px",
              transform: "translateX(-50%)",
              width: "88px",
              height: "25px",
              borderRadius: "999px",
              background: C.ink,
              zIndex: 10,
            }}
          />

          {/* status bar */}
          <div
            className="flex items-end justify-between px-6"
            style={{ height: "44px", paddingBottom: "7px" }}
          >
            <span style={{ ...mono, fontSize: "11px", fontWeight: 600, color: C.ink }}>9:41</span>
            <StatusIcons />
          </div>

          {/* app header */}
          <div
            className="flex items-center justify-center px-5 py-2"
            style={{ borderBottom: `1px solid ${C.line}` }}
          >
            <span style={{ ...mono, fontSize: "10px", letterSpacing: "0.06em", color: C.slate }}>
              {chrome}
            </span>
          </div>

          <div className="px-5 pt-5 pb-10">{children}</div>

          {/* home indicator */}
          <div
            className="absolute left-1/2"
            style={{
              bottom: "9px",
              transform: "translateX(-50%)",
              width: "118px",
              height: "5px",
              borderRadius: "999px",
              background: C.ink,
              opacity: 0.22,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Btn({ children, onClick, kind = "primary", full = true }) {
  const styles = {
    primary: { background: C.ink, color: C.white, border: `1px solid ${C.ink}` },
    ghost: { background: C.white, color: C.ink, border: `1px solid ${C.line}` },
    quiet: { background: "transparent", color: C.slate, border: "1px solid transparent" },
  }[kind];
  return (
    <button
      onClick={onClick}
      className={`${full ? "w-full" : ""} px-4 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-80`}
      style={styles}
    >
      {children}
    </button>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{ ...mono, fontSize: "10px", letterSpacing: "0.14em", color: C.slate }}>
      {children}
    </div>
  );
}

/* Commentary about the screen, never content on the screen. Lives outside the
   phone frame on the page background so it cannot be mistaken for product UI. */
function Aside({ children, layer, insp, wide = false }) {
  const body = (
    <div className="pl-3" style={{ borderLeft: `2px solid ${C.line}` }}>
      <div style={{ ...mono, fontSize: "9px", letterSpacing: "0.14em", color: C.slate }}>
        BEHIND THIS SCREEN
      </div>
      <div className="mt-1 text-xs leading-relaxed" style={{ color: C.slate }}>
        {children}
      </div>
    </div>
  );
  return (
    <div className="mx-auto w-full mt-5" style={{ maxWidth: wide ? "100%" : "358px" }}>
      {layer ? (
        <Marked layer={layer} on={insp}>
          {body}
        </Marked>
      ) : (
        body
      )}
    </div>
  );
}

/* A control for the person running the demo, so it sits outside the device
   next to the commentary. No patient sees a replay button. */
function Replay({ onClick }) {
  return (
    <div className="mx-auto w-full mt-4 flex justify-center" style={{ maxWidth: "358px" }}>
      <button
        onClick={onClick}
        className="px-3 py-2 rounded-md hover:opacity-70"
        style={{
          ...mono,
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: C.slate,
          background: "transparent",
          border: `1px solid ${C.line}`,
        }}
      >
        REPLAY THIS FLOW
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Flow 1 — Pre-arrival intake                                        */
/* ------------------------------------------------------------------ */
function IntakeFlow({ step, go, insp }) {
  if (step === 0)
    return (
      <Phone>
        <Eyebrow>CHECK IN FOR TUESDAY</Eyebrow>
        <h2 className="mt-2 text-xl font-semibold" style={{ color: C.ink }}>
          Almost done, Maria
        </h2>
        <div className="mt-5 space-y-2">
          {["Insurance confirmed", "Medications reviewed", "Consent signed"].map((t) => (
            <div
              key={t}
              className="flex items-center gap-3 px-3 py-3 rounded-lg"
              style={{ background: C.paper }}
            >
              <span style={{ color: C.green, fontSize: "14px" }}>&#10003;</span>
              <span className="text-sm" style={{ color: C.ink }}>
                {t}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs" style={{ color: C.slate }}>
          Tuesday, 10:15 AM with Dr. Simmons
        </p>
        <div className="mt-4">
          <Btn onClick={() => go(1)}>Continue</Btn>
        </div>
      </Phone>
    );

  if (step === 1)
    return (
      <Phone>
        <Eyebrow>ONE MORE THING</Eyebrow>
        <Marked layer="ai" on={insp} className="mt-3">
          <h2 className="text-xl font-semibold leading-snug" style={{ color: C.ink }}>
            You&apos;re due for a mammogram.
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
            Your last one was May 2024. Screenings are recommended every two years, and
            catching things early is the whole point. Dr. Simmons can order it Tuesday
            so you only make one trip.
          </p>
        </Marked>

        <Marked layer="emr" on={insp} className="mt-5">
          <div className="px-3 py-3 rounded-lg" style={{ background: C.paper }}>
            <div style={{ ...mono, fontSize: "10px", color: C.slate }}>FROM YOUR CHART</div>
            <div className="mt-1 text-xs" style={{ color: C.inkSoft }}>
              Mammogram, screening &middot; last completed 05/2024 &middot; 26 months ago
            </div>
          </div>
        </Marked>

        <div className="mt-5 space-y-2">
          <Btn onClick={() => go(2)}>Add it to Tuesday</Btn>
          <Btn kind="ghost" onClick={() => go(3)}>
            I&apos;ve had this done somewhere else
          </Btn>
          <Btn kind="quiet" onClick={() => go(4)}>
            Not right now
          </Btn>
        </div>
      </Phone>
    );

  if (step === 2)
    return (
      <>
      <Phone>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: C.green, color: C.white }}
        >
          &#10003;
        </div>
        <h2 className="mt-4 text-xl font-semibold" style={{ color: C.ink }}>
          Added to Tuesday
        </h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
          The front desk has it. Nothing else for you to do. You&apos;ll be at the same
          visit, same time.
        </p>
      </Phone>
        <Aside layer="rule" insp={insp}>
          Order request queued to Dr. Simmons for sign-off. Nothing is described to the
          patient as an order until a clinician approves it.
        </Aside>
        <Replay onClick={() => go(0)} />
      </>
    );

  if (step === 3)
    return (
      <>
      <Phone>
        <Eyebrow>GOT IT</Eyebrow>
        <h2 className="mt-2 text-lg font-semibold" style={{ color: C.ink }}>
          Where did you have it done?
        </h2>
        <div className="mt-4 space-y-2">
          {["Another imaging center", "A different doctor's office", "I'm not sure"].map((t) => (
            <button
              key={t}
              onClick={() => go(5)}
              className="w-full text-left px-3 py-3 rounded-lg text-sm hover:opacity-80"
              style={{ background: C.paper, color: C.ink, border: `1px solid ${C.line}` }}
            >
              {t}
            </button>
          ))}
        </div>
      </Phone>
        <Aside layer="rule" insp={insp}>
          Patients know things the chart does not. Asking is cheaper than carrying a gap
          that was already closed somewhere else.
        </Aside>
        <Replay onClick={() => go(0)} />
      </>
    );

  if (step === 5)
    return (
      <>
      <Phone>
        <Eyebrow>THANKS</Eyebrow>
        <h2 className="mt-2 text-lg font-semibold" style={{ color: C.ink }}>
          We&apos;ll ask for the records
        </h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
          Nothing else for you to do. If it turns out you&apos;re up to date, we won&apos;t
          bring this up again.
        </p>
      </Phone>
        <Aside layer="rule" insp={insp}>
          Routed to staff to reconcile against outside records. The gap moves to paused
          and stays open until the records arrive. Self-report does not close it.
        </Aside>
        <Replay onClick={() => go(0)} />
      </>
    );

  return (
    <>
    <Phone>
      <h2 className="text-lg font-semibold" style={{ color: C.ink }}>
        No problem.
      </h2>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
        We won&apos;t bring it up again for a while. You can always ask Dr. Simmons about
        it Tuesday.
      </p>
    </Phone>
      <Aside layer="rule" insp={insp}>
        Suppressed for 90 days and written to the log. A declined gap that keeps
        reappearing trains patients to ignore everything else Yosi sends.
      </Aside>
      <Replay onClick={() => go(0)} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Flow 2 — Lapsed patient                                            */
/* ------------------------------------------------------------------ */
function Bubble({ children, from = "them" }) {
  const mine = from === "me";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className="px-3 py-2 rounded-2xl text-sm max-w-[85%]"
        style={{
          background: mine ? C.ink : C.paper,
          color: mine ? C.white : C.ink,
          lineHeight: 1.45,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function LapsedFlow({ step, go, insp }) {
  if (step === 0)
    return (
      <>
      <Phone chrome="Messages">
        <Eyebrow>SMS &middot; RAY WHITFIELD</Eyebrow>
        <div className="mt-4 space-y-2">
          <Marked layer="ai" on={insp}>
            <Bubble>
              Hi Ray, it&apos;s Riverside Primary Care. It&apos;s been about a year
              since we&apos;ve seen you and there&apos;s something we&apos;d like to check
              on. Tap to see open times: <span style={{ color: C.teal }}>ysi.co/r4k2</span>
              <br />
              <span style={{ fontSize: "11px", color: C.slate }}>Reply STOP to opt out.</span>
            </Bubble>
          </Marked>
        </div>
        <div className="mt-5">
          <Btn onClick={() => go(1)}>Tap the link</Btn>
        </div>
      </Phone>
        <Aside layer="rule" insp={insp}>
          No condition, no result, no clinical detail in the text. Everything specific
          lives behind verification.
        </Aside>
      </>
    );

  if (step === 1)
    return (
      <>
      <Phone>
        <Eyebrow>CONFIRM IT&apos;S YOU</Eyebrow>
        <h2 className="mt-2 text-lg font-semibold" style={{ color: C.ink }}>
          Date of birth
        </h2>
        <input
          type="text"
          inputMode="numeric"
          placeholder="MM / DD / YYYY"
          className="mt-4 w-full px-3 py-3 rounded-lg text-sm"
          style={{ background: C.paper, color: C.ink, border: `1px solid ${C.line}` }}
        />
        <div className="mt-4">
          <Btn onClick={() => go(2)}>Continue</Btn>
        </div>
      </Phone>
        <Aside layer="rule" insp={insp}>
          Phones get shared, resold, and reassigned. The check is what makes the next
          screen safe to show.
        </Aside>
      </>
    );

  if (step === 2)
    return (
      <>
      <Phone>
        <Marked layer="ai" on={insp}>
          <h2 className="text-lg font-semibold leading-snug" style={{ color: C.ink }}>
            Your diabetes check is overdue
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
            The A1c test tracks your blood sugar over time. Yours was last done 14 months
            ago and it&apos;s usually checked twice a year. It&apos;s a quick blood draw.
          </p>
        </Marked>
        <Marked layer="yosi" on={insp} className="mt-5">
          <div>
            <div style={{ ...mono, fontSize: "10px", letterSpacing: "0.12em", color: C.slate }}>
              NEXT AVAILABLE
            </div>
            <div className="mt-2 space-y-2">
              {["Thu Jul 30 · 8:20 AM", "Fri Jul 31 · 2:45 PM", "Mon Aug 3 · 11:00 AM"].map(
                (s, i) => (
                  <button
                    key={s}
                    onClick={() => go(3)}
                    className="w-full text-left px-3 py-3 rounded-lg text-sm hover:opacity-80"
                    style={{
                      background: i === 0 ? C.ink : C.white,
                      color: i === 0 ? C.white : C.ink,
                      border: `1px solid ${i === 0 ? C.ink : C.line}`,
                    }}
                  >
                    {s}
                  </button>
                )
              )}
            </div>
          </div>
        </Marked>
      </Phone>
        <Aside insp={insp}>
          Ray answers texts in the evening and rarely opens email. This one went out at
          6:40 PM.
        </Aside>
      </>
    );

  return (
    <>
    <Phone>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: C.green, color: C.white }}
      >
        &#10003;
      </div>
      <h2 className="mt-4 text-xl font-semibold" style={{ color: C.ink }}>
        Booked for Thursday
      </h2>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
        July 30 at 8:20 AM. We&apos;ll text you a reminder and your intake forms the day
        before.
      </p>
    </Phone>
      <Aside layer="yosi" insp={insp}>
        This drops into the existing pre-arrival flow. The gap that started it becomes a
        normal Yosi visit, and the front desk was never involved.
      </Aside>
      <Replay onClick={() => go(0)} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Flow 3 — Staff queue                                               */
/* ------------------------------------------------------------------ */
const ROWS = [
  { pt: "Maria R.", gap: "Mammogram", status: "Closed by patient", detail: "Added to 7/28 visit", tone: "green" },
  { pt: "Ray W.", gap: "A1c", status: "Closed by patient", detail: "Booked 7/30, was lapsed 14 mo", tone: "green" },
  { pt: "Denise O.", gap: "Colonoscopy", status: "Needs staff", detail: "Says completed elsewhere, records requested", tone: "amber" },
  { pt: "Patricia P.", gap: "Mammogram", status: "Suppressed", detail: "Already scheduled 8/12", tone: "slate" },
  { pt: "Carol T.", gap: "A1c", status: "Suppressed", detail: "Declined 6/02, quiet until 8/31", tone: "slate" },
  { pt: "Luis M.", gap: "Abnormal result follow-up", status: "Never automated", detail: "Acuity tier 3, routed to Dr. Simmons", tone: "red" },
];

const TONE = { green: C.green, amber: C.amber, slate: C.slate, red: C.red };

function StaffView({ insp }) {
  return (
    <div className="w-full">
      <Marked layer="yosi" on={insp}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { n: "68%", l: "Eligible gaps closed, 90 days" },
            { n: "81%", l: "Of those, closed with no staff touch" },
            { n: "+22 pts", l: "vs. randomized holdout" },
            { n: "94%", l: "Intake completion (guardrail)" },
          ].map((m) => (
            <div
              key={m.l}
              className="px-4 py-4 rounded-lg"
              style={{ background: C.white, border: `1px solid ${C.line}` }}
            >
              <div
                className="text-2xl font-semibold"
                style={{ color: C.ink, whiteSpace: "nowrap" }}
              >
                {m.n}
              </div>
              <div className="mt-1 text-xs leading-snug" style={{ color: C.slate }}>
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </Marked>

      <div
        className="mt-4 rounded-lg overflow-hidden"
        style={{ background: C.white, border: `1px solid ${C.line}` }}
      >
        <div
          className="px-4 py-3"
          style={{ ...mono, fontSize: "10px", letterSpacing: "0.12em", color: C.slate, borderBottom: `1px solid ${C.line}` }}
        >
          THIS WEEK &middot; 6 OF 214 SHOWN
        </div>
        {ROWS.map((r) => (
          <div
            key={r.pt + r.gap}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3"
            style={{ borderBottom: `1px solid ${C.line}` }}
          >
            <div className="text-sm font-medium w-24" style={{ color: C.ink }}>
              {r.pt}
            </div>
            <div className="text-sm w-44" style={{ color: C.inkSoft }}>
              {r.gap}
            </div>
            <div
              className="px-2 py-1 rounded"
              style={{ ...mono, fontSize: "10px", color: C.white, background: TONE[r.tone] }}
            >
              {r.status.toUpperCase()}
            </div>
            <div className="text-xs flex-1" style={{ color: C.slate, minWidth: "220px" }}>
              {r.detail}
            </div>
          </div>
        ))}
      </div>

      <Aside layer="rule" insp={insp} wide>
        <span style={{ color: C.ink, fontWeight: 600 }}>Why suppressions are visible.</span>{" "}
        Every gap the system held back is listed with its reason, so the front desk can
        audit what happened and why. Tier 3 items never enter the automated path.
      </Aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Notes                                                              */
/* ------------------------------------------------------------------ */
const NOTES = {
  "intake-0": {
    h: "This is Yosi today",
    p: "Maria is finishing pre-arrival intake for Tuesday. She is already in the session and already answering questions. Everything that follows happens inside it, so there is no campaign to run and nothing lands on the front desk.",
  },
  "intake-1": {
    h: "Detection is just a rule",
    p: "Female, 52, no mammogram in 26 months. Deterministic logic on structured data. The model's job starts after that: plain language, right reading level, framed around what it means for Maria.",
  },
  "intake-2": {
    h: "One tap, no staff time",
    p: "Most care gap tools produce a work item for a staff member who has no capacity to work it. This one attaches to an appointment that already exists, then waits for clinician sign-off.",
  },
  "intake-3": {
    h: "Outside records",
    p: "Outside records are the most common reason gap lists go stale. Maria gets an option that matches what actually happened, which is cheaper than chasing a gap that was closed at an imaging center last spring.",
  },
  "intake-5": {
    h: "Paused, with a reason attached",
    p: "The gap leaves the automated path and lands on the staff queue with the patient's answer attached. Nothing is marked complete until an outside record arrives.",
  },
  "intake-4": {
    h: "A no is recorded",
    p: "Ninety-day suppression, written to the log. If the same prompt comes back next week, patients start ignoring everything Yosi sends, and that puts the core intake product at risk.",
  },
  "lapsed-0": {
    h: "What can go in a text",
    p: "No condition, no result, no clinical detail in an unauthenticated channel. That constraint shapes the rest of the design, so it is worth stating before anyone asks.",
  },
  "lapsed-1": {
    h: "Verification",
    p: "Numbers get reassigned and phones get shared. Date of birth is a low-friction check, and it is what makes the next screen safe to show.",
  },
  "lapsed-2": {
    h: "Where the proprietary data sits",
    p: "Ray answers texts in the evening and rarely opens email. Channel and send time come from Yosi's engagement history across practices. A population health vendor can compute the same gap. Choosing the channel and the hour takes data it does not have.",
  },
  "lapsed-3": {
    h: "It ends in a booked slot",
    p: "The outcome is an appointment on the schedule. Ray re-enters the normal pre-arrival flow from there, and the front desk was never involved.",
  },
  staff: {
    h: "The practice is the buyer",
    p: "So the number that matters is the share that closed without anyone touching it: 81 percent of closures, or 55 percent of every eligible gap. The holdout is 10 percent of eligible patients who receive nothing, which is how you separate this from seasonality and the reminders Yosi already sends. Intake completion sits next to it as a guardrail. If this feature drags the core product down, it gets turned off.",
  },
};

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
export default function YosiPrototype() {
  const [flow, setFlow] = useState("intake");
  const [step, setStep] = useState(0);
  const [insp, setInsp] = useState(false);

  const go = (s) => setStep(s);
  const pick = (f) => {
    setFlow(f);
    setStep(0);
  };

  const noteKey = flow === "staff" ? "staff" : `${flow}-${step}`;
  const note = NOTES[noteKey] || NOTES["intake-0"];

  const flows = [
    { id: "intake", n: "Pre-arrival", d: "Gap surfaced during intake" },
    { id: "lapsed", n: "Lapsed patient", d: "Text to a booked slot" },
    { id: "staff", n: "Staff queue", d: "What closed itself" },
  ];

  return (
    <div className="min-h-screen w-full" style={{ background: C.paper }}>
      {/* header */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
        style={{ background: C.ink }}
      >
        <div>
          <div style={{ ...mono, fontSize: "10px", letterSpacing: "0.16em", color: C.teal }}>
            PROTOTYPE &middot; FICTIONAL DATA &middot; ONE SPECIALTY
          </div>
          <div className="text-base font-semibold mt-0.5" style={{ color: C.white }}>
            Care gaps, closed in the flow the patient is already in
          </div>
        </div>
        <button
          onClick={() => setInsp(!insp)}
          className="px-3 py-2 rounded-lg text-xs font-medium"
          style={{
            background: insp ? C.teal : "transparent",
            color: C.white,
            border: `1px solid ${insp ? C.teal : "rgba(255,255,255,0.3)"}`,
          }}
        >
          {insp ? "Hide what's AI" : "Show what's actually AI"}
        </button>
      </div>

      {/* legend */}
      {insp && (
        <div
          className="flex flex-wrap gap-4 px-6 py-3"
          style={{ background: C.white, borderBottom: `1px solid ${C.line}` }}
        >
          {Object.keys(LAYER).map((k) => (
            <div key={k} className="flex items-center gap-2">
              <Tag layer={k} on />
              <span className="text-xs" style={{ color: C.slate }}>
                {LAYER[k].note}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        {/* rail */}
        <div
          className="md:w-56 shrink-0 px-4 py-5"
          style={{ borderRight: `1px solid ${C.line}` }}
        >
          <div style={{ ...mono, fontSize: "10px", letterSpacing: "0.12em", color: C.slate }}>
            WHERE IT SHOWS UP
          </div>
          <div className="mt-3 space-y-2">
            {flows.map((f, i) => {
              const on = flow === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => pick(f.id)}
                  className="w-full text-left px-3 py-3 rounded-lg"
                  style={{
                    background: on ? C.ink : C.white,
                    border: `1px solid ${on ? C.ink : C.line}`,
                  }}
                >
                  <div className="flex items-baseline gap-2">
                    <span style={{ ...mono, fontSize: "10px", color: on ? C.teal : C.slate }}>
                      {i + 1}
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: on ? C.white : C.ink }}
                    >
                      {f.n}
                    </span>
                  </div>
                  <div
                    className="mt-1 text-xs"
                    style={{ color: on ? "rgba(255,255,255,0.7)" : C.slate }}
                  >
                    {f.d}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* stage */}
        <div className="flex-1 px-6 py-8">
          {flow === "intake" && <IntakeFlow step={step} go={go} insp={insp} />}
          {flow === "lapsed" && <LapsedFlow step={step} go={go} insp={insp} />}
          {flow === "staff" && <StaffView insp={insp} />}
        </div>

        {/* notes */}
        <div
          className="md:w-80 shrink-0 px-6 py-8"
          style={{ borderLeft: `1px solid ${C.line}`, background: C.white }}
        >
          <div style={{ ...mono, fontSize: "10px", letterSpacing: "0.12em", color: C.teal }}>
            WHAT YOU&apos;RE LOOKING AT
          </div>
          <h3 className="mt-3 text-base font-semibold leading-snug" style={{ color: C.ink }}>
            {note.h}
          </h3>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
            {note.p}
          </p>
          <div className="mt-8 pt-5" style={{ borderTop: `1px solid ${C.line}` }}>
            <p className="text-xs leading-relaxed" style={{ color: C.slate }}>
              Built as a scoped prototype: one specialty, fictional patients, no
              authentication. Detection logic is stubbed. What it demonstrates is the
              workflow and the guardrails around it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
