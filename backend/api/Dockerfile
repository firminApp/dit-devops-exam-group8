FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN if [ ! -f .env ]; then \
			if [ -f example.env ]; then cp example.env .env; \
			elif [ -f exemple.env ]; then cp exemple.env .env; \
			else echo "No example.env/exemple.env found" && exit 1; fi; \
		fi
EXPOSE 3000
CMD ["npm", "start"]
