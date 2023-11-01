# FROM node:16.14.2-alpine3.14
# WORKDIR /app
# COPY package*.json ./
# COPY prisma ./prisma/
# COPY .env ./.env
# COPY tsconfig.json ./
# COPY . ./
# RUN npm install -g yarn
# RUN yarn install
# CMD ["yarn", "start"]


FROM node:16.14.2-alpine3.14
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./.env
COPY tsconfig.json ./
COPY . ./
RUN yarn install
CMD ["yarn", "start"]