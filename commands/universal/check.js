const { SlashCommandBuilder } = require('discord.js');
const { altUserID, myUserID } = require('../../config.json');
const fs = require("fs");

function viewdoubloons(userID) {
    let coins = JSON.parse(fs.readFileSync('./coins.json', 'utf8'));
    if (!coins[userID]) {
        return(0);
    }
    return coins[userID].doubloons;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('check someone else\'s doubloons')
        .addUserOption(option =>
            option.setName('username')
                .setDescription('enter the username of the person to give doubloons to')),

    async execute(interaction) {
        await interaction.deferReply();
        const username = interaction.options.getUser('username') ?? interaction.user;
        const amount = viewdoubloons(username.id).toLocaleString('en-US');
        let reply = `You currently have ${amount} doubloons.`
        if (interaction.user.id.toString() != username.id) {
            reply = (`${username.globalName} currently has ${amount} doubloons.`);

        }
        await interaction.editReply(reply);
        console.log(interaction.user);

    },
};