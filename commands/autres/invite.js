const commando = require("discord.js-commando");

module.exports = class SendAnnouncement extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'autres',
			memberName: 'invite',
			description: 'Utilisez cette commande pour obtenir un lien permettant d\'inviter ce bot à votre serveur discord',
			guarded: true
		});
	} 
	
	async run(msg) {
		this.client.generateInvite(268651536).then(invite => msg.channel.send(invite));
	}
};