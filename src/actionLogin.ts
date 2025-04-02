import { Action } from "./action";

export class ActionLogIn extends Action {
    private sourceDevice: string;

    constructor(
        sourceDevice: string,
        datecreated: string,
        verbDescription: string
    ) {
        super(verbDescription, datecreated)
        this.sourceDevice = sourceDevice;
    }

    showAction(): void {
        console.log(`
            La accion con id: ${this.getActionId()}
            se hizo en ${this.datecreated} y fue ${this.verbDescription}
            desde ${this.sourceDevice}
        `);
    }
}