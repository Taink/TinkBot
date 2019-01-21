const commando = require("discord.js-commando");
const sqlite = require("sqlite");

function getRandomColor() {
	return Math.floor(Math.random() * 16777215);
}

module.exports = class SendAnnouncement extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'info',
			aliases: ['i'],
			group: 'jeux-gratuits',
			memberName: 'info',
			description: 'Permet d\'obtenir des informations sur la configuration du bot pour le serveur actuel',
			guarded: true,
			guildOnly: true
		});
	} 
	
	async run(msg, args) {
		return msg.channel.send("Voici la configuration actuelle du serveur :", {
			embed: {
				color: getRandomColor(),
				fields: [
					{
						name: "Salon",
						value: `<#${this.client.provider.get(msg.guild, "freeChannel", msg.guild.systemChannelID)}>`,
						inline:true
					},
					{
						name: "Role mentionné",
						value: this.client.provider.get(msg.guild, "mentionRole", "Aucun rôle n'est défini"),
						inline:true
					}
				]
			}
		})
	}
};