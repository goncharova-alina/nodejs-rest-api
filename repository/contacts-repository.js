const Contact = require('../schemas/contacts-schemas');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getAll() {
    const result = await this.model.find({});
    console.log('this.model', this.model);
    console.log('results', result);
    return result;
  }

  async getById(id) {
    const result = await this.model.findById(id);
    return result;
  }
  
  async create(body) {
    const result = await this.model.create(body);
    return result;
  }

  async update(id, body) {
    const result = await this.model.findByIdAndUpdate(
      id,
      { ...body },
      {
        new: true,
      },
    );
    console.log('results', result);
    return result;
  }

  async remove(id) {
    const result = await this.model.findByIdAndRemove(id);
    return result;
  }

  async updateStatus(id, body) {
    const result = await this.model.findByIdAndUpdate(
      id,
      { ...body },
      {
        new: true,
      },
    );
    console.log('results', result);
    return result;
  }
}
module.exports = ContactsRepository;