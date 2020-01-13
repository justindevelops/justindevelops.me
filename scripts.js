class Node {
	// constructor that holds the node instance, two pointers to the next and previous in line, and a directory URL for the background
	constructor(element, directory) {
		this.element = element;
		this.next = null;
		this.previous = null;
		this.backgroundDirectory = directory;
	}
}

class LinkedList {
	// constructor that holds a spot for the front of the list, the current index we are in, and the size
	constructor() {
		this.head = null;
		this.position = null;
		this.size = 0;
		this.left_arrow = document.getElementById('left-arrow');
		this.right_arrow = document.getElementById('right-arrow');
	}

	add(element, directory) {
		var node = new Node(element, directory);
		var current;

		if (this.head == null) {
			this.head = node;
			this.position = node;
		} else {
			current = this.head;
			while (current.next) {
				current = current.next;
			}
			node.previous = current;
			current.next = node;
		}
		this.size++;
	}

	move(id) {
		if (id == 'right-arrow') {
			if (this.getPositionID() == 'contact') {
				console.log("Can't scroll right.");
			} else {
				this.position = this.position.next;
			}
		} else if (id == 'left-arrow') {
			if (this.getPositionID() == 'about') {
				console.log("Can't scroll left.");
			} else {
				this.position = this.position.previous;
			}
		} else {
			console.log('DEBUG');
		}
	}

	getPositionID() {
		return this.position.element.id;
	}

	getDirectory() {
		return this.position.backgroundDirectory;
	}

	updateButtons() {
		//depending on which page we're on, either show or hide the left and right arrows
		if (this.getPositionID() == 'about') {
			this.showArrow(this.left_arrow, false);
		} else if (this.getPositionID() == 'experience' || this.getPositionID() == 'projects') {
			this.showArrow(this.left_arrow, true);
			this.showArrow(this.right_arrow, true);
		} else if (this.getPositionID() == 'contact') {
			this.showArrow(this.right_arrow, false);
		}

		for (var current = this.head; current; current = current.next) {
			if (current.element.id == this.getPositionID()) {
				current.element.style.backgroundColor = 'black';
			} else {
				current.element.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
			}
		}
	}

	showArrow(arrow, isVisible) {
		if (isVisible) {
			//make it 1.0 opacity
			arrow.style.opacity = '1.0';
			arrow.style.filter = 'alpha(opacity=100)';
		} else {
			//make it 0 capacity
			arrow.style.opacity = '0.0';
			arrow.style.filter = 'alpha(opacity=0)';
		}
	}

	//future implementation perhaps
	jumpPosition(id) {}
}

body = document.querySelector('body');
for (var i = 0; i < 4; i++) {}

var ll = new LinkedList();

body.addEventListener('mouseover', (e) => {
	console.log('hoverin');
	/*
	body.style.background = "linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .7)), url('assets/bg3.jpeg')";
	body.style.backgroundSize = 'cover';
	body.style

	background-color: black;
	background: linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .7)), url("assets/bg4.jpeg");
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: cover;
	background-position: center;
	*/
});

dotnav = document.querySelectorAll('span.dot');
let index = 1;
dotnav.forEach((dot) => {
	let directory = 'assets/bg' + index.toString() + '.jpeg';

	//add to LinkedList
	ll.add(dot, directory);
	index++;
});

arrows = document.querySelectorAll('.arrow');
arrows.forEach((arrow) => {
	arrow.addEventListener('click', (e) => {
		console.log(arrow.id);
		//update position
		ll.move(arrow.id);
		//change display based on position
		updateMainDisplay();
	});
});

function updateMainDisplay() {
	ll.updateButtons();

	//clear the window before writing to it
	$('.content').html('');

	//change what shows in the main display window
	id = ll.getPositionID();
	if (id == 'about') {
		$('.content').html('Site under construction!');
	} else if (id == 'experience') {
		$('.content').html(
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		);
	} else if (id == 'projects') {
		$('.content').html(
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
		);
	} else if (id == 'contact') {
		$('.content').html(
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		);
	} else {
		console.log('DEBUG');
	}
	let x = ll.getDirectory();
	body.style.background = "linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .7)), url('" + x + "')";
	body.style.backgroundSize = 'cover';
	body.style.backgroundRepeat = 'no-repeat';
	body.style.backgroundAttachment = 'fixed';
	body.style.backgroundPosition = 'center';
	body.style.backgroundColor = 'black';
}

updateMainDisplay();
