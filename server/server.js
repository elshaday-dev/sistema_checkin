const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const formDataSchema = new mongoose.Schema({
  nomeCompleto: String,
  numeroCelular: String,
  lider: String,
  formaPagamento: String,
  pago: Boolean,
});

const FormData = mongoose.model("FormData", formDataSchema);

app.get("/", (req, res) => {
  res.json({ message: "Oi, Express!" });
});
app.post("/form-data", (req, res) => {
  const formData = new FormData(req.body);
  formData.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send(formData);
    }
  });
});

app.listen(8080, () => console.log("Server listening on port 3000"));
