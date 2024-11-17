const {kafka} = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init(){
    const producer = kafka.producer();
    console.log('Connecting producer...');
    await producer.connect();
    console.log('Succesfully Connected producer!');

    rl.setPrompt("> ");
    rl.prompt();
    
    rl.on("line", async function(line) {
        const [ridername, location] = line.split(" ");
        await producer.send({
            topic: 'rider-updates',
            messages: [{
                partition: location.toLocaleLowerCase() === 'north' ? 0 : 1,
                key: 'location-update',
                value: JSON.stringify({
                    rider: ridername,
                    latitude: 34.23,
                    longitude: 23.45,
                    timestamp: Date.now(),
                    loc: location.toLocaleUpperCase(),
                }),}
            ]
        });
        console.log('Successfully produced message!');
    }).on("close", async function() {
        console.log('Disconnecting producer...');
        await producer.disconnect();
        console.log('Disconnected producer...');
    });
}
init();