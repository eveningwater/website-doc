const worker = new Worker('./initializingWorker.js');
worker.postMessage('hello');
worker.postMessage(',my friend');
worker.postMessage(',eveningwater');
