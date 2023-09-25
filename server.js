const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://denisdaniv1:YrIHMR8FzSK7vgNh@contact.qwv6cwr.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3001);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
