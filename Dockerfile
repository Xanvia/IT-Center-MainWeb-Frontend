# Frontend Dockerfile
FROM node:20 AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Accept build args - only variables needed at BUILD TIME
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_SITE_KEY

# Set as environment variables for the build - only public variables are embedded
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_SITE_KEY=$NEXT_PUBLIC_SITE_KEY

# Build the application
RUN npm run build

# Production stage
FROM node:20 AS production
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV HOSTNAME="0.0.0.0"

# NOTE: Runtime environment variables (INTERNAL_BACKEND_URL, NEXTAUTH_SECRET, NEXTAUTH_URL)
# should be provided when running the container, not during build time

# Switch to non-root user
USER nextjs

# Expose port 5000 for frontend
EXPOSE 5000


# Start the application using the standalone server
CMD ["node", "server.js"]
