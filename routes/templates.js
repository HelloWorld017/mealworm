var _ = require('../src/errors');
var router = require('express').Router();

router.on('/:template', (req, res, next) => {
	var templateName = req.params.template;
	if(!templateName){
		next(_('invalid_data'));
		return;
	}

	if(!global.templates[templateName]){
		newxt(_('invalid_data'));
		return;
	}

	res.render('./templates/' + global.templates[templateName]);
});
