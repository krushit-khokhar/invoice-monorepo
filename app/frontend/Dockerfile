FROM node:22-alpine

# 1) Set PNPM_HOME and PATH
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

# 2) Create dir, install pnpm, set global bin dir
# Install pnpm globally
RUN npm i -g pnpm@8.6.0 \
  && pnpm add -g @angular/cli


# Create app directory
WORKDIR /app

COPY package.json pnpm-lock.yaml ./ 
COPY app/frontend/package.json ./app/frontend/

# Install all dependencies (includes shared package)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

WORKDIR /app/app/frontend

# Expose ports
EXPOSE 4200
EXPOSE 49153

# Start Angular development server
CMD ["pnpm","run", "start"]