AngularRecess
=============

A full rebuild of OpenRecess in Node, Express, Angular, and MongoDB

(reference from OpenRecess description)
Remember recess?  Kids play everyday, but few adults find time for fun and games together. OpenRecess is here to help. On-demand soccer, baseball, volleyball, doubles tennis, tag or any game you can imagine.  What are you playing?

AngularRecess facilitates game management with easy sign-up and email message notifications. Here's a brief overview of the app:

1. Create a game for recess
1. Add email address for friends you want to invite or open enrollment to anyone
1. OpenRecess will notify users via email and process RSVP responses (in progress)
1. OpenRecess will send regular email updates to remind and organize all players (in progress)

##Features

1. OpenRecess is a single page responsive web application
1. Easy-to-use game creation and join game process

##Technologies
1. Express backend for REST calls
1. angular angular-ui-router angular-google-maps frontend
1. Passport.js authentication
1. Mongodb NoSQL database
1. Stylus CSS

##Installation
To install and run this project, follow the following steps:

####Clone Repo
`git clone https://github.com/21tag/AngularRecess.git`

####Install Node Modules
`npm install`

####Install bower_components
go to AngularRecess/public folder and run 'bower install'

####Install and run mongodb (using homebrew)
`brew install mongodb`

`mongod --port 17017`

####Access to mongo db and look for users
'mongo localhost:17017'
'use openRecess'
'show collections'
'db.users.find()'

##Contributors

1. Emily Coco <emilymcoco@gmail.com>
1. Adrian Kim <uknoiluv@gmail.com>
1. Andrew Magliozzi <andrew.magliozzi@gmail.com>

