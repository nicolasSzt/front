import { GeneratorId } from "./generatorIds";

export class Action {
    private id: string = new GeneratorId().getRandomId()
    protected verbDescription: string;
    protected datecreated: string;

    constructor(
        verbDescription: string,
        datecreated: string
    ) {
        this.verbDescription = verbDescription
        this.datecreated = datecreated
    }

    public getActionId() {
        return this.id
    }

    public showAction(): void {
        console.log(`
            La accion con id: ${this.id} se hizo en ${this.datecreated} y fue ${this.verbDescription}
        `)
    }

}
