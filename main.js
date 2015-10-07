var form;
var formContainer = document.one('#form');
var surname = formContainer.one("#surname");
var email = formContainer.one("#email");
var custom = formContainer.one("#custom");
var agreement = formContainer.one("#agreement");
var radio = formContainer.one("input[name=radio]");

if(formContainer !== null) {
	form = new ValidableForm(formContainer);
	form.addValidator(new RequiredValidator('Name', surname));
	form.addValidator(new EmailValidator('E-mail', email));
	form.addValidator(new CustomValidator('5', custom, function(value) {
		return value == 5;
	}));
	form.addValidator(new RequiredValidator('Agreement', agreement));
	form.addValidator(new RequiredValidator('Radio', radio));
	form.setErrorContainer(formContainer.one(".errors"));
	form.watchButtons();
}

surname.addEventListener("validate", function() {
	this.parentNode.addClass("error");
}, true);