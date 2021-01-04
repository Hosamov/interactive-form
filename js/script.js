//* Interactive Form*
// FSJS Techdegree Project 3
// By: Matt Coale

/*
// Selectors/Global Vars:
*/

//Form,Name, email, and job role selectors
const form = document.querySelector('form');
const name = document.getElementById('name'); //Select 'Name' input
const email = document.getElementById('email'); //Select 'email' input
const otherJobRole = document.getElementById('other-job-role'); //target 'other job role' input element
const userTitle = document.getElementById('title'); //target 'job role' input element

//T-shirt Selectors
const shirtDesign = document.getElementById('design'); //target t-shirt designs
const shirtColorSelect = document.getElementById('color'); //target t-shirt colors

//Activities Selectors
const activities = document.getElementById('activities'); //target 'Register for Activities'
const activitiesCost = document.getElementById('activities-cost'); //target 'Total: $'
const activitiesBox = document.getElementById('activities-box');

//Payment Type Selectors
const paymentMethods = document.querySelector('.payment-methods'); //target 'Payment Info' <fieldset>
const paymentSelect = document.getElementById('payment'); //target 'Payment Info'
const cardNumber = document.getElementById('cc-num'); //target 'card number' input element
const zipCode = document.getElementById('zip'); //Target zip code input element
const cvv = document.getElementById('cvv'); //target ccv input element

//Global Vars
let totalCost = 0; //Initialize variable to hold current $ amount, set to 0
let activitiesTotal = 0; //Track amount of activities selected by user

/*
// Set main focus to 'Name' input upon page load
*/
name.focus();

/*
// 'Job Role' Section
*/

otherJobRole.hidden = true; //Hide "Other Job Role" input by default

//Event Listener for tracking changes to 'Job Role' drop-down menu
userTitle.addEventListener('change', (event) => { //Check for changes in the 'Job Role' dropdown menu
  if (event.target.value === 'other') { //Check to see if the clicked value is 'other'
    otherJobRole.hidden = false; //unhide 'other-job-role' field if it is
  } else { //otherwise, keep 'other-job-role' field hidden
    otherJobRole.hidden = true;
  }
});

/*
// 'T-Shirt Info' Section
*/
shirtColorSelect.disabled = true; //disable t-shirt color drop-down by default
const shirtColorChildren = shirtColorSelect.children; //target children elements of 'color' id

//Function to determine the state of hidden & selected for t-shirt themes
function shirtManager(val, bool) {
  val.hidden = bool;
  val.selected = !bool;
}

//Event Listener for tracking changes to 't-shirt design' drop-down menu
shirtDesign.addEventListener('change', (event) => {
  shirtColorSelect.disabled = false; //enable t-shirt color drop-down menu

  for (let i = 0; i < shirtColorChildren.length; i++) {
    let eventValue = event.target.value;
    let dataTheme = shirtColorChildren[i].getAttribute('data-theme');

    if (eventValue === dataTheme) {
      shirtManager(shirtColorChildren[i], false) //Set hidden to false & select to true of shirtColorChildren[i]
    } else {
      shirtManager(shirtColorChildren[i], true) //Set hidden to true & select to false of shirtColorChildren[i]
    }
  }
});

/*
// 'Register for Activities' Section
*/


//Event Listener for tracking activities and calculating the total cost
activities.addEventListener('change', (event) => {
  const clicked = event.target; //store checkbox input that was clicked/selected by the user
  const dataCost = parseInt(event.target.getAttribute('data-cost')); //target 'data-cost' attribute inside the change event, convert to integer so we can add it

  //Track total cost incurred
  if (clicked.checked) { //If an activity was selected...
    totalCost += dataCost; //add dataCost to totalCost (update price)
    activitiesCost.innerHTML = ('Total: $' + totalCost);
  } else {
    totalCost -= dataCost; //subtract dataCost from totalCost (update price)
    activitiesCost.innerHTML = ('Total: $' + totalCost);
  }

});

/*
// 'Payment Info' Section
*/
const paymentSelectChildren = paymentSelect.children; //target the children of the paymentSelect variable
paymentSelectChildren[1].selected = true; //Select Credit Card by default from drop-down menu
const paymentMethodsChildren = paymentMethods.children; //Select "Payment info"
let creditCardSelected = true; //

//Function to control data's hidden state
function paymentHideController(data, showVal, hideVal1, hideVal2) {
  const hideState = false;
  data[showVal].hidden = hideState;
  data[hideVal1].hidden = !hideState;
  data[hideVal2].hidden = !hideState;
}

paymentHideController(paymentMethodsChildren, 2, 3, 4); //hide 'paypal and 'bitcoin' helper data from the screen upon load

//Event listener for tracking selected payment method
paymentSelect.addEventListener('change', (event) => {
  const eventValue = event.target.value; //store value of clicked event

  //Iterate over paymentMethodsChildren, ensure only one payment method is shown at a time
  for (let i = 0; i < paymentMethodsChildren.length; i++) {
    if (eventValue === paymentMethodsChildren[2].className) {
      paymentHideController(paymentMethodsChildren, 2, 3, 4);
    } else if (eventValue === paymentMethodsChildren[3].className) {
      paymentHideController(paymentMethodsChildren, 3, 2, 4);
    } else if (eventValue === paymentMethodsChildren[4].className) {
      paymentHideController(paymentMethodsChildren, 4, 2, 3);
    }

    //Track & set whether 'credit card' is current selected payment type
    (!paymentMethodsChildren[2].hidden) ? creditCardSelected = true: creditCardSelected = false;

  }

});

/*
Form Validation
*/
//Handle what to do when validation passes
function validationPass(element) {
  element.parentElement.className += ' valid';
  element.parentElement.classList.remove('not-valid');
  element.parentElement.lastElementChild.style.display = 'none'; //hide accessibility hint
}

//Handle what to do when validation fails
function validationFail(element) {
  element.parentElement.className += ' not-valid';
  element.parentElement.classList.remove('valid');
  element.parentElement.lastElementChild.style.display = 'inline'; //Display accessibility hint to user
}

//Validator function to test elements validity
//function called when <form> submit button is pressed
function validator(isValid, element) {
  if (isValid) {
    validationPass(element);
    validateAllFields(); //Real-time validation
  } else {
    validationFail(element);
    validateAllFields(); //Real-time validation
  }
}

//Function to validate the name
function nameValidator() {
  const nameValue = name.value;
  const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
  return validator(nameIsValid, name);
}

//Function to validate the email address
function emailValidator() {
  const emailValue = email.value;
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
  return validator(emailIsValid, email);
}

//Listen for change to checkboxes
activitiesBox.addEventListener('change', (event) => {
  //Verify whether a checkbox has been checked
  if (event.target.checked) {
    activitiesTotal++;  //if checked, add 1 to activitiesTotal
  } else {
    activitiesTotal--; //if unchecked, subtract 1 from activitiesTotal
  }
});

//Function to validate activities
function activitiesValidator() {
  const activitiesValid = activitiesTotal > 0\  return validator(activitiesValid, activitiesBox);
}

//Function to validate credit card number criteria
function creditcardValidator() {
  const cardValue = cardNumber.value;
  const cardIsValid = /^\d{13,16}?$/.test(cardValue); //check for a number with 13-16 characters
  return validator(cardIsValid, cardNumber);
}

//Function to validate required zip code
function zipCodeValidator() {
  const zipValue = zipCode.value;
  const zipIsValid = /^\d{5}$/.test(zipValue); //test for 5 numbers
  return validator(zipIsValid, zipCode);
}

//Function to validate required CVV number
function cvvValidator() {
  const cvvValue = cvv.value;
  const cvvIsValid = /^\d{3}$/.test(cvvValue); //test for 3 numbers
  return validator(cvvIsValid, cvv);

}

//Real-time validation
function validateAllFields() {
  name.addEventListener('keyup', nameValidator); //Name field
  email.addEventListener('keyup', emailValidator); //email field
  activities.addEventListener('change', activitiesValidator); //activities box
  cardNumber.addEventListener('keyup', creditcardValidator); //card number field
  zipCode.addEventListener('keyup', zipCodeValidator); //zip code field
  cvv.addEventListener('keyup', cvvValidator); //cvv field
}

/*
Submit Form & validate
*/
form.addEventListener('submit', (event) => {

  //event.preventDefault();

  if (!nameValidator()) {
    console.log('Invalid name prevented submission.');
    event.preventDefault();
  }

  if (!emailValidator()) {
    console.log('Invalid email prevented submission.');
    event.preventDefault();
  }

  if (!activitiesValidator()) {
    console.log('Please select at least one activitity to proceed.');
    event.preventDefault();
  }

  if (creditCardSelected) {
    if (!creditcardValidator()) {
      console.log('Please enter a valid credit card number.');
      event.preventDefault();
    }
    if (!zipCodeValidator()) {
      console.log('Please enter a valid zip code.');
      event.preventDefault();
    }
    if (!cvvValidator()) {
      console.log('Please enter a valid cvv number.');
      event.preventDefault();
    }
  }

  console.log('Submit handler is functional!');

});

/*
// Accessibility
*/
//Learned syntax from Treehouse 'Input Validation Error Indications' project Warm Up section
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => { //Loop over '<input type="checkbox">'
  const checkboxParent = checkbox.parentElement; //target the parent element of type checkbox (label)

  //Listen for 'focus' event, add class of 'focus' to parent element <label>
  checkbox.addEventListener('focus', (event) => checkboxParent.classList.add('focus'));

  //Listen for 'blur' event, remove class of 'focus' from parent element <label>
  checkbox.addEventListener('blur', (event) => {
    const inputFocused = document.querySelector('.focus');
    if (inputFocused) {
      inputFocused.classList.remove('focus');
    }
  });



});
