'use strict'

const Movie = use('App/Models/Movie')
const TmdbAPI = use('App/Services/TmdbApiService')

class MovieController {

  async watched({ auth, request, response }) {

    const user = await auth.getUser()
    const page = request.get().page || 1
    return await user.movies().where({ watched: true }).orderBy('created_at', 'desc').paginate(page, 12)

  }

  async planToWatch({ auth }) {

    const user = await auth.getUser()
    return await user.movies().where({ watched: false }).fetch()

  }

  async create({ auth, request, response }) {

    const user = await auth.getUser()
    const { id, watched, rating, comment } = request.all()

    // Is movie already in any list?
    let movieInList = await user.movies().where({ tmdb_id: id }).fetch()
    movieInList = movieInList.toJSON()[0]

    if (movieInList) {

      if (movieInList.watched) {
        return response.status(400).send({
          'id': movieInList.id,
          'rewatch': true,
          'message': `You already watched »${movieInList.title}«`
        })
      } else {
        if (watched) {
          return response.status(400).send({
            'message': `Use the "Plan to Watch" list to mark »${movieInList.title}« as watched`
          })
        } else {
          return response.status(400).send({
            'message': `You already planned to watch »${movieInList.title}«`
          })
        }
      }

    }

    const movie = new Movie()
    const {
      imdb_id,
      title,
      original_title,
      overview,
      tagline,
      release_date,
      poster_path,
      backdrop_path,
      genres
    } = await TmdbAPI.getMovieDetails(id)

    movie.fill({
      tmdb_id: id,
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
    const { watched, rating, comment } = request.all()

    if (user.id !== movie.user_id) {
      return response.status(403).send({ 'error': 'Permission denied'})
    }

    movie.merge({ watched, rating, comment })

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
