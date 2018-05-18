require('dotenv').config()
const express = require('express');
const path = require('path');

const app = express();

//serve static assets in production
if (process.env.NODE_ENV !== 'development') {
    app.use(express.static(__dirname+'/client/build'));
}

//general error handling middleware
app.use((req,res,next) => {
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port:${port}`));

module.exports = app;