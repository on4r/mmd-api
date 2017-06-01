const Env = use('Env')
const got = use('got')

const API_KEY = Env.get('TMDB_API_KEY')
const BASE_URL = 'https://api.themoviedb.org/3/'

module.exports = {

  getMovieDetails(id) {

    return new Promise((resolve, reject) => {
      got(BASE_URL + `movie/${id}` + '?language=de' + `&api_key=${API_KEY}`)
        .then(response => {
            resolve(JSON.parse(response.body))
        })
        .catch(error => {
          reject(error)
        })
    })

  },

  search(query) {

    return new Promise((resolve, reject) => {
      got(BASE_URL + `search/movie?query=${query}` + '&language=de' + `&api_key=${API_KEY}`)
        .then(response => {
          resolve(response.body)
        })
        .catch(error => {
          reject(error)
        })
    })

  }

}
