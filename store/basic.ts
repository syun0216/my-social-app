import { observable, action, decorate } from "mobx"

class BasicMobx {
  public userInfo = null

  public setUserInfo(userInfo) {
    this.userInfo = userInfo
  }

  public getUserInfo() {
    return this.userInfo
  }
}

decorate(BasicMobx, {
  userInfo: observable,
  setUserInfo: action.bound,
  getUserInfo: action.bound
})

export default BasicMobx;