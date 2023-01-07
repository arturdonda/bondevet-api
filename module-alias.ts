const moduleAlias = require('module-alias');

moduleAlias.addAliases({
	'@domain': __dirname + '/src/domain',
	'@application': __dirname + '/src/application',
	'@infra': __dirname + '/src/infra',
	'@presentation': __dirname + '/src/presentation',
	'@main': __dirname + '/src/main',
	'@root': __dirname,
});
