const {kafka} = require("./client");
const group = process.argv[2];

async function init(){ 
    const consumer = kafka.consumer({groupId: group});
    console.log('Connecting consumer...');
    await consumer.connect();
    console.log('Connected consumer!');
    await consumer.subscribe({topics: ["rider-updates"], fromBeginning: true});
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log(`Consumer Group : ${group} Topic: ${topic} partition: ${partition} message:`,message.value.toString());
        },
    });
}
init();