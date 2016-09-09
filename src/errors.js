'use strict';
class HttpError extends Error{
	constructor(request, message, status){
		super(global.translator(request, (typeof message === 'string') ? message : ...message));
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

class RenderError extends HttpError{
	constructor(request, message, status, render, args){
		super(request, message, status);
		this.render = render;
		this.args = args || {error: this};
	}

	getArguments(){
		return this.args;
	}

	getRenderName(){
		return this.render;
	}
}

class InvalidDataError extends HttpError{
	constructor(request){
		super(request, 'error.invaliddata', 400);
	}
}

class InternalServerError extends RenderError{
	constructor(request){
		super(request, 'error.internalserver', 500, 'error');
	}
}

class NotFoundError extends RedirectError{
	constructor(request){
		super(request, 'error.notfound', 404, 'error');
	}
}

class NoSchoolError extends HttpError{
	constructor(request){
		super(request, 'err.noschool', 400);
	}
}

var knownErrors = {
	'invalid_data': InvalidDataError,
	'internal_server': InternalServerError,
	'not_found': NotFoundError,
	'no_school': NoSchoolError
}

var GetError = (errorName, ...args) => {
	var err = knownErrors[errorName];

	if(!err) return new Error(errorName);
	return new err(...args);
};

GetError.HttpError = HttpError;
GetError.StatusError = StatusError;
GetError.RedirectError = RedirectError;
GetError.RenderError = RenderError;

module.exports = GetError;
