# sota-of-medicalai

> 最新の医療AI論文を日本語で紹介します

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).



## about Docker image

using docker image to setup common dev env.

### Usage

```bash
# start container (-d:back ground)
docker-compose up -d

# use command
docker-compose exec soma command

# example: run dev server
docker-compose exec soma npm run dev

# firebase login
# don't forget to add `--no-localhost` option
docker-compose exec soma firebase login --no-localhost

# firebase init
docker-compose exec soma firebase init

# stop container
docker-compose down
```

### Requirements

* docker
* docker-compose

### notes

Command `docker-compose up` will start docker container named `soma`.
To run commands inside the running container, use `docker-compose exec soma command`.
To stop(remove) container, run `docker-compose down`.
The container is based on docker image `chari8/soma`.
If the image exists in the local, docker will use it.
If not, the latest `chari8/soma` image will obtained from [dockerhub repository](https://cloud.docker.com/repository/docker/chari8/soma).
Currently update in `chari8/soma` is done by mannual build and this part should & will be replaced by autobuild service like CircleCi/DockerHub Autobuild/travisCi.
