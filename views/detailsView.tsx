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
import Loading from '../components/loading'
//utils
import Colors from '../utils/colors'
import { px2dpwh } from '../utils/commonUtils'
//api
import {getEventsWithEventId, getEventParticipantWithEventId, getLikesWithEventId, getCommentWithEventId} from '../api/interface'


export default class DetailsView extends React.PureComponent<any, any> {

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

  public state = {
    eventInfo: null,
    participantInfo: null,
    likesInfo: null,
    commentsInfo: null,
    isLoading: true
  }

  public componentDidMount() {
    this._getInfo()
  }

  private async _getInfo() {
    const { id } = this.props.route.params
    const resEvent: any = await getEventsWithEventId(id)
    const resParticipant: any = await getEventParticipantWithEventId(id)
    const resLikes: any = await getLikesWithEventId(id)
    const resComments: any = await getCommentWithEventId(id)
    console.log('resComments',resComments)
    this.setState({
      eventInfo: resEvent.event,
      participantInfo: resParticipant.users,
      likesInfo: resLikes.users,
      commentsInfo: resComments.comments,
      isLoading: false
    })
  }

  public render() {
    return this.state.isLoading ? <Loading /> : this._renderMainView()
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
        {/* {this._renderBottomInput()} */}
      </View>
    )
  }

  private _renderHeader() {
    const leftElement = (<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
      <CustomSvg fill={Colors.deepPurple} svg={this._homeIcon} width={22} height={20}/>
    </TouchableOpacity>)
    return (
      <CommonHeader leftElement={leftElement}/>
    )
  }

  private _renderTopIntro() {
    const { eventInfo } = this.state
    return (
      <View style={DetailStyle.topIntroContainer}>
        <RadiusButton defaultStyle={DetailStyle.channelBtn} textStyle={DetailStyle.channelBtnText} text={eventInfo.channel.name}/>
    <Text style={DetailStyle.introTitle}>{eventInfo.name}</Text>
        <View style={DetailStyle.introAvatarContainer}>
          <Image source={{uri: eventInfo.creator.avatar}} style={DetailStyle.introAvatarImg}/>
          <View>
            <Text style={DetailStyle.introAvatarTitle}>{eventInfo.creator.username}</Text>
            <Text style={DetailStyle.introAvatarSubtitle}>{eventInfo.updatedAt}</Text>
          </View>
        </View>
      </View>
    )
  }

  private _renderTabView() {
    const tabData = [
      { svg: this._infoIcon, activeSvg: this._infoActiveIcon, svgWidth: 18, svgHeight: 18, label: 'Details' },
      { svg: this._peopleIcon, activeSvg: this._peopleActiveIcon, svgWidth: 18, svgHeight: 18, label: 'Participants' },
      { svg: this._commentIcon, activeSvg: this._commentActiveIcon, svgWidth: 18, svgHeight: 18, label: 'Comments' },
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
    const { eventInfo } = this.state
    return (
      <View style={DetailStyle.descContainer}>
        <ScrollView style={DetailStyle.scrollImgContainer} horizontal={true}>
          {
            eventInfo.images.length > 0 ? (
              eventInfo.images.slice(1,3).map((item, idx) => (
                <Image key={idx} style={DetailStyle.scrollImg} source={{uri: item}}/>
              ))
            ) : null
          }
        </ScrollView>
        <View style={DetailStyle.descTextItem}>
          <Text style={DetailStyle.descText}>{eventInfo.description}</Text>
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
    const { eventInfo } = this.state
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
              <Text style={DetailStyle.dateContentTimeText}>{eventInfo.begin_time.slice(0, 10)}</Text>
            </View>
            <View style={DetailStyle.dateContentHourContainer}>
              <Text style={DetailStyle.dateContentHourText}>8:30</Text>
              <Text style={DetailStyle.dateContentHourSubText}>am</Text>
            </View>
          </View>
          <View style={DetailStyle.dateContentItem}>
            <View style={DetailStyle.dateContentTimeContainer}>
              <CustomSvg style={DetailStyle.dateContentTimeIcon} svg={this._dateToIcon}  width={16} height={13.8} fill={Colors.mainGreen}/>
              <Text style={DetailStyle.dateContentTimeText}>{eventInfo.end_time.slice(0, 10)}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  private _renderWhereInfoView() {
    const { eventInfo } = this.state
    return (
      <View style={DetailStyle.whereContainer}>
        <View style={[DetailStyle.commonLeftTitleContainer, {marginBottom: px2dpwh(8)}]}>
          <View style={DetailStyle.commonLeftDivider}/>
          <Text style={DetailStyle.commonLeftTitle}>Where</Text>
        </View>
        <Text style={DetailStyle.whereTitle}>{eventInfo.location}</Text>
        <Text style={DetailStyle.whereSubTitle}>{eventInfo.location_detail}</Text>
        <Image style={DetailStyle.whereLocation} source={require('../assets/gmap.png')}/>
      </View>
    )
  }

  private _renderParticipantView() {
    const { participantInfo, likesInfo } = this.state
    return (
      <View style={DetailStyle.participantContainer}>
        <View style={[DetailStyle.participantItem, DetailStyle.participantItemDivider]}>
          <View style={DetailStyle.participantCountContainer}>
            <CustomSvg style={DetailStyle.participantCountIcon} svg={this._checkIcon} fill={Colors.lighterPurple} width={12} height={9.8}/>
            <Text style={DetailStyle.participantCountText}>{participantInfo.length} going</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            {
              participantInfo.map(item => (
                <Image key={item.id} style={DetailStyle.participantCountAvatar} source={{uri: item.avatar}}/>
              ))
            }   
          </View>       
        </View>
        <View style={DetailStyle.participantItem}>
          <View style={DetailStyle.participantCountContainer}>
              <CustomSvg style={DetailStyle.participantCountIcon} svg={this._checkIcon} fill={Colors.lighterPurple} width={12} height={9.8}/>
              <Text style={DetailStyle.participantCountText}>{likesInfo.length} likes</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
            {
              likesInfo.map(item => (
                <Image key={item.id} style={DetailStyle.participantCountAvatar} source={{uri: item.avatar}}/>
              ))
            }   
          </View>
        </View>
      </View>
    )
  }

  private _renderCommentView() {
    const {commentsInfo} = this.state
    return (
      <View style={DetailStyle.commentContainer}>
        {
          commentsInfo.map(item => 
            this._renderCommentItem(item)
          )
        }
      </View>
    )
  }

  private _renderCommentItem(item) {
    return (
      <View key={item.id} style={DetailStyle.commentItem}>
        <Image style={DetailStyle.commentAvatar} source={{uri: item.user.avatar}}/>
        <View style={DetailStyle.commentContentContainer}>
          <View style={DetailStyle.commentTopContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={DetailStyle.commentTopName}>{item.user.name}</Text>
              <Text style={DetailStyle.commentTopTime}>{item.updatedAt.slice(0, 10)}</Text>
            </View>
            <CustomSvg style={DetailStyle.commentTopIcon} svg={this._replyIcon} fill={Colors.mainGreen} width={18} height={15}/>
          </View>
          <Text style={DetailStyle.commentContentText}>{item.comment}</Text>
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