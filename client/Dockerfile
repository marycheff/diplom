FROM node:20-alpine AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

FROM base AS build
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json .
CMD ["npm", "run", "preview"]
