FROM node:20-alpine AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

FROM base AS build
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .
# Увеличить лимит памяти для Node.js
ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN npm run build

FROM base AS runtime
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json .
CMD ["npm", "run", "preview"]





# sudo fallocate -l 2G /swapfile
# sudo chmod 600 /swapfile
# sudo mkswap /swapfile
# sudo swapon /swapfile

# sudo swapoff /swapfile