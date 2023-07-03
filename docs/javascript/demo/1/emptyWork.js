console.log('global object:', self);
// 没有window,全局对象是self，以下会报错
// Uncaught ReferenceError: window is not defined
// console.log(window);
console.log('console:', self.console);
console.log('import scripts method:', importScripts);
