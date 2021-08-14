const { createConnection, plugin, Schema, Types } = require("mongoose");

plugin(require("mongoose-unique-validator"));
plugin(require("mongoose-paginate-v2"));

function makeConnection(database) {
  return createConnection(`mongodb://127.0.0.1:27017/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .on("error", (error) => {
      console.log(`${database} failed to connect.`);
      console.log(error);
    })
    .on("connected", () => {
      console.log(`${database} connected.`);
    })
    .on("disconnected", () => {
      console.log(`${database} disconnected.`);
    });
}

const db_micple = makeConnection("micple");
const db_admin = makeConnection("chief");
const db_cloud = makeConnection("cloud");
const db_posts = makeConnection("posts");

module.exports = {
  Schema,
  Types,
  db_micple,
  db_admin,
  db_cloud,
  db_posts,
};
