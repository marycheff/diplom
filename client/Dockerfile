# FROM oven/bun:alpine AS base
# WORKDIR /usr/src/app

# FROM base AS install
# COPY package.json bun.lock* ./
# RUN bun install --frozen-lockfile

# FROM base AS build
# COPY --from=install /usr/src/app/node_modules ./node_modules
# COPY . .
# RUN bun run build

# FROM base AS runtime
# COPY --from=build /usr/src/app/dist ./dist
# COPY --from=build /usr/src/app/node_modules ./node_modules
# COPY --from=build /usr/src/app/package.json .

# CMD ["bun", "run", "preview"]

# # docker build -t client .
# # docker run -p 3000:3000 --env-file .env client
FROM node:20-alpine AS base

WORKDIR /usr/src/app

# Установка зависимостей
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json package-lock.json /temp/dev/
COPY prisma /temp/dev/prisma/
RUN cd /temp/dev && npm ci --platform=linux --arch=x64

# Продакшн зависимости
RUN mkdir -p /temp/prod
COPY package.json package-lock.json /temp/prod/
COPY prisma /temp/prod/prisma/
RUN cd /temp/prod && npm ci --omit=dev --platform=linux --arch=x64

# Сборка проекта
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Финальный образ
FROM base AS release

# Создаем все необходимые директории
RUN mkdir -p ./dist uploads/questions uploads/tests

# Копируем файлы
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist ./dist
COPY --from=prerelease /usr/src/app/dist-register.mjs ./dist-register.mjs
COPY --from=prerelease /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=prerelease /usr/src/app/prisma ./prisma
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/tsconfig.json .
COPY --from=prerelease /usr/src/app/bad_words.txt ./bad_words.txt

# Переустановка sharp для корректной платформы
RUN npm install --platform=linux --arch=x64 sharp

# Устанавливаем права на все файлы и директории
RUN chown -R node:node /usr/src/app && chmod -R 755 /usr/src/app

# Настройка запуска
EXPOSE 5000
USER node
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]