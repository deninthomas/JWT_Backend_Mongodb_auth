const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const promise = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  promise.then(
    (pass) => {
      console.log("connected to DB",pass.connection.readyState);   // promise has 2 exeutable state on for sucess on for the error
    },
    (error) => {
      console.log("Faild to COnnect",error); // this is the error  they run the promise phase and log or show the output which is according to the user code
    }
  );
};
module.exports = connectDB;

// Connection to db

// syntax
// const promise = condtion or function
//  promise.then (()=>{ for sucess},()=>{for error})