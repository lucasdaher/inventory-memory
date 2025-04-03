import { Product } from "../models/Products";
import { CategoryService } from "./CategoryServices";

export class ProductService {
  private products: Product[] = [];

  constructor(private categoryService: CategoryService) {}

  createProduct(
    name: string,
    description: string,
    price: number,
    quantity: number,
    categoryId: string
  ): Product {
    const category = this.categoryService.getCategoryById(categoryId);
    if (!category) {
      throw new Error("Categoria não encontrada.");
    }
    const product: Product = {
      id: this.generateId(),
      name,
      description,
      price,
      quantity,
      categoryId,
      creationDate: new Date(),
      updateDate: new Date(),
    };
    this.products.push(product);
    return product;
  }

  listProducts(): Product[] {
    return this.products;
  }

  searchProduct(searchTerm: string): Product | null {
    let product = this.products.find((p) => p.id === searchTerm);
    if (product) return product;

    product = this.products.find(
      (p) => p.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (product) return product;

    product = this.products.find((p) => p.categoryId === searchTerm);
    return product || null;
  }

  updateProduct(
    id: string,
    newName: string,
    newDescription: string,
    newPrice: number,
    newQuantity: number
  ): Product | null {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      product.name = newName;
      product.description = newDescription;
      product.price = newPrice;
      product.quantity = newQuantity;
      product.updateDate = new Date();
      return product;
    }
    return null;
  }

  removeProduct(id: string): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }

  hasProductsForCategory(categoryId: string): boolean {
    return this.products.some((p) => p.categoryId === categoryId);
  }

  private generateId(): string {
    return (this.products.length + 1).toString();
  }
}
