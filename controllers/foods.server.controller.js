var mongoose = require('mongoose');
var Food = require('./../models/Food.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

exports.all = function(req, res){
  Food.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");

        res.render('./../public/views/food/list.ejs', {
          user: req.user || null,
          request: req,
          foods: data
        });
    }
  });
  
};

exports.edit = function(req, res){
  res.render('./../public/views/food/edit.ejs', {
    user: req.user || null,
    request: req
  });
};

exports.view = function(req, res){
  res.render('./../public/views/food/view.ejs', {
    user: req.user || null,
    request: req
  });
};

exports.new = function(req, res){
  res.render('./../public/views/food/create.ejs', {
    user: req.user || null,
    request: req
  });
};

module.exports.list = function(req, res) {
  Food.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");

      res.status(200).send(data);
    }
  });
};

module.exports.create = function(req, res) {
  var food = new Food(req.body);
  food.user = req.user;
  food.save(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.read = function(req, res) {
  res.json(req.food);
};


exports.delete = function(req, res) {
	var food = req.food;
	food.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(food);
		}
	});
};


module.exports.update = function(req, res) {
  var food = req.food;

  	food = _.extend(food, req.body);

  	food.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(food);
  		}
  	});
};

exports.foodByID = function(req, res, next, id) {
	Food.findById(id).populate('user', 'email').exec(function(err, food) {
		if (err) return next(err);
		if (!food) return next(new Error('Failed to load food ' + id));
		req.food = food;
		next();
	});
};