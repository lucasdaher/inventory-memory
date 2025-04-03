"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
class ProductService {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.products = [];
    }
    createProduct(name, description, price, quantity, categoryId) {
        const category = this.categoryService.getCategoryById(categoryId);
        if (!category) {
            throw new Error("Categoria não encontrada.");
        }
        const product = {
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
    listProducts() {
        return this.products;
    }
    searchProduct(searchTerm) {
        let product = this.products.find((p) => p.id === searchTerm);
        if (product)
            return product;
        product = this.products.find((p) => p.name.toLowerCase() === searchTerm.toLowerCase());
        if (product)
            return product;
        product = this.products.find((p) => p.categoryId === searchTerm);
        return product || null;
    }
    updateProduct(id, newName, newDescription, newPrice, newQuantity) {
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
    removeProduct(id) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }
    hasProductsForCategory(categoryId) {
        return this.products.some((p) => p.categoryId === categoryId);
    }
    generateId() {
        return (this.products.length + 1).toString();
    }
}
exports.ProductService = ProductService;
