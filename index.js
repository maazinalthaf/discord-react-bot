const fs = require('fs').promises;
const { Client, Intents } = require('discord.js');

const TOKEN = 'INSERT BOT TOKEN'; // Replace with your bot token
const PREFIX = '?'; // Prefix for commands
const REACTIONS_FILE = 'reactions.json'; // File to store reactions

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let reactions = {};

// Load reactions from the file on bot startup
fs.readFile(REACTIONS_FILE, 'utf8')
  .then((data) => {
    reactions = JSON.parse(data);
  })
  .catch((err) => {
    console.error('Error loading reactions:', err);
  });

// Function to save reactions to the file
const saveReactions = () => {
  fs.writeFile(REACTIONS_FILE, JSON.stringify(reactions))
    .catch((err) => {
      console.error('Error saving reactions:', err);
    });
};

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  const words = message.content.split(' ');

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
    // Check if the user has the specified role(s)
    const allowedRoles = ['Role1', 'Role2']; // Replace with your allowed role names or IDs
    const memberRoles = message.member.roles.cache;

    const hasAllowedRole = allowedRoles.some((role) =>
      memberRoles.some((memberRole) =>
        memberRole.name === role || memberRole.id === role
      )
    );

    if (!hasAllowedRole) {
      return message.reply('You do not have permission to use this command.');
    }

    // Process the addreaction command
    const [word, reaction] = args;

    if (!word || !reaction) {
      return message.reply('Please provide both the word and the reaction.');
    }

    reactions[word.toLowerCase()] = reaction;
    saveReactions();

    return message.reply(`Reaction "${reaction}" added for the word "${word}".`);
  }
});

client.login(TOKEN);

