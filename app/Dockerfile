FROM node:18.20-slim

# Menyalin file ke container
COPY /app /app

# Instalasi dependensi & pengaturan kepemilikan file
RUN npm install --ignore-scripts && \
    chown -R www-data:www-data /app

# Beralih ke user 'www-data' yang baru
USER www-data

EXPOSE 3000
CMD ["npm", "start"]