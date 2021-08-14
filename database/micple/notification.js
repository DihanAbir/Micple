const { Schema, db_micple } = require('..');

module.exports = db_micple.model(
  'Notification',
  new Schema({
    date: { type: Date, required: true },
    type: { type: String, required: true }, // ['react', 'comment', 'share', 'friend', 'group']
    user: { type: Schema.Types.ObjectId, required: true },
    post: { type: Schema.Types.ObjectId, required: false },
    comment: { type: Schema.Types.ObjectId, required: false },
    react: { type: String, required: false }, // ['angry', 'haha', 'like', 'love', 'sad', 'wow']
    friend: { type: Schema.Types.ObjectId, required: false },
    group: { type: Schema.Types.ObjectId, required: false },
    seen: { type: Boolean, required: true, default: false },
  })
);
