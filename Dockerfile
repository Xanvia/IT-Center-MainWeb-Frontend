# Frontend Dockerfile
FROM node:20

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Next.js app with environment vars from .env.production
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_BACKEND_URL
ARG INTERNAL_BACKEND_URL
ARG NEXT_PUBLIC_SITE_KEY

# These get baked into the build step
RUN NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
    NEXTAUTH_URL=$NEXTAUTH_URL \
    NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL \
    INTERNAL_BACKEND_URL=$INTERNAL_BACKEND_URL \
    NEXT_PUBLIC_SITE_KEY=$NEXT_PUBLIC_SITE_KEY \
    npm run build

# Set environment variables
ENV NODE_ENV=production

# Expose port 5000 for frontend
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0", "-p", "5000"]
