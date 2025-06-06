FROM node:20-alpine AS base
WORKDIR /usr/src/app
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json package-lock.json /temp/dev/
COPY prisma /temp/dev/prisma/
RUN cd /temp/dev && npm ci --platform=linux --arch=x64


RUN mkdir -p /temp/prod
COPY package.json package-lock.json /temp/prod/
COPY prisma /temp/prod/prisma/
RUN cd /temp/prod && npm ci --omit=dev --platform=linux --arch=x64

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS release

RUN mkdir -p ./dist uploads/questions uploads/tests

COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist ./dist
COPY --from=prerelease /usr/src/app/dist-register.mjs ./dist-register.mjs
COPY --from=prerelease /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=prerelease /usr/src/app/prisma ./prisma
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/tsconfig.json .
COPY --from=prerelease /usr/src/app/bad_words.txt ./bad_words.txt

RUN npm install --platform=linux --arch=x64 sharp

RUN chown -R node:node /usr/src/app && chmod -R 755 /usr/src/app

EXPOSE 5000

USER node

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

