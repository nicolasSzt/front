import { GeneratorId } from "./generatorIds";

export class Action {
    private id: string = new GeneratorId().getRandomId()
    protected description: string;
    protected created_at: string;

    constructor(
        description: string,
        created_at: string
    ) {
        this.description = description
        this.created_at = created_at
    }

    public getActionId() {
        return this.id
    }

    public showAction(): void {
        console.log(`
            La accion con id: ${this.id} se hizo en ${this.created_at} y fue ${this.description}
        `)
    }

}
