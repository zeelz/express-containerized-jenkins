# Express Containerized

### Jenkins setup
This repo is connected to a jenkins pipeline 
when triggered checkouts, builds and pushes image to docker hub

### Running options

0. For each option below set up db

1. Run app with node

2. Build and run app as a container

3. Pull remote image and run as a container ()

## keme try each of the 3 options, check off and remove this section when completed
[x] Run app with node

[ ] Build and run app as a container

[ ] Pull remote image and run as a container ()

--

### Available routes
GET `/status`

GET `/users`

POST `/users` {name, email}

## 0. For each option below set up db
- Setup a postgres database and add the credentials in .env
- `docker run -p 5433:5432 -e POSTGRES_PASSWORD=DB_PASSWORD --network NETWORK_NAME postgres`
- see create table sql command in entry...
- if both containers are in same network use container name (and 5432) to reach db
- if running from compose...

## 1. Run app with node
- npm install
- npm run build
- npm run start

## 2a. Build and run app as a container
- `docker build -t express-containerized .`
- create network, run db in that network and create table
```
docker run \
-p 5005:5000 \
-e PORT=5000 \
-e DB_USER=postgres \
-e DB_HOST=DB_CONTAINER_NAME \
-e DB_NAME=postgres \
-e DB_PASSWORD=DB_PASSWORD \
-e DB_PORT=5432 \
--network NETWORK_NAME \
express-containerized
```
- API should now be available on 5005

## 2b. Build and run app as a container with compose
- docker compose up --build
- 2 containers (db & api) would be running with an entryfile to automatically create `users` table
- if db table wasn't created exec into db, run psql and create table (sql command in entryfile)
- psql -U postgres -p 5433 -d postgres -h localhost

## 3. Pull and run remote image

[https://hub.docker.com/repository/docker/zeelz/express-containerized](https://hub.docker.com/repository/docker/zeelz/express-containerized)

- only need docker-compose.pull.yaml and .env
```
docker compose -f docker-compose.pull.yaml up
```