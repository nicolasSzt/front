import { Action } from "./action";

export class History {
    private actions: Action[] = [];

    constructor(action: Action[]) {
        this.actions = action;
    }

    public addAction(action: Action): void {
        this.actions.push(action);
    }

    public deleteAction(id: string): void {
        this.actions = this.actions.filter(action => action.getActionId() !== id);
    }

    public showHistory(): void {
        if (this.actions.length > 0) {
            this.actions.forEach(action => {
                action.showAction();
            });
        } else {
            console.log('No hay acciones para mostrar.');
        }
    }

    public deleteAllActions(): void {
        while (this.actions.length > 0) {
            this.actions.pop();
        }
    }

}