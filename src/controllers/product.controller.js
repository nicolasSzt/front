import product_repository from "../repositories/products_repository.js";

class ProductsController {
  create(request, response) {
    console.log("Body:", request.body);
    const product = product_repository.create({
      title: request.body.title,
      description: request.body.description,
      price: request.body.price,
    });
    response.status(201).json({ message: "Producto creado", product });
  }

  async getAll(request, response) {
    try {
      const { products } = product_repository.getAll();
      response.status(200).json(products);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      response.status(500).json({ error: "Error al obtener productos" });
    }
  }

  deleteProducts(request, response) {
    const { id } = request.params;
    const productId = Number(id);
    const { products, isDeleted } =
      product_repository.deleteProductById(productId);
    if (products && isDeleted) {
      response.status(200).json({ message: "Producto eliminado" });
    } else {
      response.status(500).json({ error: "Producto no encontrado" });
    }
  }
}

const productsController = new ProductsController();

export default productsController;
