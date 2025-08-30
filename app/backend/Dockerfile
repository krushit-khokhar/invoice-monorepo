FROM node:22-alpine
WORKDIR /app

# Copy root package files for monorepo setup
COPY ../../package*.json ./
COPY ../../pnpm-workspace.yaml ./
COPY ../../.npmrc ./

# Copy backend package files
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

# Install dependencies using pnpm workspace
RUN npm install -g pnpm
RUN pnpm install --filter @invoice/backend...

# Copy source code
COPY . .

EXPOSE 5000
CMD ["pnpm", "run", "start:dev"]