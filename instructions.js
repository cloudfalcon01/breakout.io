// popup background
var bg = document.getElementById('popupbg');
// popup box
var box = document.getElementById('popinstruct');

// function to make instructions visibile
var open = function() {
	// This is for debugging so you can tell if the 
	// function is being called or not. You can delete
	// this line later when your project is done.
	

	bg.style.visibility = 'visible';
	box.style.visibility = 'visible';
}

var button = document.getElementById('popupButton');
button.addEventListener('click', open);
console.log(button);