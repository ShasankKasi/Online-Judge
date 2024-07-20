const express = require("express");
const { colllection, questionstore, connectDatabase } = require("./connection");
const app = express();
const Port = 8000;
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const nodemailer = require("nodemailer");
const { generateFile } = require("./generateFile");
const { execute } = require("./execute");
const { Long } = require("mongodb");
const bodyParser = require("body-parser");
const path = require("path");
const { log } = require("console");

const otpStore = {};

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();
connectDatabase();

app.use(express.static(path.join(__dirname, "build")));

//INfo from env
const admin = process.env.adminEmail;
const SenderEmail = process.env.SenderEmail;
const passkey = process.env.adminPass;

// Post requests
// Signup Post requests

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const data = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const check = await colllection.findOne({ email: email });
    if (name.length == 0 || email.length == 0 || password.length == 0)
      res.json({ status: "emptyerror" });
    else if (check) {
      res.json({ status: "exist" });
    } else {
      if (password.length < 8) {
        res.json({ status: "passerror" });
      } else {
        await colllection.create(data);
        res.json({ status: "success" });
      }
    }
  } catch (error) {
    res.json({ status: "fail" });
  }
});

// Login post requests
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await colllection.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        if (String(user.email) === admin)
          res.json({ status: "admin", email: user.email, name: user.name });
        else
          res.json({ status: "success", email: user.email, name: user.name });
      } else {
        res.json({ status: "incorrect password" });
      }
    } else {
      res.json({ status: "doesnotexist" });
      // console.log("login post");
    }
  } catch (e) {
    res.json({ status: "fail" });
  }
});

// Forgot Password Post requests
app.post("/api/forgot", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await colllection.findOne({ email: email });
    if (user) {
      // console.log("user found")
      const email = req.body.email;

      // Otp generator
      const otp = Math.floor(1000 + Math.random() * 9000);
      randomOtp = otp.toString();

      otpStore[email] = randomOtp;

      await sendEmail(
        email,
        "Forgot Password-Otp Verification",
        `Your Otp for Verification of Email is ${randomOtp}`
      );
      res.json({ status: "otpsent", email });
    }
    // console.log("else");
    else {
      res.json({ status: "Doesnotexist" });
    }
  } catch (e) {
    res.json({ status: "fail" });
  }
});

// get - verify
// app.get('/verify',(req,res)=>{
//     res.json
// })

// Verify - post requests
app.post("/api/verify", async (req, res) => {
  const { email, number } = req.body;
  try {
    if (
      otpStore[email] &&
      number.toString().trim() === otpStore[email].toString().trim()
    ) {
      delete otpStore[email];
      const user = await colllection.findOne({ email });
      const userName = user.name;
      res.json({ status: "success", userName, email });
    } else {
      res.json({ status: "otpincorrect" });
    }
  } catch (e) {
    // console.error(e);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Home Get requests
app.get("/api/home", async (req, res) => {
  try {
    const { difficulty } = req.query;
    let filter = {};

    if (difficulty && difficulty !== "all") {
      filter.difficulty = difficulty;
    }

    const questions = await questionstore.find(filter);
    res.json(questions);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/question/:id", async (req, res) => {
  try {
    const questions = await questionstore.find();
    const question = await questionstore.findById(req.params.id);
    if (!question) {
      throw new Error("ID not found!");
    }
    res.json(question);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Admin POst requests
app.post("/api/admin", async (req, res) => {
  const { title, description, testcases } = req.body;
  try {
    data = {
      title,
      description,
      testcases,
    };
    await questionstore.create(data);
    res.json({ status: "success" });
  } catch (e) {
    res.json({ status: "Failed" });
  }
});

// Question post requests

// Run testcases
app.post("/api/question/:id", async (req, res) => {
  const { testcases, language, code, limit } = req.body;
  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Code is empty" });
  } else {
    try {
      let count = 0;
      let results = [];
      let solve = [false, false, false, false, false];
      for (let i = 0; i < limit; i++) {
        let input = testcases[i].input;
        let output_req = testcases[i].output.trim();
        let { filePath, filePath2 } = await generateFile(language, code, input);
        let output = await execute(filePath, filePath2, language);
        output = output.trim();
        output_req = output_req.trim();

        results[i] = output;

        if (output === output_req) {
          count++;
          solve[i] = true;
        } else if (limit > 2) {
          break;
        }
      }
      if (count == limit) {
        res.json({ status: "Success", count, results, solve });
      } else res.json({ status: "Fail", results, count, solve });
    } catch (e) {
      res.json({ status: "Compilation Error", err: e });
    }
  }
});
// send email function
async function sendEmail(to, subject, text) {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: String(SenderEmail),
      pass: String(passkey),
    },
  });

  const mailOptions = {
    from: String(SenderEmail),
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("trans", error);
    } else {
      console.log("Email Sent:" + info.response);
    }
  });
}
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// Port
app.listen(Port, () => {
  console.log("Server Connected");
});
