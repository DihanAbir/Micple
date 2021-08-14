const { Schema, db_micple } = require('..');

module.exports = db_micple.model(
  'Activity',
  new Schema({
    date: { type: Date, required: true },
    type: { type: String, required: true }, // * 'post', 'react', 'comment', 'reply', 'hide'
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    comment: { type: Schema.Types.ObjectId, ref: 'Comment', required: false },
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: false },
  })
);
