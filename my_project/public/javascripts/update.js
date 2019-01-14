jQuery(($) => {
	//更新数据相关内容
	let updateData = (obj) => {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: "POST",
				url: "http://localhost:3000/setting/updateData",
				data: obj,
				success(data) {
					resolve(data);
				}
			})
		});
	}
	// 传图片到数据库
	let insertimg = (formdata) => {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: "POST",
				url: "http://localhost:3000/setting/insertImg",
				data: formdata,
				processData: false,
				contentType: false,
				success(data) {
					resolve(data);
				}
			})
		});
	}
	//token的验证需要访问数据库
	let tokenFn = (tokendata) => {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: "POST",
				headers: {
					token: tokendata
				},
				url: "http://localhost:3000/users/autoLogin",
				success(data) {
					resolve(data);
				}
			})
		});
	};
	// 判断token的时效性
	(async function () {
		let tokendata = localStorage.getItem("token");
		let data = await tokenFn(tokendata);
		if (data.status === true) {
			//token时效性没过的话就能继续下面的内容
			//这个获取总工资
			$("#inputAddress2").on("focus", function () {
				$(this).val($("#inputEmail5").val() - $("#inputEmail6").val() - $("#inputPassword6").val());
			});
			// 先要把图片插入到那个文件夹中
			$(".headimg").on("change", async () => {
				let formdata = new FormData();
				formdata.append('headimg', $(".headimg")[0].files[0]);
				let data = await insertimg(formdata);
				$("#headimg img").attr("src", `../images/${data.file.filename}`);
			})
			// 插入员工工资数据
			$(".btn-primary").on("click", async function (e) {
				e.preventDefault();
				let bianhao = $("#inputEmail4").val();
				let name = $("#inputPassword4").val();
				let gongzi = $("#inputEmail5").val();
				let yuefen = $("#inputPassword5").val();
				let shebao = $("#inputEmail6").val();
				let gongjijin = $("#inputPassword6").val();
				let heji = $("#inputAddress2").val();
				let imgurl = $("#headimg img").attr("src").split("/")[2] ? $("#headimg img").attr("src").split("/")[2] : "";
				let data = await updateData({ bianhao, name, gongzi, yuefen, shebao, gongjijin, heji, imgurl });
				if (data.n == 1) {
					alert(`工号为${bianhao}的员工，工资数据修改成功`);
				}
				$("#inputEmail4").val("");
				$("#inputPassword4").val("");
				$("#inputEmail5").val("");
				$("#inputPassword5").val("");
				$("#inputEmail6").val("");
				$("#inputPassword6").val("");
				$("#inputAddress2").val("");
			});
		} else {
			location.href = "../login.html";
		}
	})();
	//这个获取总工资
	// $("#inputAddress2").on("focus", function () {
	// 	$(this).val($("#inputEmail5").val() - $("#inputEmail6").val() - $("#inputPassword6").val());
	// });
	// // 先要把图片插入到那个文件夹中
	// $(".headimg").on("change", async () => {
	// 	let formdata = new FormData();
	// 	formdata.append('headimg', $(".headimg")[0].files[0]);
	// 	let data = await insertimg(formdata);
	// 	$("#headimg img").attr("src", `../images/${data.file.filename}`);
	// })
	// // 插入员工工资数据
	// $(".btn-primary").on("click", async function (e) {
	// 	e.preventDefault();
	// 	let bianhao = $("#inputEmail4").val();
	// 	let name = $("#inputPassword4").val();
	// 	let gongzi = $("#inputEmail5").val();
	// 	let yuefen = $("#inputPassword5").val();
	// 	let shebao = $("#inputEmail6").val();
	// 	let gongjijin = $("#inputPassword6").val();
	// 	let heji = $("#inputAddress2").val();
	// 	let imgurl = $("#headimg img").attr("src").split("/")[2] ? $("#headimg img").attr("src").split("/")[2] : "";
	// 	let data = await updateData({ bianhao, name, gongzi, yuefen, shebao, gongjijin, heji, imgurl });
	// 	if (data.n == 1) {
	// 		alert(`工号为${bianhao}的员工，工资数据修改成功`);
	// 	}
	// 	$("#inputEmail4").val("");
	// 	$("#inputPassword4").val("");
	// 	$("#inputEmail5").val("");
	// 	$("#inputPassword5").val("");
	// 	$("#inputEmail6").val("");
	// 	$("#inputPassword6").val("");
	// 	$("#inputAddress2").val("");
	// });
})