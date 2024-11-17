FROM node:18
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
COPY --chown=node:node . .
RUN npm install
ENV MODE="development"
EXPOSE 3000
RUN npm run build
CMD [ "npm", "run", "dev" ]
