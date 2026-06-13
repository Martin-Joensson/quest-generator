import { Handler } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

type RewrittenQuest = {
  playerText: string;
  gmText: string;
  rewards: string[];
};

export const handler: Handler = async (event) => {
  try {
    const { text } = JSON.parse(event.body || "{}");

    if (!text) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing text",
        }),
      };
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite",
    });

    const prompt = `
Du är en erfaren äventyrsredaktör för svenska fantasyrollspel i stil med Drakar och Demoner.

Din uppgift är att omarbeta det givna uppdraget till tydlig och stämningsfull svenska.

Viktiga regler:

- Behåll uppdragets grundidé och spelrelevanta information.
- Lägg inte till nya handlingstrådar eller hemligheter som förändrar äventyret.
- Namn på personer, platser och föremål bör ändras för att förbättra känslan, men ska passa svensk fantasy.
- Minska upprepningar och variera formuleringar.
- Endast 1-3 meningar per stycke.
- Kort och koncist.
- Skriv naturlig svenska.
- Allt ska få plats på ett A4 när det är utskrivet.

För playerText:

- Texten ska vara skriven på ett sådant sett att man skulle kunna hitta den som ett anslag på en anslagstavla i en medeltida stad.
- Den behöver inte börja med sökes.
- Texten kan få ha en mer personlig prägel.
- Texten får vara skriven i första person såväl som tredje person.
- Texten kan ha skrivits av någon som inte är så bra på att skriva, inkludera stavfel eller talspråk.

För "gmText":

- Dela upp informationen i flera tydliga stycken.
- Separera varje stycke med en tom rad.

- Undvik långa textblock.

Returnera ENDAST giltig JSON.
Ingen markdown.
Inga \`\`\`json-block.
Ingen förklarande text före eller efter JSON.

JSON-strukturen ska vara exakt:

{
  "title": "Ett passande namn på äventyret",
  "playerText": "Text som kan läsas upp för spelarna utan att avslöja hemligheter.",
  "gmText": "Text för spelledaren. Dela upp informationen i stycken. Inled varje stycke med två beskrivande meningar innan konkreta detaljer presenteras. Om utmaningar förekommer ska de beskrivas tydligt utan att föreslå lösningar. Fällor behöver inte läggas till om de inte redan passar uppdraget.",
  "rewards": [
    "Belöning 1",
    "Belöning 2",
    "Belöning 3"
  ]
}

Belöningar:
- Ge mellan 3 och 5 förslag.
- Belöningarna ska passa uppdragets ton och svårighetsgrad.
- Belöningarna ska vara konkret beskrivna.
- De kan bestå av pengar, värdeföremål, magiska föremål, tjänster, kontakter eller ovanliga föremål.

UPPDRAG:
${text}
`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const responseText = result.response.text();

    let quest: RewrittenQuest;

    try {
      quest = JSON.parse(responseText);
    } catch {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Gemini returned invalid JSON",
          raw: responseText,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(quest),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to rewrite quest",
      }),
    };
  }
};
