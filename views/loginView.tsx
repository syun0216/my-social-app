import React from 'react';
import {
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { inject } from 'mobx-react';
// components
import { Text, BlockButton, Toast } from '../components';
// styles
import LoginStyle from '../styles/loginStyle';
// utils
import Colors from '../utils/colors';
// import { deviceWidthDp, deviceHeightDp } from '../utils/commonUtils'
//language
import i18n from '../language/i18n';
import { deviceHeightDp } from '../utils/commonUtils';
//service
import { userLogin } from '../service/apis';
//cache
import AppStorage from '../cache/appStorage';
//icons
import { LogoIcon, UserIcon, PasswordIcon } from '../components/icon';

type PropTypes = any;
type State = {
  isUsernameInputFocus: boolean;
  isPasswordInputFocus: boolean;
  isSubmiting: boolean;
};

@inject('basicMobx')
export default class LoginView extends React.PureComponent<PropTypes, State> {
  private _loginParams: loginData = {
    username: '',
    password: '',
  };

  private _toast = null;

  public state = {
    isUsernameInputFocus: false,
    isPasswordInputFocus: false,
    isSubmiting: false,
  };

  // logic

  private _getUserName(username) {
    this._loginParams.username = username;
    // console.log('this._loginParams :', this._loginParams);
  }

  private _getPassword(password) {
    this._loginParams.password = password;
    // console.log('this._loginParams :', this._loginParams);
  }

  private _getUsernameInputFocusAction() {
    this.setState({
      isUsernameInputFocus: true,
    });
  }

  private _getUsernameInputBlurAction() {
    this.setState({
      isUsernameInputFocus: false,
    });
  }
  private _getPasswordInputFocusAction() {
    this.setState({
      isPasswordInputFocus: true,
    });
  }

  private _getPasswordInputBlurAction() {
    this.setState({
      isPasswordInputFocus: false,
    });
  }

  private async _loginWithData() {
    const { username, password } = this._loginParams;
    if (username === '') {
      this._toast.show(i18n.t('warningText.usernameRequired'));
      return;
    }
    if (password === '') {
      this._toast.show(i18n.t('warningText.passwordRequired'));
      return;
    }
    this.setState({
      isSubmiting: true,
    });
    try {
      const res: any = await userLogin(this._loginParams);
      if (res.error) {
        this._toast.show(res.error);
      } else {
        AppStorage.setUser(res);
        this.props.basicMobx.setUserInfo(res);
        this.props.navigation.replace('Search');
      }
      this.setState({
        isSubmiting: false,
      });
    } catch (err) {
      this.setState({
        isSubmiting: false,
      });
      console.log(err);
      this._toast.show(i18n.t('warningText.loginError'));
    }
  }

  public render() {
    return this._renderMainView();
  }

  //views
  private _renderMainView() {
    const { isSubmiting } = this.state;
    return (
      <ImageBackground
        source={require('../assets/Street-Dance-01.jpg')}
        style={LoginStyle.loginBg}
      >
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={[Colors.lightPurple, Colors.mainPurple]}
          style={LoginStyle.linearGradientBg}
        >
          <KeyboardAvoidingView
            style={{ flex: 1, height: deviceHeightDp, position: 'relative' }}
            enabled={true}
            behavior="position"
          >
            {this._renderLogoView()}
            {this._renderFillInView()}
          </KeyboardAvoidingView>
          <BlockButton
            isLoading={isSubmiting}
            clickFunc={() => this._loginWithData()}
            style={LoginStyle.submitBtn}
            text={i18n.t('loginViewText.submitBtn')}
          />
        </LinearGradient>
        <Toast
          ref={t => (this._toast = t)}
          textColor={Colors.mainWhite}
          bgColor={Colors.transparentRed}
          autoHide={true}
        />
      </ImageBackground>
    );
  }

  private _renderLogoView() {
    return (
      <View style={LoginStyle.logoContainer}>
        <Text style={LoginStyle.logoSubtitle}>
          {i18n.t('loginViewText.subtitle')}
        </Text>
        <Text style={LoginStyle.logoTitle}>
          {i18n.t('loginViewText.title')}
        </Text>
        <LogoIcon
          width={42}
          height={42}
          style={LoginStyle.logoImg}
          fill={Colors.mainGreen}
        />
      </View>
    );
  }

  private _renderFillInView() {
    const { isUsernameInputFocus, isPasswordInputFocus } = this.state;
    return (
      <View style={LoginStyle.fillinContainer}>
        <View
          style={[
            LoginStyle.fillinItem,
            isUsernameInputFocus && LoginStyle.fillinActive,
          ]}
        >
          <UserIcon
            style={LoginStyle.fillinSvg}
            width={13.3}
            height={13.3}
            fill={Colors.lightestPurple}
          />
          <TextInput
            style={LoginStyle.fillin}
            clearButtonMode="while-editing"
            returnKeyType="done"
            multiline={false}
            autoFocus={false}
            allowFontScaling={false}
            underlineColorAndroid="transparent"
            placeholder={i18n.t('loginViewText.userPlaceholder')}
            placeholderTextColor={Colors.lighterPurple}
            onChangeText={username => this._getUserName(username)}
            onFocus={() => this._getUsernameInputFocusAction()}
            onBlur={() => this._getUsernameInputBlurAction()}
          />
        </View>
        <View
          style={[
            LoginStyle.fillinItem,
            isPasswordInputFocus && LoginStyle.fillinActive,
          ]}
        >
          <PasswordIcon
            style={LoginStyle.fillinSvg}
            width={13.3}
            height={13.3}
            fill={Colors.lightestPurple}
          />
          <TextInput
            style={LoginStyle.fillin}
            clearButtonMode="while-editing"
            returnKeyType="done"
            multiline={false}
            autoFocus={false}
            allowFontScaling={false}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            placeholder={i18n.t('loginViewText.pswPlaceholder')}
            placeholderTextColor={Colors.lighterPurple}
            onChangeText={password => this._getPassword(password)}
            onFocus={() => this._getPasswordInputFocusAction()}
            onBlur={() => this._getPasswordInputBlurAction()}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.replace('Register')}
          style={LoginStyle.reginsterBtn}
        >
          <Text style={LoginStyle.registerBtnText}>
            {i18n.t('loginViewText.registerBtn')}
          </Text>
        </TouchableOpacity>
        {/* <TextInput style={LoginStyle.fillin}/> */}
      </View>
    );
  }
}
