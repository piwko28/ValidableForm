(function($) {

	$.fn.validableForm = function(errorContainer) {

		$(this).each(function() {
			new AutoValidator(this, $(this).find(errorContainer)[0]);
		});

	};

})(jQuery);