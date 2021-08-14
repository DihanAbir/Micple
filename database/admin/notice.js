const { Schema, db_admin } = require('..');

module.exports = db_admin.model(
  'Notice',
  new Schema({
    admin: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
    date: { type: Date, required: true },
    title: { type: String, required: true },
    show: { type: Boolean, required: true, default: true },
  })
);
