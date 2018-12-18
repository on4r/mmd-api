'use strict'

const User = use('App/Models/User')

class UserController {

  async login({ request, auth }) {

    const { email, password } = request.all()
    const token = await auth.attempt(email, password)

    return token

  }

  async register({ request, response }) {

    const { email, password } = request.all()
    const userWithSameEmail = await User.findBy('email', email)

    if (userWithSameEmail) {
      return response.status(400).send({
        field: 'email',
        message: 'This e-mail is allready in use.'
      })
    }

    await User.create({
      email,
      password,
      username: email
    })

    return this.login(...arguments);

  }

}

module.exports = UserController
