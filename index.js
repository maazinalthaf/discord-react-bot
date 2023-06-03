const { Client, Intents, MessageEmbed } = require('discord.js');
const { token, allowedRole } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const PREFIX = '?';
const reactions = require('./reactions.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  const content = message.content.toLowerCase(); // Convert message content to lowercase
  const words = content.split(' ');

  for (const word of words) {
    if (reactions[word]) {
      try {
        await message.react(reactions[word]);
      } catch (error) {
        console.error('Error adding reaction:', error);
      }
    }
  }

  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'addreaction') {
    // Role restriction code...
    if (!message.member.roles.cache.some(role => allowedRoles.includes(role.name))) {
  return message.reply('You do not have permission to use this command.');
}

    // Process the addreaction command...
  } else if (command === 'removereaction') {
    // Role restriction code...
    if (!message.member.roles.cache.some(role => role.name === allowedRole)) {
      return message.reply('You do not have permission to use this command.');
    }

    // Process the removereaction command...
  } else if (command === 'listreaction') {
    // Role restriction code...
    if (!message.member.roles.cache.some(role => role.name === allowedRole)) {
      return message.reply('You do not have permission to use this command.');
    }

    // Process the listreaction command...
  }

  // Other commands...

});

function saveReactions() {
  const fs = require('fs');
  fs.writeFileSync('./reactions.json', JSON.stringify(reactions, null, 2), 'utf8');
}

client.login(token);
