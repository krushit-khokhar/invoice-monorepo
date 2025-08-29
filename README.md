# Invoice Management System

A monorepo implementation of an Invoice Management System using Clean Architecture principles.

## Technologies

- Backend: NestJS
- Frontend: Angular
- Database: MySQL
- Package Manager: pnpm
- Containerization: Docker

## Structure
monorepo(invoice-management)/
├── app/
│ ├── backend/ # Nest.js application
│ ├── frontend/ # Angular application
├── packages/
│ └── shared/ # Shared types and utilities
├── docker-compose.yml # Docker setup
├── gitignore
├── package.json
├── README.md
└── pnpm-workspace.yaml # pnpm workspace config



## Getting Started

1. Install pnpm: `npm install -g pnpm`
2. Install dependencies: `pnpm install`
3. Start Docker containers: `docker-compose up -d`
4. Run backend: `pnpm dev:backend`
5. Run frontend: `pnpm dev:frontend`