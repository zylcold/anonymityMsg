FROM node:7.0.0
ADD . /app/
WORKDIR /app
RUN npm install && tsc
ENV HOST 0.0.0.0
ENV PORT 8081
EXPOSE 8081
CMD [ "npm" "start" ]