const { Schema, db_posts } = require('..');

module.exports = db_posts.model(
  'Comment',
  new Schema({
    date: { type: Date, required: false },
    contents: [{ type: String, required: false }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    media: { type: Schema.Types.ObjectId, ref: 'Media', required: false },
    emoji: { type: String, required: false },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    replies: [this],
  })
);
