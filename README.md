# Project
This project was a dev tech challenge for bluecoding


#  DB
This project uses Mongo DB

first copy the .env.example as .env
```bash
cp .env.example .env
cp .env.example backend/.env
```

**Modify the .env content or leave as is**

* `MONGO_INITDB_ROOT_USERNAME` -> DB Username
* `MONGO_INITDB_ROOT_PASSWORD` -> DB Password
* `MONGODB_DATABASE` -> DB Name (is not being used yet)
* `MONGODB_LOCAL_PORT` -> DB public/local port (what well be accessing to)
* `MONGODB_DOCKER_PORT` -> DB Server port (internal/docker)
* `NODE_LOCAL_PORT` -> Mongo Express public/local port
* `NODE_DOCKER_PORT` -> Mongo Express server port (internal/docker)



Then run docker compose services for mongo
```bash
docker compose up -d mongo mongo-express
```

**Services**
* `mongo` - runs the mongo db server
* `mongo-express` - is a Web UI simple admin for the mongo db server


# Back-end

```bash
cd backend/
npm i
npm start
```
then go to [backend](http://localhost:8080)

### *Routes*
- `/` method `get` will give us the top 100 urls
- `/shorts` method `get` will give us the top 100 shortened urls
- `/shortener` method `post` will create a new short link
    - request data 
        ```typescript
        {
            "link": string
        }
        ```
    - respose data
        ```typescript
        {
            "title": string,
            "link": OriginalLinkInfo,
            "shortenLink": string, //Shorten link
        }
- `/s/:id` method `get` will give us the full link
        ```


# Front-end

```bash
cd frontent/
npm i
npm start
```
then go to [frontend](http://localhost:3000)

