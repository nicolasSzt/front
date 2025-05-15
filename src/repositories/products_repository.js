class ProductsRepository {
  products = [
    { id: 1, title: "Tv Samsung", price: 4000 },
    { id: 2, title: "Tv LG", price: 5000 },
    { id: 3, title: "Tv Noblex", price: 6000 },
  ];

  create({ title, description, price }) {
    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
    };

    this.products.push(newProduct);
    console.log("Producto creado exitosamente!");

    return this.products;
  }

  getAll() {
    return { products: this.products };
  }

  deleteProductById(id) {
    const productDeleted = this.products.filter((product) => product.id !== id);
    const isDeleted = productDeleted.length < this.products.length;
    return { products: this.products, isDeleted };
  }
}

const product_repository = new ProductsRepository();

export default product_repository;
