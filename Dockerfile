# use Multi-Stage approach
# from first will define the base stage 
#   then used it with diferrent environemnt  
FROM node:16-alpine as base

# write any common code here

# define the first stage using the base image
# in the docker-compose file, we need to define which environment we will use 
#   by add (Target: stageName) under Build
FROM base as development
# FROM baseImage
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE $PORT 
CMD [ "npm", "run", "start-dev" ]

# define the second stage using the base image
FROM base as production
# FROM baseImage
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE $PORT 
CMD [ "npm", "start" ]