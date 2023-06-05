# discord-react-bot
This is a discord bot that can autoreact to a message when someone says a certain word 

### Installation:-
- clone the repository
- insert the token and names of the allowed roles (role ids will not work) in **config.json**
- prefix can be changed from **index.js** (default:"?")
- open terminal and run the following commands 
`npm install`
`node index.js`
### Usage:-
To add a new word trigger use the following command
`?addreaction (word) (emoji)`
<br>
Example: `?addreaction sad 😭`
<br/>
To remove a word trigger use the following command
`?removereaction (word)`
<br>
Example: `?removereaction sad`
<br/>
To list all word triggers use the following command
`?listreaction`

### Note:-
- The words added are not CASE-SENSITIVE i.e uppercase and lowercase letters are treated as equivalent.
- This bot relys on a json database i.e **reactions.json** and all the words added will be stored in the json file so that the bot remembers all the set word triggers whenever it restarts but keep in mind that the words set are not server exclusive and the bot will react to the words present in **reactions.json** in whichever server the bot is present in.
- To add mention react just use `?addreaction <@user-id> (emoji)`
