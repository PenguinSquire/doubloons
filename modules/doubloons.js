const fs = require("fs");

module.exports = {

	editDoubloons: function (userID, amount) {
		let coins = JSON.parse(fs.readFileSync('./coins.json', 'utf8'));
		if (!coins[userID]) {
			coins[userID] = { doubloons: 0, };
		}
		coins[userID].doubloons += amount;

		fs.writeFile('./coins.json', JSON.stringify(coins), (err) => {
			if (err) console.error(err)
		});
		return coins[userID].doubloons;
	},

	viewDoubloons: function (userID) {
		let coins = JSON.parse(fs.readFileSync('./coins.json', 'utf8'));
		if (!coins[userID]) {
			return (0);
		}
		return coins[userID].doubloons;
	},
	sortDoubloons: function () {
		let coins = JSON.parse(fs.readFileSync('./coins.json', 'utf8'));

		let sortedObject = Object.entries(coins) //SORT IT (idk how this works)
			.sort((a, b) => b[1].doubloons - a[1].doubloons);

		let sortedObj = Object.fromEntries(sortedObject); //shove it back in the array

		fs.writeFile('./coins.json', JSON.stringify(sortedObj), (err) => {
			if (err) console.error(err)
		});
	}
} 