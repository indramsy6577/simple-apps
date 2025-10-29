FROM node:18.20-slim
WORKDIR /app
COPY /app /app
RUN npm install --ignore-scripts
USER nonroot
EXPOSE 3000
CMD ["npm", "start"]