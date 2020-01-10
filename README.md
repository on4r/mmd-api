# My Movie DB [ Backend ]

This is the [AdonisJs](https://adonisjs.com) API Backend for [My Movie DB](https://kael.kaus.uberspace.de/mmdb/).

## System Requirements

The only dependencies of the framework are Node.js and npm.  
Ensure your versions of those tools match the following criteria:

- Node.js >= 8.0.0
- npm >= 3.0.0
- git

## Additional Requirements

You need an API Key from [The Movie Database](https://developers.themoviedb.org/3/getting-started/introduction).

## AdonisJs Cli

Command line tool to help you manage the project.  
Install it globally via npm like so:

    npm i -g @adonisjs/cli

## Setup

- Run `npm install` to install all dependencies
- Make a copy of `.env.example` rename it to `.env`
- Run `adonis key:generate` to generate the secret key
- Run `adonis migration:run` to setup the database
- Run `adonis serve --dev` to run the application

## Production

What you want will be something like this:

- configured htaccess to map an outside route to localhost:port where your node service is running.
- some kind of `service` to keep your server `node server.js` running after system reboot and be able to start/stop it.
- maybe setup a different kind of database and
- run the migrations `node ace migration:run`.
