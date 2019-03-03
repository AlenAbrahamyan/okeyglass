const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const svgCaptcha = require('svg-captcha');
const app = express();
const upload = multer({dest: './photo'});
const url_web = "keyglass.herokuapp.com";
var tiv = 0;

app.use(bodyParser.json());



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gevtest98@gmail.com',
    pass: 'gevor12gevor'
  }
});



app.set('view engine', 'ejs');

app.use('/home_files', express.static('home_files'));
app.use('/registration_files', express.static('registration_files'));

//home page
app.get('/', (req, res) => {
    res.render('home');
});

//Create Captcha 
setInterval(function(){ captchas = svgCaptcha.create(); }, 5000);
app.get('/captchas', function (req, res) {
  res.type('svg');
  res.status(200).send(captchas.data);
});

//registration page
app.get('/registration', (req, res) => {
    res.render('registration', {url_code: req.query.sea, ctext : captchas.text});
});



app.post('/registration', upload.single('file'), (req, res) => {


    res.render('registration', {data: req.body, url_code: req.query.sea, ctext : captchas.text});
    tiv++;

   
    
    var mailOptions = {
        from: 'gevtest98@gmail.com',
        to: 'alen.abrahamyan7@tumo.org',
        subject: 'Новые' + tiv,
        html: '<h1>Новые заказы</h1><p>' + req.body.firstName + '</p><p>' + req.body.lastName + '</p><p>' + req.body.middleName + '</p><p>' + req.body.mail + '</p><p>' + req.body.phone + '</p><p>' + req.body.city + '</p><p>' + req.body.where + '</p><p>' + req.body.article + '</p><p>' + req.body.numberCheck + '</p><img src="'+url_web+'/photo/'+req.file.filename+'">'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ');
        }
      
      });

      
});


app.listen(process.env.PORT || 3000, console.log("server start"));