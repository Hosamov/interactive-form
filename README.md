# interactive-form
Project 3 - Interactive Form in JS

An interactive form using vanilla JS. The following list is in order of appearance on the screen:

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

The following *(Required) <input> fields are validated (Note: Credit Card, Zip Code, and CVV fields only validated with Credit Card is selected):
- name
- email
- activities (Register for Activities)
- card number
- zip code
- cvv

Live-validation will occur after for submitted. Hints will not show unless the user did not enter valid information in required input fields.

Updated 1/4/2020, by Matt Coale
