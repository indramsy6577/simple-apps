FROM node:18.20-slim

# Membuat user dan group
RUN groupadd -r app && useradd -r -g app -d /home/app -m app

# Menetapkan direktori kerja
WORKDIR /app

# Menyalin file ke container
COPY /app /app

# Instalasi dependensi
RUN npm install --ignore-scripts

# Menetapkan hak akses ke folder aplikasi
RUN chown -R app:app /app

# Beralih ke user 'app' yang baru
USER app

EXPOSE 3000
CMD ["npm", "start"]