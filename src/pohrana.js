
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const FILE = join(process.cwd(), "zadaci.json");

export async function ucitajZadatke() {
    try {
        const tekst = await readFile(FILE, "utf-8");
        return JSON.parse(tekst);

    } catch (error) {
        if (error.code === "ENOENT") {
            return [];
        }

        throw error;
    }
}

export async function spremiZadatke(zadaci) {
    await writeFile(FILE, JSON.stringify(zadaci, null, 2));
}
