var mongoose = require('mongoose'),
    moment = require('moment'),
    User = require('./user.js'),
    Game = require('./game.js'),
    Schema = mongoose.Schema;


var MessageSchema = new mongoose.Schema({
  'twilioSID': String, // SMS only
  'subject': String, // email only 
  'body': String,
  'reply-to': String, // email only with a format like this: OpenRecess+[Game.replyCode]@gmail.com
  'recipient': Schema.Types.ObjectId, // this is the game ObjectId
  'sender': Schema.Types.ObjectId, // this is the user ObjectId
  'processed': {type: Boolean} // this boolean is set once the message is posted
});

MessageSchema.pre('save', function(next) {
  // do some pre-save shit here

  next();

});

var Message = module.exports = mongoose.model('Message', MessageSchema);
