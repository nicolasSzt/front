import { Action } from "./action";

export class ActionBuy extends Action {
    private products: string[] = [];
    private total: number = 0;

    constructor(description: string, total: number, created_at: string) {
        super(description,created_at);
        this.total = total;
    }

    addProduct(product: string): void {
        this.products.push(product);
    }

    showAction(): void {
        console.log(`
            La accion con id: ${this.getActionId()}
            se hizo el dia ${this.created_at} y ${this.products}
            con un total de: ${this.total}
        `);
    }
}