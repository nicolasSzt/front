import { Action } from "../action";

export class ActionBuy extends Action {
    total: number;
    products: string[] = [];

    constructor(description: string, total: number, product: string[], created_at: string) {
        super(description, created_at);
        this.total = total;
        this.products = product;
    }

    public addProduct(product: string): void {
        this.products.push(product);
    }

    public showAction(): void {
        console.log(`
          id: ${this.getActionId()}
          Acción: ${this.description}
          Productos: ${this.products.join(", ")}
          Fecha: ${this.created_at}
          Total: $${this.total}
        `);
    }
}