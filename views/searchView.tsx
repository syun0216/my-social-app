import React from 'react'
import {View, TouchableOpacity, Image, Animated, AsyncStorage} from 'react-native'
// styles
import SearchViewStyle from '../styles/searchViewStyle'
//components
import Text from '../components/unScalingText'
import RadiusButton from '../components/radiusButton'
import BlockButton from '../components/blockButton'
import CustomSvg from '../components/customSvg'
import CommonHeader from '../components/commonHeader'
import Toast from '../components/toast'
import CommonList from '../components/commonList'
// languages
import i18n from '../language/i18n'
//utils
import Colors from '../utils/colors'
import { px2dpw, px2dpwh } from '../utils/commonUtils'
//api 
import { getChannels, getEvents } from '../api/interface'

export default class SearchView extends React.PureComponent<any, any> {

  private _i18n = i18n['en'].searchText
  private _searchIcon = require('../assets/search.svg')
  private _timeIcon = require('../assets/time.svg')
  private _checkIcon = require('../assets/check-outline.svg')
  private _checkActiveIcon = require('../assets/check.svg')
  private _likeIcon = require('../assets/like-outline.svg')
  private _likeActiveIcon = require('../assets/like.svg')
  private _toast = null
  private _flatlist = null

  private _requestExtraParams = {
    channels: null,
    after: null,
    before: null,
    limit: 5
  }

  public _isSearchViewShow = false

  public state = {
    posLeft: new Animated.Value(0),
    isSearching: false,
    channelList: [],
    curChannel: null,
    curTime: 'ALL TIME',
    userInfo: null
  }

  public componentDidMount() {
    this._getUserInfo()
    this._getChannels()
  }

  private _toggleSearch() {
    this._isSearchViewShow = !this._isSearchViewShow
    Animated.spring(this.state.posLeft, {
      toValue: this._isSearchViewShow ? 1 : 0
    }).start()
  }

  private _setCurChannel(channel) {
    // console.log(channel)
    this.setState({
      curChannel: channel.id
    })
    
  }

  private _setCurTime(time) {
    this.setState({
      curTime: time
    })
  }

  private _searchWithCondition() {
    this._requestExtraParams.channels = this.state.curChannel
    this._requestExtraParams.limit = 100
    this._flatlist.outSideRefresh(
      () => this._toggleSearch()
    )
  }

  private async _getChannels() {
    try{
      const res: any = await getChannels()
      this.setState({
        channelList: [{id: null, name: 'ALL'}].concat(res.channels)
      })
      // console.log(res)
    }catch(err) {
      this._toast.show('error')
    }
  }

  private async _getUserInfo() {
    let res: any = await AsyncStorage.getItem('storage_key_user_data')
    if(res) {
        res = JSON.parse(res)
    }
    this.setState({
      userInfo: res.user || {}
    })
  }

  public render() {
    return this._renderMainView()
  }

  // views
  private _renderMainView() {
    const {isSearching } = this.state
    return (
      <View style={[SearchViewStyle.mainContainer]}>
        <View style={SearchViewStyle.searchContainer}>
          {this._renderDateView()}
          {this._renderChannelView()}
          <BlockButton clickFunc={() => this._searchWithCondition()} style={!isSearching ? SearchViewStyle.searchDisabled : {}}>
            <View style={SearchViewStyle.searchItem}>
              <CustomSvg style={SearchViewStyle.searchIcon} width={14} height={14} fill={Colors.deepPurple} svg={this._searchIcon}/>
              <Text style={SearchViewStyle.searchTitle}>
                {this._i18n.searchTitle}
              </Text>
            </View>
            {
              isSearching ? (<Text style={SearchViewStyle.searchSubtitle}>{this._i18n.subTitle}</Text> ) : null
            }           
          </BlockButton>
        </View>
        <Animated.View style={[SearchViewStyle.contentContainer,  {
          left: this.state.posLeft.interpolate({
            inputRange: [0, 1],
            outputRange: [0, px2dpw(240)]
          })
        }]}>
          {this._renderHeaderView()}
          { isSearching ? this._renderSearchResult() : null} 
          {this._renderEventList()}
          {/* <BlankPage text="No activity found"/> */}
        </Animated.View>
        <Toast ref={t => this._toast = t} textColor={Colors.mainWhite} bgColor={Colors.transparentRed} autoHide={true}/>
      </View>
    )
  }

  private _renderDateView() {
    const { curTime } = this.state
    const { date, anytime, today, tomorrow,thisWeek, thisMonth, later } = this._i18n
    const btnArr = [anytime, today, tomorrow, thisWeek, thisMonth, later]
    return(
      <View style={SearchViewStyle.dateContainer}>
        <Text style={SearchViewStyle.commonTitle}>{date}</Text>
        <View style={SearchViewStyle.divider}/>
        <View style={SearchViewStyle.commonContainer}>
          {
            btnArr.map((item, idx) => (
              <RadiusButton clickFunc={() => this._setCurTime(item)} defaultStyle={ curTime === item ? SearchViewStyle.dateBtnActive : SearchViewStyle.dateBtnDefault} textActiveStyle={curTime === item ? SearchViewStyle.dateBtnActiveText : SearchViewStyle.dateBtnDefaultText} key={idx} text={item}/>
            ))
          }
        </View>
      </View>
    )
  }

  private _renderChannelView() {
    const { channelList, curChannel } = this.state
    if(channelList.length === 0) return
    const { channel } = this._i18n
    return (
      <View style={SearchViewStyle.channelView}>
        <Text style={SearchViewStyle.commonTitle}>{channel}</Text>
        <View style={[SearchViewStyle.divider, {width: px2dpw(50)}]}/>
        <View style={SearchViewStyle.commonContainer}>
          {
            channelList.map((item, idx) => (
              <RadiusButton clickFunc={() => this._setCurChannel(item)} defaultStyle={curChannel === item.id ? SearchViewStyle.channelBtnActive : SearchViewStyle.channelBtnDefault} textActiveStyle={curChannel === item.id ? SearchViewStyle.channelBtnActiveText : {}} key={idx} text={item.name}/>
            ))
          }
        </View>
      </View>
    )
  }

  private _renderHeaderView() {
    const { userInfo } = this.state
    const leftElement = (
      <TouchableOpacity onPress={() => this._toggleSearch()}>
        <CustomSvg fill={Colors.deepPurple} svg={require('../assets/search.svg')} width={25} height={25}/>
      </TouchableOpacity>
    )
    return <CommonHeader leftElement={leftElement} avatar={userInfo ? userInfo.avatar : ''}/>
  }

  private _renderSearchResult() {
    return (
      <View style={SearchViewStyle.searchResContainer}>
        <View style={SearchViewStyle.searchResInner}>
          <Text style={SearchViewStyle.searchResInnerText}>14 Results</Text>
          <RadiusButton defaultStyle={SearchViewStyle.searchDefaultBtn} textStyle={SearchViewStyle.searchDefaultBtnText} text="CLEAR SEARCH"/>
        </View>
        <Text style={SearchViewStyle.searchResSubtitle}>Searched for Channel 3 Activities from 20/06 to 24/06</Text>
      </View>
    )
  }

  private _renderEventList() {
    return (
      <CommonList 
        ref={cl => this._flatlist = cl}
        requestFunc={getEvents}
        renderItem={(item, index) => this._renderListItem(item, index)}
        isIndicatorShow={true}
        offset={5}
        extraParams={{...this._requestExtraParams}}
      />
    )
  }

  private _renderListItem(item, index) {
    return (
      <TouchableOpacity activeOpacity={0.8} key={index} style={SearchViewStyle.listItemContainer} onPress={() => this.props.navigation.navigate('Detail', {id: item.id, callback: () => this._flatlist.outSideRefresh()})}>
        <View style={SearchViewStyle.listItemInner}>
          <View style={SearchViewStyle.listItemTop}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={SearchViewStyle.listItemTopAvatar} source={{uri: item.creator.avatar}}/>
              <Text style={SearchViewStyle.listItemTopTitle}>{item.creator.username}</Text>
            </View>
            <RadiusButton textStyle={SearchViewStyle.listItemTopBtnText} defaultStyle={SearchViewStyle.listItemTopBtn} text={item.channel.name}/>
          </View>
          <View style={SearchViewStyle.listItemWrapper}>
            <View style={SearchViewStyle.listItemWrapperLeft}>
              <Text style={SearchViewStyle.listItemTitle}>{item.name}</Text>
              <View style={{flexDirection: 'row', marginBottom: px2dpwh(12)}}>
                <CustomSvg style={SearchViewStyle.listItemSubTitleSvg} fill={Colors.mainPurple} svg={this._timeIcon} width={12} height={12}/>
                <Text style={SearchViewStyle.listItemSubtitle}>{item.begin_time.slice(0,10) || ''} - {item.end_time.slice(0,10) || ''}</Text>
              </View>
              <Text numberOfLines={4} style={SearchViewStyle.listItemDesc}>{item.description}</Text>
              <View style={{flexDirection: 'row'}}>
                {
                  item.me_going ? (
                    <TouchableOpacity activeOpacity={0.8} style={SearchViewStyle.listItemBottom}>
                      <CustomSvg style={SearchViewStyle.listItemBottomSvg} fill={Colors.deepGreen} svg={this._checkActiveIcon} width={14} height={11}/>
                      <Text style={SearchViewStyle.listItemBottomText}>I am going!</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity activeOpacity={0.8} style={SearchViewStyle.listItemBottom}>
                      <CustomSvg style={SearchViewStyle.listItemBottomSvg} fill={Colors.lighterPurple} svg={this._checkIcon} width={14} height={11}/>
                      <Text style={SearchViewStyle.listItemBottomText}>{item.goings_count}</Text>
                    </TouchableOpacity>
                  )
                }
                {
                  item.me_likes ? (
                    <TouchableOpacity activeOpacity={0.8} style={SearchViewStyle.listItemBottom}>
                      <CustomSvg style={SearchViewStyle.listItemBottomSvg} fill={Colors.mainRed} svg={this._likeActiveIcon} width={14} height={11}/>
                      <Text style={SearchViewStyle.listItemBottomText}>I like it!</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity activeOpacity={0.8} style={SearchViewStyle.listItemBottom}>
                      <CustomSvg style={SearchViewStyle.listItemBottomSvg} fill={Colors.lighterPurple} svg={this._likeIcon} width={14} height={11}/>
                      <Text style={SearchViewStyle.listItemBottomText}>{item.likes_count}</Text>
                    </TouchableOpacity>
                  )
                }
              </View>
            </View>
            {
              item.images.length > 0 ? (
                <View style={SearchViewStyle.listItemWrapperRight}>
                  <Image style={SearchViewStyle.listItemWrapperRightImg} source={{uri: item.images[1]}}/>
                </View>
              ) : null
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }

}