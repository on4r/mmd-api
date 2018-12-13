'use strict'

const Movie = use('App/Models/Movie')

class MovieController {
  async watched({ auth }) {
    const user = await auth.getUser()
    return await user.movies().where({ watched: true }).fetch()
  }

  async planToWatch({ auth }) {
    const user = await auth.getUser()
    return await user.movies().where({ watched: false }).fetch()
  }

  async create({ auth, request }) {
    const user = await auth.getUser()
    const movie = new Movie()
    const {
      tmdb_id,
      imdb_id,
      title,
      original_title,
      overview,
      tagline,
      release_date,
      poster_path,
      backdrop_path,
      genres,
      watched = false,
      rating,
      comment
    } = request.all()

    movie.fill({
      tmdb_id,
      imdb_id,
      title,
      original_title,
      overview,
      tagline,
      release_date,
      poster_path,
      backdrop_path,
      genres,
      watched,
      rating,
      comment
    })

    await user.movies().save(movie)

    return movie
  }

  async update({ auth, request, response, params }) {
    const user = await auth.getUser()
    const movie = await Movie.find(params.id)
    const { watched } = request.all()

    if (user.id !== movie.user_id) {
      return response.status(403).send({ 'error': 'Permission denied'})
    }

    if (watched === undefined || typeof watched !== 'boolean') {
      return response.status(422).send({ 'error': 'Missing or wrong argument'})
    }

    movie.merge({ watched })
    await movie.save()

    return movie
  }

  async destroy({ auth, request, response, params }) {
    const user = await auth.getUser()
    const movie = await Movie.find(params.id)
    if (user.id !== movie.user_id) {
      return response.status(403).send({ 'error': 'Permission denied'})
    }
    await movie.delete()
    return movie
  }
}

module.exports = MovieController
