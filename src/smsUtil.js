const axios = require("axios").default;
const qs = require("qs");

const accountSid = process.env.VUE_APP_TWILIO_SID;
const authToken = process.env.VUE_APP_TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.VUE_APP_PHONE_NUMBER;

export async function sendText(phoneNumber, message) {
    const payload = qs.stringify({
        Body: message,
        From: twilioNumber,
        To: phoneNumber
    });
    const auth = {
        username: accountSid,
        password: authToken
    }
    await axios.post("https://api.twilio.com/2010-04-01/Accounts/" + accountSid + "/Messages.json",
        payload,
        { auth }
    );
}