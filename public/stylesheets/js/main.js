$(document).ready(function() {

	/* Applies class to n children (better than CSS3 for IE compatibility) */
	$('.service:nth-child(4n+1)').addClass('no-left-margin');

	// Game dropdown on homepage
	$('.chosen-select').chosen();

    $( ".datepicker" ).datepicker();

});