const { db_admin, Schema } = require('..');

module.exports = db_admin.model(
  'Admin',
  new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    phone: { type: String, required: true },
  })
);
