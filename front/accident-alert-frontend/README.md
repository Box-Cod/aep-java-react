# Sistema de Registro de Acidentes

Este é um projeto simples que permite o cadastro, listagem, exclusão e visualização de acidentes.

## 🚀 Tecnologias Utilizadas

- **Frontend:** React + Vite + TypeScript
- **UI:** MUI (Material-UI)
- **Armazenamento:** LocalStorage (pode ser adaptado para API real)
- **Estilo:** CSS do próprio MUI + algumas regras utilitárias

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repo.git

# Acesse a pasta do projeto
cd seu-repo

# Instale as dependências
npm install
```

## ▶️ Executando o Projeto

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em: [http://localhost:5173](http://localhost:5173)

## 📁 Estrutura de Pastas

```
src/
├── api/                 # Funções de acesso a dados (LocalStorage)
│   └── accidentService.ts
├── components/          # Componentes reutilizáveis
│   ├── AccidentCarousel.tsx
│   ├── AccidentFormModal.tsx
│   └── AccidentList.tsx
├── pages/               # Páginas principais
│   ├── HomePage.tsx
│   └── LoginPage.tsx
├── App.tsx              # Definição de rotas e layout base
└── main.tsx             # Ponto de entrada do React
```

## ✅ Funcionalidades

- 📸 Upload de imagem com preview no carrossel
- 📝 Cadastro de acidentes com título, local, descrição e data/hora
- 🧹 Limpeza automática dos inputs após envio
- ✏️ Botão de edição (em desenvolvimento)
- ❌ Botão de exclusão por item
- 🔁 Atualização automática da listagem e carrossel

---

Criado para fins educacionais.
