const { Schema, db_micple } = require('..');

module.exports = db_micple.model(
  'Group',
  new Schema({
    date: { type: Date, required: true },
    privacy: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    avatar: { type: Schema.Types.ObjectId, ref: 'Media' },
    banned: { type: Boolean, required: true, default: false },
    location: { type: String, required: false },
    website: { type: String, required: false },
    approval: { type: Boolean, required: true, default: false },
    members: [
      {
        date: { type: Date, required: false },
        type: { type: String, required: false },
        status: { type: String, required: false },
        notification: { type: String, required: false },
        response: [{ question: { type: String, required: false }, answer: { type: String, required: false } }],
        user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        invitedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        approvedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        seen: { type: Boolean, required: false, default: false },
      },
    ],
    questions: [
      {
        question: { type: String, required: false },
        date: { type: Date, required: false },
        admin: { type: Schema.Types.ObjectId, ref: 'User', required: false },
      },
    ],
  })
);
