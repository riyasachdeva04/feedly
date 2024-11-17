const {kafka} = require('./client');

async function init(){
    const admin = kafka.admin();
    console.log('Connecting admin...');
    admin.connect();
    console.log('Connected admin!');
    console.log('Creating rider updates topic...');
    // await admin.deleteTopics({topics: ['rider-updates']});
    await admin.createTopics({
        topics:[
            {
                topic: 'rider-updates',
                numPartitions: 2,
            },
        ]
    });
    console.log('Successfully Created rider updates topic!');
    console.log('Disconnecting Admin...');
    await admin.disconnect();
}

init();