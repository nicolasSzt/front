import { Action } from "./action";

export class ActionMessage extends Action {
    private receiver: string = "";
    private message: string = "";

    constructor(receiver: string, message: string, created_at: string) {
        super(receiver, created_at);
        this.receiver = receiver;
        this.message = message;
    }

    showAction(): void {
        console.log(`
            La accion con id: ${this.getActionId()}
            se hizo el dia ${this.created_at} y se envio un mensaje a ${this.receiver}
            con el siguiente mensaje: ${this.message}
        `);
    }
}