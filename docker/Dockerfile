FROM node:20.12.0-alpine3.19

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./

COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install


# Can you filter the build down to just one app?
RUN npm run build

CMD ["npm", "run", "dev:all"]