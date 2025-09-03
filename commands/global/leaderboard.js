const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Shows who has the most doubloons.'),
	async execute(interaction) {
		await interaction.reply({content: `# You are number one!!! \n-# just trust me you\'re winning right now :)` ,  files: ["./assets/teto-kasane-teto.gif"] });
	},
};