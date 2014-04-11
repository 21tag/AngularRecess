var Games = require('../models/game.js');

module.exports = {


  findById: function(req, res) {
    var id = req.params.id;

    Games.findById(id, function(err, game) {
      if (err) {
        console.log(err);
      }
      res.json(200, game);
    });
  }

};

