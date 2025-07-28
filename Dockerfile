# Frontend Dockerfile
FROM node:20

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production

# Expose port 5000 for frontend
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0", "-p", "5000"]
