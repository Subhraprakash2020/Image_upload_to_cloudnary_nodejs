const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")

require("dotenv")
  .config();

//Connect to database
try {
  mongoose.connect("mongodb://localhost:27017/cloudinary", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log("connected to db");
} catch (error) {
  handleError(error);
}
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true

}));

const routes = require('./routes/user')
app.use("/api/v3/app",routes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up on ${port}`);
  });
  