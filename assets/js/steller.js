$(document).ready(function(){
	$(".nav-link").on('click', function(event) {

    	if (this.hash !== "") {

			event.preventDefault();

			var hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 700, function(){
				window.location.hash = hash;
			});
      	} 
    });
});

function sendEmailDefault(){
	var email = "hoangthanhdat.thd@gmail.com";
	var subject = document.getElementById("contact-subject").value;
	var msgBody = document.getElementById("contact-message").value;
	window.open(`mailto:${email}?subject=${subject}&body=${msgBody}`);
  }

function darkMode() {
	var body = document.body;
	body.classList.toggle("dark-mode");
}