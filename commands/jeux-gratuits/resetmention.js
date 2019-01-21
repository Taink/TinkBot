const commando = require("discord.js-commando");
const sqlite = require("sqlite");

module.exports = class SetRole extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'resetmention',
			aliases: ['rm'],
			group: 'jeux-gratuits',
			memberName: 'resetmention',
			description: 'Supprime la mention devant les messages du bot.',
			userPermissions: ['MANAGE_ROLES'],
			guarded: true,
			guildOnly: true
		});
	} 
	
	async run(msg) {
		this.client.provider.set(msg.guild, "mentionRole", '');
	}
};