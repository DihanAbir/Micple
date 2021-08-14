const { Schema, db_micple } = require('..');


module.exports = db_micple.model(
  'User',
  new Schema({
    name: [{ type: String, required: true }],
    username: { type: String, required: true, unique: true },
    description : {type : String, default : "bio"},
    gender: { type: String, required: true },
    dob: {
      date: { type: Date, required: true },
      privacy: { type: String, required: true, default: 'public' },
    },
    avatar: { type: Schema.Types.ObjectId, ref: 'Media', required: false },
    cover: { type: Schema.Types.ObjectId, ref: 'Media', required: false },
    password: { type: String, required: true },
    hash: { type: String, required: true },
    phone: {
      number: { type: String, required: true, unique: true },
      privacy: { type: String, required: true, default: 'public' },
    },
    website: {
      name: { type: String, required: false },
      privacy: { type: String, required: false, default: 'public' },
    },
    rejected: { type: Boolean, required: true, default: false },
    banned: { type: Boolean, required: true, default: false },
    approved: { type: Boolean, required: true, default: false },
    verified: { type: Boolean, required: true, default: false },
    location: {
      current: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        privacy: { type: String, required: true, default: 'public' },
      },
      permanent: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        privacy: { type: String, required: true, default: 'public' },
      },
    },
    identity: {
      nicnip: { type: String, required: false },
      taxid: { type: String, required: false },
    },
    works: [{ type: Schema.Types.ObjectId, ref: 'Work', required: false }],
    educations: [{ type: Schema.Types.ObjectId, ref: 'Education', required: false }],
    family: [
      {
        name: { type: String, required: false },
        relation: { type: String, required: false },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        privacy: { type: String, required: false, default: 'public' },
      },
    ],
    relation: {
      name: { type: String, required: false },
      status: { type: String, required: false },
      date: { type: Date, required: false },
      user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
      privacy: { type: String, required: false, default: 'public' },
    },
    friends: [
      {
        date: { type: Date, require: false },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        status: { type: String, required: false },
      },
    ],
    blocklist: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    locker: {
      timeline: { type: String, required: true, default: 'public' },
      about: { type: String, required: true, default: 'public' },
      friends: { type: String, required: true, default: 'public' },
      photos: { type: String, required: true, default: 'public' },
      audios: { type: String, required: true, default: 'public' },
      videos: { type: String, required: true, default: 'public' },
      groups: { type: String, required: true, default: 'public' },
      notes: { type: String, required: true, default: 'public' },
    },
    devices: {
      reg: {
        agent: { type: String, required: true },
        date: { type: Date, required: true },
        ip: { type: String, required: true },
      },
      log: [
        {
          agent: { type: String, required: false },
          date: { type: Date, required: false },
          ip: { type: String, required: false },
        },
      ],
    },
    temp: { type: Object, required: false },
  })
);
