'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MovieSchema extends Schema {
  up () {
    this.create('movies', (table) => {
      table.increments()
      table.timestamps()

      table.integer('user_id').unsigned().references('id').inTable('users')

      table.integer('tmdb_id')
      table.string('imdb_id')
      table.string('title')
      table.string('original_title')
      table.string('overview')
      table.string('tagline')
      table.string('release_date')
      table.string('poster_path')
      table.string('backdrop_path')
      table.string('genres')

      table.boolean('watched')
      table.integer('rating')
      table.text('comment')
    })
  }

  down () {
    this.drop('movies')
  }
}

module.exports = MovieSchema
