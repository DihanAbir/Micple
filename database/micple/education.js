const { Schema, db_micple } = require('..');

module.exports = db_micple.model(
  'Education',
  new Schema({
    name: { type: String, required: false },
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    department: { type: String, required: true },
    degree: { type: String, required: true },
    detail: { type: String, required: false },
    from: { type: Date, required: false },
    to: { type: Date, required: false },
    present: { type: Boolean, required: true, default: true },
    privacy: { type: String, required: true, default: 'public' },
    type: { type: String, required: true }, // 'S', 'C', 'U'
  })
);
