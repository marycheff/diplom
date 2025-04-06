FROM oven/bun:alpine AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

FROM base AS build
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY .env .
COPY . .
RUN bun run build

FROM base AS runtime
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json .

CMD ["bun", "run", "preview"]

# docker build -t client .
# docker run -p 3000:3000 --env-file .env client