const { SlashCommandBuilder } = require('discord.js');

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

    },
};