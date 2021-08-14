const { db_admin, Schema } = require('..');

module.exports = db_admin.model(
  'Chatus',
  new Schema({
    date: { type: Date, required: true },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin', required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    close: {
      by: { type: String, required: false },
      date: { type: Date, required: false },
    },
    from: {
      ip: { type: String, required: true },
      agent: { type: String, required: true },
    },
    messages: [
      {
        client: { type: Boolean, required: true },
        message: { type: String, required: false },
        date: { type: Date, required: true },
        seen: { type: Boolean, required: true, default: false },
        image: { type: Schema.Types.ObjectId, ref: 'Media', required: false },
      },
    ],
  })
);
