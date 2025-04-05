import { Action } from "./action";
import { Change } from "./change";

export class ActionUpdatePerfil extends Action {
    private changes: Change[] = [];

    constructor(dateCreated: string, description: string) {
        super(description, dateCreated);
    }

    addChange(change: Change): void {
        this.changes.push(change);
        console.log("Nuevo cambio agregado:");
        change.showChanges();
    }

    showAction(): void {
        console.log("Cambios realizados:");
        this.changes.forEach(change => change.showChanges());
    }
}