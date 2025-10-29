FROM node:18.20-slim

WORKDIR /app

COPY /app /app

RUN npm install --ignore-scripts

RUN addgroup -S app && \
    adduser -S app -G app && \
    chown -R app:app /app

USER app

EXPOSE 3000
CMD ["npm", "start"]