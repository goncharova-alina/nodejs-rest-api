const { v4: uuid } = require("uuid");
const db = require("../db");

class ContactsRepository {
  getAll() {
    return db.get("contacts").value();
  }

  getById(contactId) {
    const idS = String(contactId);
    return db.get("contacts").find({ id: idS }).value();
  }

  create(body) {
    const id = uuid();
    const record = {
      id,
      ...body,
    };
    db.get("contacts").push(record).write();
    return record;
  }

  update(contactId, body) {
    const idS = String(contactId);
    const record = db.get("contacts").find({ id: idS }).assign(body).value();
    db.write();
    return record;
  }

  remove(contactId) {
    const idS = String(contactId);
    const [record] = db.get("contacts").remove({ id: idS }).write();
    return record;
  }
}
module.exports = ContactsRepository;
