// This is Default element selector
const selectElements = (selector) => {
	const element = document.querySelector(selector);
	if (element) return element;
	else
		throw new Error(
			`something went wrong check if ${selector} is spelt correctly`
		);
};
const section = selectElements("#sect");
const modal = selectElements(".modal");

// This adds an evenlistener to the hamburger icons//
selectElements(".menu-btn").addEventListener("click", () => {
	selectElements(".nav-links-right-container").parentElement.classList.toggle(
		"activated"
	);
});

// This adds an eventlistener to the hamburger popup backdrop//
selectElements(".backdrop").addEventListener("click", () => {
	selectElements(".nav-links-right-container").parentElement.classList.remove(
		"activated"
	);
});

/*This is used to loop through all buttons in the section and add
desire callback functions according to their ID*/

section.querySelectorAll(".btn").forEach((button) => {
	button.addEventListener("click", (e) => {
		e.preventDefault();
		if (button.id === "bamboo-stand-btn") {
			activateSelected("bamboo");
		} else if (button.id === "black-edition-btn") {
			activateSelected("edition");
		}
		selectElements(".modal").parentElement.classList.add("activated");
	});
});

/*This is used to loop through all buttons in the MODAL and add
desire callback functions according to classlist identified*/
modal.querySelectorAll("button").forEach((button) => {
	button.addEventListener("click", (e) => {
		e.preventDefault();
		if (button.classList.contains("menu-btn")) {
			selectElements(".modal").parentElement.classList.remove("activated");
			removeClass();
		} else if (button.classList.contains("no-rewards-btn")) {
			setTimeout(() => {
				updateCount();
				selectElements(".modal").parentElement.classList.remove("activated");
				selectElements(".success-modal").classList.add("activated");
				removeClass();
			}, 2000);
		} else {
			updateBacked();
		}
	});
});

// This adds an Evenlistener to the success card button//
selectElements(".success-wrapper")
	.querySelector(".btn")
	.addEventListener("click", () => {
		selectElements(".success-modal").classList.remove("activated");
	});

/*This is used to Loop through the all Fielsets in the MODAL with a 
class of with-sub and get the radio button within and on a "change"
event check for a fieldset with class "activated" and remove if there was 
while adding the class to the button recieving the change*/
modal.querySelectorAll(".with-sub").forEach((fieldset) => {
	const radioButton = fieldset.querySelector(`input[type="radio"]`);
	const fieldsets = modal.querySelectorAll(".with-sub");
	radioButton.addEventListener("change", (e) => {
		fieldsets.forEach((field) => {
			field.classList.remove("activated");
		});
		fieldset.classList.toggle("activated");
	});
});

/*This Function removes the class "activated" from a fieldset and makes sure
the radio button of of the fieldset is not "checked" when called*/
const removeClass = () => {
	const fieldsets = modal.querySelectorAll(".with-sub");
	modal.querySelectorAll(`input[type="radio"]`).forEach((input) => {
		fieldsets.forEach((field) => {
			field.classList.remove("activated");
			input.checked = false;
		});
	});
};

/*This function takes an agurement from a button when called from a button click 
and adds or remove (removeClass()) the class "activated" when called*/
const activateSelected = (btn) => {
	removeClass();
	selectElements(".modal").parentElement.classList.add("activated");
	const fieldsets = modal.querySelectorAll(".with-sub");
	modal.querySelectorAll(`input[type="radio"]`).forEach((input) => {
		if (btn === "bamboo" && input.id === "bamboo-stand") {
			const immdiateParent = input.parentElement;
			const absoluteParent = immdiateParent.parentElement;
			absoluteParent.classList.add("activated");
			input.checked = true;
		} else if (btn === "edition" && input.id === "black-edition") {
			const immdiateParent = input.parentElement;
			const absoluteParent = immdiateParent.parentElement;
			absoluteParent.classList.add("activated");
			input.checked = true;
		}
	});
};

const dollar = "$";
let amountBacked = 89914;

/*Wheeppp!! 😂😂 Wondering whats going on here??..nothing much
This function when called checks if a certain condition is met on 
a fieldset and where "true" calls a series of other functions
else just adds a style to an input field 🙄😶🙄 */

const updateBacked = () => {
	const fieldset = modal.querySelectorAll(`.with-sub`);
	for (const field of fieldset) {
		if (field.classList.contains("activated")) {
			const input =
				field.nextElementSibling.querySelector(`input[type="text"]`);
			const str = input.value.trim();
			if (input.id === "bamboo-input" && str >= 25) {
				input.style.borderColor = "hsl(0, 0%, 48%)";
				const newAmount = Number(amountBacked) + Number(input.value);
				amountBacked = newAmount;
				updateCount();
				progress();
				setTimeout(() => {
					selectElements(".modal").parentElement.classList.remove("activated");
					selectElements(".success-modal").classList.add("activated");
					removeClass();
				}, 2000);
				selectElements(
					".amount-backed"
				).textContent = `${dollar}${numberWithCommas(amountBacked)}`;
			} else if (input.id === "black-input" && str >= 75) {
				input.style.borderColor = "hsl(0, 0%, 48%)";
				const newAmount = Number(amountBacked) + Number(input.value);
				amountBacked = newAmount;
				updateCount();
				progress();
				setTimeout(() => {
					selectElements(".modal").parentElement.classList.remove("activated");
					selectElements(".success-modal").classList.add("activated");
					removeClass();
				}, 2000);
				selectElements(
					".amount-backed"
				).textContent = `${dollar}${numberWithCommas(amountBacked)}`;
			} else {
				input.style.borderColor = "red";
			}
		}
	}
};

/*This is function updates the progress bar of how much has been backed*/
const progress = () => {
	const backGoal = 100000;
	selectElements(".progress").value = (amountBacked / backGoal) * 100;
};
/*This Function is called here on page load to update the progress on the already
predifined amount backed as the challenge required orderwise won't have been called here */
progress();

/*This FTCN is used to add commas to the numbers --AS SEEN ON THE NET */
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//
//
let count = 5007;
/*This function Updates the total number of donations recieved */
const updateCount = () => {
	count++;
	selectElements(".total-backers").textContent = numberWithCommas(count);
};

/*This FTCN adds the bookmarked class or remove it on a CLICK */
selectElements(".bookmarks").addEventListener("click", () => {
	selectElements("svg").parentElement.classList.toggle("activated");
	if (selectElements(".bookmarks").classList.contains("activated")) {
		selectElements(".mobile").textContent = "Bookmarked";
	} else {
		selectElements(".mobile").textContent = "Bookmark";
	}
});
