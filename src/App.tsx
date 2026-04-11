// =========================
// App.tsx (Notice Board Mode)
// =========================
import { useState } from "react";
import { generateQuest } from "./lib/generator";
import { QuestCard } from "./components/QuestCard";
import { Controls } from "./components/Controls";

function randomRotation() {
  return Math.random() * 6 - 3; // -3 to +3 degrees
}

export default function App() {
  const [quests, setQuests] = useState(() =>
    Array.from({ length: 4 }, () => generateQuest().text),
  );

  const regenerate = () => {
    setQuests(Array.from({ length: 4 }, () => generateQuest().text));
  };

  return (
    <div className="min-h-screen bg-[url('/wood.jpg')] bg-cover bg-center p-8">
      <div className="bg-red-500 md:bg-blue-500 text-white p-10">TEST</div>
      <div className="backdrop-brightness-75 min-h-screen p-6">
        <Controls onGenerate={regenerate} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
          {quests.map((q, i) => (
            <QuestCard
              key={i}
              text={q}
              style={{ transform: `rotate(${randomRotation()}deg)` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
