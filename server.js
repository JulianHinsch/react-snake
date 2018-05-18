require('dotenv').config()
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/client/build'));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port:${port}`));

module.exports = app;