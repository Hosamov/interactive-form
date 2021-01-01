//* Interactive Form*
// FSJS Techdegree Project 3
// By: Matt Coale

//Global variables:
const name = document.querySelector('input[type="text"]'); //Select input type="text" for 'Name' input. **document.getElementById('name');**
const otherJobRole = document.getElementById('other-job-role');
const userTitle = document.getElementById('title');
const shirtDesign = document.getElementById('design'); //target t-shirt designs
const shirtColorSelect = document.getElementById('color'); //target t-shirt colors
const activities = document.getElementById('activities'); //target 'Register for Activities'
const activitiesCost = document.getElementById('activities-cost'); //target 'Total: $'
const paymentMethods = document.querySelector('.payment-methods'); //target 'Payment Info' <fieldset>
const paymentSelect = document.getElementById('payment'); //target 'Payment Info'

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
    //console.log(eventValue);
    //console.log(dataTheme);
  }
});

/*
'Register for Activities' Section
*/

//Initialize variable to hold current $ amount, set to 0
let totalCost = 0;

//Event Listener for tracking Activities
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
  // console.log(totalCost);
  // console.log('made a change to activities...');
});


/*
'Payment Info' Section
*/
const paymentSelectChildren = paymentSelect.children; //target the children of the paymentSelect variable
paymentSelectChildren[1].selected = true; //Select Credit Card by default from drop-down menu

const paymentMethodsChildren = paymentMethods.children; //target children of paymentMethods variable
hideController(true, paymentMethodsChildren, 3, 4); //hide 'paypal and 'bitcoin' data from the screen initially

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









//
