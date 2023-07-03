const worker = new Worker('./terminateWorker.js');
setTimeout(() => {
  worker.postMessage('Hello');
  worker.terminate();
  worker.postMessage(',eveningwater');
  setTimeout(() => worker.postMessage('!'), 0);
}, 1000);
