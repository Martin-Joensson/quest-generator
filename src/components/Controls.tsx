// =========================
// components/Controls.tsx
// =========================
export function Controls({
  onGenerate,
  printMode,
  setPrintMode,
}: {
  onGenerate: () => void;
  printMode: "player" | "gm";
  setPrintMode: React.Dispatch<React.SetStateAction<"player" | "gm">>;
}) {
  return (
    <div className="flex gap-4 justify-center mb-6">
      <button
        onClick={onGenerate}
        className="px-6 py-3 bg-stone-800 text-white rounded-xl shadow"
      >
        Generera uppdrag
      </button>
      <button
        onClick={() => window.print()}
        className="px-6 py-3 bg-amber-700 text-white rounded-xl shadow"
      >
        Skriv ut
      </button>
      <select
        value={printMode}
        onChange={(e) => setPrintMode(e.target.value as "player" | "gm")}
      >
        <option value="player">Player version</option>
        <option value="gm">GM version</option>
      </select>
    </div>
  );
}
