const commando = require("discord.js-commando");
const sqlite = require("sqlite");
const { RichEmbed } = require("discord.js");
const parseLink = require("../../src/parselink.js");

module.exports = class SendMessage extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'sendmessage',
			aliases: ['sendm', 'sendmsg'],
			group: 'jeux-gratuits',
			memberName: 'sendmessage',
			description: 'Commande utilisée pour envoyer le message (Owner Only)',
			examples: ['sendmessage https://store.steampowered.com/app/268910/Cuphead/'],
			guarded: true,
			hidden: true,
			ownerOnly: true,

			args: [
				{
					key: 'link',
					label: 'linkstring',
					prompt: 'Quel est le lien à envoyer ?',
					type: 'string'
				}
			]
		});
	} 
	
	async run(msg, args) {
		const link = args.link;
		let rich = parseLink(link);
		this.client.guilds.map((guild) => {
			if (guild.available) {
				let chan = this.client.channels.get(this.client.provider.get(guild, "freeChannel", guild.systemChannelID));
				let mention = this.client.provider.get(guild, "mentionRole", "");
				if (mention != "") mention += " : ";
				try {
					chan.send(`${mention}Nouveau jeu gratuit disponible à l'adresse suivante : ${link}`, rich);
					console.log(`Message successfully sent to "${guild}"`);
				} catch(err) {
					msg.channel.send(`\`${err}\` pour le serveur ${guild}`);
					console.log(err);
				}
			} else {
				console.log(`Guild "${guild}" is unavailable`);
			}
		});
		return msg.channel.send("Message envoyé à tous les serveurs !")
	}
};