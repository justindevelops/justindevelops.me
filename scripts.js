class Node {
	// constructor
	constructor(element) {
		this.element = element;
		this.next = null;
		this.previous = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.position = null;
		this.size = 0;
	}

	add(element) {
		var node = new Node(element);
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

	updateButtons() {
		for (var current = this.head; current; current = current.next) {
			if (current.element.id == this.getPositionID()) {
				current.element.style.backgroundColor = 'black';
			} else {
				current.element.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
			}
		}
	}

	//future implementation perhaps
	jumpPosition(id) {}
}

var ll = new LinkedList();

dotnav = document.querySelectorAll('span.dot');
dotnav.forEach((dot) => {
	//add to LinkedList
	ll.add(dot);

	/* add all of this functionality later
        //detects when any dots are clicked on
        dot.addEventListener('click', (e) => {
            //clear out content
            //jump to that page
            //update position in linkedlist
        });

        //change the appearance of the dot if it's being hovered over
        dot.addEventListener('mouseover', (e) => {
            dot.style.backgroundColor = 'black';
        });

        //restore the appearance of the dot when the mouse is gone
        dot.addEventListener('mouseout', (e) => {
            if (ll.position.element.id != dot.id) {
                console.log('hhh');
                dot.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            }
        });
    */
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
}

updateMainDisplay();
