const cluster = require('cluster');
const express = require('express');
const os = require('os');

const app = express();

function dowork(duration) {
    // setTimeout(() => {
    //     console.log(`Worker ${process.pid} finished.`);
    // }, duration);
    const start = Date.now()
    while(Date.now() - start < duration){}
}

if (cluster.isPrimary) {
    console.log(os.cpus().length);
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {
    app.get('/', (req, res) => {
        dowork(5000); // Simulate work without blocking
        console.log(`Hi there from Worker ${process.pid} , ${Date.now()}`)
        res.send(`Hi there from Worker ${process.pid}`);
    });

    app.listen(3000, (err) => {
        if (err) {
            console.error(`Worker ${process.pid} encountered an error:`, err);
        } else {
            console.log(`Worker ${process.pid} is listening on port 3000`);
        }
    });
}
