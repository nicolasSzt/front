import { Action } from "./action";

export class ActionLogOut extends Action {
    private sourceDevice: string;
    private timeSession: number;

    constructor(sourceDevice: string, timeSession: number, created_at: string, description: string) {
        super(description, created_at)
        this.sourceDevice = sourceDevice;
        this.timeSession = timeSession
    }

    showAction(): void {
        console.log(`
            La accion con id: ${this.getActionId()} se hizo el dia ${this.created_at} y fue ${this.description} desde ${this.sourceDevice} tiempo de sesion: ${this.timeSession}hs
        `);
    }
}