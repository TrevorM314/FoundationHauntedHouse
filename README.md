# Foundation Haunted House Waitlist

## Project setup

To set up this project, you will need to install [Node.js](https://nodejs.org/en/download/) and [npm (Node Package Manager)](https://www.npmjs.com/).

Run the following command to install all external libraries needed for the project:

```
npm install
```

Next, you will have to create a `.env` file. Use `example.env` to see the needed environment variables. You will need a [Twilio](https://www.twilio.com/try-twilio) account for the phone number and  api key.

### Windows Extra Steps

If you are running the project on Windows, you will need to edit the `package.json` file. Within the scripts section, change all occurrences of `export ...` to `set ...` if you are running in CMD. For example, `export NODE_OPTIONS=--openssl-legacy-provider` becomes `set NODE_OPTIONS=--openssl-legacy-provider`

If you are running in powershell, change `export ...` to `$env:...`. For example, `export NODE_OPTIONS=--openssl-legacy-provider` becomes `$env:NODE_OPTIONS=--openssl-legacy-provider`

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

At the end of the night, you can download the data to see some stats on. If you run `getStats.py` on this downloaded file, you will see some stats, such as the number of groups and the number of people that went through the haunted house, as well as the average wait time.

## Editing the Website

If you only want to make aesthetic changes, you will only need to edit `waitlist.vue`.  Edit the background of the `.page` css selector.

Most of the website's functionality is in `store.js` which contains all the group data.