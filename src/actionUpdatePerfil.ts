import { Action } from "./action";
import { Change } from "./change";

export class ActionUpdatePerfil extends Action {
    private changes: Change[] = [];

    constructor(dateCreated: string, verbDescription: string) {
        super(verbDescription, dateCreated)
    }

    showAction(): void {
        console.log(`
            La accion con id: ${this.getActionId()}
            se hizo el dia ${this.datecreated} y fue ${this.verbDescription}
            los cambios en el perfil fueron: ${this.changes}
            `);

        this.changes.forEach(change => {
            change.showChanges();
        });
    }
}