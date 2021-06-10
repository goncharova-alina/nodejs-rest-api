const { UsersRepository } = require('../repository');
const jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');

class UsersServices {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async create(body) {
    const data = await this.repositories.users.create(body);
    return data;
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }

  async updateSubscriptionById(userId, body) {
    const data = await this.repositories.users.updateSubscriptionById(
      userId,
      body,
    );
    return data;
  }

  async uploadAvatar(userId, file) {
    const IMG_DIR = path.join(process.cwd(), 'public', 'avatars');
    const user = await this.findById(userId);

    const img = await jimp.read(file.path);

    const IMG_NAME = `${user.email}_${Date.now()}_${file.originalname}`;

    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(file.path);

    await fs.rename(file.path, path.join(IMG_DIR, IMG_NAME));

    const url = `/avatars/${IMG_NAME}`;

    await this.repositories.users.updateAvatarById(userId, { avatarURL: url });

    return url;
  }
}
module.exports = UsersServices;