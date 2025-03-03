FROM oven/bun:alpine AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb* /temp/dev/
COPY prisma /temp/dev/prisma/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb* /temp/prod/
COPY prisma /temp/prod/prisma/
RUN cd /temp/prod && bun install --frozen-lockfile --production --ignore-scripts

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN bun prisma generate
RUN bun run build

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist ./dist
COPY --from=prerelease /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=prerelease /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=prerelease /usr/src/app/package.json .

EXPOSE 5000
USER bun
CMD ["bun", "./dist/src/index.js"]

# docker build -t server .    
# docker run -p 5000:5000 --env-file .env server 