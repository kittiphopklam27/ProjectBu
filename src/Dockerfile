# Use official Node.js LTS image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./

# Install dependencies (only production dependencies for production images)
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the app's running port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
