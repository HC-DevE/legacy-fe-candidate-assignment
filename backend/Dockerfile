# # Use an official lightweight Node.js image.
# FROM node:22-alpine

# # Set the working directory in the container.
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json (if available)
# COPY package*.json ./

# # Install dependencies.
# RUN npm install

# # Copy the rest of the source code.
# COPY . .

# # Build the project (assuming tsc is configured to output to the 'dist' folder)
# RUN npm run build

# # Expose the port (make sure this matches your config; here we assume 3000)
# EXPOSE 3001

# # Start the application.
# CMD ["npm", "start"]


FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm fetch

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /root/.local/share/pnpm/store /root/.local/share/pnpm/store
COPY package.json ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
COPY --from=build /app/dist ./dist
RUN pnpm install --prod --frozen-lockfile
EXPOSE 3001
CMD ["node","dist/index.js"]
