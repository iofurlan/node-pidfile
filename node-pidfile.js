const fs = require('fs');

function start(pidfile, exec) {
    fs.writeFileSync(pidfile, process.pid);
    console.log("started: ["+process.pid+"] - "+pidfile);
    exec();
}

function with_pid(filename, exec) {
    const pidfile = filename + ".pid";
    if (fs.existsSync(pidfile)) {
        let existing_pid = fs.readFileSync(pidfile, 'utf8');
        try {
            process.kill(existing_pid, "0");
            console.error("Already Running, exiting...");
            process.exit(0);
        } catch (e) {
            start(pidfile, exec);
        }
    } else {
        start(pidfile, exec);
    }
}

module.exports = with_pid;