import { Category } from "../models/Category";

export class CategoryService {
  private categories: Category[] = [];

  createCategory(name: string, description: string): Category {
    const category: Category = {
      id: this.generateId(),
      name,
      description,
      creationDate: new Date(),
    };
    this.categories.push(category);
    return category;
  }

  listCategories(): Category[] {
    return this.categories;
  }

  searchCategory(searchTerm: string): Category | null {
    // Busca por id
    const foundById = this.categories.find((c) => c.id === searchTerm);
    if (foundById) return foundById;
    // Busca por nome (case insensitive)
    const foundByName = this.categories.find(
      (c) => c.name.toLowerCase() === searchTerm.toLowerCase()
    );
    return foundByName || null;
  }

  updateCategory(id: string, newName: string, newDescription: string): boolean {
    const category = this.categories.find((c) => c.id === id);
    if (category) {
      category.name = newName;
      category.description = newDescription;
      return true;
    }
    return false;
  }

  removeCategory(id: string): boolean {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.categories.splice(index, 1);
      return true;
    }
    return false;
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find((c) => c.id === id);
  }

  private generateId(): string {
    return (this.categories.length + 1).toString();
  }
}
