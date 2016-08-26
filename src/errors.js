class HttpError extends Error{
	constructor(request, message, status){
		super(message);
		this.request = request;
		this.status = status;
	}

	getRequest(){
		return this.request;
	}

	statusCode(){
		return this.status;
	}
}

class RedirectError extends HttpError{
	constructor(request, message, status, redirect){
		super(request, message, status);
		this.redirect = redirect;
	}

	getRedirect(){
		return this.redirect;
	}
}

class InvalidDataError extends HttpError{
	constructor(request){
		super(request, global.translator('error.invaliddata'), 400);
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
