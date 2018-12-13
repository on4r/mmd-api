'use strict'

const Env = use('Env')
const got = use('got')

class SearchController {

  async search ({ params }) {

    const searchQuery =
      'https://api.themoviedb.org/3/search/movie/?query=' + params.query +
      '&language=de&api_key=' + Env.get('TMDB_API_KEY')

    try {
      const searchResponse = await got(searchQuery);
      return searchResponse.body
    } catch (error) {
      return error
    }

  }

}

module.exports = SearchController
