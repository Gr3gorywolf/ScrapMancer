# Use an official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (or pnpm-lock.json) first to leverage Docker cache
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN npm install
RUN npx playwright install
# Copy the rest of the application code
COPY . .


# Specify the command to run the application
CMD ["npm", "run", "runner"]