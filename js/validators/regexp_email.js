EmailValidator.prototype = Object.create(RegexpValidator.prototype);
EmailValidator.prototype.constructor = EmailValidator;

function EmailValidator(name, element) {
	var regexp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	RegexpValidator.call(this, name, element, regexp);
	this.regexp = regexp;
	this.errorMessage = "{0} is not valid e-mail address.";
}
