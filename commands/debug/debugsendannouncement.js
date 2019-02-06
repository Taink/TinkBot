const commando = require("discord.js-commando");
const sqlite = require("sqlite");

module.exports = class DebugSendAnnouncement extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'debugsendannouncement',
			aliases: ['debugannouncement', 'dsendannouncement', 'dsa', 'debugsenda', 'dsenda'],
			group: 'debug',
			memberName: 'debugsendannouncement',
			description: 'Commande utilisée pour envoyer une anonce debug (Owner Only)',
			examples: ['debugsendannouncement [message]'],
			clientPermissions: ['MENTION_EVERYONE'],
			guarded: true,
			hidden: true,
			ownerOnly: true,

			args: [
				{
					key: 'channel',
					label: 'channelID',
					prompt: 'Quel est l\'id du channel?',
					type: 'string'
				},
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
		const id = args.channel;
		const mes = args.message;
		let chan = this.client.channels.get(id);
		chan.send(mes);
	}
};