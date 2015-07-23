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
