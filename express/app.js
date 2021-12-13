const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'port waiting');
});