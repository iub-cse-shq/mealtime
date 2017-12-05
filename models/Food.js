var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FoodSchema = {

  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title required'
  },
 image: {
    type: String,
    default: '',
    trim: true,
    required: 'image required'
  },
  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Content required'
    

  },

  price: {
    type: Number,
    default: '',
    trim: true,
    required: 'Price Required'
  },

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  created: {
    type: Date,
    default: Date.now
  }
}

var Food = mongoose.model('Food', FoodSchema, 'foods');
module.exports = Food;
