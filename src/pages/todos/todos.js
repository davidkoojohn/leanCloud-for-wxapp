let app = getApp()
const AV = require('../../utils/av-weapp')
const Todo = require('../../model/todo')
const Consumer = require('../../model/consumer')

Page({
  data: {
    test: 'todos',
    todos: [],
    userInfo: {},
    consumers: []
  },

  onLoad: function () {
    console.log(AV.User.current())

    AV.User
      .loginWithWeapp()
      .then(user => {
        app.globalData.user = user.toJSON();
      })
      .then(() => {
        wx.getUserInfo({
          success: res => {
            this.setData({
              userInfo: res.userInfo
            })

            new Consumer({
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl
            }).save()
              .then((item) => {
                this.setData({
                  list: [item, ...this.data.consumers],
                })
              })
              .catch(console.error)
          }
        })
      })
      .catch(console.error);

    new AV.Query(Consumer)
      .find()
      .then( list => this.setData({
        consumers: list
      }))
      .catch(console.error)
  },

})
