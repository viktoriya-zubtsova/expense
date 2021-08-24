const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./modules/routes/routes');
const app = express();

const url = 'mongodb+srv://ViktoriyaET:ViktoriyaETpassword@cluster0.i2ikn.mongodb.net/expense?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(cors());
app.use('/', apiRoutes);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
