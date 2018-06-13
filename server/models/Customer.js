var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Customer  = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  is_active: {
    type: String,
  },
  city: {
    type: String,
  },
  state:{
    type: String,
  },
  is_admin: {
    type: String,
  },
},{
    collection: 'Customers'
});

module.exports = mongoose.model('Customer', Customer);