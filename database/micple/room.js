const { Schema, db_micple } = require('..');

module.exports = db_micple.model(
  'Room',
  new Schema({
    type: { type: String, required: true },
    group: { type: String, required: true, default: false },
    name: { type: String, required: false },
    avatar: { type: Schema.Types.ObjectId, ref: 'Media', required: false },
    date: { type: Date, required: true },
    seen: [{ type: Schema.Types.ObjectId, ref: 'User', required: false, default: false }],
    deleted: [{ type: Schema.Types.ObjectId, ref: 'User', required: false, default: false }],
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        admin: { type: Boolean, required: false },
        addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        date: { type: Date, required: true },
      },
    ],
    messages: [
      {
        type: { type: String, required: false },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        media: { type: Schema.Types.ObjectId, ref: 'Media', required: false },
        date: { type: Date, required: false },
        content: { type: String, required: false },
        deleted: { type: Boolean, required: false, default: false },
        reacts: { type: Object, required: false },
        seen: { type: Object, required: false },
      },
    ],
  })
);
