const { Schema, db_micple } = require('..');

module.exports = db_micple.model(
  'Report',
  new Schema({
    date: { type: Date, required: true },
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    detail: { type: String, required: true },
  })
);
