var form;
var formContainer = document.one('#form');
var input1 = formContainer.one("#input1");
var input2 = formContainer.one("#input2");

if(formContainer !== null) {
	form = new ValidableForm(formContainer);
	form.addValidator(new RequiredValidator('Input 1', input1));
	form.addValidator(new RequiredValidator('Input 2', input2));
	form.setErrorContainer(formContainer.one(".errors"));
	form.watchButtons();
}