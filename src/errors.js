class HttpError extends Error{
	constructor(message, status){
		super(message);
		this.status = status;
	}

	statusCode(){
		return this.status;
	}
}

class StatusError extends HttpError{
	constructor(message, status){
		super(message, status);
	}
}

class RedirectError extends HttpError{
	constructor(message, status, redirect){
		super(message, status);
		this.redirect = redirect;
	}

	getRedirect(){
		return this.redirect;
	}
}

class InvalidDataError extends HttpError{
	constructor(){
		super(global.translator('error.invaliddata'), 400);
	}
}

var knownErrors = {
	'invalid_data': InvalidDataError
}

var GetError = (errorName, ...args) => {
	var err = knownErrors[errorName];

	if(!err) return new Error(errorName);
	return new err(...args);
};

GetError.HttpError = HttpError;
GetError.StatusError = StatusError;
GetError.RedirectError = RedirectError;

module.exports = GetError;
