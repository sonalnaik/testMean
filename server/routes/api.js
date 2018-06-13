var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');


var Customer = require('../models/Customer');

router.route('/all').get(function (req, res) {
  Customer.find(function (err, doc){
    if(err){
      console.log(err);
    }
    else {
       console.log(doc);
      res.json(doc);
    }
  }).sort({_id:-1});
});

router.route('/allCustomers').get(function (req, res) {
  Customer.find(function (err, doc){
    if(err){
      console.log(err);
    }
    else {
       console.log(doc);
      res.json(doc);
    }
  }).sort({_id:-1});
});


router.route('/customers').get(function (req, res) {
  Customer.find({ "is_active" : "1"},function (err, doc){
    if(err){
      console.log(err);
    }
    else {
       console.log(doc);
      res.json(doc);
    }
  }).sort({_id:-1}).limit(10);
});

router.route('/customersCount').get(function (req, res) {
    Customer.count(function( err, count){
      console.log( "Number of users:", count );
      if(err){
        console.log(err);
      }
      else {
        res.json(count);
      }
  });
});

router.route('/customersDeleteCount').get(function (req, res) {
  Customer.count({is_active:"0"},function( err, count){
    console.log( "Number of users:", count );
    if(err){
      console.log(err);
    }
    else {
      res.json(count);
    }
});
});

router.route('/deletedCustomers').get(function (req, res) {
  Customer.find({is_active:"0"},function( err, count){
    console.log( "Number of users:", count );
    if(err){
      console.log(err);
    }
    else {
      res.json(count);
    }
});
});


router.route('/add').post(function (req, res) {    
  var customer = new Customer(req.body);
  var text = "We have received your details please verify your email by clicking the following link http://localhost:3000/ and you can manage your profile information, for any new event you will receive email from admin.";
  customer.save()
    .then(item => {
      mailSend(req.body.email,text,"Register Done");


    res.status(200).json({'customer':'customer added successfully'});

    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


// Defined edit route

// Defined edit route
router.route('/login').post(function (req, res) {
  Customer.findOne(req.body, function (err, doc){
    var response;
    if(err){
      response = res.status(404).send("unable to save to database");
    }else{
      if(doc){
        console.log("t",doc);
        response = res.status(200).send(doc);
      }else{
        response = res.status(400).send("unable to save to database");
      }
    }
      return response;
  });
});

router.route('/delete/:id').post(function (req, res) {
  Customer.findById(req.params.id, function(err, doc) {
    if (!doc)
      return next(new Error('Could not load Document'));
    else {

      var emailT  =  doc.email;
      doc.is_active = req.body.is_active;
      doc.save().then(doc => {
        mailSend(emailT,"services are suspended","services are suspended");

          res.status(200).json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

router.route('/updateCustomer/:id').post(function (req, res) {
  Customer.findById(req.params.id, function(err, doc) {
    if (!doc)
      return next(new Error('Could not load Document'));
    else {
      doc.firstName = req.body.firstName;
      doc.lastName = req.body.lastName;
      doc.email = req.body.email;
      doc.city = req.body.city;
      doc.state = req.body.state;
      doc.is_admin = req.body.is_admin;


      doc.save().then(doc => {
          res.status(200).json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


router.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
 
  Customer.findById(id,function (err, doc){
    if(err){
      console.log(err);
    }
    else {
       console.log(doc);
      res.json(doc);
    }
  });


});


// Defined delete | remove | destroy route
router.route('/deleteAll').get(function (req, res) {
  Customer.deleteMany(function(err, doc){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


function mailSend(email,text,subject){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testsdnnagpur@gmail.com',
      pass: 'Test@1234'
    }
  });
  
  var mailOptions = {
    from: 'testsdnnagpur@gmail.com',
    to: email,
    subject: subject,
    text: text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


module.exports = router;


