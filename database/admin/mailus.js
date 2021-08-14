const { db_admin, Schema } = require('..');

module.exports = db_admin.model(
  'Mailus',
  new Schema({
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mails: [
      {
        answered: { type: Boolean, required: false, default: false },
        message: { type: String, required: false },
        date: { type: Date, required: false },
        image: { type: Schema.Types.ObjectId, ref: 'Media', required: false },
        file: { type: Schema.Types.ObjectId, ref: 'Media', required: false },
        from: {
          agent: { type: String, required: false },
          ip: { type: String, required: false },
        },
      },
    ],
  })
);
