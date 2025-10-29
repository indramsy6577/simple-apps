FROM node:18.20-slim

# Menyalin file ke container
COPY /app /app

# Instalasi dependensi
RUN npm install --ignore-scripts


EXPOSE 3000
CMD ["npm", "start"]