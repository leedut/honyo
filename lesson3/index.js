var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');

var app = express();

app.get('/',function(req,res){
	var msg = [];
	var get_req = superagent.post('http://202.118.65.20:8081//Default.aspx').set('Content-Type','application/x-www-form-urlencoded').set('Access-Control-Allow-Origin','*').accept('application/json').send({
__VIEWSTATE:'/wEPDwUJLTY4NDQ4MzYyZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUMSW1hZ2VCdXR0b24xV9Pz0r45bARFKW/DYVwAtIOIjZTDqywD0s+b1PK5AEE=',
__EVENTVALIDATION:'/wEdAAkfWcVmlKYxLh//tSU0Fyxrwq7Fr2euId72M7tGGVWWmjcB0ByOc3lD017dG+u9BrHpkAKvHlFmeWUpJ6tT4i4q3AAkWX6zYhvSPTmzJ9kqznESVQr6muXA0GC5J72tPjJpiQ8hpL+75B2xTt54sPFlg0+atK5dzWd7wF0hGyiCAZYQJk9BEu6uNMVVQ9NYQ1ZGiB+QpKBZL/yebAX6latO19hoxnmlzyXzgxA2CWE7Mw==',
TxtUserName:201292460,
TxtUserPwd:123,
'ImageButton1.x':25,
'ImageButton1.y':7,
RadioButtonList1:'本科生'}).end(function(err,result){
		//var $ = cheerio.load(str.text);
		//$('table').eq(4).find('a').each(function (idx, element) {
	    //    var $element = $(element);
	    //    if( !!$element.attr('title') ){
		//        msg.push({
		//          title: $element.attr('title'),
		//          href: $element.attr('href')
		//        });
	    //    }
	    //});
		console.log(result.header);
		var _h = result.header;
		//superagent.get('http://202.118.65.7/jw/UGInfo/UGInfoEdit.aspx').set('Cookie','ASP.NET_SessionId=1pxlb2s3hcevtxxg5dbwu2xh').end(
		//function(err,str){
		//		console.log(str.text);
		//	}
		//);
		var cookie = result.headers['set-cookie'];
		console.log(cookie);
	});

	//var stream = fs.createWriteStream('my.json');
	//get_req.pipe(stream);
});

app.listen(3000,function(req,res){
	console.log('run on 3000');
});