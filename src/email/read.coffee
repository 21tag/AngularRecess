# This example script opens an IMAP connection to the server and
# seeks unread messages sent by the user himself. It will then
# download those messages, parse them, and write their attachments
# to disk.
 
# Install node-imap with `npm install imap`
imap = require "imap"
# Install mailparser with `npm install mailparser`
mailparser = require "mailparser"
 
# You need a config file with your email settings
fs = require "fs"
config = JSON.parse fs.readFileSync "#{process.cwd()}/config.json", "utf-8"
 
server = new imap.ImapConnection
    username: config.username
    password: config.password
    host: config.imap.host
    port: config.imap.port
    secure: config.imap.secure
 
exitOnErr = (err) ->
    console.error err
    do process.exit
 
server.connect (err) ->
    exitOnErr err if err
    server.openBox "INBOX", false, (err, box) ->
        exitOnErr err if err
        console.log "You have #{box.messages.total} messages in your INBOX"
 
        server.search ["UNSEEN", ["SINCE", "Sep 18, 2011"], ["FROM", config.email]], (err, results) ->
            exitOnErr err if err
 
            unless results.length
                console.log "No unread messages from #{config.email}"
                do server.logout
                return
 
            fetch = server.fetch results,
                request:
                    body: "full"
                    headers: false
            
            fetch.on "message", (message) ->
                fds = {}
                filenames = {}
                parser = new mailparser.MailParser
 
                parser.on "headers", (headers) ->
                    console.log "Message: #{headers.subject}"
 
                parser.on "astart", (id, headers) ->
                    filenames[id] = headers.filename
                    fds[id] = fs.openSync headers.filename, 'w'
 
                parser.on "astream", (id, buffer) ->
                    fs.writeSync fds[id], buffer, 0, buffer.length, null
 
                parser.on "aend", (id) ->
                    return unless fds[id]
                    fs.close fds[id], (err) ->
                        return console.error err if err
                        console.log "Writing #{filenames[id]} completed"
 
                message.on "data", (data) ->
                    parser.feed data.toString()
 
                message.on "end", ->
                    do parser.end
 
            fetch.on "end", ->
                do server.logout