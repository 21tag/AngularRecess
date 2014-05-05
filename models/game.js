var mongoose = require('mongoose'),
    moment = require('moment'),
    User = require('./user.js'),
    Message = require('./message.js'),
    Schema = mongoose.Schema;

var validatePresenceOf = function(value) {
  return value && value.length;
};

var GameSchema = new Schema({
  'invitedPlayers': Array,
  'manager': Schema.Types.ObjectId,
  'createdAt': { type: Date, 'default': Date.now },
  'updatedAt': Date,
  'gameDate': { type: Date, validate: [validatePresenceOf, 'please provide a game date'] },
  'gameTime': { type: String, validate: [validatePresenceOf, 'please provide a game time'] },  // TODO: change to date
  'gameName': { type: String, validate: [validatePresenceOf, 'please provide a game title'] },
  'gameType': { type: String, validate: [validatePresenceOf, 'please choose a game type'] }, // eventually convert this into a foreign key for a collection of gameTypes 
  'gameDescription': {type: String, validate: [validatePresenceOf, 'please provide a game description'] },

  'coord' : {
    'lat' : Number,
    'lon' : Number
  },
  'minimumPlayers': Number,
  'confirmedPlayers': Array,
  'confirmedPlayersCount' : Number,
  'playerLimit': Number,
  'minimumPlayersMet': Boolean,
  'playerLimitMet': Boolean,
  'messages': Array,
  'replyCode': String, // this is a code unique to each game that we will use for messaging
});

GameSchema.pre('save', function(next) {

  // Update updatedAt time
  this.updatedAt = new Date();

  // Update confirmed player count
  if(this.confirmedPlayers && this.confirmedPlayers.length > 0) {
    this.confirmedPlayersCount = this.confirmedPlayers.length;

    // Update player limit boolean
    this.playerLimitMet = this.confirmedPlayersCount > this.playerLimit;
    // Update minimum player boolean
    this.minimumPlayersMet = this.confirmedPlayersCount >= this.minimumPlayers;
  }

  next();
});

var Game = module.exports = mongoose.model('Game', GameSchema);
