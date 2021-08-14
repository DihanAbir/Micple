const { Schema, db_admin } = require('..');

module.exports = db_admin.model(
  'News',
  new Schema({
    date: { type: Date, required: true },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: false },
    media: { type: Schema.Types.ObjectId, ref: 'Media', required: false },
    url: { type: String, required: true },
    type: { type: String, required: true },
  })
);
