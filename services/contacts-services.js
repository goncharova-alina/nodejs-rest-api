const { ContactsRepository } = require('../repository');

class ContactsServices {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }

  async getAll(userId, query) {
    const data = await this.repositories.contacts.getAll(userId, query);
    return data;
  }

  async getById(userId, { id }) {
    const data = await this.repositories.contacts.getById(userId, id);
    return data;
  }

  async create(userId, body) {
    const data = await this.repositories.contacts.create(userId, body);
    return data;
  }

  async update(userId, { id }, body) {
    const data = await this.repositories.contacts.update(userId, id, body);
    return data;
  }

  async remove(userId, { id }) {
    const data = await this.repositories.contacts.remove(userId, id);
    return data;
  }

  async updateStatus(userId, { id }, body) {
    const data = this.repositories.contacts.updateStatus(userId, id, body);
    return data;
  }
}
module.exports = ContactsServices;