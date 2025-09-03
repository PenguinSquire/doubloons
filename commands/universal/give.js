const { SlashCommandBuilder } = require('discord.js');
const { altUserID, myUserID } = require('../../config.json');
const fs = require("fs");

function editdoubloons(userID, amount) {
    let coins = JSON.parse(fs.readFileSync('./coins.json', 'utf8'));
    if (!coins[userID]) {
        coins[userID] = {
            doubloons: 0,
        };
    }
    coins[userID].doubloons += amount;
    
    fs.writeFile('./coins.json', JSON.stringify(coins), (err) => {
        if (err) console.error(err)
    });
    return coins[userID].doubloons;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('give')
        .setDescription('gives doubloons')
        .addUserOption(option =>
            option.setName('username')
                .setDescription('enter the username of the person to give doubloons to')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('enter the amount of doubloons to give')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const username = interaction.options.getUser('username');
        const amount = interaction.options.getInteger('amount');
        let reply=`You have added ${amount.toLocaleString('en-US')} doubloons to ${username}! They now have `
        if (amount < 0) {
            reply=`You have removed ${Math.abs(amount).toLocaleString('en-US')} doubloons from ${username}! They now have `
        }

        if (interaction.user.id.toString() != myUserID && interaction.user.id.toString() != altUserID) {
            
            await interaction.editReply(reply + editdoubloons(username.id, -1).toLocaleString('en-US'));
            return;
        }

        await interaction.editReply(reply + editdoubloons(username.id, amount).toLocaleString('en-US'));
    },
};