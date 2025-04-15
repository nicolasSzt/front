import { ActionBuy } from "./actionBuy";

export class ActionBuyBuilder {
  private description: string = '';
  private total: number = 0;
  private created_at: string= '';
  private products: string[] = [];

  public setDescription(description: string): this {
    this.description = description;
    return this;
  }

  public setTotal(total: number): this {
    this.total = total;
    return this;
  }

  public setCreatedAt(created_at: string): this {
    this.created_at = created_at;
    return this;
  }

  public setProducts(products: string[]): this {
    this.products = products;
    return this;
  }

  public build(): ActionBuy {
    return new ActionBuy(this.description, this.total, this.products, this.created_at,);
  }
}
