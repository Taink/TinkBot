const { TextChannel } = require('discord.js');
const { Command, CommandMessage } = require('discord.js-commando');

module.exports = class SetChannel extends (
	Command
) {
	constructor(client) {
		super(client, {
			name: 'setchannel',
			aliases: ['setc', 'setchan', 'channel', 'chan'],
			group: 'jeux-gratuits',
			memberName: 'setchannel',
			description:
				'Définit le salon qui recevra les messages relatifs aux jeux gratuits.',
			examples: ['setchannel #jeux-gratuits'],
			userPermissions: ['MANAGE_CHANNELS', 'MENTION_EVERYONE'],
			guarded: true,
			guildOnly: true,

			args: [
				{
					key: 'channel',
					label: 'textchannel',
					prompt:
						'Dans quel salon voulez-vous envoyer les messages relatifs aux jeux gratuits ?',
					error:
						"L'argument spécifié n'est pas un salon valide ! Veuillez en spécifier un.",
					type: 'text-channel|news-channel',
				},
			],
		});
	}

	/**
	 * @param {CommandMessage} msg
	 */
	async run(msg, args) {
		/**
		 * @type {TextChannel}
		 */
		const chan = args.channel;
		if (chan.guild.available) {
			this.client.provider.set(chan.guild, 'freeChannel', chan.id);
			return msg.channel.send(
				`Les messages à propos des jeux gratuits seront maintenant envoyés dans le salon ${chan}.`
			);
		} else {
			msg.channel.send('Une erreur est survenue! Go contacter Taink#9231 pour lui expliquer le problème');
		}
	}
};
