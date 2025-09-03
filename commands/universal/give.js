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

function viewdoubloons(userID) {
    let coins = JSON.parse(fs.readFileSync('./coins.json', 'utf8'));
    if (!coins[userID]) {
        return (0);
    }
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
        let reply = `You have added ${amount.toLocaleString('en-US')} doubloons to ${username}!`
        if (amount < 0) {
            reply = `You have removed ${Math.abs(amount).toLocaleString('en-US')} doubloons from ${username}!`
        }

        if (interaction.user.id.toString() != myUserID) {
            editdoubloons(interaction.user.id, -1);
            await interaction.editReply(reply);
            return;
        }
        editdoubloons(username.id, amount);
        await interaction.editReply(reply);
    },
};