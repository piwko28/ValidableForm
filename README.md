# ValidableForm

Validate controls of form.


## Manual validation

We'll need a container the form is wrapped in and inputs to be validated:

```js
var formContainer = document.getElementById('form');
var surname = document.getElementById("surname");
var email = document.getElementById("email");
var custom = document.getElementById("custom");
```

Then we can make a validable form:

```js
var form = new ValidableForm(formContainer);
```

Specify where errors should be printed and watching buttons in purpose of running validation on click of them:

```js
form.setErrorContainer(document.getElementById("errors"));
form.watchButtons();
```

Mathod watchButtons can have callback function, when error will occured:

```js
form.watchButtons(function() {
	alert('Oh no!');
});
```


All we have to do now is adding validators:

```js
var required = new RequiredValidator('Name', surname);
var email = new EmailValidator('E-mail', email);
var custom = new CustomValidator('5', custom, function(value) {
	return value == 5;
});

form.addValidator(required);
form.addValidator(email);
form.addValidator(custom);
```

Additionaly we can for instance change error messages. Literal "{0}" will be replaced with name of the field:

```js
required.errorMessage = "Man, you have to fill in the field called {0} before you go further!";
```


You can also handle the validate event on element, ex.:

```js
surname.addEventListener('validate', function() {
	this.parentNode.addClass('error');
}, true);
```


## Validators


### RequiredValidator

Checks if input is not empty.

Usage:
```js
new RequiredValidator(name, element);
```

 - name - name of the field
 - element - DOM element of the field


### RegexpValidator

Checks if input's value matches to the given regular expression.

Usage:
```js
var regexp = new RegExp("^[0-9]{2}-[0-9]{3}$");
new RegexpValidator(name, element, regexp);
```

 - name - name of the field
 - element - DOM element of the field
 - regexp - instance of RegExp object


### EmailValidator

Checks if input's value is a valid e-mail address.

Usage:
```js
new EmailValidator(name, element);
```

 - name - name of the field
 - element - DOM element of the field


### CustomValidator

Checks if the given function returns true.

Usage:
```js
var fn = function(value) {
  return parseInt(value) % 2 === 1; // pass odd numbers
};
new CustomValidator(name, element, fn);
```

 - name - name of the field
 - element - DOM element of the field
 - fn - function that validate the value of input


## Auto validator

Make validators according to input's data attributes.


Usage:
```js
new AutoValidator(container, errorContainer, defaultErrors, onError);
```

 - container - form container
 - errorContainer - container to place error messages
 - defaultErrors - (optional) object which override default error messages for each validators; define it by using one or more of the properties: required, email, regexp, custom; default value is {}, example value: { required : "Fill in {0} field!", regexp : "Something is wrong with {0}!" }
 - onError - callback function when error will occured (see: watchButtons)

It needs to set dataattributes:

```html
<input type="text" data-name="Name" data-validator-required>
<input type="text" data-name="Name" data-validator-regexp="^regular_expression$">
<input type="text" data-name="Name" data-validator-email>
<input type="text" data-name="Name" data-validator-custom="FunctionName">
```

"data-name" attribute is needed by every validator and specify the name using to generate error messages. Some of validators needs to set a value of attribute (see example within auto.html file).


Optionally you can add own error message to any validator. Example use:

```html
<input type="text" data-name="Name" data-validator-required data-validator-required-error="Man, you have to fill in the field called {0} before you go further!">
```


## Plugins

### jQuery

Run autovalidate with jQuery:

```js
$("#form").validableForm(".errors", {
	required : "You have to fill in {0}!"
}, function() { // callback on error function
	$('html, body').animate({
		scrollTop : $("#form .errors").offset().top
	}, 1000);
});
```
