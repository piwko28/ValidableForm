function AutoValidator(container, errorContainer, defaultErrors) {
	this.container = container;
	this.errorContainer = errorContainer;
	this.validators = [];
	this.form = undefined;
	this.errors = defaultErrors || {};
	this.init();
	this.makeValidators();
}

AutoValidator.prototype.addValidator = function(validator) {
	this.validators.push(validator);
	this.form.addValidator(validator);
};

AutoValidator.prototype.init = function() {
	this.form = new ValidableForm(this.container);
	if(this.errorContainer) {
		this.form.setErrorContainer(this.errorContainer);
	}
	this.form.watchButtons();
};

AutoValidator.prototype.makeValidators = function() {
	var autovalidator = this;
	/* RequiredValidator */
	this.container.querySelectorAll("[data-validator-required]").forEach(function() {
		var validator = new RequiredValidator(this.dataset.name, this);
		if(this.errors.hasOwnProperty('required')) {
			validator.errorMessage = this.errors.required;
		}
		if(this.dataset.validatorRequiredError) {
			validator.errorMessage = this.dataset.validatorRequiredError;
		}
		autovalidator.addValidator(validator);
	});
	/* RegexpValidator */
	this.container.querySelectorAll("[data-validator-regexp]").forEach(function() {
		var validator = new RegexpValidator(this.dataset.name, this, this.dataset.validatorRegexp);
		if(this.errors.hasOwnProperty('regexp')) {
			validator.errorMessage = this.errors.regexp;
		}
		if(this.dataset.validatorRegexpError) {
			validator.errorMessage = this.dataset.validatorRegexpError;
		}
		autovalidator.addValidator(validator);
	});
	/* EmailValidator */
	this.container.querySelectorAll("[data-validator-email]").forEach(function() {
		var validator = new EmailValidator(this.dataset.name, this);
		if(this.errors.hasOwnProperty('email')) {
			validator.errorMessage = this.errors.email;
		}
		if(this.dataset.validatorEmailError) {
			validator.errorMessage = this.dataset.validatorEmailError;
		}
		autovalidator.addValidator(validator);
	});
	/* CustomValidator */
	this.container.querySelectorAll("[data-validator-custom]").forEach(function() {
		var validator = new CustomValidator(this.dataset.name, this, window[this.dataset.validatorCustom]);
		if(this.errors.hasOwnProperty('custom')) {
			validator.errorMessage = this.errors.custom;
		}
		if(this.dataset.validatorCustomError) {
			validator.errorMessage = this.dataset.validatorCustomError;
		}
		autovalidator.addValidator(validator);
	});
};