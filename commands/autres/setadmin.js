const commando = require("discord.js-commando");

module.exports = class SetAdmin extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'setadmin',
			aliases: ['sa'],
			group: 'autres',
			memberName: 'setadmin',
			description: 'Permet de mettre quelqu\'un admin sur le serveur',
			examples: ['setadmin @User#1234'],
			guildOnly: true,
			hidden: true,

			args: [
				{
					key: 'user',
					prompt: 'Qui devrait devenir admin ?',
					type: 'user'
				}
			]
		});
	} 
	
	async run(msg, args) {
			return msg.channel.send(`${msg.author}, tu es ? T'as cru que tu pouvais modifier les perms de n'importe qui comme ça ?`);
	}
};