                  require("./env");
var mongoose    = require("mongoose");
var request     = require("request");
var express     = require("express");
var bodyParser  = require("body-parser");
var path        = require("path");
var api         = express();
var router      = express.Router();

api.set("port", (process.env.PORT || 61008));

//---
// MongoDB
//---

mongoose.connect( "mongodb://" + process.env.MONGO_DB_CONNECTION_STR, function (err, res) {
  if (err) {
    console.log ("Connecting to MongoDB... FAILED! Error Code:\n" + err);
  } else {
    console.log ("Connecting to MongoDB... SUCCESS.");
  }
});

// Instance Model(s)
var Movie       = require("./app/models/movie");

// bodyParser Middelware
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({"extended" : false}));

api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//---
//  Router Middelware
//---

router.use(function(req, res, next) {
  console.log("New " + req.method + " request on route: " + req.originalUrl);
  next();
});

//---
//  Routes
//---

// Send API Request to TMDB via node server to hide API-Key in frontend app
router.get("/search/:string", function(req, res) {
  var response = res;
  var requestURL = "https://api.themoviedb.org/3/search/movie/?query=" +
                    req.params.string + "&language=de&api_key=" +
                    process.env.TMDB_API_KEY;
  request(requestURL, function(err, res, body) {
    response.send(body);
  });
});

router.get("/movies/watched", function(req, res) {

  Movie.find({ list_id : 0 }, function(err, movies) {
    if (err) res.send(err);
    res.json(movies);
  });

});

router.get("/movies/plan-to-watch", function(req, res) {

  Movie.find({ list_id : 1 }, function(err, movies) {
    if (err) res.send(err);
    res.json(movies);
  });

});

router.route("/movies")
  // Show all movies
  .get(function(req, res) {

    Movie.find({}, function(err, movies) {
      if (err)
        res.send(err);

      res.json(movies);
    });

  })
  // Add new movie
  .post(function(req, res) {

    Movie.findOne({ id : req.body.id }, function(err, someMovie) {
      if (someMovie == null) {
        var movie = new Movie();

        movie.id = req.body.id;
        movie.title = req.body.title;
        movie.original_title = req.body.original_title;
        movie.release_date = req.body.release_date;
        movie.genre_ids = req.body.genre_ids;
        movie.overview = req.body.overview;
        movie.poster_path = req.body.poster_path;
        movie.list_id = req.body.list_id;

        movie.save(function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json({
              error: false,
              message : "New Movie added to List: " + req.body.list_id
            });
          }
        });
      } else {
        res.send({
          error: true,
          message: "movie alrdy in list"
        });
      }
    });

  });

router.route("/movies/:movie_id")
  // change status of movie from "plan to watch" to "watched"
  .patch(function(req, res) {

    Movie.findOne({ id : req.params.movie_id }, function(err, movie) {
      if (err) {
        res.send(err);
      } else if ( movie == null ) {
        res.send({
          error: true,
          message: "no movie with id:"+req.params.movie_id+" found to PATCH"
        });
      } else {
        movie.list_id = 0;
        movie.save(function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json({
              error: false,
              message: "movie moved to list 'watched'"});
          }
        });
      }
    });
  })
  // remove movie
  .delete(function(req, res) {

    Movie.findOne({ id : req.params.movie_id }, function(err, movie) {
      if (err) {
        res.send(err);
      } else if ( movie == null ){
        res.send({
          error: true,
          message: "no movie found to delete"
        });
      } else {
        movie.remove(function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json({
              error: false,
              message: "movie removed from database"
            });
          }
        });
      }
    });

  });

api.use("/", router);

api.listen(api.get("port"), function() {
  console.log("API-Server started.\nListening on Port:" + api.get("port"));
});
