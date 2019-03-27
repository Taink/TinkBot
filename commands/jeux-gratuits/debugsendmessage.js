const commando = require("discord.js-commando");
const sqlite = require("sqlite");
const { RichEmbed } = require("discord.js");
const parseLink = require("../../src/parselink.js");

module.exports = class DebugSendMessage extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'debugsendmessage',
			aliases: ['debugmessage', 'debugmes', 'dsendmessage', 'dsendm', 'debugsendm'],
			group: 'jeux-gratuits',
			memberName: 'debugsendmessage',
			description: 'Commande utilisée pour envoyer le message debug (Owner Only)',
			examples: ['debugsendmessage https://store.steampowered.com/app/268910/Cuphead/ 511623096633917458'],
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
					label: 'guildid',
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
		let guild = this.client.guilds.get(id);
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
		return msg.channel.send("Message envoyé au serveur");
	}
};