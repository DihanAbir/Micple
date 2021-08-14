const { Schema, db_cloud } = require('..');

module.exports = db_cloud.model(
  'Media',
  new Schema({
    date: { type: Date, required: true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    name: { type: String, required: true },
    privacy: { type: String, required: true, default: 'public' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    place: { type: Schema.Types.ObjectId, required: false },
    status: { type: String, required: false },
    duration: { type: Number, required: false },
    offset: { type: Number, required: false }
    
  })
);
