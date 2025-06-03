FROM oven/bun:alpine AS base
WORKDIR /usr/src/app

# Установка зависимостей
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
COPY prisma /temp/dev/prisma/
RUN cd /temp/dev && bun install --frozen-lockfile

# Продакшн зависимости
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
COPY prisma /temp/prod/prisma/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Сборка проекта
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN bun prisma generate
RUN bun run build

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
RUN bun install sharp

# Устанавливаем права на все файлы и директории
RUN chown -R bun:bun /usr/src/app && chmod -R 755 /usr/src/app

# Настройка запуска
EXPOSE 5000
USER bun
CMD ["sh", "-c", "bun prisma migrate deploy && bun start"]