const AV = require('../utils/av-weapp')

class Consumer extends AV.Object {
  get nickName() {
    return this.get('nickName')
  }
  set nickName(value) {
    return this.set('nickName', value)
  }

  get avatarUrl() {
    return this.get('avatarUrl')
  }
  set avatarUrl(value) {
    return this.set('avatarUrl', value)
  }
}

AV.Object.register(Consumer);

module.exports = Consumer;
