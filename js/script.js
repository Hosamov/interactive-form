//* Interactive Form*
// FSJS Techdegree Project 3
// By: Matt Coale

const name = document.querySelector('input[type="text"]'); //Select input type="text" for 'Name' input. **document.getElementById('name');**
const otherJobRole = document.getElementById('other-job-role');
const userTitle = document.getElementById('title');

name.focus(); //focus on name field by default
otherJobRole.hidden = true; //Hide "Other Job Role" field by default

userTitle.addEventListener('change', (event) => { //Check for changes in the 'Job Role' dropdown menu
  console.log(event.target.value);

  if (event.target.value == 'other') { //Check to see if the clicked value is 'other'
    otherJobRole.hidden = false;  //unhide 'other-job-role' field if it is
  } else {                        //otherwise, keep 'other-job-role' field hidden
    otherJobRole.hidden = true;
  }
});
