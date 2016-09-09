module.exports = (req, seq) => {
	return Object.keys(seq).every((key) => {
		return seq[key].every((v) => {
			if(typeof v === 'string'){
				return req[key][v] !== undefined;
			}

			var variable = req[key][v.name];

			if(variable === undefined) return false;
			if(v.type){
				if(typeof variable !== v.type) return false;
			}

			if(v.regex){
				if(typeof variable !== 'string') return false;
				if(!v.regex.test(variable)) return false;
			}

			if(v.test){
				if(!v.test(variable)) return false;
			}

			return true;
		});
	});
};
