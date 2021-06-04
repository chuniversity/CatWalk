const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

app.listen(port, (error) => {
  if (error) console.log(error);
  console.log(`Listening to port ${port}`);
})
