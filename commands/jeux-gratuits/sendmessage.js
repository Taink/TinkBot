const { Command } = require('discord.js-commando');
const parseLink = require('../../src/parselink.js');
const { oneLineCommaLists } = require('common-tags');
const { Guild } = require('discord.js');

module.exports = class SendMessage extends (
	Command
) {
	constructor(client) {
		super(client, {
			name: 'sendmessage',
			aliases: ['sendm', 'sendmsg'],
			group: 'jeux-gratuits',
			memberName: 'sendmessage',
			description:
				'Commande utilisée pour envoyer le message (Owner Only)',
			examples: [
				'sendmessage https://store.steampowered.com/app/268910/Cuphead/',
			],
			guarded: true,
			hidden: true,
			ownerOnly: true,

			args: [
				{
					key: 'links',
					label: 'linkstring',
					prompt: 'Quel est le lien à envoyer ?',
					type: 'string',
					infinite: true,
					default: '',
				},
			],
		});
	}

	async run(msg, args) {
		const embeds = [];

		args.links.forEach((link) => {
			embeds.push(parseLink(link));
		});

		this.client.guilds.cache.forEach((guild) => {
			if (guild.available) {
				const chan = guild.channels.cache.get(
					this.client.provider.get(
						guild,
						'freeChannel',
						guild.systemChannelID
					)
				);
				const several = embeds.length > 1;
				let mention = this.client.provider.get(
					guild,
					'mentionRole',
					''
				);
				if (mention != '') mention += ' : ';

				try {
					chan.send(
						oneLineCommaLists`
						${mention}Nouveau${several ? 'x' : ''}
						jeu${several ? 'x' : ''}
						gratuit${several ? 's' : ''}
						disponible${several ? 's' : ''}
						${several ? 'aux' : 'à'}
						${several ? 'adresses' : "l'adresse"}
						suivante${several ? 's' : ''} :
						${args.links}`,
						embeds[0]
					)
						.then((message) => {
							for (let i = 1; i < embeds.length; i++) {
								message.channel.send(embeds[i]);
							}
						})
						.catch(console.error);
					console.log(`Message successfully sent to "${guild}"`);
				} catch (err) {
					console.log(`${err} pour le serveur ${guild}`);
					if (!chan) return;
					msg.channel.send(`\`${err}\` pour le serveur ${guild}`);
				}
			} else {
				console.log(`Guild "${guild}" is unavailable`);
			}
		});
		return msg.channel.send('Message envoyé à tous les serveurs !');
	}
};
