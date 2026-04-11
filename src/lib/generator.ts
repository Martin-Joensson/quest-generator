// =========================
// lib/generator.ts
// =========================
import { uppdraget } from "../data/uppdraget";
import { resan } from "../data/resan";
import { aventyrsplatsen } from "../data/aventyrsplatsen";

const roll = (n: number) => Math.floor(Math.random() * n);

export function generateQuest() {
  const u = {
    when: uppdraget.when[roll(4)],
    delivery: uppdraget.delivery[roll(6)],
    npc: uppdraget.npc[roll(8)],
    goal: uppdraget.goal[roll(10)],
    object: uppdraget.object[roll(12)],
    name: uppdraget.name[roll(20)],
  };

  const r = {
    travel: resan.travel[roll(4)],
    end: resan.end[roll(6)],
    place: resan.place[roll(8)],
    name: resan.name[roll(20)],
  };

  const a = {
    entry: aventyrsplatsen.entry[roll(4)],
    feature: aventyrsplatsen.feature[roll(6)],
    boss: aventyrsplatsen.boss[roll(20)],
  };

  return {
    text: `${u.when} nås rollpersonerna av ${u.delivery} från ${u.npc} som vill ${u.goal} ${u.object} som kallas för ${u.name}.\n\nResan blir ${r.travel} och slutar ${r.end}. Där finns en ${r.place} kallad ${r.name}.\n\nVägen in är ${a.entry}. Här finns ${a.feature}. Till slut måste rollpersonerna besegra ${a.boss}.`,
  };
}
