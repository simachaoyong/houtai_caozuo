jQuery(($)=>{
	// 删除对应的数据
	var delData=(obj)=>{
		return new Promise((resolve,reject)=>{
			$.ajax({
				type:"POST",
				url:"http://localhost:3000/setting/deleteData",
				data:obj,
				success(data){
					resolve(data);
				}
			})
		})
	};
	//token的验证需要访问数据库
	let tokenFn=(tokendata)=>{
		return new Promise((resolve,reject)=>{
			$.ajax({
				type:"POST",
				headers:{
					token:tokendata
				},
				url:"http://localhost:3000/users/autoLogin",
				success(data){
					resolve(data);
				}
			})
		});
	};
	// 判断token的时效性
	(async function(){
		let tokendata=localStorage.getItem("token");
		let data=await tokenFn(tokendata);
		if(data.status===true){
			//token时效性没过的话就能继续下面的内容
			$(".btn-primary").on("click",async function(e){
				e.preventDefault();
				let bianhao=$("#inputAddress2").val();
				let data=await delData({bianhao:bianhao});
				if(data.n==1){//表明删除成功
					alert(`您将工号为${bianhao}的员工，工资数据成功删除`);
				}else{
					alert("数据没有删除成功，请输入正确的员工工号");
				}
				$("#inputAddress2").val("");
			})
		}else{
			location.href="../login.html";
		}
	})();
	// $(".btn-primary").on("click",async function(e){
	// 	e.preventDefault();
	// 	let bianhao=$("#inputAddress2").val();
	// 	let data=await delData({bianhao:bianhao});
	// 	if(data.n==1){//表明删除成功
	// 		alert(`您将工号为${bianhao}的员工，工资数据成功删除`);
	// 	}else{
	// 		alert("数据没有删除成功，请输入正确的员工工号");
	// 	}
	// 	$("#inputAddress2").val("");
	// })
})