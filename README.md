# Foundation Haunted House Waitlist

## Project setup

To set up this project, you will need to isntall [Node.js](https://nodejs.org/en/download/) and the [npm (Node Package Manager)](https://www.npmjs.com/).

Run the following command to install all external libraries needed for the project:

```
npm install
```

Next, you will have to create a `.env` file. Use `example.env` to see the needed environment variables. You will need a [Twilio](https://www.twilio.com/try-twilio) account for the phone number and  api key.

## Running the Website

To run the website locally, run the following command:

```
npm run serve
```

The website will likely run on http://localhost:8080, but it may run on a different port, so check your terminal output. 

### Using the website

To display the waitlist, navigate to http://localhost:8080/waitlist in a web browser.

For the front desk operator, open up another window using the *same* browser in the *same* computer, and go to http://localhost:8080/registration

Ideally, the computer should be hooked up to a tv. The tv can show the waitlist while the computer monitor will be used for registration.

## Editing the Website

If you only want to make aesthetic changes, you will only need to edit `waitlist.vue`.  Edit the background of the `.page` css selector.

Most of the website's functionality is in `store.js` which contains all the group data.