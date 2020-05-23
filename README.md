## NOTES:
To install dependencies:

  -- npm init -y
  
    ** in package.json, change give "main" value "server.js"
    
  -- npm i express ejs express-ejs-layouts
  
    ** in package.json, delete test and add "devStart" : "nodemon server.js"
    
  -- npm i --save-dev nodemon
  
    ** adds nodemon as a dependency, live refresh of server when changes are made
    
To run the server:

  -- npm run devStart (development)
