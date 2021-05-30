const Contact = require('../schemas/contacts-schemas');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getAll(userId, { page = 1, limit = 20, favorite }) {
    const result = await this.model.paginate(
      { owner: userId, favorite: favorite },
      {
        limit,
        page,
        populate: {
          path: 'owner',
          select: ' name email subscription  -_id',
        },
      },
    );

    return result;
  }

  async getById(userId, id) {
    const result = await this.model.findById(id, { owner: userId }).populate({
      path: 'owner',
      select: ' name email subscription',
    });
    return result;
  }

  async create(userId, body) {
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }

  async update(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      id,
      { owner: userId },
      { ...body },
      {
        new: true,
      },
    );
    return result;
  }

  async remove(userId, id) {
    const result = await this.model.findByIdAndRemove(id, { owner: userId });
    return result;
  }

  async updateStatus(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      id,
      { owner: userId },
      { ...body },
      {
        new: true,
      },
    );
    return result;
  }
}
module.exports = ContactsRepository;