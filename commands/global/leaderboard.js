const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { viewDoubloons, doubloonEmoji } = require('../../modules/doubloons');

function pad(num, pad = 2) {
	return String(num).padStart(pad, "  ")
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Shows who has the most doubloons.'),
	async execute(interaction) {
		//await interaction.reply({content: `# You are number one!!! \n-# just trust me you\'re winning right now :)` ,  files: ["./assets/teto-kasane-teto.gif"] });



		const coins = Object.entries(viewDoubloons())

        // Format top 10
        let top10 = coins.slice(0, 10);

        let leaderboard = await Promise.all(
            top10.map(async ([userId, amount], index) => {
                try {
                    const user = await interaction.client.users.fetch(userId);
                    return `**[${pad(index + 1)}.]** ${user.globalName}: ${doubloonEmoji} ${amount.doubloons.toLocaleString('en-US')}`;
                } catch {
                    return `**${pad(index + 1)}.** Unknown User (${userId}): ${doubloonEmoji} ${amount.doubloons.toLocaleString('en-US')}`;
                }
            })
        );

        const leaderboardEmbed = new EmbedBuilder()
            .setTitle("Doubloon Leaderboard")
            .setDescription(leaderboard.join("\n"))

        await interaction.reply({ embeds: [leaderboardEmbed] });
	},
};