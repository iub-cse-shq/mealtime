'use strict';
var mongoose = require('mongoose');
var Food = require('./../models/Food.js');
var errorHandler = require('./errors.server.controller');
/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	
	  Food.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");

        res.render('./../public/views/index.ejs', {
          user: req.user || null,
          request: req,
          foods: data
        });
    }
  });
};

exports.about = function(req, res) {
	res.render('./../about.ejs', {
		user: req.user || null,
		request: req
	});
};

exports.login = function(req, res) {
	res.render('./../public/views/login.ejs', {
		user: req.user || null,
		request: req
	});
	
};	
	exports.signup = function(req, res) {
	res.render('./../public/views/signup.ejs', {
		user: req.user || null,
		request: req
	});
	
};
