import { Action } from "./action";

export class ActionLogIn extends Action {
    private sourceDevice: string;

    constructor(
        sourceDevice: string,
        created_at: string,
        description: string
    ) {
        super(description, created_at)
        this.sourceDevice = sourceDevice;
    }

    showAction(): void {
        console.log(`
            La accion con id: ${this.getActionId()}
            se hizo en ${this.created_at} y fue ${this.description}
            desde ${this.sourceDevice}
        `);
    }
}