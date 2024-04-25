FROM node:alpine3.19 as builder

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY .env ./
COPY tsconfig.json ./
COPY package*.json ./

RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci --only=production

RUN npm install

RUN npm install -g @nestjs/cli

COPY prisma/ ./prisma

ARG DATABASE_URL

RUN npx prisma generate

RUN npm run build

############################################################################################################

FROM node:alpine3.19

WORKDIR /usr/src/app

COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/.env ./
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node --from=builder /usr/src/app/package*.json ./
COPY --chown=node:node --from=builder /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=builder /usr/src/app/node_modules/.prisma/client ./node_modules/.prisma/client

RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start:migrate:prod"]
