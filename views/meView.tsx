import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
//components
import CommonHeader from '../components/commonHeader'
import CustomSvg from '../components/customSvg'
import Text from '../components/unScalingText'
import CommonTab from '../components/commonTab'
import BlankPage from '../components/blankPage'
// styles
import MeStyle from '../styles/meStyle'
//utils
import Colors from '../utils/colors'
import colors from '../utils/colors'

export default class MeView extends React.PureComponent<any, any> {

  private _homeIcon = require('../assets/home.svg')
  private _emailIcon = require('../assets/email.svg')
  private _likeIcon = require('../assets/like-outline.svg')
  private _likeActiveIcon = require('../assets/like.svg')
  private _checkIcon = require('../assets/check-outline.svg')
  private _checkActiveIcon = require('../assets/check.svg')
  private _pastIcon = require('../assets/past-outline.svg')
  private _pastActiveIcon = require('../assets/past.svg')

  public render() {
    return this._renderMainView()
  }
  
  //views
  private _renderMainView() { 
    return (
      <View style={MeStyle.mainContainer}>
        {this._renderHeaderView()}
        {this._renderIntroView()}
        {this._renderTabView()}
        <BlankPage text="No activity found"/>
      </View>
    )
  }

  private _renderHeaderView() {
    const leftElement = (<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
      <CustomSvg fill={Colors.deepPurple} svg={this._homeIcon} width={22} height={20}/>
    </TouchableOpacity>)
    return (
      <CommonHeader leftElement={leftElement}/>
    )
  }

  private _renderIntroView() {
    return (
      <View style={MeStyle.introContainer}>
        <Image source={{uri: 'https://s2.ax1x.com/2020/02/14/1XMwGR.png'}} style={MeStyle.introAvatar}/>
        <Text style={MeStyle.introName}>User1</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CustomSvg style={MeStyle.introEmailIcon} fill={colors.mainPurple} svg={this._emailIcon} width={20} height={15}/>
          <Text style={MeStyle.introEmail}>junwensu@gmail.com</Text>
        </View>
      </View>
    )
  }

  private _renderTabView() {
    const tabData = [
      { svg: this._likeIcon, activeSvg: this._likeActiveIcon, svgWidth: 18, svgHeight: 18, label: '12 Likes' },
      { svg: this._checkIcon, activeSvg: this._checkActiveIcon, svgWidth: 18, svgHeight: 18, label: '0 Going' },
      { svg: this._pastIcon, activeSvg: this._pastActiveIcon, svgWidth: 18, svgHeight: 18, label: '0 Past' },
    ]
    return (
      <CommonTab tabData={tabData}/>
    )
  }
}