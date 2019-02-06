const commando = require("discord.js-commando");
const sqlite = require("sqlite");

function getRandomColor() {
	return Math.floor(Math.random() * 16777215);
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseLink(link) {
	let gameUrl = new URL(link);
	let reSteam = /^\/app\/([0-9]+)\/(\w+)\/$/i;
	let reEpic = /^\/store\/[A-Za-z0-9_-]{2,}\/product\/([A-Za-z0-9_-]+)\/home$/i;
	let path = gameUrl.pathname;
	let gamename, provider, thumbnail;

	if (gameUrl.href.startsWith("https://www.humblebundle.com/store/")) { // Humble Bundle
		gamename = path.substr(7);
		provider = "Humble Bundle";
		thumbnail = {"url": "https://i.imgur.com/hZVyC1Y.png"};
		//console.log('The name of your game is: ' + gamename);
	} else if (gameUrl.href.startsWith("https://www.gog.com/game/")) { // GOG game
		gamename = path.substr(6);
		provider = "GOG";
		thumbnail = {"url": "https://i.imgur.com/fMC8MRV.png"};
		//console.log('The name of your game is: ' + gamename);
	} else if (gameUrl.href.startsWith("https://www.gog.com/movie/")) { // GOG movie
		gamename = path.substr(7);
		provider = "GOG";
		thumbnail = {"url": "https://i.imgur.com/fMC8MRV.png"};
	} else if (gameUrl.href.startsWith("https://store.steampowered.com/app/")) { // Steam
		gamename = reSteam.exec(path)[2];
		let appid = reSteam.exec(path)[1];
		provider = "Steam";
		thumbnail = {"url": `https://steamcdn-a.akamaihd.net/steam/apps/${appid}/header.jpg`}
		// console.log('The name of your game is: ' + gamename);
		// console.log('And its App_ID is: ' + appid);
	} else if (gameUrl.href.startsWith("https://www.epicgames.com/store/")) { // Epic Games Store
		gamename = reEpic.exec(path)[1];
		provider = "Epic Games";
		thumbnail = {"url": "https://i.imgur.com/87cthQE.png"};
	} else console.error('ERROR: unrecognized URL type!')

	gamename = capitalize(gamename);
	if (provider == "Humble Bundle" || provider == "Epic Games") {
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
					name: "Pendant combien de temps le jeu est-il gratuit ?",
					value: `Le jeu est gratuit jusqu'à une date limite visible sur [la page du jeu](${gameUrl.href}).`,
					inline: false
				},
				{
					name: "Le jeu m'appartiendra-t-il pour toujours ?",
					value: `Oui, le jeu reste dans votre bibliothèque de jeux, même après la date limite. Il faut juste "l'acheter" une fois sur ${provider}.`,
					inline: false
				}
			]
		}
	}
}

module.exports = class DebugSendMessage extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'debugsendmessage',
			aliases: ['debugmessage', 'debugmes', 'dsendmessage', 'dsendm'],
			group: 'jeux-gratuits',
			memberName: 'debugsendmessage',
			description: 'Commande utilisée pour envoyer le message debug (Owner Only)',
			examples: ['debugsendmessage https://store.steampowered.com/app/268910/Cuphead/'],
			clientPermissions: ['MENTION_EVERYONE'],
			guarded: true,
			hidden: true,
			ownerOnly: true,

			args: [
				{
					key: 'link',
					label: 'linkstring',
					prompt: 'Quel est le lien à envoyer ?',
					type: 'string'
				},
				{
					key: 'id',
					label: 'channelid',
					prompt: 'Quel est l\'id du channel où envoyer le message ?',
					type: 'string'
				}
			]
		});
	} 
	
	async run(msg, args) {
		const link = args.link;
		const id = args.id;
		let rich = parseLink(link);
		let chan = this.client.channels.get(id);
		let mention = this.client.provider.get(chan.guild, "mentionRole", "");
		if (mention != "") mention += " : ";
		chan.send(`Nouveau jeu gratuit disponible à l'adresse suivante : ${link}`, rich)
			.catch(err => msg.channel.send(`\`${err}\` pour le serveur ${chan.guild}`));
	}
};