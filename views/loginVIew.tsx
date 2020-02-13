import React from 'react'
import { ImageBackground, View, TextInput } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
// components
import Text from '../components/unScalingText'
import BlockButton from '../components/blockButton'
import CustomSvg from '../components/customSvg'
// styles
import LoginStyle from '../styles/LoginStyle'
// utils
import Colors from '../utils/colors'
// import { deviceWidthDp, deviceHeightDp } from '../utils/commonUtils'
//language 
import i18n from '../language/i18n'

export default class LoginView extends React.PureComponent<{}, {}> {

  private _i18n = i18n['en'].loginViewText
  private _logoIcon = require('../assets/logo-cat.svg')
  private _userIcon = require('../assets/user.svg')
  private _pwdIcon = require('../assets/password.svg')

  

  public render() {
    return this._renderMainView()
  }

  //views
  private _renderMainView () {
    return (
      <ImageBackground source={require('../assets/Street-Dance-01.jpg')} style={LoginStyle.loginBg}>
        <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 0.0, y: 1.0}} colors={[Colors.lightPurple, Colors.mainPurple]} style={LoginStyle.linearGradientBg}>
          {this._renderLogoView()}
          {this._renderFillInView()}
          <BlockButton text={this._i18n.loginText}/>
        </LinearGradient>
      </ImageBackground>
    )
  }

  private _renderLogoView() {
    return (
      <View style={LoginStyle.logoContainer}>
        <Text style={LoginStyle.logoSubtitle}>{this._i18n.subtitle}</Text>
        <Text style={LoginStyle.logoTitle}>{this._i18n.title}</Text>
        <CustomSvg width={42} height={42} style={LoginStyle.logoImg} svg={this._logoIcon} fill={Colors.mainGreen}/>
      </View>
    )
  }

  private _renderFillInView() {
    return (
      <View style={LoginStyle.fillinContainer}>
        <View style={LoginStyle.fillinItem}>
          <CustomSvg style={LoginStyle.fillinSvg} width={13.3} height={13.3} fill={Colors.lightestPurple} svg={this._userIcon}/>
          <TextInput 
            style={LoginStyle.fillin} clearButtonMode="while-editing" 
            returnKeyType='done'
            multiline={false}
            autoFocus={false}
            allowFontScaling={false}
            placeholder={this._i18n.emailPlaceholder} placeholderTextColor={Colors.lighterPurple}
          />
        </View>
        <View style={LoginStyle.fillinItem}>
          <CustomSvg style={LoginStyle.fillinSvg} width={13.3} height={13.3} fill={Colors.lightestPurple} svg={this._pwdIcon}/>
          <TextInput 
            style={LoginStyle.fillin} clearButtonMode="while-editing" 
            returnKeyType='done'
            multiline={false}
            autoFocus={false}
            allowFontScaling={false}
            placeholder={this._i18n.pswPlaceholder} placeholderTextColor={Colors.lighterPurple}
          />
        </View>
        {/* <TextInput style={LoginStyle.fillin}/> */}
      </View>
    )
  }
}