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
    //console.log(AV.User.current())

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

            new AV.Query(Consumer)
              .includeACL(AV.Uesr)
              .find()
              .then( list => {

                if (list) {
                  const itemID = list[0].id
                  AV.Object
                    .createWithoutData('Consumer', itemID)
                    .set('nickName', 'woshezhidexinde')
                    .save()

                  console.log(list[0].nickName)
                  console.log(list[0].avatarUrl)
                }
                console.log('===')
                console.log(list[0].id, list[0].updatedAt)
                console.log('===')
                this.setData({
                  consumers: list
                })
              })
              .catch(console.error)

            var acl = new AV.ACL();
            acl.setPublicReadAccess(false);
            acl.setPublicWriteAccess(false);
            acl.setReadAccess(AV.User.current(), true);
            acl.setWriteAccess(AV.User.current(), true);

            /*new Consumer({
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl
            }).setACL(acl)
              .save()
              .then((item) => {
                this.setData({
                  list: [item, ...this.data.consumers],
                })
              })
              .catch(console.error)*/
          }
        })
      })
      .catch(console.error);
  }

})

