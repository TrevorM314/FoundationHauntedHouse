// const accountSid = process.env.TWILIO_ACCOUNT_SID;
const accountSid = '';
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const authToken = '';
console.log('account ID: ' + accountSid);
console.log('authToken: ' + authToken);
const client = require('twilio')(accountSid, authToken);
const twilio_number = '+17659975625';
const Path = require("path");


const Hapi = require("@hapi/hapi"); // Server
const server = Hapi.server({
    host: "localhost",
    port: 3000,
    routes: {
        cors: true,
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

async function init() {
    // Show routes at startup.
    await server.register(require("blipp"));

    // Output logging information.
    await server.register({
        plugin: require("hapi-pino"),
        options: {
            prettyPrint: true
        }
    });

    // Configure static file service.

    await server.register(require("@hapi/inert"));

    // Configure routes.
    server.route([
        {
            method: "POST",
            path: "/send/",
            options: {
                description: "Test send a text",
            },
            handler: async (req) => {
                client.messages
                    .create({
                        from: twilio_number,
                        to: req.payload.to,
                        body: req.payload.body
                    });
                return { parsed: true };
            }
        },
    ]);

    await server.start();
}

init();