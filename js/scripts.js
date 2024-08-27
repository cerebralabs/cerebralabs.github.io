/* Description: Custom JS file */

/* Navigation*/
// Collapse the navbar by adding the top-nav-collapse class
window.onscroll = function () {
	scrollFunction();
	scrollFunctionBTT(); // back to top button
};

window.onload = function () {
	scrollFunction();
};

function scrollFunction() {
	if (document.documentElement.scrollTop > 30) {
		document.getElementById("navbarExample").classList.add("top-nav-collapse");
	} else if ( document.documentElement.scrollTop < 30 ) {
		document.getElementById("navbarExample").classList.remove("top-nav-collapse");
	}
}

// Function to load a template from a file
function loadTemplate(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        });
}

// Load and render the navbar
loadTemplate('../handlebars/navbar.hbs').then(templateContent => {
    const navbarTemplate = Handlebars.compile(templateContent);
    document.getElementById('navbarExample').innerHTML = navbarTemplate();
	// Navbar on mobile
	let elements = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");

	for (let i = 0; i < elements.length; i++) {
		elements[i].addEventListener("click", () => {
			document.querySelector(".offcanvas-collapse").classList.toggle("open");
		});
	}

	document.querySelector(".navbar-toggler").addEventListener("click", () => {
		document.querySelector(".offcanvas-collapse").classList.toggle("open");
	});

}).catch(error => console.error('Error loading navbar:', error));

// Load and render the footer
loadTemplate('../handlebars/footer.hbs').then(templateContent => {
    const footerTemplate = Handlebars.compile(templateContent);
    document.getElementById('footer').innerHTML = footerTemplate();
}).catch(error => console.error('Error loading footer:', error));




// Hover on desktop
function toggleDropdown(e) {
	const _d = e.target.closest(".dropdown");
	let _m = document.querySelector(".dropdown-menu", _d);

	setTimeout(
		function () {
		const shouldOpen = _d.matches(":hover");
		_m.classList.toggle("show", shouldOpen);
		_d.classList.toggle("show", shouldOpen);

		_d.setAttribute("aria-expanded", shouldOpen);
		},
		e.type === "mouseleave" ? 300 : 0
	);
}

// On hover
const dropdownCheck = document.querySelector('.dropdown');

if (dropdownCheck !== null) { 
	document.querySelector(".dropdown").addEventListener("mouseleave", toggleDropdown);
	document.querySelector(".dropdown").addEventListener("mouseover", toggleDropdown);

	// On click
	document.querySelector(".dropdown").addEventListener("click", (e) => {
		const _d = e.target.closest(".dropdown");
		let _m = document.querySelector(".dropdown-menu", _d);
		if (_d.classList.contains("show")) {
			_m.classList.remove("show");
			_d.classList.remove("show");
		} else {
			_m.classList.add("show");
			_d.classList.add("show");
		}
	});
}
  

/* Card Slider - Swiper */
var cardSlider = new Swiper('.card-slider', {
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	slidesPerView: 2,
	spaceBetween: 70,
	breakpoints: {
		// when window is <= 991px
		991: {
			slidesPerView: 1
		}
	}
});


/* Filter - Isotope */
const gridCheck = document.querySelector('.grid');

if (gridCheck !== null) { 
	// init Isotope
	var iso = new Isotope( '.grid', {
		itemSelector: '.element-item',
		layoutMode: 'fitRows'
	});

	// bind filter button click
	// var filtersElem = document.querySelector('.filters-button-group');
	// filtersElem.addEventListener( 'click', function( event ) {
	// 	// only work with buttons
	// 	if ( !matchesSelector( event.target, 'button' ) )  {
	// 		return;
	// 	}
	// 	var filterValue = event.target.getAttribute('data-filter');
	// 	// use matching filter function
	// 	iso.arrange({ filter: filterValue });
	// });
	
	// change is-checked class on buttons
	var buttonGroups = document.querySelectorAll('.button-group');
	for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
		var buttonGroup = buttonGroups[i];
		radioButtonGroup( buttonGroup );
	}
	
	function radioButtonGroup( buttonGroup ) {
		buttonGroup.addEventListener( 'click', function( event ) {
			// only work with buttons
			if ( !matchesSelector( event.target, 'button' ) )  {
				return;
			}
			buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
			event.target.classList.add('is-checked');
		});
	}
}


/* Back To Top Button */
// Get the button
myButton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
function scrollFunctionBTT() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		myButton.style.display = "block";
	} else {
		myButton.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // for Safari
	document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}

window.onload = function() {
	// Reset the form fields when the page loads
	document.querySelector('.contact-form').reset();
};

//When user presses Submit button
// const contactform = document.querySelector('.contact-form');
// const messageContainer = document.querySelector('.form-message');

// contactform.addEventListener('submit', (event) => {
//   event.preventDefault();
//   console.log("Submit button pressed")
//   console.log("Thanks for your message")
//   messageContainer.innerHTML = '<p>Thanks for your message. <br /> We will respond to you shortly</p>';
// });

// When user presses Submit button
const contactform = document.querySelector('.contact-form');
const messageContainer = document.querySelector('.form-message');

contactform.addEventListener('submit', (event) => {
	event.preventDefault();
	
	// Show the loading spinner
    document.getElementById('loading-spinner').style.display = 'block';

	// Get form data
	const formData = new FormData(contactform);
	const object = Object.fromEntries(formData);
	// Get the email address
	const email = object.email;

	// Update the subject to include the email address
	object._subject = `Request received from ${email}`;
	//   const data = JSON.stringify(object);
	// const data = object;
	// console.log(data)
	const data = JSON.stringify(object);

	// AJAX request to FormSubmit
	$.ajax({
	url: "https://formsubmit.co/ajax/89bb93777b85d4c66fdaeb950b687673", // Replace with your email
	method: "POST",
	dataType: "json",
	data: data,
	accepts: 'application/json',
	headers: {
		'Content-Type': 'application/json'
		},
	statusCode: {
		200: function(response) {
			console.log('Success: 200 OK');
			// Hide the loading spinner
			document.getElementById('loading-spinner').style.display = 'none';
			messageContainer.innerHTML = '<p>Thanks for your message. <br /> We will respond to you shortly</p>';
		},
		404: function() {
			// Hide the loading spinner
			document.getElementById('loading-spinner').style.display = 'none';
			console.log('Error: 404 Not Found');
		},
		400: function() {
			// Hide the loading spinner
			document.getElementById('loading-spinner').style.display = 'none';
			console.log('Error: 400 Bad Request');
			messageContainer.innerHTML = '<p>hCaptcha Token is mandatory for this form . <br /> Please re-submit this form.</p>';
		}
	}
	});
});

// const connectbtn = document.querySelector('.connect-btn');
// const crossbtn = document.querySelector('.cross-btn');
// const socialcontainer = document.querySelector('.social-container');

// connectbtn.addEventListener('click', () => {
//   socialcontainer.classList.toggle('visible')
// });

// crossbtn.addEventListener('click', () => {
//   socialcontainer.classList.remove('visible')
// });