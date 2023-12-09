FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the NestJS app
RUN npm run build

# Set environment variables
ENV NODE_ENV=production

# Expose the port where the NestJS app runs
EXPOSE 3001

# Start the NestJS app
CMD ["npm", "run", "start:prod"]