const cfg = require('./cfg/bot.json');
const commando = require("discord.js-commando");
const path = require("path");
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
const bot = new commando.Client({
	owner: "277518283576705034",
	prefix: "t!",
	unknownCommandResponse: false
});

bot
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('ready', () => {
		console.log(`Bot launched as ${bot.user.tag} (${bot.user.id})`);
		bot.user.setPresence({ game: { name: `présent sur ${bot.guilds.size} serveurs, such wow` }, status: 'online' });
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
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
});

bot.setProvider(
    sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new commando.SQLiteProvider(db))
).catch(console.error);

bot.setInterval(size => {
	bot.user.setPresence({ game: { name: `présent sur ${bot.guilds.size} serveurs, such wow` }, status: 'online' });
}, 60000, ); // 60000 ms -> 1min

bot.registry
	.registerGroups([
		['jeux-gratuits', 'Jeux gratuits'],
		['autres', 'Autres']
		])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(cfg.token);