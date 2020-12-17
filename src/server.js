const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 4445;
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
  console.log('We are live on port 4445');
});


app.get('/', (req, res) => {
  res.send('Welcome to my api');
})

app.post('/api/v1/contact', (req,res) => {
  var data = req.body;

var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  auth: {
    user: 'testd00001111@gmail.com',
    pass: 'ABcd1234'
  }
});

var mailOptions = {
  from: data.email,
  to: 'shubham.k@cwsinfotech.com,ashish.d@cwsinfotech.com',
  subject: 'CWS Contact Form Request',
  html: ` <p>Dear Admin,</p>
          <p>Below the contact details - </p>
          <p>Name: ${data.name}</p>
          <p>Email: ${data.email}</p>
          <p>Phone: ${data.phone}</p>
          <p>Message: ${data.message}</p>`
};
smtpTransport.sendMail(mailOptions,
(error, response) => {
  if(error) {
    res.send(error)
  }else {
    res.send('Success')
  }
  smtpTransport.close();
});

})