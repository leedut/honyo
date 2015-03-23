var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/',function(req,res){
	var msg = [];
	superagent.get('http://oldssdut.dlut.edu.cn/index.php/News/student.html').end(function(err,str){
		if(err){
			res.send('error');
			return false;
		}
		var $ = cheerio.load(str.text);
		$('table').eq(4).find('a').each(function (idx, element) {
	        var $element = $(element);
	        if( !!$element.attr('title') ){
		        msg.push({
		          title: $element.attr('title'),
		          href: $element.attr('href')
		        });
	        }
	    });
		res.send(msg);
	});
});

app.listen(3000,function(req,res){
	console.log('run on 3000');
});