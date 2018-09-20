var fs = require('fs');

function start(pidfile, exec) {
	fs.writeSync(pidfile, process.pid);
	exec();
	fs.unlinkSync(pidfile);
}

function with_pid(filename, exec) {
	const pidfile = filename+".pid"
	if (fs.existsSync(pidfile)) {
		let existing_pid = fs.readFileSync(pidfile, 'utf8');
		try {
			process.kill(existing_pid, 0);
			console.error("Already Running, exiting...");
			process.exit(0);
		} catch(e) {
			start(pidifle, exec);
		}
	} else {
		start(pidifle, exec);
	}
}

module.export = {
	with_pid: with_pid
}