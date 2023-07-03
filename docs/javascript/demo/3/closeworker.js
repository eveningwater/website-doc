self.postMessage('Hello');
// 终止工作者线程,但终止过程不是同步的，因此下一行代码执行结果仍然会打印出来
self.close();
self.postMessage(',eveningwater');
// 这行代码不会打印出结果
setTimeout(() => self.postMessage('!'), 0);
