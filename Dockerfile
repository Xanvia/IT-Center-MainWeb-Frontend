# Frontend Dockerfile
FROM node:20 AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Accept build args
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_SITE_KEY

# Set as environment variables for the build
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_SITE_KEY=$NEXT_PUBLIC_SITE_KEY

# Build the application
RUN npm run build

# Production stage
FROM node:20 AS production
WORKDIR /app

# Copy build artifacts and package files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package*.json ./

# Set environment variables
ENV NODE_ENV=production


# Expose port 5000 for frontend
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0", "-p", "5000"]
