const { Role } = require('discord.js');
const { Command, CommandMessage } = require('discord.js-commando');

module.exports = class SetRole extends (
	Command
) {
	constructor(client) {
		super(client, {
			name: 'setrole',
			aliases: ['setr', 'role'],
			group: 'jeux-gratuits',
			memberName: 'setrole',
			description:
				'Définit le rôle qui sera mentionné par le bot quand un nouveau jeu est disponible.',
			examples: ['setrole @roleMentionnable'],
			userPermissions: ['MANAGE_ROLES', 'MENTION_EVERYONE'],
			guarded: true,
			guildOnly: true,

			args: [
				{
					key: 'role',
					label: 'mentionablerole',
					prompt: 'Quel rôle voulez-vous mentionner ?',
					error:
						"L'argument spécifié n'est pas un rôle valide ! Veuillez en spécifier un.",
					type: 'role',
				},
			],
		});
	}

	/**
	 * @param {CommandMessage} msg
	 */
	async run(msg, args) {
		/**
		 * @type {Role}
		 */
		const role = args.role;
		if (role.mentionable || (role.guild.available && role.guild.me.permissions.has('MENTION_EVERYONE'))) {
			this.client.provider.set(msg.guild, 'mentionRole', `${role}`);
			return msg.channel.send(
				`Le rôle \`${role.name}\` sera maintenant mentionné quand un jeu gratuit est disponible.`
			);
		} else {
			return msg.channel.send("❌ Ce rôle n'est pas mentionnable !");
		}
	}
};
