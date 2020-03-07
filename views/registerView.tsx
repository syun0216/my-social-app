import React from 'react';
import {
  View,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { inject } from 'mobx-react';
import { LinearGradient } from 'expo-linear-gradient';
//components
import { Text, BlockButton, Toast } from '../components';
// styles
import RegisterStyles from '../styles/loginStyle';
//utils
import Colors from '../utils/colors';
import { deviceHeightDp } from '../utils/commonUtils';
//language
import i18n from '../language/i18n';
//icons
import { UserIcon, PasswordIcon, EmailIcon } from '../components/icon';
//cache
import AppStorage from '../cache/appStorage';
//api
import { register, userLogin } from '../service/apis';

type State = {
  isUsernameInputFocus: boolean;
  isPasswordInputFocus: boolean;
  isEmailInputFocus: boolean;
  isSubmiting: boolean;
};

@inject('basicMobx')
export default class RegisterView extends React.PureComponent<any, State> {
  public state = {
    isUsernameInputFocus: false,
    isPasswordInputFocus: false,
    isEmailInputFocus: false,
    isSubmiting: false,
  };
  private _toast = null;
  private _registerParams: registerData = {
    username: '',
    password: '',
    email: '',
    avatar: 'https://coding.net/static/fruit_avatar/Fruit-19.png',
  };

  // logic

  private _getUserName(username) {
    this._registerParams.username = username;
    // console.log('this._loginParams :', this._loginParams);
  }

  private _getPassword(password) {
    this._registerParams.password = password;
    // console.log('this._loginParams :', this._loginParams);
  }

  private _getEmail(email) {
    this._registerParams.email = email;
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

  private _getEmailInputFocusAction() {
    this.setState({
      isEmailInputFocus: true,
    });
  }

  private _getEmailInputBlurAction() {
    this.setState({
      isEmailInputFocus: false,
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

  private async _registerWithData() {
    const { username, password, email } = this._registerParams;
    if (username === '') {
      this._toast.show(i18n.t('warningText.usernameRequired'));
      return;
    }
    if (password === '') {
      this._toast.show(i18n.t('warningText.passwordRequired'));
      return;
    }
    if (email === '') {
      this._toast.show(i18n.t('warningText.emailRequired'));
      return;
    }
    try {
      await register(this._registerParams);
      const res: any = await userLogin(this._registerParams);
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
      this._toast.show(i18n.t('warningText.registerError'));
    }
  }

  public render() {
    const { isSubmiting } = this.state;
    return (
      <ImageBackground
        source={require('../assets/Street-Dance-01.jpg')}
        style={RegisterStyles.loginBg}
      >
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={[Colors.lightPurple, Colors.mainPurple]}
          style={RegisterStyles.linearGradientBg}
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
            clickFunc={() => this._registerWithData()}
            style={RegisterStyles.submitBtn}
            text={i18n.t('registerText.registerBtn')}
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
      <View style={RegisterStyles.logoContainer}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 30 }}
          source={{
            uri: 'https://coding.net/static/fruit_avatar/Fruit-19.png',
          }}
        />
      </View>
    );
  }

  private _renderFillInView() {
    const {
      isUsernameInputFocus,
      isPasswordInputFocus,
      isEmailInputFocus,
    } = this.state;
    return (
      <View style={RegisterStyles.fillinContainer}>
        <View
          style={[
            RegisterStyles.fillinItem,
            isUsernameInputFocus && RegisterStyles.fillinActive,
          ]}
        >
          <UserIcon
            style={RegisterStyles.fillinSvg}
            width={13.3}
            height={13.3}
            fill={Colors.lightestPurple}
          />
          <TextInput
            style={RegisterStyles.fillin}
            clearButtonMode="while-editing"
            returnKeyType="done"
            multiline={false}
            autoFocus={false}
            allowFontScaling={false}
            underlineColorAndroid="transparent"
            placeholder={i18n.t('registerText.userName')}
            placeholderTextColor={Colors.lighterPurple}
            onChangeText={username => this._getUserName(username)}
            onFocus={() => this._getUsernameInputFocusAction()}
            onBlur={() => this._getUsernameInputBlurAction()}
          />
        </View>
        <View
          style={[
            RegisterStyles.fillinItem,
            isEmailInputFocus && RegisterStyles.fillinActive,
          ]}
        >
          <EmailIcon
            style={RegisterStyles.fillinSvg}
            width={13.3}
            height={13.3}
            fill={Colors.lightestPurple}
          />
          <TextInput
            style={RegisterStyles.fillin}
            clearButtonMode="while-editing"
            returnKeyType="done"
            multiline={false}
            autoFocus={false}
            allowFontScaling={false}
            underlineColorAndroid="transparent"
            placeholder={i18n.t('loginViewText.emailPlaceholder')}
            placeholderTextColor={Colors.lighterPurple}
            onChangeText={email => this._getEmail(email)}
            onFocus={() => this._getEmailInputFocusAction()}
            onBlur={() => this._getEmailInputBlurAction()}
          />
        </View>
        <View
          style={[
            RegisterStyles.fillinItem,
            isPasswordInputFocus && RegisterStyles.fillinActive,
          ]}
        >
          <PasswordIcon
            style={RegisterStyles.fillinSvg}
            width={13.3}
            height={13.3}
            fill={Colors.lightestPurple}
          />
          <TextInput
            style={RegisterStyles.fillin}
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
          onPress={() => this.props.navigation.replace('Login')}
          style={RegisterStyles.reginsterBtn}
        >
          <Text style={RegisterStyles.registerBtnText}>
            {i18n.t('registerText.loginBtn')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
