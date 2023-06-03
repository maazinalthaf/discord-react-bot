# discord-react-bot
This bot adds reactions to specific words in a message sent in a channel.

### Installation:-
- clone the repository
- insert the token and names of the allowed roles (role ids will not work) in **config.json**
- prefix can be changed from **index.js** (default:"?")
- open terminal and run the following commands
`npm install`
`node index.js`

### Usage:-
- To add a new word trigger use the following command
`?addreaction (word) (emoji)`
<br>
Example: `?addreaction sad 😭`
<br/>
- To remove a word trigger use the following command
<br>
`?removereaction (word)`
Example: `?removereaction sad`
<br/>
- To list all word triggers use the following command
`?listreaction`
