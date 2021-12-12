const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const eventRoute = require("./routes/events");
const categoryRoute = require("./routes/categories");


dotenv.config();
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


/*
mongoose.connect('mongodb+srv://yesumim:yesumim1@cluster0.pcaum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));
*/


app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/events", eventRoute);
app.use("/api/categories", categoryRoute);



app.listen("5000", () => {
  console.log("Backend is running.  on localhost:5000");
});

//MONGO_URL ="mongodb+srv://yesumim:yesumim1@cluster0.pcaum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//MONGO_URL ="mongodb+srv://yesumim:yesumim1@cluster0.pcaum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
