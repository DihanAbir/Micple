const { Schema, db_admin } = require("..");

module.exports = db_admin.model(
  "Frontad",
  new Schema({
    date: { type: Date, required: true },
    image: { type: Schema.Types.ObjectId, ref: "Media", required: true },
    link: { type: String, required: true },
    title: { type: String, required: false },
    side: { type: String, required: true, default: "left" }, // left, right
  })
);
