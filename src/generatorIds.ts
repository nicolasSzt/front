import { v4 as uuidv4 } from 'uuid';

export class GeneratorId {
    private generatedIds: Set<string> = new Set();

    public getRandomId(): string {
        let idRandom: string;

        do {
            idRandom = uuidv4();
        } while (this.generatedIds.has(idRandom));

        this.generatedIds.add(idRandom);
        return idRandom;
    }
}