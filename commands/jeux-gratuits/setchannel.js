const commando = require("discord.js-commando");
const sqlite = require("sqlite");

module.exports = class SetChannel extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'setchannel',
			aliases: ['setc', 'setchan'],
			group: 'jeux-gratuits',
			memberName: 'setchannel',
			description: 'Définit le salon qui recevra les messages relatifs aux jeux gratuits.',
			examples: ['setchannel #jeux-gratuits'],
			userPermissions: ['MANAGE_CHANNELS', 'MENTION_EVERYONE'],
			guarded: true,
			guildOnly: true,

			args: [
				{
					key: 'channel',
					label: 'textchannel',
					prompt: 'Dans quel salon voulez-vous envoyer les messages relatifs aux jeux gratuits ?',
					error: "L'argument spécifié n'est pas un salon valide ! Veuillez en spécifier un.",
					type: 'channel'
				}
			]
		});
	} 
	
	async run(msg, args) {
		const chan = args.channel;
		if (chan.guild.available && (chan.type == "text")) {
			this.client.provider.set(msg.guild, "freeChannel", chan.id);
			return msg.channel.send(`Les messages à propos des jeux gratuits seront maintenant envoyés dans le salon ${chan}.`);
		}
	}
};