# Gerenciador de Inventário em Memória

Este é um sistema de gerenciamento de inventário desenvolvido em TypeScript que permite gerenciar categorias e produtos em memória através de uma interface de linha de comando (CLI).

## Pré-requisitos

Antes de executar o projeto, você precisa ter instalado:

- Node.js (versão 14 ou superior)
- Yarn (gerenciador de pacotes)

### Instalação do Yarn

#### Windows

1. Baixe o instalador do Node.js em [nodejs.org](https://nodejs.org/)
2. Instale o Node.js seguindo as instruções do instalador
3. Abra o PowerShell como administrador e execute:
```bash
npm install --global yarn
```

#### macOS

1. Instale o Homebrew (se ainda não tiver):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Instale o Node.js:
```bash
brew install node
```

3. Instale o Yarn:
```bash
brew install yarn
```

## Instalação do Projeto

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO] .
cd memoria
```

2. Instale as dependências:
```bash
yarn install
```

## Executando o Projeto

### Desenvolvimento

Para executar o projeto em modo de desenvolvimento:
```bash
yarn dev
```

### Produção

Para executar o projeto em modo de produção:

1. Primeiro, compile o TypeScript:
```bash
yarn build
```

2. Em seguida, execute o projeto:
```bash
yarn start
```

## Funcionalidades

O sistema oferece as seguintes funcionalidades:

### Gerenciamento de Categorias
- Criar categoria
- Listar categorias
- Buscar categoria
- Atualizar categoria
- Remover categoria

### Gerenciamento de Produtos
- Criar produto
- Listar produtos
- Buscar produto
- Atualizar produto
- Remover produto

## Estrutura do Projeto

```
memoria/
├── src/
│   ├── models/
│   │   ├── Category.ts
│   │   └── Products.ts
│   ├── services/
│   │   ├── CategoryServices.ts
│   │   └── ProductServices.ts
│   └── index.ts
├── package.json
└── README.md
```

## Tecnologias Utilizadas

- TypeScript
- Node.js
- readline-sync (para interação com o usuário via CLI)

## Scripts Disponíveis

- `yarn dev`: Executa o projeto em modo de desenvolvimento
- `yarn build`: Compila o TypeScript para JavaScript
- `yarn start`: Executa o projeto em modo de produção
