# This script will send an image as an email attachment to the
# user himself. The receiving part of this is in read.coffee
 
# Install EmailJS with `npm install emailjs`
email = require "emailjs"
 
# You need a config file with your email settings
fs = require "fs"
config = JSON.parse fs.readFileSync "#{process.cwd()}/config.json", "utf-8"
 
server = email.server.connect
    user: config.username
    password: config.password
    host: config.smtp.host
    ssl: config.smtp.ssl
 
message = email.message.create 
    text: "This is test of the OpenRecess mail server"
    from: "#{config.name} <#{config.email}>"
    to: "#{config.name} <#{config.email}>, 'dan sell' <dan.s.sell@gmail.com>"
    subject: "Testing Node.js email capabilities for OpenRecess"
 
# message.attach "reading.png", "image/png", "reading-image.png"
 
server.send message, (err, message) ->
    return console.error err if err
    console.log "Message sent with id #{message['header']['message-id']}"