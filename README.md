# my-movie-db [ Backend ]

This is the node.js API Backend for [my-movie-db](http://kael.kaus.uberspace.de/my-movie-db/app/).

## Setup

**MongoDB**
Install [mongoDB](https://www.mongodb.com/download-center#community).

**Environment Variables**
The server expectes a `.env` file in the root directory ([env2](https://github.com/dwyl/env2)).
With the following variables defined:

* `PORT` defines the port on which your frontend will access the API.
* `MONGO_DB_CONNECTION_STR` expects the part after `mongodb://`. See [moongoose documentation](http://mongoosejs.com/docs/connections.html) for more info.
* `TMDB_API_KEY` a API-Key from [themoviedb.org](https://www.themoviedb.org/documentation/api)

**Install Dependencies**

    npm install

**Run Development Server**

    npm run dev

Served to `localhost:61008` if you didn't specify another port in `.env`.

**API Endpoints**

    GET     /movies                 // return all movies
    POST    /movies                 // add new movie
    GET     /movies/watched         // return movies in the 'watched' list
    GET     /movies/plan-to-watch   // return movies in the 'plan to watch' list
    PATCH   /movies/:movie_id       // 'plan to watch' --> 'watched'
    DELETE  /movies/:movie_id       // delete movie
