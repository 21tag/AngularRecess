angular.module('angularGames', [])
.controller('gamesController', ['$scope', 'angularGames', function($scope, angularGames) {
  $scope.game = {
    name: 'undefined',
    type: 'undefined'
  };

  $scope.submitTheForm = function(name, type) {
    $scope.game.name = name;
    $scope.game.type = type;
    $scope.game.name = description;
    $scope.game.type = day;
    $scope.game.name = time;
    $scope.game.type = minimum;
    $scope.game.name = maximum;
    console.log($scope.game);
    $scope.sendLogin($scope.game);
  };

  $scope.sendLogin = function(game) {
    angularGames.post('/login', game, function(data) {
      console.log('posted');
    });
  };
}])

.factory('angularGames', ['$http', function($http){
  return{
    post: function(url, userData, cb) {
      var postData = $http.post(url, userData);
      postData.success(function(data) {
        cb(data);
      });
      postData.error(function(error) {
        console.log(error);
      });
    }
  };
}]);




// var GameSchema = new Schema({
//   'invitedPlayers': Array, // make this an object of ObjectIds of users or game phone numbers
//   'manager': Schema.Types.ObjectId,
//   'gameCode': Number,
//   'createdAt': { type: Date, 'default': Date.now },
//   'updatedAt': Date,
//   'gameDate': { type: Date, validate: [validatePresenceOf, 'please provide a game date'] },
//   'gameTime': { type: String, validate: [validatePresenceOf, 'please provide a game time'] },  // TODO: change to date
//   'gameName': { type: String, validate: [validatePresenceOf, 'please provide a game title'] },
//   'gameType': { type: String, validate: [validatePresenceOf, 'please choose a game type'] }, // eventually convert this into a foreign key for a collection of gameTypes 
//   // 'gameAddress': { type: String, validate: [validatePresenceOf, 'if you expect people to show up, you\'d better tell them where to go'] },
//   'coord' : {
//     'lat' : Number,
//     'lon' : Number
//   },
//   'minimumPlayers': Number,
//   'confirmedPlayers': Array,
//   'confirmedPlayersCount' : Number,
//   'playerLimit': Number,
//   'minimumPlayersMet': Boolean,
//   'playerLimitMet': Boolean,
//   'messages': Schema.Types.ObjectId
// });