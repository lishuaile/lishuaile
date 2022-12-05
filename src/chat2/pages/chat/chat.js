// pages/chat/chat.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {


        this.setData({
            id: options.id
        })




        this.websocketXin();
        var that = this
        wx.connectSocket({
            url: 'ws://124.220.177.24:9503',
            success: function (res) {
                wx.onSocketOpen((result) => {
                    var send = {
                        'my': 'a',
                        'to': 'b',
                        'type': 'open'
                    };
                    that.send(JSON.stringify(send))
                })
            }
        })
        wx.onSocketMessage((result) => {
            console.log(result.data)
            if (result.data == 5000) {
                wx.showToast({
                  title: '对方不在线',
                  icon:'error',
                  duration:2000
                })
            }
            var list = this.data.list
            var arr = {
                'class': 'you',
                'msg': result.data
            }
            list.push(arr);
            this.setData({
                list: list
            })
        })
    },

    send: function (data) {
        wx.sendSocketMessage({
            data: data,
        })
    },
    txt: function (res) {
        this.setData({
            txt: res.detail.value
        })
    },
    btn: function (res) {
        var txt = this.data.txt
        var that = this

        var send = {
            'my': 'a',
            'to': 'b',
            'type': 'send',
            'msg': txt
        }
        var list = this.data.list
        list.push({
            'class': 'my',
            'msg': txt
        });
        this.setData({
            list: list
        })
        console.log(this.data.list)
        this.send(JSON.stringify(send));
    },
    websocketXin: function () {
        var that = this
        var send = {
            'my': 'a',
            'type': 'xin',
        }
        var time = setInterval(() => {
            this.send(JSON.stringify(send))
            console.log('当前心跳已重新链接')
        }, 50000);
    },
    close: function () {
        var send = {
            'my': 'a',
            'type': 'close',
        }
        this.send(JSON.stringify(send))//告诉服务端‘我要退出链接’服务端删除redis
        wx.closeSocket({
            code: 1000,
        })

        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    btn2:function(res)
    {
        console.log(this.data.list)
        clearTimeout(this.time)
        that.time = setTimeout(() => {
            console.log(1)
        }, 1000);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})