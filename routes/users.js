var User = require('../models/user.js');

module.exports = {
  createUser: function(req, res, next) {
    console.log('Attempting to create new user: ', req.body.email);
    newUser = new User({
      email: req.body.email,
      display_name: req.body.display_name,
      phone: '+1' + req.body.phone,
      password: req.body.password
    });
    newUser.save(function(err, results) {
      if(err) {
        console.log(err);
        if(err.code === 11000 || err.code === 11001)
          res.json(400, 'Account already exists. Please choose a different email address.');
        else
          res.json(400, err.err);
      }
      else
        res.json(200, 'Success!');
    });
  },

  updateUser: function(req, res, next) {
    console.log('Update user');
    res.json(200, 'Update stub');
  },

  deleteUser: function(req, res, next) {
    res.json(200, 'Delete stub');
  },

  findById: function(req, res, next) {
    var id = req.param.id;
    User.findById(id, function(err, user) {
      if (err) {
        console.log(err);
      }
      res.json(200, user);
    });
  },

  findAll: function(req, res, next) {
    
    //apr16 added
    User.find({}, function(err, users){
      if (err) {
        console.log(err);
        res.json(400);
      }
      res.json(200, users);
    });
    // res.json(200, 'Get allUser stub');
  },


  //apr16 added
  findQuery:function(req, res) {
    var regex = new RegExp(req.params.id, 'i');
    var query = User.find({display_name: regex}, { 'email': 1 }).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
        
      // Execute query in a callback and return users list
    query.exec(function(err, users) {
      if (!err) {
        // Method to construct the json result set
        // var result = buildResultSet(users); 
        res.json(200, users);
      } else {
        console.log(err);
        res.json(400);
      }
   });
  }
};
