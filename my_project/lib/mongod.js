// 封装mongodb数据库的相关的方法
const {
	MongoClient
} = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'sima';
// Use connect method to connect to the server
// 建立与数据库的联系
let connect = () => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, function (err, client) {
			const db = client.db(dbName);
			//这里的话就是执行插入的方法
			resolve({ db, client });
			//这个需要把db和client都返回出来，给下面的内容使用
		});
	});
};
// 封装插入的方法
let insert = (col, arr) => {
	//col是表名
	// arr是需要插入的数据
	return new Promise(async (resolve, reject) => {
		let { db, client } = await connect();
		const collection = db.collection(col);
		// Insert some documents
		collection.insertMany(arr, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
				client.close();
			}
		});
	})
};
// 封装查询的内容
let find = (col, obj) => {
	//col是表名
	// 查询的话传入的是一个对象，obj参数时对象
	return new Promise(async (resolve, reject) => {
		let { db, client } = await connect();
		const collection = db.collection(col);
		// Insert some documents
		collection.find({ ...obj }).toArray(function (err, docs) {
			if(err){
				reject(err);
			}else{
				resolve(docs);
				client.close();
			}
		});
	})
};
// 删除对应的数据
let del=(col,obj)=>{
	return new Promise(async(resolve,reject)=>{
		let {db,client}=await connect();
		const collection=db.collection(col);
		collection.deleteOne({...obj},(err,result)=>{
			if(err){
				reject(err);
			}else{
				resolve(result);
				client.close();
			}
		})
	})
}
//封装修改的方法
let update=(col,obj1,obj2)=>{
	return new Promise(async(resolve,reject)=>{
		let {db,client}=await connect();
		const collection=db.collection(col);
		collection.updateOne({...obj1},{ $set: {...obj2} },(err,result)=>{
			if(err){
				reject(err);
			}else{
				resolve(result);
				client.close();
			}
		})
	})
}
module.exports = { insert, find, del, update};