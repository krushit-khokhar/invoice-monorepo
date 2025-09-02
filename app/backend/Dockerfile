FROM node:22-alpine

ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Install pnpm globally
RUN npm i -g pnpm@8.6.0 \
  && pnpm add -g @nestjs/cli


WORKDIR /app

COPY package.json pnpm-lock.yaml ./ 
COPY app/backend/package.json ./app/backend/

RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

WORKDIR /app/app/backend

# Expose port
EXPOSE 5000
EXPOSE 9229

# Start development server
CMD ["pnpm", "run", "start:dev"]