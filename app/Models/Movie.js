'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Movie extends Model {

  static get hidden () {
    return ['user_id']
  }

  getWatched(watched) {
    return Boolean(watched)
  }

  setGenres(genres) {
    // Array to String
    return genres.map(genre => genre.id).toString()
  }

  getGenres(genres) {
    if (!genres) return null
    // String to Array
    return genres.split(',')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Movie
