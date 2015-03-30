var express = require('express');
var utility = require('utility');

var app = express();

app.get('/',function(req,res){
	if(!!req.query.q){
		res.send(utility.md5(req.query.q));
	}
	else{
		res.send('no q');
	}
});

app.listen(3000,function(req,res){
	console.log('running on 3000');
});