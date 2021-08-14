const { Schema, db_cloud } = require('..');

module.exports = db_cloud.model(
  'Archive',
  new Schema({
    date: { type: Date, required: true },
    file: { type: String, required: true },
    name: { type: String, required: true },
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    support: { type: Boolean, required: true, default: false },
  })
);
