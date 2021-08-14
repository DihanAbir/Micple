const { Schema, db_posts } = require('..');

module.exports = db_posts.model(
  'Post',
  new Schema({
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: false }],
    date: { type: Date, required: true },
    privacy: { type: String, required: true },
    contents: [{ type: String, required: false }],
    media: [{ type: Schema.Types.ObjectId, ref: 'Media', required: false }],
    reactions: { type: Object, required: true, default: {} },
    shares: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    place: { type: Schema.Types.ObjectId, required: true },
    status: { type: String, required: true },
    rejected: { type: Boolean, required: true, default: false },
    hidden: { type: Boolean, required: true, default: false },
    seen: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    type: { type: String, required: true },
    preview: {type:Object, required: false}
  })
);
