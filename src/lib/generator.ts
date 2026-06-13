// =========================
// lib/generator.ts
// =========================
import { uppdraget } from "../data/uppdraget";
import { resan } from "../data/resan";
import { aventyrsplatsen } from "../data/aventyrsplatsen";

const roll = (n: number) => Math.floor(Math.random() * n);

export function generateQuest() {
  const u = {
    when: uppdraget.when[roll(uppdraget.when.length)],
    delivery: uppdraget.delivery[roll(uppdraget.delivery.length)],
    npc: uppdraget.npc[roll(uppdraget.npc.length)],
    goal: uppdraget.goal[roll(uppdraget.goal.length)],
    object: uppdraget.object[roll(uppdraget.object.length)],
    name: uppdraget.name[roll(uppdraget.name.length)],
  };

  const r = {
    travel: resan.travel[roll(resan.travel.length)],
    end: resan.end[roll(resan.end.length)],
    adjective: resan.adjective[roll(resan.adjective.length)],
    place: resan.place[roll(resan.place.length)],
    surrounded: resan.surrounded[roll(resan.surrounded.length)],
    name: resan.name[roll(resan.name.length)],
  };

  const a = {
    entry: aventyrsplatsen.entry[roll(aventyrsplatsen.entry.length)],
    feature: aventyrsplatsen.feature[roll(aventyrsplatsen.feature.length)],
    monster:
      aventyrsplatsen.monsters[roll(aventyrsplatsen.monsters.length)].name,
    bigmonster:
      aventyrsplatsen.bigmonster[roll(aventyrsplatsen.bigmonster.length)],
    challenge:
      aventyrsplatsen.challenge[roll(aventyrsplatsen.challenge.length)],
    boss: aventyrsplatsen.boss[roll(aventyrsplatsen.boss.length)],
  };

  return {
    text: `${u.when} nås rollpersonerna av ${u.delivery} ${u.npc} som vill ${u.goal} ${u.object} som kallas för ${u.name}.\n\nResan blir ${r.travel} och slutar ${r.end}. Där finns en ${r.adjective} ${r.place} omgiven av ${r.surrounded}. Platsen kallas för ${r.name}.\n\nVägen in är ${a.entry}. Här finns ${a.feature} men även oväntade gäster i form av ${a.monster} och ${a.bigmonster}. Här finns också en dödlig utmaning i form av ${a.challenge}. Till slut måste rollpersonerna besegra ${a.boss}.`,
  };
}
