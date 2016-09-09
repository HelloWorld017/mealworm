var _ = require('./errors');

module.exports = (req, res, next) => {
	var accept = request.acceptLanguages();
	var lang = global.configs.langs[0];
	try{
		lang = acceptLanguage.get(accept);
	}catch(err){
		console.error(err);
		next(_('internal_server'));
		return;
	}
	req.language = res.locals.language = lang;
	res.locals.translator = global.translator.generate(req);
};
