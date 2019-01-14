var express = require('express');
var router = express.Router();
let multer=require("multer");
let {
	insert,
	find,
	del,
	update
} = require("../lib/mongod.js");
var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建。
	destination: function(req, file, cb) {
		cb(null, './public/images')
	},
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//给图片加上时间戳格式防止重名名
		//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
var upload = multer({
	storage: storage
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 得到数据渲染页面
router.get('/findData', async(req, res, next)=>{
	let {bianhao}=req.query;
	if(bianhao){
		let data=await find("my_project",
		{bianhao});
		res.send(data);
	}else{
		let data=await find("my_project",{});
		res.send(data);
	}
});
//插入数据内容
router.post('/insertData', async(req, res, next)=>{
	//先将图片插入到images中先
	let {bianhao,name,gongzi,yuefen,shebao,gongjijin,heji,imgurl}=req.body;
	let data=await insert("my_project",[{bianhao,name,gongzi,yuefen,shebao,gongjijin,heji,imgurl}]);
	res.send(data);
});
// 删除数据
router.post('/deleteData', async(req, res, next)=>{
	let {bianhao}=req.body;
	let data=await del("my_project",{bianhao});
	res.send(data);
});
// 修改对应的数据
router.post('/updateData', async(req, res, next)=>{
	let {bianhao,name,gongzi,yuefen,shebao,gongjijin,heji,imgurl}=req.body;
	let finddata=await find("my_project",{bianhao});
	console.log(finddata);
	//后面的数据，假设那个存在就修改哪个
	let data=await update("my_project",{bianhao},{
		name:name?name:finddata[0].name,
		gongzi:gongzi?gongzi:finddata[0].gongzi,
		yuefen:yuefen?yuefen:finddata[0].yuefen,
		shebao:shebao?shebao:finddata[0].shebao,
		gongjijin:gongjijin?gongjijin:finddata[0].gongjijin,
		heji:heji?heji:finddata[0].heji,imgurl:imgurl?imgurl:finddata[0].imgurl
	});
	res.send(data);
	// 这个封装没有问题
});
// 上传图片的内容
router.post('/insertImg', upload.single('headimg'), function(req, res, next) {
	console.log(req.file.filename);//需要把这个保存在数据库中
	res.json({
    status:"success",
    file:req.file
	});
});
module.exports = router;
