# Production Dockerfile for BhashaSetu (Frontend + Express + WebSockets)
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build client + server bundle
COPY . .
RUN npm run build

# Remove development dependencies to keep image light
RUN npm prune --production

# --- Runtime Stage ---
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy minimal production files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Non-root user for security
USER node

EXPOSE 3000

CMD ["node", "dist/server.mjs"]
