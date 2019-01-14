jQuery(($)=>{
	// 利用数据渲染页面的内容
	var $contTbody=$("#contTbody");
	// ajax数据请求，这个页面只有查数据的情况
	var getData=(obj)=>{
		return new Promise((resolve,reject)=>{
			$.ajax({
				type:"GET",
				url:"http://localhost:3000/setting/findData",
				data:obj,
				success(data){
					resolve(data);
				}
			})
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
	// 判断token的时效性
	(async function(){
		let tokendata=localStorage.getItem("token");
		let data=await tokenFn(tokendata);
		if(data.status===true){
			(async ()=>{
				let data=await getData({});
				$contTbody.html(data.map((item)=>{
					return `<tr style="text-align:center;">
								<td>${item.bianhao}</td>
								<td><img src="../images/${item.imgurl}"/></td>
								<td>${item.name}</td>
								<td>${item.gongzi}</td>
								<td>${item.yuefen}</td>
								<td>${item.shebao}</td>
								<td>${item.gongjijin}</td>
								<td>${item.heji}</td>
							</tr>`
				}).join(""));
			})();
			$(".navbar-nav .nav-item .nav-link").on("click",async function(e){
				e.preventDefault();
				let $searchTxt=$(".form-control").val();
				if($searchTxt.trim().length==0){
					return;
				}
				let data=await getData({bianhao:$searchTxt});
				// console.log(data);
				if(data.length>0){
					$contTbody.find("tr").remove();
					$contTbody.html(data.map((item)=>{
						return `<tr style="text-align:center;">
									<td>${item.bianhao}</td>
									<td><img src="../images/${item.imgurl}"/></td>
									<td>${item.name}</td>
									<td>${item.gongzi}</td>
									<td>${item.yuefen}</td>
									<td>${item.shebao}</td>
									<td>${item.gongjijin}</td>
									<td>${item.heji}</td>
								</tr>`
					}).join(""));
				}else{
					alert("不好意思，您输入的内容查不到，请输入正确的员工编号");
				}
				$(".form-control").val("");
			});
		}else{
			location.href="../login.html";
		}
	})();
	// 得到所有的数据
	// (async ()=>{
	// 	let data=await getData({});
	// 	$contTbody.html(data.map((item)=>{
	// 		return `<tr style="text-align:center;">
	// 					<td>${item.bianhao}</td>
	// 					<td><img src="../images/${item.imgurl}"/></td>
	// 					<td>${item.name}</td>
	// 					<td>${item.gongzi}</td>
	// 					<td>${item.yuefen}</td>
	// 					<td>${item.shebao}</td>
	// 					<td>${item.gongjijin}</td>
	// 					<td>${item.heji}</td>
	// 				</tr>`
	// 	}).join(""));
	// })();
	// // 接下来查询
	// $(".navbar-nav .nav-item .nav-link").on("click",async function(e){
	// 	e.preventDefault();
	// 	let $searchTxt=$(".form-control").val();
	// 	if($searchTxt.trim().length==0){
	// 		return;
	// 	}
	// 	let data=await getData({bianhao:$searchTxt});
	// 	// console.log(data);
	// 	if(data.length>0){
	// 		$contTbody.find("tr").remove();
	// 		$contTbody.html(data.map((item)=>{
	// 			return `<tr style="text-align:center;">
	// 						<td>${item.bianhao}</td>
	// 						<td><img src="../images/${item.imgurl}"/></td>
	// 						<td>${item.name}</td>
	// 						<td>${item.gongzi}</td>
	// 						<td>${item.yuefen}</td>
	// 						<td>${item.shebao}</td>
	// 						<td>${item.gongjijin}</td>
	// 						<td>${item.heji}</td>
	// 					</tr>`
	// 		}).join(""));
	// 	}else{
	// 		alert("不好意思，您输入的内容查不到，请输入正确的员工编号");
	// 	}
	// 	$(".form-control").val("");
	// });
})