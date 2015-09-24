CustomValidator.prototype = Object.create(Validator.prototype);
CustomValidator.prototype.constructor = CustomValidator;

function CustomValidator(name, element, fn, valueFn) {
	Validator.call(this, name, element);
	this.fn = fn;
	this.valueFn = valueFn;
}

CustomValidator.prototype.validate = function() {
	return this.fn(this.getValue());
};

CustomValidator.prototype.getValue = function() {
	var fn;
	if(typeof this.valueFn === 'undefined') {
		fn = Validator.prototype.getValue.apply(this, arguments);
	} else {
		fn = this.valueFn.apply(this, arguments);
	}
	return fn;
};
