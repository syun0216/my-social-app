import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
//components
import CommonHeader from '../components/commonHeader'
import CustomSvg from '../components/customSvg'
import Text from '../components/unScalingText'
import CommonTab from '../components/commonTab'
import BlankPage from '../components/blankPage'
import Loading from '../components/loading'
// styles
import MeStyle from '../styles/meStyle'
//utils
import Colors from '../utils/colors'
import colors from '../utils/colors'
//api 
import { getUserInfo, getUserEvents } from '../api/interface'

export default class MeView extends React.PureComponent<any, any> {

  private _homeIcon = require('../assets/home.svg')
  private _emailIcon = require('../assets/email.svg')
  private _likeIcon = require('../assets/like-outline.svg')
  private _likeActiveIcon = require('../assets/like.svg')
  private _checkIcon = require('../assets/check-outline.svg')
  private _checkActiveIcon = require('../assets/check.svg')
  private _pastIcon = require('../assets/past-outline.svg')
  private _pastActiveIcon = require('../assets/past.svg')

  public state = {
    isLoading: true,
    userInfo: null
  }

  public componentDidMount() {
    this._getInfo()
  }

  private async _getInfo() {
    const resUserInfo: any = await getUserInfo()
    console.log(resUserInfo)
    this.setState({
      userInfo: resUserInfo,
      isLoading: false
    })
  }

  public render() {
    return this.state.isLoading ? <Loading /> : this._renderMainView()
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
    const { userInfo } = this.state
    return (
      <View style={MeStyle.introContainer}>
        <Image source={{uri: userInfo.avatar}} style={MeStyle.introAvatar}/>
        <Text style={MeStyle.introName}>{userInfo.username}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CustomSvg style={MeStyle.introEmailIcon} fill={colors.mainPurple} svg={this._emailIcon} width={20} height={15}/>
          <Text style={MeStyle.introEmail}>{userInfo.email}</Text>
        </View>
      </View>
    )
  }

  private _renderTabView() {
    const { userInfo } = this.state
    const tabData = [
      { svg: this._likeIcon, activeSvg: this._likeActiveIcon, svgWidth: 18, svgHeight: 18, label: `${userInfo.likes_count} Likes` },
      { svg: this._checkIcon, activeSvg: this._checkActiveIcon, svgWidth: 18, svgHeight: 18, label: `${userInfo.goings_count} goings` },
      { svg: this._pastIcon, activeSvg: this._pastActiveIcon, svgWidth: 18, svgHeight: 18, label: `${userInfo.past_count} Past` },
    ]
    return (
      <CommonTab tabData={tabData}/>
    )
  }
}