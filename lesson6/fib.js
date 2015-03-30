var fib = function(n){
	if(n === 0){
		return 0;
	}
	if(n === 1){
		return 1;
	}
	return fib(n-1)+fib(n-2);
};

if (require.main === module) {
  // 如果是直接执行 fib.js，则进入此处
  // 如果 fib.js 被其他文件 require，则此处不会执行。
  var n = Number(process.argv[2]);
  console.log('fibonacci(' + n + ') is',fib(n));

}

exports.fibonacci = fib;