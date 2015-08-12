/* HELPERS */

document.one = document.querySelector.bind(document);

Node.prototype.one = function(selector) {
	return this.querySelector(selector);
};

document.all = document.querySelectorAll.bind(document);

Node.prototype.all = function(selector) {
	return this.querySelectorAll(selector);
};

Node.prototype.addClass = function(name) {
	var classes = this.className.split(' ');
	if(classes.indexOf(name) < 0) {
		classes.push(name);
	}
	this.className = classes.join(' ');
};

Node.prototype.removeClass = function(name) {
	var classes = this.className.split(' '),
			pos = classes.indexOf(name);
	if(pos >= 0) {
		classes.splice(pos, 1);
	}
	this.className = classes.join(' ');
};

Node.prototype.hasClass = function(name) {
	return this.className.split(" ").indexOf(name) >= 0;
};

Node.prototype.toggleClass = function(name) {
	if(this.hasClass(name)) {
		this.removeClass(name);
	} else {
		this.addClass(name);
	}
};

Node.prototype.createElement = function(tag, html, callback) {
	var element = document.createElement(tag),
			name;
	if(typeof html === 'string' && html !== '') {
		element.innerHTML = html;
	}
	if(typeof callback === 'function') {
		callback(element);
	}
	return this;
};

Node.prototype.prependElement = function(tag, html, callback) {
	var parent = this;
	this.createElement(tag, html, function(element) {
		parent.prependChild(element);
		if(typeof callback === 'function') {
			callback(element);
		}
	});
	return this;
};

Node.prototype.appendElement = function(tag, html, callback) {
	var parent = this;
	this.createElement(tag, html, function(element) {
		parent.appendChild(element);
		if(typeof callback === 'function') {
			callback(element);
		}
	});
	return this;
};

Node.prototype.appendTo = function(parent) {
	parent.appendChild(this);
	return this;
};

Node.prototype.prependChild = function(element) {
	if(this.childNodes.length > 0) {
		this.insertBefore(element, this.childNodes[0]);
	} else {
		this.appendChild(element);
	}
};

Node.prototype.on = window.on = function(name, fn) {
	this.addEventListener(name, fn);
	return this;
};

NodeList.prototype.on = function(name, fn) {
	var i;
	for(i = 0; i < this.length; i++) {
		this[i].on(name, fn);
	}
};

String.prototype.inArray = function(array) {
	return array.indexOf(this) >= 0;
};

String.prototype.equals = function() {
	var result = false, i;
	for(i = 0; !result && i < arguments.length; i++) {
		if(this.toString() === arguments[i]) {
			result = true;
		}
	}
	return result;
};

function ValidableForm(container) {
	this.container = container;
	this.errorContainer = undefined;
	this.validators = [];
	this.valid = true;
}

ValidableForm.prototype.addValidator = function(validator) {
	var form = this;
	this.validators.push(validator);
	validator.element.on('keyup', function() {
		if(!validator.valid) {
			form.validate();
		}
	});
};

ValidableForm.prototype.validate = function() {
	var i;
	var error;
	this.valid = true;
	if(typeof this.errorContainer !== 'undefined') {
		this.errorContainer.innerHTML = '';
	}
	for(i in this.validators) {
		if(this.validators[i].test() === false) {
			this.valid = false;
			if(typeof this.errorContainer !== 'undefined') {
				error = document.createElement("div");
				error.className = "error";
				error.innerHTML = this.validators[i].getErrorMessage();
				this.errorContainer.appendChild(error);
			}
		}
	}
	if(this.valid) {
		this.errorContainer.removeClass('has-errors');
	} else {
		this.errorContainer.addClass('has-errors');
	}
	return this.valid;
};

ValidableForm.prototype.setErrorContainer = function(container) {
	this.errorContainer = container;
};

ValidableForm.prototype.watchButtons = function() {
	var form = this;
	this.container.all('input[type=submit]').on('click', function(event) {
		form.validate();
		if(!form.valid) {
			event.preventDefault();
		}
	});
};

function Validator(name, element) {
	this.name = name;
	this.element = element;
	this.valid = true;
	this.errorMessage = this.name + " is not valid.";
}

Validator.prototype.test = function() {
	this.valid = this.validate();
	if(!this.valid) {
		this.element.addClass('error');
	} else {
		this.element.removeClass('error');
	}
	return this.valid;
};

Validator.prototype.validate = function() {
	return false;
};

Validator.prototype.getErrorMessage = function() {
	return this.errorMessage;
};

RequiredValidator.prototype = Object.create(Validator.prototype);
RequiredValidator.prototype.constructor = RequiredValidator;

function RequiredValidator(name, element) {
	Validator.call(this, name, element);
}

RequiredValidator.prototype.validate = function() {
	var result = true;
	var tag = this.element.tagName.toLowerCase();
	var type = this.element.type.toLowerCase();
	if(tag === 'input' && type.equals('text', 'password', 'email')) {
		if(this.element.value === "") {
			result = false;
		}
	}
	return result;
};
