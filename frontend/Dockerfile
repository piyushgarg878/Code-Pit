# 1️⃣ Use lightweight Node.js base image
FROM node:20-alpine

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4️⃣ Copy all source code
COPY . .

# 5️⃣ Build the Next.js app
RUN npm run build

# 6️⃣ Expose frontend port
EXPOSE 3000

# 7️⃣ Start Next.js server
CMD ["npm", "start"]