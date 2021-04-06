const { Command } = require('discord.js-commando');

module.exports = class SendAnnouncement extends (
	Command
) {
	constructor(client) {
		super(client, {
			name: 'sendannouncement',
			aliases: ['senda', 'sendann'],
			group: 'jeux-gratuits',
			memberName: 'sendannouncement',
			description:
				'Commande utilisée pour envoyer le message (Owner Only)',
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
					type: 'string',
				},
			],
		});
	}

	async run(msg, args) {
		const mes = args.message;
		this.client.guilds.cache.forEach((guild) => {
			if (guild.available) {
				const chan = guild.channels.cache.get(
					this.client.provider.get(
						guild,
						'freeChannel',
						guild.systemChannelID
					)
				);
				try {
					chan.send(mes);
					console.log(`Message successfully sent to "${guild}"`);
				} catch (e) {
					msg.channel.send(`\`${e}\` pour le serveur ${guild}`);
					console.log(e);
				}
			} else {
				console.log(`Guild "${guild}" is unavailable`);
			}
		});
		return msg.channel.send('Message envoyé à tous les serveurs !');
	}
};
