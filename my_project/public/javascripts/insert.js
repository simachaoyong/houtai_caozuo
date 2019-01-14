jQuery(($) => {
	//插入前先要判断
	let findData = (obj) => {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: "GET",
				url: "http://localhost:3000/setting/findData",
				data: obj,
				success(data) {
					resolve(data);
				}
			})
		});
	}
	// 插入的内容
	let insertData = (obj) => {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: "POST",
				url: "http://localhost:3000/setting/insertData",
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
				// 这个查到员工的数据
				let data = await findData({ bianhao: bianhao });
				if (bianhao.trim().length > 0 && data.length > 0) {
					// 这个表明查到了那个员工，就不能提交
					alert("您提交的员工编号，已经存在，请重新再提");
				} else if (data.length <= 0) {
					if (bianhao.trim().length > 0 && name.trim().length > 0 && gongzi.trim().length > 0 && yuefen.trim().length > 0 && shebao.trim().length > 0 && gongjijin.trim().length > 0 && heji.trim().length > 0) {
						// 这个就是插入员工的数据
						let indata = await insertData({ bianhao: bianhao, name: name, gongzi: gongzi, yuefen: yuefen, shebao: shebao, gongjijin: gongjijin, heji: heji, imgurl: imgurl });
						if (indata.ops.length > 0) {
							alert("员工工资数据插入成功！");
						}
					}
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
	})()
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
	// 	// 这个查到员工的数据
	// 	let data = await findData({ bianhao: bianhao });
	// 	if (bianhao.trim().length > 0 && data.length > 0) {
	// 		// 这个表明查到了那个员工，就不能提交
	// 		alert("您提交的员工编号，已经存在，请重新再提");
	// 	} else if (data.length <= 0) {
	// 		if (bianhao.trim().length > 0 && name.trim().length > 0 && gongzi.trim().length > 0 && yuefen.trim().length > 0 && shebao.trim().length > 0 && gongjijin.trim().length > 0 && heji.trim().length > 0) {
	// 			// 这个就是插入员工的数据
	// 			let indata = await insertData({ bianhao: bianhao, name: name, gongzi: gongzi, yuefen: yuefen, shebao: shebao, gongjijin: gongjijin, heji: heji, imgurl: imgurl });
	// 			if (indata.ops.length > 0) {
	// 				alert("员工工资数据插入成功！");
	// 			}
	// 		}
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