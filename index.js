const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

const nodemailer = require('nodemailer');

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

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/registration', (req, res) => {
    res.render('registration');
});

app.post('/registration', urlencodedParser, (req, res) => {
    
    res.render('registration', {data: req.body, url_code: req.query});
    console.log(req.body);
    
    var mailOptions = {
        from: 'gevtest98@gmail.com',
        to: 'zarya@tdsoyuz.ru',
        subject: 'Новые заказы ',
        html: '<h1>Новые заказы</h1><p>' + req.body.firstName + '</p><p>' + req.body.lastName + '</p><p>' + req.body.middleName + '</p><p>' + req.body.mail + '</p><p>' + req.body.phone + '</p><p>' + req.body.city + '</p><p>' + req.body.where + '</p><p>' + req.body.article + '</p><p>' + req.body.numberCheck + '</p>'
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