FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
RUN npm ci --omit=dev --workspace backend --include-workspace-root=false

COPY backend ./backend
COPY database ./database

ENV PORT=5001
EXPOSE 5001

CMD ["node", "backend/src/server.js"]
