const { Schema, db_micple } = require('..');

module.exports = db_micple.model(
  'Mail',
  new Schema({
    date: { type: Date, required: true },
    from: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    archives: [{ type: Schema.Types.ObjectId, ref: 'Archive' }],
    agent: { type: String, required: true },
    ip: { type: String, required: true },
    support: { type: Boolean, required: true, default: false },
    seen: { type: Boolean, required: true, default: false },
  })
);
