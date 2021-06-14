const { UsersRepository } = require('../repository');
const EmailService = require('./email-services');
const jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');
const { nanoid } = require('nanoid');

class UsersServices {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
    this.emailService = new EmailService();
  }

  async create(body) {
    const verifyToken = nanoid();
    const { email, name } = body;
    try {
      await this.emailService.sendEmail(verifyToken, email, name);
    } catch (error) {
      throw new Error('Servise Unavailable');
    }
    const data = await this.repositories.users.create({ ...body, verifyToken });
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

  async verify({ token }) {
    const user = await this.repositories.users.findByField({
      verifyToken: token,
    });
    if (user) {
      await user.updateOne({ verify: true, verifyToken: null });
      return true;
    }
    return false;
  }

  async repeatSendMail({ name, email, verifyToken }) {
    try {
      await this.emailService.sendEmail(verifyToken, name, email);
    } catch (error) {
      throw new Error(error.message);
    }
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