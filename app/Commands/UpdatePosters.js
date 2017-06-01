'use strict'

const { Command } = require('@adonisjs/ace')
const Database = use('Database')
const TmdbAPI = use('App/Services/TmdbApiService')

class UpdatePosters extends Command {
  static get signature () {
    return 'update:posters'
  }

  static get description () {
    return 'Updates all movie posters'
  }

  async handle (args, options) {

    this.info('Updating movie posters...')

    let movies = await Database.table('movies').select('id', 'tmdb_id', 'poster_path')
    let movieDetails = movies.map(movie => TmdbAPI.getMovieDetails(movie.tmdb_id))

    Promise.all(movieDetails)
      .then(details => {
        let updateMovies = details.map(detail => Database.table('movies').where('tmdb_id', detail.id).update('poster_path', detail.poster_path))
        return Promise.all(updateMovies)
      })
      .then(changes => {
        this.success('Update complete')
      })
      .catch(error => {
        this.error('Update failed', error)
      })
      .finally(() => {
        Database.close()
      })

  }
}

module.exports = UpdatePosters
