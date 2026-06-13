// =========================
// components/QuestCard.tsx
// =========================
import React from "react";
import { useState } from "react";

type RewrittenQuest = {
  title: string;
  playerText: string;
  gmText: string;
  rewards: string[];
};

type Props = {
  originalText: string;
  rewritten?: RewrittenQuest;
  onRewrite: () => void;
  loading?: boolean;
  style?: React.CSSProperties;
};

export function QuestCard({
  originalText,
  rewritten,
  onRewrite,
  loading = false,
  style,
}: Props) {
  const medievalFonts = [
    "Uncial Antiqua",
    "MedievalSharp",
    "Pirata One",
    "Grenze Gotisch",
    "Averia Serif Libre",
  ];
  const [randomFont] = useState(() => {
    return medievalFonts[Math.floor(Math.random() * medievalFonts.length)];
  });

  return (
    <div
      style={style}
      className="quest-card avoid-break relative overflow-hidden rounded-2xl shadow-2xl bg-amber-50 border-4 border-amber-800"
    >
      <div className="relative z-20 p-8" style={{ fontFamily: randomFont }}>
        {!rewritten ? (
          <>
            <h1 className="text-4xl text-center mb-6 tracking-widest font-bold medieval-title">
              Uppdrag
            </h1>

            <p className="hidden">{originalText}</p>

            <button
              className="mt-8 px-6 py-3 bg-amber-700 text-white rounded-xl shadow hover:bg-amber-800 transition"
              onClick={onRewrite}
              disabled={loading}
            >
              {loading ? "Generarar..." : "Generera med AI"}
            </button>
          </>
        ) : (
          <>
            <h1 className="gm-only text-4xl text-center mb-6 tracking-widest font-bold medieval-title">
              {rewritten.title}
            </h1>

            {/* Player-facing section */}
            <section className="mb-8">
              <h2 className="gm-only no-print text-2xl font-bold mb-3 quest-ink">
                Till spelarna
              </h2>

              <p className="quest-ink whitespace-pre-line leading-relaxed">
                {rewritten.playerText}
              </p>
            </section>

            {/* GM section */}
            <section className="gm-only mb-8">
              <h2 className="text-2xl font-bold mb-4 quest-ink">
                För spelledaren
              </h2>

              <div className="quest-ink leading-relaxed space-y-5">
                {rewritten.gmText.split(/\n\s*\n/).map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </section>

            {/* Rewards */}
            <section className="gm-only">
              <h2 className="text-2xl font-bold mb-3 quest-ink">Belöningar</h2>

              <ul className="list-disc pl-6 space-y-2 quest-ink">
                {rewritten.rewards.map((reward, index) => (
                  <li key={index}>{reward}</li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>

      {/* Wax seal */}
      {/* <div className="wax-seal absolute z-30 bottom-6 right-6 w-16 h-16 bg-red-900/90 rounded-full shadow-inner flex items-center justify-center text-amber-200 font-bold text-xl border border-red-950">
        ⚜
      </div> */}
    </div>
  );
}
