var mongoose  = require("mongoose");
var Schema    = mongoose.Schema;

var MovieSchema = new Schema({
  "id" : Number,
  "title" : String,
  "original_title" : String,
  "release_date" : String,
  "genre_ids" : [Number],
  "overview" : String,
  "poster_path" : String,
  "list_id" : Number
});

module.exports = mongoose.model("Movie", MovieSchema);

