import { observable, action, decorate } from 'mobx';

class BasicMobx {
  public userInfo: loginModel = null;

  public setUserInfo(userInfo: loginModel) {
    this.userInfo = userInfo;
  }

  public getUserInfo() {
    return this.userInfo;
  }
}

decorate(BasicMobx, {
  userInfo: observable,
  setUserInfo: action.bound,
  getUserInfo: action.bound,
});

export default BasicMobx;
