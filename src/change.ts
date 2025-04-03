export class Change {
    private changeId: number;
    private preventDefault: string;
    private newChange: string;

    constructor(
        changeId: number,
        preventDefault: string,
        newChange: string,
    ) {
        this.changeId = changeId;
        this.preventDefault = preventDefault;
        this.newChange = newChange;
    }

    showChanges(): void {
        console.log(`ID del cambio: ${this.changeId}`);
        console.log(`Cambio realizado: ${this.preventDefault} a ${this.newChange}`);
    }
}