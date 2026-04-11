// =========================
// components/QuestCard.tsx (Medieval Styled + Real Parchment)
// =========================
export function QuestCard({ text, style }: { text: string; style?: React.CSSProperties }) {
    return (
      
    <div
      style={style}
      className=" quest-card max-w-3xl mx-auto p-12 relative text-stone-900 font-serif shadow-2xl rounded-[20px] border-4 border-amber-900 overflow-hidden parchment"
    >
      {/* parchment grain overlay */}
      <div className="absolute inset-0 z-0 " />

      {/* aged vignette */}
      <div className="absolute inset-0 z-0 parchment-vignette" />

      {/* inner border */}
      <div className="absolute z-10 inset-0 pointer-events-none border-4 border-amber-800 rounded-2xl opacity-30" />

      <h1 className="text-5xl z-10 text-center mb-8 tracking-widest font-bold medieval-title relative">
        Uppdrag
      </h1>

      <p className="p-10 quest-ink whitespace-pre-line text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left relative">
        {text}
      </p>

      {/* wax seal */}
      <div className="absolute z-10 bottom-6 right-6 w-16 h-16 bg-red-900/90 rounded-full shadow-inner flex items-center justify-center text-amber-200 font-bold text-xl border border-red-950">
        ⚜
      </div>
    </div>
  );
}
    