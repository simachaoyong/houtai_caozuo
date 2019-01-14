var express = require('express');
var router = express.Router();
let {
	insert,
	find,
	del,
	update
} = require("../lib/mongod.js");
var token=require("../public/javascripts/token.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//查询数据
router.post('/findUser', async(req, res, next)=>{
	let {username,pwd}=req.body;
	// 最后返回出来的应该是一个加密的乱码才对
  let data=await find("user",
	{username});
	console.log(data);//这里是得到用户的用户名和信息
	//接下来用密码做判断
	if(data[0].pwd===pwd){
		res.send({
			status:"success",
			token:token.createToken({username,pwd},300)//乱码有时效性
		});
	}else{
		res.send({
			status:"fail"
		});
	}
});
// 验证token的时效性，token一般放在headers部分
router.post('/autoLogin', async (req, res, next) => {
  // console.log(req.headers)
  res.send({
    status: token.checkToken(req.headers.token)
  })
})
module.exports = router;
