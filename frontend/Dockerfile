# frontend/Dockerfile
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

# Install a simple static file server
RUN npm install -g serve

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 3000

# Serve the static files
CMD ["serve", "-s", "dist", "-l", "3000"]
