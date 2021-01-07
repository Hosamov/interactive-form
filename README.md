# interactive-form
Project 3 - Interactive Form in JS

An interactive form using vanilla JS. The following list is in order of appearance on the screen:

*FORM INPUT FIELDS*
1. Name Input
- The form will start with the focus state on the name <input> element.
The name input must contain a minimum of one alpha character to validate.

2. Email Input
The email input must follow this format: [min 1 character + @ + min 1 character + . + 3x alpha characters]

3. Job Role Dropdown Menu
- The job role dropdown menu has six options, with the final, "other" option being the last option.
When the "other" option is selected by the user, the "Other Job Role" textbox <input> becomes visible.

4. T-Shirt Info Input Menus
- User may select one of two design themes: 'JS Puns' or 'I <3 JS'
'Color' dropdown is disabled by default until one of the above themes are selected.
'Color' dropdown displays correct color items for the theme selected.

5. Register for Activities
- User may select 1-7 activity checkboxes. The user must select at least one activity to proceed.
The "Total: $" will update to reflect current price/cost of all activities selected.

6. Payment info
- "I'm going to pay with" <input>:
    - 'Credit Card' selected by default.
        - Selectable options include 'Credit Card', 'Paypal', and 'Bitcoin'
- 'Expiration Date'
- 'Expiration Year'
- 'Card Number'
    - Allows 13-16 numeric characters (unformatted/without dashes or spaces)
- 'Zip Code'
    - Allows 5 numeric characters
- 'CVV'
    - Allows 3 numeric characters

*VALIDATION INFO*
The following *(Required) <input> fields are validated only when the <form> element is submitted :
- name
  - Requires a mininum of 1 (one) alpha character
- email
  - Required syntax: [min 1 character + @ + min 1 character + . + 3x alpha characters]
- activities (Register for Activities)
  - Requires that the user has selected a minimum of one activity prior to submitting the form
  - The user may only select one activity within a given timeframe (date & time)

*ADDED FEATURES*

Feature 1 - Credit Card Live Validation:

The following *(Required) credit card specific <input> fields are validated in real time:
(Note: Credit Card, Zip Code, and CVV fields only validated when Credit Card is selected)
- card number
  - Validated to ensure 13-16 numeric characters have been inputted into the Card Number* field
- zip code
  - Validate to ensure a minimum of 5 numeric characters have been inputted into the Zip Code* field
- cvv
  - Validate to ensure a minimum of 3 numeric characters have been inputted into the CVV* field

Feature 2 - Conditional Error Messages for Email <input>:
- The emailValidator() function test whether the email is valid in the following ways:
  - Overall, the function tests to ensure the email contains alphanumerictext@text.text
  - If a user inputs two + '@' symbols prior to the '.com', the .email-hint textContent is changed to:
    - "Please enter a valid Email address:  Email addresses may contain only 1 '@' symbol. Example: username@domain-name.com"
  - If a user forgets to add a '.' (dot) at the end of the address, the .email-hint textContent is changed to:
    - "Please enter a valid Email address: The domain name must be linked to a Top Level Domain (TLD) Extension (.com, .net, .org...). Example: 'username@domain-name.com'"
  - Otherwise, the user is shown the following message:
    - "Please enter a valid Email address.""


Live-validation for name, email, and activities fields will occur after initial form is submitted. Hints will not show unless the user did not enter valid information in required input fields. Credit Card validation is live on load.


Changed CSS colors.

Updated 1/4/2020, by Matt Coale
