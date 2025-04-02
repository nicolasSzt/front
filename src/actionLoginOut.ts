import { Action } from "./action";

export class ActionLogOut extends Action {
    private sourceDevice: string;
    private timeSession: number;

    constructor(sourceDevice: string, timeSession: number, datecreated: string, verbDescription: string) {
        super(verbDescription, datecreated)
        this.sourceDevice = sourceDevice;
        this.timeSession = timeSession
    }

    showAction(): void {
        console.log(`
            La accion con id: ${this.getActionId()} se hizo el dia ${this.datecreated} y fue ${this.verbDescription} desde ${this.sourceDevice} tiempo de sesion: ${this.timeSession}hs
        `);
    }
}