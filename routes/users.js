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
    var id = req.params.id;
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
  },

  searchMember:function(req, res) {
    console.log('req.params', req.params.name);
    var regex = new RegExp('^' + req.params.name, 'i');
    console.log(regex);
    var query = User.find({display_name: regex}, { 'email': 1, 'display_name':1 });        
      // Execute query in a callback and return users list
    query.exec(function(err, users) {
      if (!err) {
        console.log('users', users);
        res.json(200, users);
      } else {
        console.log(err);
        res.json(400);
      }
   });
  },

  updateGames: function(req, res, next) {

    var id = req.body.id;
    var game = req.body.game;
    User.findOneAndUpdate(
    {
      _id : id,
      upcomingGames : { $nin: [game] }
    },
    {
      $addToSet : { upcomingGames : game }
    },
    function(err, thisUser){
      if(err) {
        console.log('error', err);
      } else {
        console.log(thisUser);
      }
    });
    res.json(200, 'user updated');
  },

  getCurrentUser: function(req, res ,next){
    if(req.user) {
      // Return subset of fields
      var user = {};
      user.email = req.user.email;
      user.phone = req.user.phone;
      user.display_name = req.user.display_name;
      user.upcomingGames = req.user.upcomingGames;
      user.gamesPlayed = req.user.gamesPlayed;
      user.id = req.user._id;
      return res.json(user);
    }
    else return res.json();
  }
};
