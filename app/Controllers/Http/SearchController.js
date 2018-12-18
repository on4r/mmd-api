'use strict'

const TmdbAPI = use('App/Services/TmdbApiService')

class SearchController {

  async search({ params, response }) {

    return await TmdbAPI.search(params.query)

  }

}

module.exports = SearchController
