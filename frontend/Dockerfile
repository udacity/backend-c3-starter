# Step 1: Use an official Node.js image as a base image to build the app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Use a lightweight Nginx image to serve the built React app
FROM nginx:alpine

# Copy the custom nginx.conf to override the default one
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output to the Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
