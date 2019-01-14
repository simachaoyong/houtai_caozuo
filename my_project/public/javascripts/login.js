jQuery(($)=>{
	let postUser=(obj)=>{
		return new Promise((resolve,reject)=>{
			$.ajax({
				type:"POST",
				url:"http://localhost:3000/users/findUser",
				data:obj,
				success(data){
					resolve(data);
				}
			});
		});
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
	// 判断token的时效性，免登录的内容
	(async function(){
		let tokendata=localStorage.getItem("token");
		let data=await tokenFn(tokendata);
		if(data.status===true){
			location.href="./project_html/find.html";
		}else{
			// 登录
			$(".tijiao").on("click",async function(e){
				e.preventDefault();
				let username=$("#loginName").val();
				let pwd=$("#Possword").val();
				let data=await postUser({username,pwd});
				// 将这个函数封装起来
				let fn={
					success(){
						localStorage.setItem("token",data.token);
						location.href="./project_html/find.html";
					},
					fail(){
						alert("不好意思，登录失败");
					}
				};
				fn[data.status]();
				$("#loginName").val("");
				$("#Possword").val("");
			});
		}
	})();
})