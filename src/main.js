
import { ucitajZadatke, spremiZadatke } from "./pohrana.js";

const APP_NAME = "Konzolna biljeznica";
console.log(`== ${APP_NAME} ==`);
const [command, arg1] = process.argv.slice(2);

let zadaci;
try {
    zadaci = await ucitajZadatke();
} catch (error) {
    console.error(`Greska: ${error.message}`);
    process.exit(1);
}

switch (command) {

    case "dodaj": {

        if (arg1 === undefined || arg1.trim() === "") {
            console.error('Koristenje: dodaj "naslov zadatka"');
            process.exit(1);
        }

        let noviId = 1;

        if (zadaci.length > 0) {
            noviId = zadaci[zadaci.length - 1].id + 1;
        }

        zadaci.push({
            id: noviId,
            naslov: arg1,
            gotovo: false
        });

        await spremiZadatke(zadaci);

        console.log(`Dodan je zadatak: ${arg1} (broj ${noviId})`);

        break;
    }

    case "popis":
        if (zadaci.length === 0) {
            console.log("Nema zadataka.");
        } else {
            zadaci.forEach((zadatak) => {
                let oznaka = zadatak.gotovo ? "x" : " ";

                console.log(
                    `${zadatak.id}. [${oznaka}] ${zadatak.naslov}`
                );
            });
        }

        break;

    case "gotovo": {
        const id = Number(arg1);
        if (arg1 === undefined || !/^\d+$/.test(arg1)) {
            console.error("Koristenje: gotovo broj");
            process.exit(1);
        }

        const zadatak = zadaci.find((zadatak) => zadatak.id === id);

        if (zadatak === undefined) {
            console.error(`Zadatak broj ${id} ne postoji.`);
            process.exit(1);
        }

        zadatak.gotovo = true;

        await spremiZadatke(zadaci);

        console.log(`Zadatak broj ${id} oznacen je kao gotov.`);

        break;
    }

    default:
        console.error("Nepoznata naredba. Koristi: dodaj, popis ili gotovo.");
        process.exit(1);
}
