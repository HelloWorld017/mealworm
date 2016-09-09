var calcium = require('calcium');
var router = require('express').Router();
var locations = require('../src/locations');

var _ = require('../src/errors');
var $ = require('../src/verify');

router.get('/find', (req, res, next) => {

});

router.post('/find', (req, res, next) => {
	if(!$(req, {
		body: [
			{
				name: 'school',
				type: 'string',
				regex: /^[a-zA-Z0-9가-힣ㄱ-ㅎ]{1,100}$/
			},
			{
				name: 'location',
				type: 'string',
				test: (v) => {
					return locations.indexOf(v) !== -1;
				}
			}
		]
	})){
		next(_('invalid_data', req));
	}

	var school = req.body.school;
	var location = req.body.location;

	calcium.find(location, school, (err, result) => {
		if(err){
			next(_('no_school', req));
		}
		res.render('find-result', {res: result});
	});
});
module.exports = router;
