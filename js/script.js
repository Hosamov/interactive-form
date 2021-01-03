//* Interactive Form*
// FSJS Techdegree Project 3
// By: Matt Coale

//Global variables:
const form = document.querySelector('form'); //target form element
const name = document.getElementById('name'); //Select 'Name' input
const email = document.getElementById('email'); //Select 'email' input
const otherJobRole = document.getElementById('other-job-role'); //target 'other job role' input element
const userTitle = document.getElementById('title'); //target 'job role' input element
const shirtDesign = document.getElementById('design'); //target t-shirt designs
const shirtColorSelect = document.getElementById('color'); //target t-shirt colors
const activities = document.getElementById('activities'); //target 'Register for Activities'
const activitiesCost = document.getElementById('activities-cost'); //target 'Total: $'
const activitiesBox = document.getElementById('activities-box');

const paymentMethods = document.querySelector('.payment-methods'); //target 'Payment Info' <fieldset>
const paymentSelect = document.getElementById('payment'); //target 'Payment Info'
const cardNumber = document.getElementById('cc-num'); //target 'card number' input element
const zipCode = document.getElementById('zip'); //Target zip code input element
const cvv = document.getElementById('cvv'); //target ccv input element

//Set main focus to 'Name' field upon page load
name.focus();

/*
'Job Role' Section
*/
otherJobRole.hidden = true; //Hide "Other Job Role" field by default

//Event Listener for tracking changes to 'Job Role' drop-down menu
userTitle.addEventListener('change', (event) => { //Check for changes in the 'Job Role' dropdown menu
  //console.log(event.target.value);

  if (event.target.value === 'other') { //Check to see if the clicked value is 'other'
    otherJobRole.hidden = false; //unhide 'other-job-role' field if it is
  } else { //otherwise, keep 'other-job-role' field hidden
    otherJobRole.hidden = true;
  }
});

/*
'T-Shirt Info' Section
*/
shirtColorSelect.disabled = true; //disable t-shirt color drop-down by default
const shirtColorChildren = shirtColorSelect.children; //target children elements of 'color' id

//Event Listener for tracking changes to 't-shirt design' drop-down menu
shirtDesign.addEventListener('change', (event) => {
  shirtColorSelect.disabled = false; //enable t-shirt color drop-down menu


  for (let i = 0; i < shirtColorChildren.length; i++) {
    let eventValue = event.target.value;
    let dataTheme = shirtColorChildren[i].getAttribute('data-theme');


    if (eventValue === dataTheme) { //TODO: Fix DRY, if possible
      shirtColorChildren[i].hidden = false;
      shirtColorChildren[i].selected = true;
    } else {
      shirtColorChildren[i].hidden = true;
      shirtColorChildren[i].selected = false;
    }

  }
});

/*
'Register for Activities' Section
*/
let totalCost = 0; //Initialize variable to hold current $ amount, set to 0

//Event Listener for tracking activities and calculating the total cost
activities.addEventListener('change', (event) => {
  const clicked = event.target; //store checkbox input that was just clicked
  const dataCost = parseInt(event.target.getAttribute('data-cost')); //target 'data-cost' attribute inside the change event, convert to integer so we can add it

  if (clicked.checked) { //TODO: Fix DRY, if possible
    totalCost += dataCost;
    activitiesCost.innerHTML = ('Total: $' + totalCost);
  } else {
    totalCost -= dataCost;
    activitiesCost.innerHTML = ('Total: $' + totalCost);
  }

});

/////////////////////////////////////////WORKING////////////////////////////////////////

[...document.querySelectorAll('input[type="checkbox"]')].forEach(checkbox => { //Followed syntax learned from and used in 'Input Validation Error Indications' project Warm Up.
  const checkboxParent = checkbox.parentElement;                               //Tried using normal for loop but kept returning an error that 'activityInput.'

  checkbox.addEventListener('focus', (event) => checkboxParent.classList.add('focus'));

  checkbox.addEventListener('blur', (event) => {
    const active = document.querySelector('.focus');
    if (active) {
      active.classList.remove('focus');
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////////////

/*
'Payment Info' Section
*/
const paymentSelectChildren = paymentSelect.children; //target the children of the paymentSelect variable
paymentSelectChildren[1].selected = true; //Select Credit Card by default from drop-down menu

const paymentMethodsChildren = paymentMethods.children; //target children of paymentMethods variable
hideController(true, paymentMethodsChildren, 3, 4); //hide 'paypal and 'bitcoin' data from the screen initially

let creditCardSelected = true;

//Event listener for tracking selected payment method
paymentSelect.addEventListener('change', (event) => {
  const eventValue = event.target.value; //store value of clicked event

  //Iterate over paymentMethodsChildren, ensure only one payment method is shown at a time
  for (let i = 0; i < paymentMethodsChildren.length; i++) {
    if (eventValue === paymentMethodsChildren[2].className) {
      console.log('credit card');
      hideController(false, paymentMethodsChildren, 2);
      hideController(true, paymentMethodsChildren, 3, 4);
    } else if (eventValue === paymentMethodsChildren[3].className) {
      console.log('paypal');
      hideController(false, paymentMethodsChildren, 3);
      hideController(true, paymentMethodsChildren, 2, 4);
    } else if (eventValue === paymentMethodsChildren[4].className) {
      console.log('bitcoin');
      hideController(false, paymentMethodsChildren, 4);
      hideController(true, paymentMethodsChildren, 2, 3);
    } else {
      console.log("Error: could not find requested payment method...");
    }

    //Track & set whether 'credit card' is current selected payment type
    (!paymentMethodsChildren[2].hidden) ? creditCardSelected = true: creditCardSelected = false;

  }

});

//Function to control data's hidden state
function hideController(hideState, data, loc1, loc2) {
  loc2 = loc2 || 0; // optional

  const isHidden1 = data[loc1].hidden = hideState;
  const isHidden2 = data[loc2].hidden = hideState;

  return isHidden1;
  return isHidden2;
}

/*
Form Validation
*/

//Handle what to do when validation passes
function validationPass(element) {
  element.parentElement.className += ' valid';
  element.parentElement.classList.remove('not-valid');
  element.parentElement.lastChild.hidden = true;

}

//Handle what to do when validation fails
function validationFail(element) {
  element.parentElement.className += ' not-valid';
  element.parentElement.classList.remove('valid');
  element.parentElement.lastChild.hidden = false;
}

function validator(isValid, element) {
  let inputIsValid = isValid;
  if (inputIsValid) {
    validationPass(element);
    console.log(`input valid`);
  } else {
    validationFail(element);
    console.log(`input not valid`);
  }
  return inputIsValid;
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


let activitiesTotal = 0; //Track amount of activities selected by user

//Listen for change to checkboxes
activitiesBox.addEventListener('change', (event) => {
  //Verify whether or not a checkbox has been checked,
  //if so, add 1 to activitiesTotal var; otherwise, subtract 1
  if (event.target.checked) {
    activitiesTotal++;
  } else {
    activitiesTotal--;
  }

});

//Function to validate activities
function activitiesValidator() {
  const activitiesSectionIsValid = activitiesTotal > 0;

  return validator(activitiesSectionIsValid, activitiesBox);
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

// let creditCardRegex = '';
//
// function formatCreditCard(text) {
//   if(text.length === 13) {
//     creditCardRegex = /^(\d{4})(\d{4})(\d{5})$/;
//     return text.replace(creditCardRegex, '$1-$2-$3');
//   } else if(text.length === 14){
//       creditCardRegex = /^(\d{4})(\d{6})(\d{4})$/;
//       return text.replace(creditCardRegex, '$1-$2-$3');
//   } else if(text.length === 15){
//       creditCardRegex = /^(\d{4})(\d{6})(\d{5})$/;
//       return text.replace(creditCardRegex, '$1-$2-$3');
//   } else if(text.length === 16){
//       creditCardRegex = /^(\d{4})(\d{4})(\d{4})(\d{4})$/;
//       return text.replace(creditCardRegex, '$1-$2-$3-$4');
//   }
// }

//Real-time validation
name.addEventListener('keyup', nameValidator); //Name field
email.addEventListener('keyup', emailValidator); //email field
activities.addEventListener('keyup', activitiesValidator); //activities box
cardNumber.addEventListener('keyup', creditcardValidator); //card number field
zipCode.addEventListener('keyup', zipCodeValidator); //zip code field
cvv.addEventListener('keyup', cvvValidator); //cvv field

// cardNumber.addEventListener("blur", (event) => {
//   event.target.value = formatCreditCard(event.target.value);
// });



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




//
