FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN if [ ! -f .env ]; then \
      if [ -f example.env ]; then cp example.env .env; \
      elif [ -f exemple.env ]; then cp exemple.env .env; \
      else echo "No example.env/exemple.env found" && exit 1; fi; \
    fi
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]