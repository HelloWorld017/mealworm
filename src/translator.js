var chalk = require('chalk');
const COLOR_MAPPING = {
	'0': chalk.black,
	'1': chalk.red,
	'2': chalk.green,
	'3': chalk.yellow,
	'4': chalk.blue,
	'5': chalk.magenta,
	'6': chalk.cyan,
	'7': chalk.white,
	'8': chalk.gray,
	'a': chalk.dim,
	'b': chalk.bold,
	'c': chalk.inverse,
	'd': chalk.italic,
	'e': chalk.strikethrough,
	'A': chalk.bgBlack,
	'B': chalk.bgRed,
	'C': chalk.bgGreen,
	'D': chalk.bgYellow,
	'E': chalk.bgBlue,
	'F': chalk.bgMagenta,
	'G': chalk.bgCyan,
	'H': chalk.bgWhite
};

var translate = (lang, key, options) => {
	var translation = require(`../translation-${lang}.json`);
	options = options || {};

	Object.keys(options).forEach((k) => {
		translation = translation.split(`%${k}%`).join(options[k]);
	});

	translation = translation.replace(/\}(\})?([^{}]+?)\{(?!\{)/g, (match, p1, p2) => {
		if(p1 === '{') return match; //Escape
		return translate(p2, options);
	});

	translation = translation.replace(/\}\}/g, '}').replace(/\{\{/g, '{');

	translation = translation.replace(/\$(\$)?([0-9a-eA-H])([^]+?)\$(?!\$)/g, (match, p1, p2, p3) => {
		if(p1 === '$') return match;

		return (COLOR_MAPPING[p2])(p3);
	});

	translation = translation.replace(/\$\$/g, '$'); //$$ means just $

	return translation;
};

var translator = (request, key, ...args) => {
	var lang = request.language;
	return translate(lang, key, ...args);
};

translator.deflang = (key, ...args) => {
	var lang = global.config.langs[0];
	return translate(lang, key, ...args);
};

translator.generate = (request) => {
	return (...args) => {
		translator(request, ...args);
	};
};

module.exports = translator;
