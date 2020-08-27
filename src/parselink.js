function getRandomColor() {
	return Math.floor(Math.random() * 16777215);
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function parseLink(link) {
	const gameUrl = new URL(link);
	const reSteam = /^\/app\/([0-9]+)\/(\w+)\/$/i;
	const reEpic = /^\/store\/[A-Za-z0-9_-]{2,}\/(?:product|bundles)\/([A-Za-z0-9_-]+)(?:\/[A-Za-z0-9_-]+)?$/i;
	const reDiscord = /^\/store\/skus\/([0-9]+)\/([A-Za-z0-9_-]+)$/i;
	const path = gameUrl.pathname;
	let gamename, provider, thumbnail;

	if (gameUrl.href.startsWith('https://www.humblebundle.com/store/')) { // Humble Bundle
		gamename = path.substr(7);
		provider = 'Humble Bundle';
		thumbnail = { 'url': 'https://i.imgur.com/hZVyC1Y.png' };
		//console.log('The name of your game is: ' + gamename);
		// TODO: support custom thumbnail for Humble Bundle using HTTPS requests (most probably)
	} else if (gameUrl.href.startsWith('https://www.gog.com/game/')) { // GOG game
		gamename = path.substr(6);
		provider = 'GOG';
		thumbnail = { 'url': 'https://i.imgur.com/fMC8MRV.png' };
		//console.log('The name of your game is: ' + gamename);
		// TODO: support custom thumbnail for GOG (games) using HTTPS requests (most probably)
	} else if (gameUrl.href.startsWith('https://www.gog.com/movie/')) { // GOG movie
		gamename = path.substr(7);
		provider = 'GOG';
		thumbnail = { 'url': 'https://i.imgur.com/fMC8MRV.png' };
		// TODO: support custom thumbnail for GOG (movies) using HTTPS requests (most probably)
	} else if (gameUrl.href.startsWith('https://store.steampowered.com/app/')) { // Steam
		gamename = reSteam.exec(path)[2];
		const appid = reSteam.exec(path)[1];
		provider = 'Steam';
		thumbnail = { 'url': `https://steamcdn-a.akamaihd.net/steam/apps/${appid}/header.jpg` };
		// console.log('The name of your game is: ' + gamename);
		// console.log('And its App_ID is: ' + appid);
	} else if (gameUrl.href.startsWith('https://www.epicgames.com/store/')) { // Epic Games Store
		gamename = reEpic.exec(path)[1];
		provider = 'Epic Games';
		thumbnail = { 'url': 'https://i.imgur.com/87cthQE.png' };
		// TODO: support custom thumbnail for the Epic Games Store using HTTPS requests (most probably)
	} else if (gameUrl.href.startsWith('https://discordapp.com/store/skus/')) {
		gamename = reDiscord.exec(path)[2];
		// let appid = reDiscord.exec(path)[1];
		provider = 'Discord';
		thumbnail = { 'url': 'https://i.imgur.com/RxdEbbQ.png' }; // from https://discordapp.com/branding
		// TODO: support custom thumbnail for Discord using HTTPS requests (most probably)
	} else {
		console.error('ERROR: unrecognized URL type!');
	}

	gamename = capitalize(gamename);
	if (provider == 'Humble Bundle' || provider == 'Epic Games' || provider == 'Discord') {
		gamename = gamename.replace(/-/gi, ' ');
	} else {
		gamename = gamename.replace(/_/gi, ' ');
	}

	return {
		embed: {
			title: `${gamename} gratuit sur ${provider} !`,
			description: `${gamename} est gratuit sur ${provider} pendant une durée limitée [ici](${gameUrl.href})`,
			url:gameUrl.href,
			color: getRandomColor(),
			thumbnail: thumbnail,
			fields: [
				{
					name: 'Pendant combien de temps le jeu est-il gratuit ?',
					value: `Le jeu est gratuit jusqu'à une date limite visible sur [la page du jeu](${gameUrl.href}).`,
					inline: false,
				},
				{
					name: 'Le jeu m\'appartiendra-t-il pour toujours ?',
					value: `Oui, le jeu reste dans votre bibliothèque de jeux, même après la date limite. Il faut juste "l'acheter" une fois sur ${provider}.`,
					inline: false,
				},
				{
					name: 'Moi aussi je veux être notifié sur mon serveur!',
					value: 'Aucun problème, c\'est à ça que sert la commande t!invite. Pour voir le code du bot, faites t!github.',
					inline: false,
				},
			],
		},
	};
};