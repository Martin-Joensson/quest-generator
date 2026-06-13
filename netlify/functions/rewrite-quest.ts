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
- Gäller uppdraget en bybo måste den få ett namn.
- Namn på personer, platser och föremål ska ändras för att förbättra variationen, men ska passa svensk fantasy.
- Är objektets namn "Namn" så måste den få ett annat namn.
- Minska upprepningar och variera formuleringar.
- Endast 1-3 meningar per stycke.
- Skriv naturlig svenska.

För playerText:

- Texten ska vara skriven på ett sådant sett att man skulle kunna hitta den som ett anslag på en anslagstavla i en medeltida stad.
- Den behöver inte börja med sökes eller hör upp.
- Texten kan presenteras på ett av tre sett, antingen med personlig prägel, eller som att det har blivit dikterat, eller torrt och informativt.
- Texten får vara skriven i första person såväl som tredje person.
- Texten kan ha skrivits av någon som inte är så bra på att skriva, inkludera talspråk.

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
  "gmText": "Text för spelledaren. Dela upp informationen i stycken. Inled varje stycke med en eller två beskrivande meningar innan konkreta detaljer presenteras. Om utmaningar förekommer ska de beskrivas tydligt utan att föreslå lösningar. Fällor behöver inte läggas till om de inte redan passar uppdraget.",
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
