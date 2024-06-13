# Step 1: Build the React app
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose port 80
EXPOSE 3001

# Start Nginx server
CMD ["npm", "run", "preview"]
