FROM node:16.17-alpine
WORKDIR /smart-personal-resume
COPY package.json ./
RUN npm install --force
COPY . .
RUN npm run build production

FROM nginx:latest
COPY --from=0 /smart-personal-resume/build /usr/share/nginx/html/
