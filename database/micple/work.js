const { Schema, db_micple } = require('..');

module.exports = db_micple.model(
  'Work',
  new Schema({
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: false },
    employer: { type: String, required: false },
    position: { type: String, required: true },
    detail: { type: String, required: false },
    from: { type: Date, required: false },
    to: { type: Date, required: false },
    present: { type: Boolean, required: true, default: true },
    privacy: { type: String, required: true, default: 'public' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  })
);
