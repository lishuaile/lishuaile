// pages/login/login.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		phone:"",
    catCode:"",
		msg:"请输入验证码",
    disableds:false
	},
	phone(e){
		let phone=e.detail.value
		 this.setData({
			 phone:phone
		 })
 },
 catCode(e){
	let catCode=e.detail.value
	 this.setData({
		catCode:catCode
	 })
},
getCode(){
	let phone=this.data.phone
	let _that=this
	if(phone==""){
		wx.showToast({
			title: '手机号码不能为空',
			icon:"none"
		})
		return
	}
	if(!/^1[3456789][0123456789]{9}$/.test(phone)){
		wx.showToast({
			title: '手机号码规则不对',
			icon:"none"
		})
		return
	}
	let time=60
	this.setData({
		disableds:true
	})
 let timer=setInterval(function(){
			if(time==0){
				_that.setData({
					disableds:false,
					tipmsg:"点击重洗发送",
				})
				clearInterval(timer)
				return;
			}
			_that.setData({
				msg:"剩余时间"+time+"秒",
			})
			time--
	},1000)
	console.log(1);
	wx.request({
		url: 'http://www.week3.com/index.php/api/getCodeLogin',
		data:{phone},
		method:"GET",
		success:res=>{
			console.log(res);
			if(res.data.code!=200){
				wx.showToast({
					title: "发送失败",
					icon:"none"
				})
				return
			}
		
		}
	})
},
login(){
	let phone=this.data.phone
	let catCode=this.data.catCode
	if(!/^1[3456789][0123456789]{9}$/.test(phone)){
		wx.showToast({
			title: '格式不对',
			icon:"none"
		})
		return
}
if(catCode==""){
	wx.showToast({
		title: '验证码不能为空',
		icon:"none"
	})
	return
}
		wx.request({
			url: 'http://www.week3.com/index.php/api/login',
			method:"POST",
			data:{phone:phone,code:catCode},
			success:res=>{
				if(res.data.code==200){
					wx.showToast({
						title: '登录成功',
						icon:"none"
					})
					wx.setStorageSync('token', res.data.data)
					setInterval(function(){
							wx.navigateTo({
								url: '/pages/article/article',
							})
				},3000)
				
				}else{
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
          return
        }
			
			}
		})
},
})