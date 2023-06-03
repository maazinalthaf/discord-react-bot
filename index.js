const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

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

    // Process the addreaction command...
  } else if (command === 'removereaction') {
    // Role restriction code...

    const word = args[0];

    if (!word) {
      return message.reply('Please provide the word to remove the reaction.');
    }

    if (!reactions[word.toLowerCase()]) {
      return message.reply('No reaction found for the specified word.');
    }

    delete reactions[word.toLowerCase()];
    saveReactions();

    return message.reply(`Reaction removed for the word "${word}".`);
  } else if (command === 'listreaction') {
    // Role restriction code...

    const reactionEmbed = new MessageEmbed()
      .setTitle('Current Word-Reaction Mappings')
      .setColor('#0099ff');

    for (const word in reactions) {
      reactionEmbed.addField(word, reactions[word]);
    }

    return message.channel.send({ embeds: [reactionEmbed] });
  }

  // Other commands...

});

function saveReactions() {
  const fs = require('fs');
  fs.writeFileSync('./reactions.json', JSON.stringify(reactions, null, 2), 'utf8');
}

client.login(token);
