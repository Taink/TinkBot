const { Command } = require('discord.js-commando');
const parseLink = require('../../src/parselink.js');
const { oneLineCommaLists } = require('common-tags');

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
		const embeds = new Array();

		args.links.forEach((link) => {
			embeds.push(parseLink(link));
		});

		this.client.guilds.map((guild) => {
			if (guild.available) {
				const chan = this.client.channels.get(
					this.client.provider.get(
						guild,
						'freeChannel',
						guild.systemChannelID
					)
				);
				const condition = embeds.length > 1;
				let mention = this.client.provider.get(
					guild,
					'mentionRole',
					''
				);
				if (mention != '') mention += ' : ';

				try {
					chan.send(
						oneLineCommaLists`
						${mention}Nouveau${condition ? 'x' : ''}
						jeu${condition ? 'x' : ''}
						gratuit${condition ? 's' : ''}
						disponible${condition ? 's' : ''}
						${condition ? 'aux' : 'à'}
						${condition ? 'adresses' : "l'adresse"}
						suivante${condition ? 's' : ''} :
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
					msg.channel.send(`\`${err}\` pour le serveur ${guild}`);
					console.log(err);
				}
			} else {
				console.log(`Guild "${guild}" is unavailable`);
			}
		});
		return msg.channel.send('Message envoyé à tous les serveurs !');
	}
};
