import React from 'react'
import { View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
//styles 
import DetailStyle from '../styles/detailStyle'
//components
import Text from '../components/unScalingText'
import CommonHeader from '../components/commonHeader'
import CustomSvg from '../components/customSvg'
import CommonTab from '../components/commonTab'
import RadiusButton from '../components/radiusButton'
//utils
import Colors from '../utils/colors'
import { px2dpwh } from '../utils/commonUtils'


export default class DetailsView extends React.PureComponent {

  private _homeIcon = require('../assets/home.svg')
  private _likeIcon = require('../assets/like-outline.svg')
  private _likeActiveIcon = require('../assets/like.svg')
  private _checkIcon = require('../assets/check-outline.svg')
  private _checkActiveIcon = require('../assets/check.svg')
  private _infoIcon = require('../assets/info-outline.svg')
  private _infoActiveIcon = require('../assets/info.svg')
  private _peopleIcon = require('../assets/people-outline.svg')
  private _peopleActiveIcon = require('../assets/people.svg')
  private _commentIcon = require('../assets/comment-outline.svg')
  private _commentActiveIcon = require('../assets/comment.svg')
  private _dateFromIcon = require('../assets/date-from.svg')
  private _dateToIcon = require('../assets/date-to.svg')
  private _replyIcon = require('../assets/reply.svg')
  private _commentSingleIcon = require('../assets/comment-single.svg')
  private _sendIcon = require('../assets/send.svg')
  private _closeIcon = require('../assets/cross.svg')



  public render() {
    return this._renderMainView()
  }

  private _renderMainView() {
    return (
      <View style={DetailStyle.mainContainer}>
        {this._renderHeader()}
        <ScrollView style={{marginBottom: px2dpwh(56)}}>
          {this._renderTopIntro()}
          {this._renderTabView()}
          {this._renderInfoView()}
          {this._renderParticipantView()}
          {this._renderCommentView()}
        </ScrollView>
        {this._renderBottomBar()}
        {this._renderBottomInput()}
      </View>
    )
  }

  private _renderHeader() {
    const leftElement = <CustomSvg fill={Colors.deepPurple} svg={this._homeIcon} width={22} height={20}/>
    return (
      <CommonHeader leftElement={leftElement}/>
    )
  }

  private _renderTopIntro() {
    return (
      <View style={DetailStyle.topIntroContainer}>
        <RadiusButton defaultStyle={DetailStyle.channelBtn} textStyle={DetailStyle.channelBtnText} text="channel name123123123213"/>
        <Text style={DetailStyle.introTitle}>Activity Title Name Make it Longer May Longer than One Line</Text>
        <View style={DetailStyle.introAvatarContainer}>
          <Image source={{uri: 'https://s2.ax1x.com/2020/02/14/1XMwGR.png'}} style={DetailStyle.introAvatarImg}/>
          <View>
            <Text style={DetailStyle.introAvatarTitle}>Username</Text>
            <Text style={DetailStyle.introAvatarSubtitle}>Published 2 days ago</Text>
          </View>
        </View>
      </View>
    )
  }

  private _renderTabView() {
    const tabData = [
      { svg: this._infoIcon, activeSvg: this._infoActiveIcon, svgWidth: 18, svgHeight: 18, label: '12 Likes' },
      { svg: this._peopleIcon, activeSvg: this._peopleActiveIcon, svgWidth: 18, svgHeight: 18, label: '0 Going' },
      { svg: this._commentIcon, activeSvg: this._commentActiveIcon, svgWidth: 18, svgHeight: 18, label: '0 Past' },
    ]
    return (
      <CommonTab tabData={tabData}/>
    )
  }

  private _renderInfoView() {
    return(
      <View style={DetailStyle.infoContainer}>
        {this._renderDescView()}
        {this._renderDateTimeInfoView()}
        {this._renderWhereInfoView()}
      </View>
    )
  }

  private _renderDescView() {
    return (
      <View style={DetailStyle.descContainer}>
        <ScrollView style={DetailStyle.scrollImgContainer} horizontal={true}>
          <Image style={DetailStyle.scrollImg} source={{uri: 'https://s2.ax1x.com/2020/02/14/1XMwGR.png'}}/>
          <Image style={DetailStyle.scrollImg} source={{uri: 'https://s2.ax1x.com/2020/02/14/1XMwGR.png'}}/>
        </ScrollView>
        <View style={DetailStyle.descTextItem}>
          <Text style={DetailStyle.descText}>[No longer than 300 chars] Vivamus sagittis, diam in lobortis, sapien arcu mattis erat, vel aliquet sem urna et risus. Ut feugiat sapien mi potenti. Maecenas et enim odio. Nullam massa metus, varius quis vehicula sed, pharetra mollis erat. In quis viverra velit. Vivamus placerat, est nec hendrerit varius, enim dui hendrerit magna, ut pulvinar nibh lorem vel lacus. Mauris a orci iaculis, hendrerit eros sed, gravida leo. In dictum mauris vel augue varius there is south north asim</Text>
          <LinearGradient colors={['rgba(250, 249, 252, 0)', 'rgba(250, 249, 252, 1)']} start={{x: 0.0, y: 0.0}} end={{x:0.0, y:1.0}} style={DetailStyle.viewAllContainer}>
            <View style={DetailStyle.viewAllInner}>
              <RadiusButton defaultStyle={DetailStyle.viewAllBtn} textStyle={DetailStyle.viewAllBtnText} text="VIEW ALL"/>
            </View>
          </LinearGradient>
        </View>
      </View>
    )
  }

  private _renderDateTimeInfoView() {
    return (
      <View style={DetailStyle.dateContainer}>
        <View style={DetailStyle.commonLeftTitleContainer}>
          <View style={DetailStyle.commonLeftDivider}/>
          <Text style={DetailStyle.commonLeftTitle}>When</Text>
        </View>
        <View style={DetailStyle.dateContent}>
          <View style={[DetailStyle.dateContentItem, DetailStyle.dateContentItemDivider]}>
            <View style={DetailStyle.dateContentTimeContainer}>
              <CustomSvg style={DetailStyle.dateContentTimeIcon} svg={this._dateFromIcon} width={16} height={13.8} fill={Colors.mainGreen}/>
              <Text style={DetailStyle.dateContentTimeText}>15 April 2015</Text>
            </View>
            <View style={DetailStyle.dateContentHourContainer}>
              <Text style={DetailStyle.dateContentHourText}>8:30</Text>
              <Text style={DetailStyle.dateContentHourSubText}>am</Text>
            </View>
          </View>
          <View style={DetailStyle.dateContentItem}>
            <View style={DetailStyle.dateContentTimeContainer}>
              <CustomSvg style={DetailStyle.dateContentTimeIcon} svg={this._dateToIcon}  width={16} height={13.8} fill={Colors.mainGreen}/>
              <Text style={DetailStyle.dateContentTimeText}>15 April 2015</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  private _renderWhereInfoView() {
    return (
      <View style={DetailStyle.whereContainer}>
        <View style={[DetailStyle.commonLeftTitleContainer, {marginBottom: px2dpwh(8)}]}>
          <View style={DetailStyle.commonLeftDivider}/>
          <Text style={DetailStyle.commonLeftTitle}>Where</Text>
        </View>
        <Text style={DetailStyle.whereTitle}>Marina Bay Sands</Text>
        <Text style={DetailStyle.whereSubTitle}>10 Bayfront Ave, S018956</Text>
        <Image style={DetailStyle.whereLocation} source={require('../assets/gmap.png')}/>
      </View>
    )
  }

  private _renderParticipantView() {
    return (
      <View style={DetailStyle.participantContainer}>
        <View style={[DetailStyle.participantItem, DetailStyle.participantItemDivider]}>
          <View style={DetailStyle.participantCountContainer}>
            <CustomSvg style={DetailStyle.participantCountIcon} svg={this._checkIcon} fill={Colors.lighterPurple} width={12} height={9.8}/>
            <Text style={DetailStyle.participantCountText}>34 going</Text>
          </View>
          <Image style={DetailStyle.participantCountAvatar} source={{uri: 'https://s2.ax1x.com/2020/02/14/1XMwGR.png'}}/>
        </View>
        <View style={DetailStyle.participantItem}>
          <View style={DetailStyle.participantCountContainer}>
              <CustomSvg style={DetailStyle.participantCountIcon} svg={this._checkIcon} fill={Colors.lighterPurple} width={12} height={9.8}/>
              <Text style={DetailStyle.participantCountText}>7 likes</Text>
            </View>
            <Image style={DetailStyle.participantCountAvatar} source={{uri: 'https://s2.ax1x.com/2020/02/14/1XMwGR.png'}}/>
        </View>
      </View>
    )
  }

  private _renderCommentView() {
    return (
      <View style={DetailStyle.commentContainer}>
        {this._renderCommentItem()}
      </View>
    )
  }

  private _renderCommentItem() {
    return (
      <View style={DetailStyle.commentItem}>
        <Image style={DetailStyle.commentAvatar} source={{uri: 'https://s2.ax1x.com/2020/02/14/1XMwGR.png'}}/>
        <View style={DetailStyle.commentContentContainer}>
          <View style={DetailStyle.commentTopContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={DetailStyle.commentTopName}>Hello world</Text>
              <Text style={DetailStyle.commentTopTime}>9 hours ago</Text>
            </View>
            <CustomSvg style={DetailStyle.commentTopIcon} svg={this._replyIcon} fill={Colors.mainGreen} width={18} height={15}/>
          </View>
          <Text style={DetailStyle.commentContentText}>Nullam ut tincidunt nunc. Petus lacus, commodo eget justo ut, rutrum varius nunc.</Text>
        </View>
      </View>
    )
  }

  private _renderBottomBar() {
    return(
      <View style={DetailStyle.bottomBar}>
        <View style={DetailStyle.bottomBarLeft}>
          <TouchableOpacity style={DetailStyle.bottomBarLeftBtn}>
            <CustomSvg style={DetailStyle.bottomBarLeftIcon} svg={this._commentSingleIcon} fill={Colors.deepPurple} width={24} height={24}/>
          </TouchableOpacity>
          <TouchableOpacity style={DetailStyle.bottomBarLeftBtn}>
            <CustomSvg svg={this._likeIcon} fill={Colors.deepPurple} width={24} height={24}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={DetailStyle.bottomBarRight}>
          <CustomSvg style={DetailStyle.bottomBarRightIcon} svg={this._checkIcon} fill={Colors.mainBlack} width={22} height={22}/>
          <Text style={DetailStyle.bottomBarRightText}>Join</Text>
        </TouchableOpacity>
      </View>
    )
  }

  private _renderBottomInput() {
    return (
      <View style={DetailStyle.bottomInputContainer}>
        <View style={DetailStyle.bottomInputLeft}>
          <TouchableOpacity>
            <CustomSvg svg={this._closeIcon} width={15} height={15} fill={Colors.mainGray} style={DetailStyle.bottomInputLeftIcon}/>
          </TouchableOpacity>
          <TextInput style={DetailStyle.bottomInput} placeholder="Leave your comment here" placeholderTextColor={Colors.lightestPurple} clearButtonMode="while-editing"/>
        </View>
        <TouchableOpacity style={DetailStyle.bottomInputSubmitBtn} activeOpacity={1}>
          <CustomSvg style={DetailStyle.bottomInputSubmitBtnIcon} fill={Colors.mainPurple} svg={this._sendIcon} width={28} height={24}/>
        </TouchableOpacity>
      </View>
    )
  }
}