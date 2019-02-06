const commando = require("discord.js-commando");
const sqlite = require("sqlite");

module.exports = class SendAnnouncement extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'sendannouncement',
			aliases: ['senda', 'sendann'],
			group: 'jeux-gratuits',
			memberName: 'sendannouncement',
			description: 'Commande utilisée pour envoyer le message (Owner Only)',
			examples: ['sendannouncement Hello World!'],
			guarded: true,
			hidden: true,
			ownerOnly: true,

			args: [
				{
					key: 'message',
					label: 'text',
					prompt: 'Quel message envoyer ?',
					infinite: true,
					type: 'string'
				}
			]
		});
	} 
	
	async run(msg, args) {
		const mes = args.message;
		this.client.guilds.map((__snflk, guild) => {
			let chan = this.client.channels.get(this.client.provider.get(guild, "freeChannel", guild.systemChannelID));
			chan.send(mes);
		});
		return msg.channel.send("Message envoyé à tous les serveurs !")
	}
};