const { Command } = require('discord.js-commando');

module.exports = class Github extends (
	Command
) {
	constructor(client) {
		super(client, {
			name: 'github',
			aliases: ['git', 'source'],
			group: 'autres',
			memberName: 'github',
			description:
				'Utilisez cette commande pour obtenir un lien vers le github de ce bot',
			guarded: true,
		});
	}

	async run(msg) {
		msg.channel.send('Github du bot : https://github.com/Taink/TinkBot');
	}
};
