var cluster = require('cluster')
var os = require('os')

// CPU 数量
var numCPUs = os.cpus().length

var workers = {}
if(cluster.isMaster) {
	console.log(`主进程 ${process.pid} 正在运行`)
	// 衍生工作进程。
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`工作进程 ${worker.process.pid} 已退出`);
	});
} else {
		let app = require('./app')
		app.listen(3000)
		console.log(`工作进程 ${process.pid} 已启动`);
}