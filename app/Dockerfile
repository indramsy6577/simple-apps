FROM node:18.20-slim

# Menyalin file ke container
COPY /app /app

# Instalasi dependensi
RUN npm install --ignore-scripts

# Menetapkan hak akses ke folder aplikasi
RUN chown -R lab-91:lab-91 /app

# Beralih ke user 'lab-91' yang baru
USER lab-91

EXPOSE 3000
CMD ["npm", "start"]