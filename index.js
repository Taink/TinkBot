const cfg = require('./cfg/bot.json');
const Commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
const client = new Commando.Client({
	owner: '277518283576705034',
	prefix: 't!',
	unknownCommandResponse: false,
});

client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', info => {
		if (info.startsWith('[ws]')) return;
		console.log(info);
	})
	.on('ready', () => {
		console.log(`Bot launched as ${client.user.tag} (${client.user.id})`);
		console.log(`Current server count: ${client.guilds.cache.size}`);
		client.user.setPresence({ game: { name: `présent sur ${client.guilds.cache.size} serveurs, such wow` }, status: 'online' });
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof Commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('guildCreate', (guild) => {
		console.log(oneLine`
			Joining new server
			(${guild.name}),
			refreshing server count...
			(${client.guilds.cache.size})
		`);
		client.user.setPresence({
			status: 'online',
			afk: false,
			game: {
				name: `${client.guilds.cache.size} serveurs, such wow`,
				type: 'WATCHING',
			},
		}).then(console.log).catch(console.error);
	});

client.setProvider(
	sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new Commando.SQLiteProvider(db)),
).catch(console.error);

client.registry
	.registerGroups([
		['jeux-gratuits', 'Jeux gratuits'],
		['autres', 'Autres'],
		['util', 'Utils'],
	])
	.registerDefaultTypes()
	.registerType(require('./types/news-channel'))
	.registerDefaultCommands({
		help: true,
		prefix: true,
		eval: false,
		ping: true,
		unknownCommand: false,
		commandState: false,
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(cfg.token);