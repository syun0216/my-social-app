type basicMobxProps = {
  userInfo: loginModel;
  setUserInfo: (userInfo: loginModel) => void;
  getUserInfo: () => loginModel;
};

type basicMobxType = {
  basicMobx: basicMobxProps;
};
