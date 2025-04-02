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
        console.log(`La accion con id: ${this.changeId} valor anterior: ${this.newChange} y fue ${this.preventDefault}`)
    }
}