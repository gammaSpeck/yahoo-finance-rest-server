# I chose this version, to keep it identical to my local machine node version
FROM node:14.16.1-alpine as base-build

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

# RUN npm install && npm audit fix
RUN yarn install
COPY . ./
RUN yarn build
# Prune all dev dependencies
RUN yarn install --production

# -----------------------------------------------------
FROM node:14.16.1-alpine as release-build

WORKDIR /usr/app

COPY --from=base-build /usr/app/node_modules ./node_modules
COPY --from=base-build /usr/app/dist ./dist
COPY --from=base-build /usr/app/package.json ./
COPY --from=base-build /usr/app/yarn.lock ./


EXPOSE 3000

ENV NODE_ENV=production

CMD ["yarn", "start"]