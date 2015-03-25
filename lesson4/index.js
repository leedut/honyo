//取得学院通知首页所有新闻的具体发起时间
//总共需要发起1+href.length次请求，代码应考虑高并发的处理
//本代码未考虑同时并发，最大并发为href.length次，可以通过async模块限制并发次数
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var href = [];

superagent.get('http://ssdut.dlut.edu.cn/ywgg/xueyuanxinwen.htm').end(function(err,result){
	if(err){
		console.log(err);
		return false;
	}
	var $ =cheerio.load(result.text);
	$('div.rjxw_right ul li').each(function(i, elem) {
		var temp = $(this).find('a').attr('href');
		temp = 'http://ssdut.dlut.edu.cn'+temp.substr(2,100);
		href.push(temp);
	});

	//已取得所有链接
	//eventproxy为异步模块，实际机制为观察者模式（也可以叫做消息中心模式），监听已完成事件的触发信号；当触发信号达到要求时，由该模块触发绑定的回调函数
	//相比于函数内部通过setTimeOut函数和jquery自触发模式，这种异步方式更易于理解、代码优化最好
	//jquery中pub-sub插件也能实现这个功能 机制相同
	var ep = new eventproxy();
	ep.after('load_href', href.length, function(_data) {
		//emit指令回传的res实际上是压入了_data中，_data本身是数组
		// 命令ep : 重复监听href.length 次`load_href` 事件再行动
		var $ = null;
		var _str,_title;
		for(var i in _data){
			$ = cheerio.load(_data[i]);
			_title = $("div.rjxyfg_mid form h1.mt_30").text();
			_str = $("div.rjxyfg_mid form div.mt_15").text();
			console.log( _title +"\r\n"+ _str.split(" ")[0] );
		}
	});

	href.forEach(function (url) {
	  	superagent.get(url).end(function (err,res) {
	      console.log('fetch ' + url + ' successful');
	      ep.emit('load_href',res.text);
	    });
	});

});