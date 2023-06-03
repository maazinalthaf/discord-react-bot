const { Client, Intents, MessageEmbed } = require('discord.js');
const { token, allowedRoles } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const PREFIX = '?';
const reactions = require('./reactions.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  const content = message.content.toLowerCase();
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
    if (!hasPermission(message.member)) {
      return message.reply('You do not have permission to use this command.');
    }

    // Process the addreaction command...
    const word = args[0];
    const reaction = args[1];

    if (!word || !reaction) {
      return message.reply('Please provide a word and a reaction.');
    }

    reactions[word] = reaction;
    saveReactions();
    message.reply(`Reaction "${reaction}" added for word "${word}".`);
  } else if (command === 'removereaction') {
    if (!hasPermission(message.member)) {
      return message.reply('You do not have permission to use this command.');
    }

    // Process the removereaction command...
    const word = args[0];

    if (!word) {
      return message.reply('Please provide a word to remove the reaction.');
    }

    if (!reactions[word]) {
      return message.reply(`There is no reaction associated with the word "${word}".`);
    }

    delete reactions[word];
    saveReactions();
    message.reply(`Reaction removed for word "${word}".`);
  } else if (command === 'listreaction') {
    if (!hasPermission(message.member)) {
      return message.reply('You do not have permission to use this command.');
    }

    // Process the listreaction command...
    const reactionList = Object.entries(reactions).map(([word, reaction]) => `- ${word}: ${reaction}`).join('\n');

    const embed = new MessageEmbed()
      .setTitle('Reactions List')
      .setDescription(reactionList);

    message.reply({ embeds: [embed] });
  }

  // Other commands...
});

function hasPermission(member) {
  const memberRoles = member.roles.cache.map(role => role.name);
  return memberRoles.some(role => allowedRoles.includes(role));
}

function saveReactions() {
  // Save the updated reactions to the reactions.json file
  // You can implement the code to save the reactions object to the file here
}

client.login(token);
