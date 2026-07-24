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
function Phone({ children, chrome = "9:41" }) {
  return (
    <div
      className="mx-auto w-full"
      style={{
        maxWidth: "340px",
        background: C.white,
        borderRadius: "26px",
        border: `1px solid ${C.line}`,
        boxShadow: "0 18px 40px rgba(14,36,56,0.14)",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-2"
        style={{ ...mono, fontSize: "10px", color: C.slate, borderBottom: `1px solid ${C.line}` }}
      >
        <span>{chrome}</span>
        <span>Riverside Primary Care</span>
      </div>
      <div className="p-5">{children}</div>
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
          Tuesday, 10:15 AM with Dr. Alvarez
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
            Your last one was March 2023. Screenings are recommended every year, and
            catching things early is the whole point. Dr. Alvarez can order it Tuesday
            so you only make one trip.
          </p>
        </Marked>

        <Marked layer="emr" on={insp} className="mt-5">
          <div className="px-3 py-3 rounded-lg" style={{ background: C.paper }}>
            <div style={{ ...mono, fontSize: "10px", color: C.slate }}>FROM YOUR CHART</div>
            <div className="mt-1 text-xs" style={{ color: C.inkSoft }}>
              Mammogram, screening &middot; last completed 03/2023 &middot; 26 months ago
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
        <Marked layer="rule" on={insp} className="mt-5">
          <div className="px-3 py-3 rounded-lg text-xs" style={{ background: C.paper, color: C.slate }}>
            Order request queued to Dr. Alvarez for sign-off. Patient is not told an order
            exists until a clinician approves it.
          </div>
        </Marked>
        <div className="mt-5">
          <Btn kind="ghost" onClick={() => go(0)}>
            Replay this flow
          </Btn>
        </div>
      </Phone>
    );

  if (step === 3)
    return (
      <Phone>
        <Eyebrow>GOT IT</Eyebrow>
        <h2 className="mt-2 text-lg font-semibold" style={{ color: C.ink }}>
          Where did you have it done?
        </h2>
        <div className="mt-4 space-y-2">
          {["Another imaging center", "A different doctor's office", "I'm not sure"].map((t) => (
            <div
              key={t}
              className="px-3 py-3 rounded-lg text-sm"
              style={{ background: C.paper, color: C.ink, border: `1px solid ${C.line}` }}
            >
              {t}
            </div>
          ))}
        </div>
        <Marked layer="rule" on={insp} className="mt-5">
          <div className="px-3 py-3 rounded-lg text-xs" style={{ background: C.paper, color: C.slate }}>
            Routed to staff to reconcile against outside records. The gap is paused, not
            closed. Nobody marks a screening complete on a patient&apos;s say-so.
          </div>
        </Marked>
        <div className="mt-5">
          <Btn kind="ghost" onClick={() => go(0)}>
            Replay this flow
          </Btn>
        </div>
      </Phone>
    );

  return (
    <Phone>
      <h2 className="text-lg font-semibold" style={{ color: C.ink }}>
        No problem.
      </h2>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
        We won&apos;t bring it up again for a while. You can always ask Dr. Alvarez about
        it Tuesday.
      </p>
      <Marked layer="rule" on={insp} className="mt-5">
        <div className="px-3 py-3 rounded-lg text-xs" style={{ background: C.paper, color: C.slate }}>
          Suppressed for 90 days and logged. A declined gap that keeps reappearing is how
          you train patients to ignore the whole product.
        </div>
      </Marked>
      <div className="mt-5">
        <Btn kind="ghost" onClick={() => go(0)}>
          Replay this flow
        </Btn>
      </div>
    </Phone>
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
        <Marked layer="rule" on={insp} className="mt-5">
          <div className="px-3 py-3 rounded-lg text-xs" style={{ background: C.paper, color: C.slate }}>
            No condition, no result, no clinical detail in the text. The message is a door,
            not a disclosure. Everything specific lives behind sign-in.
          </div>
        </Marked>
        <div className="mt-5">
          <Btn onClick={() => go(1)}>Tap the link</Btn>
        </div>
      </Phone>
    );

  if (step === 1)
    return (
      <Phone>
        <Eyebrow>CONFIRM IT&apos;S YOU</Eyebrow>
        <h2 className="mt-2 text-lg font-semibold" style={{ color: C.ink }}>
          Date of birth
        </h2>
        <div
          className="mt-4 px-3 py-3 rounded-lg text-sm"
          style={{ background: C.paper, color: C.slate, border: `1px solid ${C.line}` }}
        >
          MM / DD / YYYY
        </div>
        <div className="mt-4">
          <Btn onClick={() => go(2)}>Continue</Btn>
        </div>
        <Marked layer="rule" on={insp} className="mt-5">
          <div className="px-3 py-3 rounded-lg text-xs" style={{ background: C.paper, color: C.slate }}>
            Phones get shared, resold, and reassigned. Verification is what makes the next
            screen safe to show.
          </div>
        </Marked>
      </Phone>
    );

  if (step === 2)
    return (
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
              {["Thu Jul 30 &middot; 8:20 AM", "Fri Jul 31 &middot; 2:45 PM", "Mon Aug 3 &middot; 11:00 AM"].map(
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
                    dangerouslySetInnerHTML={{ __html: s }}
                  />
                )
              )}
            </div>
          </div>
        </Marked>
        <p className="mt-4 text-xs" style={{ color: C.slate }}>
          Ray answers texts in the evening and ignores email. That is why this is a text,
          sent at 6:40 PM.
        </p>
      </Phone>
    );

  return (
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
      <Marked layer="yosi" on={insp} className="mt-5">
        <div className="px-3 py-3 rounded-lg text-xs" style={{ background: C.paper, color: C.slate }}>
          Straight into the existing pre-arrival flow. The gap that started this becomes a
          normal Yosi visit, and the front desk was never involved.
        </div>
      </Marked>
      <div className="mt-5">
        <Btn kind="ghost" onClick={() => go(0)}>
          Replay this flow
        </Btn>
      </div>
    </Phone>
  );
}

/* ------------------------------------------------------------------ */
/*  Flow 3 — Staff queue                                               */
/* ------------------------------------------------------------------ */
const ROWS = [
  { pt: "Maria R.", gap: "Mammogram", status: "Closed by patient", detail: "Added to 7/29 visit", tone: "green" },
  { pt: "Ray W.", gap: "A1c", status: "Closed by patient", detail: "Booked 7/30, was lapsed 14 mo", tone: "green" },
  { pt: "Denise O.", gap: "Colonoscopy", status: "Needs staff", detail: "Says completed elsewhere, records requested", tone: "amber" },
  { pt: "Anthony P.", gap: "Mammogram", status: "Suppressed", detail: "Already scheduled 8/12", tone: "slate" },
  { pt: "Carol T.", gap: "A1c", status: "Suppressed", detail: "Declined 6/02, quiet until 8/31", tone: "slate" },
  { pt: "Luis M.", gap: "Abnormal result follow-up", status: "Never automated", detail: "Acuity tier 3, routed to Dr. Alvarez", tone: "red" },
];

const TONE = { green: C.green, amber: C.amber, slate: C.slate, red: C.red };

function StaffView({ insp }) {
  return (
    <div className="w-full">
      <Marked layer="yosi" on={insp}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { n: "68%", l: "Gaps closed, 90 days" },
            { n: "81%", l: "Closed with no staff touch" },
            { n: "+22 pts", l: "vs. randomized holdout" },
            { n: "94%", l: "Intake completion (guardrail)" },
          ].map((m) => (
            <div
              key={m.l}
              className="px-4 py-4 rounded-lg"
              style={{ background: C.white, border: `1px solid ${C.line}` }}
            >
              <div className="text-2xl font-semibold" style={{ color: C.ink }}>
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
            <div className="text-xs flex-1" style={{ color: C.slate }}>
              {r.detail}
            </div>
          </div>
        ))}
      </div>

      <Marked layer="rule" on={insp} className="mt-4">
        <div
          className="px-4 py-4 rounded-lg text-xs leading-relaxed"
          style={{ background: C.white, border: `1px solid ${C.line}`, color: C.slate }}
        >
          <span style={{ color: C.ink, fontWeight: 600 }}>Why suppressions are visible.</span>{" "}
          Staff trust a queue they can audit. Every gap the system chose not to surface is
          listed with its reason, so the front desk can see the product is filtering rather
          than missing. Tier 3 items never enter the automated path at all.
        </div>
      </Marked>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Notes                                                              */
/* ------------------------------------------------------------------ */
const NOTES = {
  "intake-0": {
    h: "This is Yosi today",
    p: "Maria is finishing pre-arrival intake for Tuesday. She is already in the flow. That is the entire wedge: no new channel, no campaign, no second login, no staff task.",
  },
  "intake-1": {
    h: "Detection is a rule. The sentence is the AI.",
    p: "Female, 52, no mammogram in 26 months is deterministic logic against structured data. Calling that AI would be dishonest. What a model earns here is the plain-language rewrite, the reading level, and the reason this matters to her rather than to a quality measure.",
  },
  "intake-2": {
    h: "One tap, zero staff time",
    p: "Everyone else turns a care gap into a work item for a person who has no capacity to work it. Here it attaches to an appointment that already exists and waits for clinician sign-off.",
  },
  "intake-3": {
    h: "The answer that protects the data",
    p: "Outside records are the most common reason gap lists are wrong. Patients get an honest option, and the gap pauses rather than closing. Nothing is marked complete on self-report.",
  },
  "intake-4": {
    h: "Declining has to be respected",
    p: "Ninety-day suppression, logged. A nudge that ignores a no is how you teach patients to ignore everything Yosi sends, which puts the core intake product at risk.",
  },
  "lapsed-0": {
    h: "A door, not a disclosure",
    p: "No condition, no result, no clinical detail in an unauthenticated channel. This is the constraint that decides the whole design, and it is worth saying out loud before anyone asks.",
  },
  "lapsed-1": {
    h: "Verify before you reveal",
    p: "Numbers get reassigned and phones get shared. Date-of-birth verification is what makes the next screen defensible.",
  },
  "lapsed-2": {
    h: "Where Yosi has data nobody else does",
    p: "Ray answers texts in the evening and never opens email. Channel and timing come from Yosi's own engagement history across practices. A population health vendor can compute the same gap and cannot send this message.",
  },
  "lapsed-3": {
    h: "It ends in a booked slot",
    p: "Not a task, not a call-the-office message. The lapsed patient re-enters the normal pre-arrival flow and the front desk was never involved.",
  },
  staff: {
    h: "The practice is the buyer",
    p: "So the number that matters is how much closed without anyone touching it. The holdout is 10 percent of eligible patients who receive nothing, which is the only way to separate this from seasonality and the reminders Yosi already sends. Intake completion sits next to it as a guardrail: if this feature ever drags the core product down, it gets turned off.",
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
              authentication. Detection logic is stubbed. The point is the workflow and the
              guardrails, not the model.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
