const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      family: 4,
    })
    .then((data) => {
      console.log("Mongo Db connected");
    });
};

  // QuestionSchema
  const questionSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {  
      type:String,
      required: true,
    },
    testcases: [
      {
        input :{
          type : String,
          required: true,
        },
        output :{
          type : String,
          required: true,
        },
      },
    ],
  });
  
  // Login Schema
const userschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const questionstore=mongoose.model("questionstore",questionSchema)
const colllection = mongoose.model("colllection", userschema);
module.exports = {
  colllection,questionstore,connectDatabase
};
