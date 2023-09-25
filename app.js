const mongoose = require("mongoose");

const DB_HOST ="mongodb+srv://denisdaniv1:YrIHMR8FzSK7vgNh@contact.qwv6cwr.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .cach((error) => console.log(error.message));