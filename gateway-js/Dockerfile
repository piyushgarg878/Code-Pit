# 1️⃣ Use official lightweight Node.js image
FROM node:20-alpine

# 2️⃣ Set working directory inside container
WORKDIR /usr/src/app

# 3️⃣ Copy package.json and package-lock.json first (for caching layers)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy the rest of the source code
COPY . .

# 6️⃣ Expose port (same as in your .env.gateway)
EXPOSE 3001

# 7️⃣ Start the gateway
CMD ["npm", "start"]