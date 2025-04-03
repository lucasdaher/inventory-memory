"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
class CategoryService {
    constructor() {
        this.categories = [];
    }
    createCategory(name, description) {
        const category = {
            id: this.generateId(),
            name,
            description,
            creationDate: new Date(),
        };
        this.categories.push(category);
        return category;
    }
    listCategories() {
        return this.categories;
    }
    searchCategory(searchTerm) {
        // Busca por id
        const foundById = this.categories.find((c) => c.id === searchTerm);
        if (foundById)
            return foundById;
        // Busca por nome (case insensitive)
        const foundByName = this.categories.find((c) => c.name.toLowerCase() === searchTerm.toLowerCase());
        return foundByName || null;
    }
    updateCategory(id, newName, newDescription) {
        const category = this.categories.find((c) => c.id === id);
        if (category) {
            category.name = newName;
            category.description = newDescription;
            return true;
        }
        return false;
    }
    removeCategory(id) {
        const index = this.categories.findIndex((c) => c.id === id);
        if (index !== -1) {
            this.categories.splice(index, 1);
            return true;
        }
        return false;
    }
    getCategoryById(id) {
        return this.categories.find((c) => c.id === id);
    }
    generateId() {
        return (this.categories.length + 1).toString();
    }
}
exports.CategoryService = CategoryService;
