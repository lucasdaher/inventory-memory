import * as readlineSync from "readline-sync";
import { CategoryService } from "./services/CategoryServices";
import { ProductService } from "./services/ProductServices";

const categoryService = new CategoryService();
const productService = new ProductService(categoryService);

function mainMenu(): string {
  console.log("\n=== Inventory Management CLI ===");
  console.log("1 - Gerenciar Categorias");
  console.log("2 - Gerenciar Produtos");
  console.log("0 - Sair");
  return readlineSync.question("Escolha uma opção: ");
}

function categoryMenu(): string {
  console.log("\n=== Gerenciamento de Categorias ===");
  console.log("1 - Criar Categoria");
  console.log("2 - Listar Categorias");
  console.log("3 - Buscar Categoria");
  console.log("4 - Atualizar Categoria");
  console.log("5 - Remover Categoria");
  console.log("0 - Voltar");
  return readlineSync.question("Escolha uma opção: ");
}

function productMenu(): string {
  console.log("\n=== Gerenciamento de Produtos ===");
  console.log("1 - Criar Produto");
  console.log("2 - Listar Produtos");
  console.log("3 - Buscar Produto");
  console.log("4 - Atualizar Produto");
  console.log("5 - Remover Produto");
  console.log("0 - Voltar");
  return readlineSync.question("Escolha uma opção: ");
}

function manageCategories(): void {
  let back = false;
  while (!back) {
    const option = categoryMenu();
    switch (option) {
      case "1":
        const name = readlineSync.question("Nome da categoria: ");
        const description = readlineSync.question("Descrição: ");
        categoryService.createCategory(name, description);
        console.log("Categoria criada com sucesso.");
        break;
      case "2":
        const categories = categoryService.listCategories();
        if (categories.length === 0) {
          console.log("Nenhuma categoria cadastrada.");
        } else {
          console.table(categories);
        }
        break;
      case "3":
        const searchTerm = readlineSync.question(
          "Digite o id ou nome da categoria: "
        );
        const found = categoryService.searchCategory(searchTerm);
        if (found) {
          console.table(found);
        } else {
          console.log("Categoria não encontrada.");
        }
        break;
      case "4":
        const updateId = readlineSync.question(
          "Digite o id da categoria a atualizar: "
        );
        const newName = readlineSync.question("Novo nome: ");
        const newDescription = readlineSync.question("Nova descrição: ");
        const updated = categoryService.updateCategory(
          updateId,
          newName,
          newDescription
        );
        if (updated) {
          console.log("Categoria atualizada com sucesso.");
        } else {
          console.log("Categoria não encontrada.");
        }
        break;
      case "5":
        const removeId = readlineSync.question(
          "Digite o id da categoria a remover: "
        );
        if (productService.hasProductsForCategory(removeId)) {
          console.log(
            "Não é possível remover a categoria, pois há produtos associados."
          );
        } else {
          const removed = categoryService.removeCategory(removeId);
          console.log(
            removed
              ? "Categoria removida com sucesso."
              : "Categoria não encontrada."
          );
        }
        break;
      case "0":
        back = true;
        break;
      default:
        console.log("Opção inválida.");
    }
  }
}

function manageProducts(): void {
  let back = false;
  while (!back) {
    const option = productMenu();
    switch (option) {
      case "1":
        const prodName = readlineSync.question("Nome do produto: ");
        const prodDescription = readlineSync.question("Descrição: ");
        const prodPriceStr = readlineSync.question("Preço: ");
        const prodPrice = parseFloat(prodPriceStr);
        const prodQuantityStr = readlineSync.question("Quantidade: ");
        const prodQuantity = parseInt(prodQuantityStr);
        const categoryId = readlineSync.question("ID da categoria: ");
        try {
          productService.createProduct(
            prodName,
            prodDescription,
            prodPrice,
            prodQuantity,
            categoryId
          );
          console.log("Produto criado com sucesso.");
        } catch (error: any) {
          console.log("Erro: " + error.message);
        }
        break;
      case "2":
        const products = productService.listProducts();
        if (products.length === 0) {
          console.log("Nenhum produto cadastrado.");
        } else {
          console.table(products);
        }
        break;
      case "3":
        const prodSearch = readlineSync.question(
          "Digite o id, nome ou id da categoria do produto: "
        );
        const prodFound = productService.searchProduct(prodSearch);
        if (prodFound) {
          console.table(prodFound);
        } else {
          console.log("Produto não encontrado.");
        }
        break;
      case "4":
        const updateProdId = readlineSync.question(
          "Digite o id do produto a atualizar: "
        );
        const newProdName = readlineSync.question("Novo nome: ");
        const newProdDescription = readlineSync.question("Nova descrição: ");
        const newProdPriceStr = readlineSync.question("Novo preço: ");
        const newProdPrice = parseFloat(newProdPriceStr);
        const newProdQuantityStr = readlineSync.question("Nova quantidade: ");
        const newProdQuantity = parseInt(newProdQuantityStr);
        try {
          const updatedProd = productService.updateProduct(
            updateProdId,
            newProdName,
            newProdDescription,
            newProdPrice,
            newProdQuantity
          );
          if (updatedProd) {
            console.log("Produto atualizado com sucesso.");
          } else {
            console.log("Produto não encontrado.");
          }
        } catch (error: any) {
          console.log("Erro: " + error.message);
        }
        break;
      case "5":
        // Remover produto
        const removeProdId = readlineSync.question(
          "Digite o id do produto a remover: "
        );
        const removed = productService.removeProduct(removeProdId);
        console.log(
          removed ? "Produto removido com sucesso." : "Produto não encontrado."
        );
        break;
      case "0":
        back = true;
        break;
      default:
        console.log("Opção inválida.");
    }
  }
}

function run(): void {
  let exit = false;
  while (!exit) {
    const option = mainMenu();
    switch (option) {
      case "1":
        manageCategories();
        break;
      case "2":
        manageProducts();
        break;
      case "0":
        exit = true;
        console.log("Encerrando o programa...");
        break;
      default:
        console.log("Opção inválida.");
    }
  }
}

run();
