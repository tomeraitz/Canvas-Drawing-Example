// Server setup
const express = require('express');
const app = express();
const path = require('path')

const port = process.env.PORT || 8000

app.use(express.static(path.join(__dirname, 'client')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  })

app.listen(port, function () {
    console.log(`Running on port ${port}`)
})