const commando = require('discord.js-commando');
const parseLink = require('../../src/parselink.js');
const { oneLineCommaLists } = require('common-tags');

module.exports = class DebugSendMessage extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'debugsendmessage',
			aliases: ['debugmessage', 'debugmes', 'dsendmessage', 'dsendm', 'debugsendm'],
			group: 'jeux-gratuits',
			memberName: 'debugsendmessage',
			description: 'Commande utilisée pour envoyer le message debug (Owner Only)',
			examples: [ 'debugsendmessage 458798306860990474 https://store.steampowered.com/app/268910/Cuphead/',
				'dsendm 458798306860990474 https://www.epicgames.com/store/fr/product/fez/home https://www.epicgames.com/store/fr/product/overcooked/home' ],
			guarded: true,
			hidden: true,
			ownerOnly: true,

			args: [
				{
					key: 'id',
					label: 'guildid',
					prompt: 'Quel est l\'id du serveur où envoyer le message ?',
					type: 'string',
				},
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
		const guild = this.client.guilds.get(args.id);
		const embeds = new Array();

		args.links.forEach(link => {
			embeds.push(parseLink(link));
		});

		if (guild.available) {
			const chan = this.client.channels.get(this.client.provider.get(guild, 'freeChannel', guild.systemChannelID));
			const condition = embeds.length > 1;
			let mention = this.client.provider.get(guild, 'mentionRole', '');
			if (mention != '') mention += ' : ';

			try {
				chan.send(oneLineCommaLists`
						${mention}Nouveau${condition ? 'x' : ''}
						jeu${condition ? 'x' : ''}
						gratuit${condition ? 's' : ''}
						disponible${condition ? 's' : ''}
						${condition ? 'aux' : 'à'}
						${condition ? 'adresses' : 'l\'adresse'}
						suivante${condition ? 's' : ''} :
						${args.links}`, embeds[0])
					.then(message => {
						for (let i = 1; i < embeds.length; i++) {
							message.channel.send(embeds[i]);
						}
					})
					.catch(console.error);
				console.log(`Message successfully sent to "${guild}"`);
			} catch(err) {
				msg.channel.send(`\`${err}\` pour le serveur ${guild}`);
				console.log(err);
			}
		} else {
			console.log(`Guild "${guild}" is unavailable`);
		}
		return msg.channel.send('Message envoyé au serveur');
	}
};