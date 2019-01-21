# TinkBot
Un bot Discord servant à notifier le serveur sur lequel il est lorsqu'un nouveau jeu est disponible.  
Vous pouvez l'inviter à votre serveur via ce [lien](https://discordapp.com/oauth2/authorize?client_id=524395758959591425&permissions=268651536&scope=bot).

Un message typique de ce bot aura cette forme (les messages ne sont pour l'instant pas automatiques, ils sont réalisés manuellement) :

![typicalMessage](https://i.imgur.com/cq6ydWg.png)

# Commandes
Commande | Effet
---------|-------
[setchannel](https://github.com/Taink/TinkBot/blob/master/commands/jeux-gratuits/setchannel.js)|Définit le salon dans lequel les messages seront envoyés (par défaut, les messages s'envoient dans le salon dans lesquels s'affichent les messages de bienvenue)
[setrole](https://github.com/Taink/TinkBot/blob/master/commands/jeux-gratuits/setrole.js)|Définit le rôle mentionné au début du message du bot (everyone et here ne semblent pas fonctionner)
[resetmention](https://github.com/Taink/TinkBot/blob/master/commands/jeux-gratuits/resetmention.js)|Supprime la mention devant le message du bot (réglé ainsi par défaut)
[info](https://github.com/Taink/TinkBot/blob/master/commands/jeux-gratuits/info.js)|Envoie des informations sur la configuration actuelle du serveur
prefix|Permet de modifier le préfixe des commandes, par défaut il faut soit mentionner le bot soit écrire `t!` avant la commande
help|Envoie à l'auteur de la commande un message d'aide contenant l'ensemble des commandes utilisables
[invite](https://github.com/Taink/TinkBot/blob/master/commands/autres/invite.js)|Génère un lien permettant d'inviter le bot sur son serveur (ou un serveur sur lequel on a la permission "Gérer le serveur")

# Notes
* Le préfixe par défaut est `t!`
* Les messages sont envoyés par défaut :
  * Sans mention
  * Dans le salon dans lequel sont envoyés les messages de bienvenue
* Ce bot utilise `Discord.js` (et son module `-commando`) ainsi que la lib `sqlite`, tous disponibles sur npm, donc merci à leurs développeurs respectifs.
* Les rôles @everyone et @here ne semblent pas fonctionner, je vais tenter de comprendre pourquoi mais d'ici là il faudra faire sans.
* Le code source est disponible ici, sur Github, avant tout dans un souci de transparence donc je ne fournirai aucun support à qui que ce soit qui reprend simplement le code.
* Certaines autorisations ne sont techniquement pas nécessaires, mais par sécurité je recommanderai de laisser les autorisations du bot telles quelles.
* Beaucoup d'éléments ne sont pas traduits, c'est dommage mais j'ai pas trouvé le temps de tout traduire. Si quelqu'un veut le faire, qu'il fork ce repo et fasse une pull request, je serai ravi de voir ce que ça donne.
* Je n'ai pas beaucoup commenté le code, je le ferai peut-être plus tard mais bon c'est comme ça.
* Il se peut que j'envoie parfois (c'est vraiment très rare) des messages qui n'ont pas trait directement aux jeux gratuits mais plutôt à des news en rapport, ces messages ne mentionneront jamais et ont simplement pour but de tenir les gens au courant de certains évènements.
* J'utilise une série de commandes réservées à mon usage personnel afin d'envoyer les messages ([sendannouncement](https://github.com/Taink/TinkBot/blob/master/commands/jeux-gratuits/sendannouncement.js) et [sendmessage](https://github.com/Taink/TinkBot/blob/master/commands/jeux-gratuits/sendmessage.js)), car ils ne sont pas automatiques. Si cela vous pose un problème, n'utilisez pas le bot.
* Si vous rencontrez des problèmes, contactez-moi ici ou sur Discord (Taink#9231)