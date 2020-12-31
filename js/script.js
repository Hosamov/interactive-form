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

//Event Listener for tracking changes to 't-shirt design' drop-down menu
shirtDesign.addEventListener('change', (event) => {
  shirtColorSelect.disabled = false; //enable t-shirt color drop-down menu
  const shirtColorChildren = shirtColorSelect.children; //target children elements of 'color' id

  for (let i = 0; i < shirtColorChildren.length; i++) {
    let eventValue = event.target.value;
    let dataTheme = shirtColorChildren[i].getAttribute('data-theme');

    //TODO: Fix DRY, if possible
    if (eventValue === dataTheme) {
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

  //TODO: Fix DRY, if possible
  if (clicked.checked) {
    totalCost += dataCost;
    activitiesCost.innerHTML = ('Total: $' + totalCost);
  } else {
    totalCost -= dataCost;
    activitiesCost.innerHTML = ('Total: $' + totalCost);
  }
  // console.log(totalCost);
  // console.log('made a change to activities...');
});
