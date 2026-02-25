FROM mcr.microsoft.com/playwright:v1.50.0-noble

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test", "--config", "config/playwright.config.ts"]