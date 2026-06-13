// =========================
// App.tsx (Notice Board Mode)
// =========================
import { useState } from "react";
import { generateQuest } from "./lib/generator";
import { QuestCard } from "./components/QuestCard";
import { Controls } from "./components/Controls";

export type RewrittenQuest = {
  title: string;
  playerText: string;
  gmText: string;
  rewards: string[];
};

export type Quest = {
  originalText: string;
  rewritten?: RewrittenQuest;
};

export default function App() {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [printMode, setPrintMode] = useState<"player" | "gm">("player");

  const [quests, setQuests] = useState<Quest[]>(() =>
    Array.from({ length: 4 }, () => ({
      originalText: generateQuest().text,
    })),
  );

  const regenerate = () => {
    setQuests(
      Array.from({ length: 4 }, () => ({
        originalText: generateQuest().text,
      })),
    );

    setLoadingIndex(null);
  };

  async function rewriteQuest(text: string): Promise<RewrittenQuest> {
    const res = await fetch("/.netlify/functions/rewrite-quest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const responseText = await res.text();

    if (!res.ok) {
      console.error("Rewrite failed:", responseText);

      throw new Error(`Rewrite failed (${res.status}): ${responseText}`);
    }

    return JSON.parse(responseText) as RewrittenQuest;
  }

  const handleRewriteQuest = async (index: number) => {
    try {
      setLoadingIndex(index);

      const original = quests[index].originalText;

      const rewritten = await rewriteQuest(original);

      setQuests((prev) => {
        const copy = [...prev];

        copy[index] = {
          ...copy[index],
          rewritten,
        };

        return copy;
      });
    } catch (error) {
      console.error("Failed to rewrite quest:", error);

      alert("Kunde inte förädla uppdraget med AI.");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900">
      <div className="max-w-7xl mx-auto p-6">
        <Controls
          onGenerate={regenerate}
          printMode={printMode}
          setPrintMode={setPrintMode}
        />
        <div className={printMode === "player" ? "print-player" : "print-gm"}>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2 mt-8">
            {quests.map((quest, i) => (
              <QuestCard
                key={i}
                originalText={quest.originalText}
                rewritten={quest.rewritten}
                onRewrite={() => handleRewriteQuest(i)}
                loading={loadingIndex === i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
