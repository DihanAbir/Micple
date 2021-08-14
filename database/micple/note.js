const { Schema, db_micple } = require('..');

module.exports = db_micple.model(
  'Note',
  new Schema({
    date: { type: Date, required: true, default: new Date().toISOString() },
    privacy: { type: String, required: true, default: 'public' },
    title: { type: String, required: true },
    note: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
  })
);
