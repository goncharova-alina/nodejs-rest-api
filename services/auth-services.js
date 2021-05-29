const { UsersRepository } = require('../repository');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthServices {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async login({ email, password }) {
    const user = await this.repositories.users.findByEmail(email);
    const valid = await user.validPassword(password);
    if (!user || !valid) {
      return null;
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await this.repositories.users.updateToken(id, token);
    return {
      token,
      user: { email: user.email, subscription: user.subscription, id: user.id },
    };
  }

  async logout(id) {
    const data = await this.repositories.users.updateToken(id, null);
    return data;
  }

  async current(email) {
    const user = await this.repositories.users.findByEmail(email);

    return { email: user.email, subscription: user.subscription };
  }
}
module.exports = AuthServices;