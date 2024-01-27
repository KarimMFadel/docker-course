# Docker Course

Dockerfile ----Build---->  Image  ------RUN------> many containers

## Main Commands

```markdown
docker build -t express-node-app .  # -t tag for the new image
                                    # .  path of Dockerfile

docker image ls
docker ps   # display all container
docker run --name express-node-app-container express-node-app       # --name give name for the new container
docker run --name express-node-app-container -d express-node-app    # detatched to avoid open the terminal/logs of container after the command
docker stop express-node-app-container
docker rm express-node-app-container -f                             # -f force
docker run --name express-node-app-container -d -p 4000:4000 express-node-app   # -p 4000:4000 (current machine port: container port)
docker exec -it express-node-app-container bash          # execute command inside container
                                                         # bash OR /bin/sh is the command that we need to run inside the cpntainer
                                                         # -it interactive terminal  (to give us a terminal on this container )

docker exec -it express-node-app-container /bin/sh
docker run --name express-node-app-container -v /home/karimfadel/mypersonaldata/MyWork/workspaces/Learning/docker/node-app:/app -d -p 4000:4000 express-node-app
```

## Volume -v

 folder in physical host file system is mounted into the virtual file system of docker

* 3 Types:-

  ** Host Voulume (bind mount):-
  (link/bind local_Dir with container_Dir) (same concept in Angular two ways binding)
  every change in one dir wil affect in another and virse vise

  ```markdown
   docker run -v host_dir:container_dir
   docker run -v /usr/karim.fadel/workspace/projectNode:/var/lib/mysql/data
   docker run -v $(pwd):/var/lib/mysql/data                     # -v %cd%:/app     for windows
   docker run -v $(pwd):/app:ro   # (ro stand for read only)
   ```

  ** Anonumouse Volume:
    which store the node_modules inside anonymous place, and when you need it, docker will return it again
    to protect any folders/files on container, if these folders/files is deleted from local dev
    add the spacific folder in anonumouse volume to protect it from deleted and return it if it remove from local dev

    ```markdown
   docker run -v continer_dir       # there is a folder that Automatically created by docker "/var/lib/docker/volumes/randome-hash/_data"
   docker run -v /var/lib/mysql/data
   docker run --name express-node-app-container -v $(pwd):/app -v /app/node_modules -d -p 4000:4000 express-node-app

    ```

  ** Named Volume:-
   look like Anonumouse Volume

  ```markdown
    docker run v name:container_dir
    docker run -v name:/var/lib/mysql/data
  ```

### Hot-Reload

 sync between the local directory and the directory inside the container
docker run --name express-node-app-container -v /home/karim/...../node-app:/app -d -p 4000:4000     # -v  volume absolute path:dir_path_into_container

* problem of Hot-Reload
  every action happen in container, will affect on local development
* solution
  write after container_Dir :ro  read only

  ```markdown
  docker run --name express-node-app-container -v /home/karim/...../node-app:/app:ro -d -p 4000:4000
  docker run --name express-node-app-container -v $(pwd):/app:ro -d -p 4000:4000 express-node-app
  ```

absolute path                vs       relative path
/home/karim/..../node-app/         ./Doxkerfile

```markdown
rm -r folder_name  # -r recursive "all files and folders inside this folder"
printenv   # to display all env in OS
```

   // we need that noone can delete/modify on the node_module folder
   // to protect it, from any change in the local to affect on any files/folder in container
   // so we will create a new Anonumouse volume to store this folder

### senario

i made your scenario, and worked like what happened to you

1. execute command "docker run --name express-node-app-container -v $(pwd):/app:ro -v /app/node_modules -d -p 4000:4000 express-node-app"
2. then delete "node_modules" locally
3. stop and remove container "docker rm express-node-app-container -f"
4. run con with remove readOnly flag "docker run --name express-node-app-container -v $(pwd):/app -v /app/node_modules -d -p 4000:4000 express-node-app"
5. the "node_module" folder appears locally suddenly without making anything

```markdown
docker run --name express-node-app-container -v $(pwd)/src:/app/src:ro -v /app/node_modules -d -p 4000:4000 express-node-app

docker -v
docker-compose -v
docker-compose up
docker-compose up -d
docker-compose down
```

Docker file

### environment variables

ENV PORT=4000

OR from command

docker run --name express-node-app-container -v $(pwd)/src:/app/src:ro --env PORT=4000 --env NODE_DEV=development -d -p 4000:4000 express-node-app

Or from command and use ,env file

```markdown
docker run --name express-node-app-container -v $(pwd)/src:/app/src:ro --env-file ./.env  -d -p 4000:4000 express-node-app

docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down

docker-compose -f docker-compose.yml -f  docker-compose.dev.yml up -d
docker-compose -f docker-compose.yml -f  docker-compose.dev.yml up -d --build  # to force re-build the image before run the container  
docker-compose -f docker-compose.yml -f  docker-compose.prod.yml up -d --build
docker-compose -f docker-compose.yml -f  docker-compose.prod.yml down  
docker-compose -f docker-compose.yml -f  docker-compose.prod.yml down -v # (-v) will remove all volumes with all container

docker logs express-node-app-container
docker logs express-node-app-container -f   # follow to make the logs auto-update

docker inspect express-node-app-container
```

### Networks

By default when docker-compose try to operate 2 or more 2 container, it create a network "default network"
  and but all container inside default container,
  also each container will get a ip inside this default network
  each ip address of container is equal to service name.

```markdown
docker network ls
docker network inspect <network_name>

docker volume ls
docker volume rm <volume-name>  # remove spacific volume
docker volume prune       # remove all volumes that don't any containers use these

docker exec -it node-app_mongo_1 bash
docker exec -it node-app_mongo_1 mongosh -u root -p example
```

## References

### Course links

<https://www.youtube.com/playlist?list=PLzNfs-3kBUJnY7Cy1XovLaAkgfjim05RR>
<https://github.com/msoliman50/tresmerge-docker/tree/main>
<https://www.linkedin.com/in/mahmoud-moussa-soliman-b7130871/?originalSubdomain=nl>

<https://www.udemy.com/course/spring-boot-microservices-and-spring-cloud/learn/lecture/23803010#overview>

## autocomplete in Ubuntu

```markdown
sudo apt update
sudo apt upgrade
sudo apt install bash-completion
```

## Node Commands

```markdown
npm init
npm i express
node index.js
npm run start-dev                  #start-dev:defined into the package.json file
```

## Mongo Command

```markdown
mongosh -u root -p example
show dbs
use testDB
db.books.insert({ title:"book 1" })
db.books.find()
```
