# backend/Dockerfile
# Each instruction in this file creates a new layer
# Here we are getting our node as Base image
FROM node:22.14.0-slim AS build
# setting working directory in the container
WORKDIR /app
# copying the package.json file(contains dependencies) from project source dir to container dir
COPY package*.json /app/
# installing the dependencies into the container
RUN npm install --ignore-scripts
# copying the source code of Application into the container dir
COPY . /app
RUN npm run build


FROM node:22.14.0-slim AS production

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json .
# remove lists to reduce size
RUN rm -rf /var/lib/apt/lists/*
RUN npm ci --omit=dev --ignore-scripts

COPY --from=build /app/dist ./dist
COPY --from=build /app/data ./data

# Expose port
EXPOSE 3001

# command to run within the container
CMD ["node","--inspect","--max-old-space-size=8192","--max_old_space_size=8192","--unhandled-rejections=strict","./dist/app.js"]
