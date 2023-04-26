const express = require("express");
const app = express();
const cors = require("cors");
const sendMail = require("./routes/sendMail");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/reset", sendMail);
app.get("/",(req,res)=>{
  res.send("Copyright © 2023 by Sum Boraphan")
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
