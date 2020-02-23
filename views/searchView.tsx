import React from 'react'
import moment from 'moment'
import {View, TouchableOpacity, Image, Animated, AsyncStorage} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { NavigationScreenProp } from 'react-navigation'
// styles
import SearchViewStyle from '../styles/searchViewStyle'
//components
import Text from '../components/unScalingText'
import RadiusButton from '../components/radiusButton'
import BlockButton from '../components/blockButton'
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
//cache
import AppStorage from '../cache/appCache'
//icons
import { SearchIcon, TimeIcon, CheckIcon, CheckActiveIcon, LikeIcon, DateFromIcon, DateToIcon, LikeActiveIcon,  } from '../components/icon'

export default class SearchView extends React.PureComponent<any, any> {

  private _i18n = i18n['en'].searchText
  private _toast = null
  private _flatlist = null

  private _requestExtraParams: any = {
    channels: null,
    after: '',
    before: '',
    limit: 5
  }

  public _isSearchViewShow = false

  public state = {
    posLeft: new Animated.Value(0),
    isSearching: false,
    isSearchingSubmiting: false,
    channelList: [],
    curChannel: ['ALL'],
    curTime: 'ANYTIME',
    userInfo: null,
    listCount: 0,
    isTimeselectorShow: false,
    isTimePickerShow: false,
    beforeDate: this._generateToday(),
    afterDate: this._generateToday(),
    beforeDateFormat: new Date(),
    afterDateFormat: new Date(),
    dateType: 'before'
  } 

  public componentDidMount() {
    console.log(this.props)
    this._getUserInfo()
    this._getChannels()
  }

  private _toggleSearch() {
    this._isSearchViewShow = !this._isSearchViewShow
    Animated.spring(this.state.posLeft, {
      toValue: this._isSearchViewShow ? 1 : 0
    }).start()
  }

  private _setCurChannel(idx) {
    // console.log(channel)
    let { curChannel, channelList } = this.state
    if(channelList[idx].name === 'ALL') {
      curChannel = []
      curChannel.push('ALL')
    }else {
      if(curChannel.includes('ALL')){
        curChannel.splice(curChannel.indexOf('ALL'), 1)
      }
      if(curChannel.includes(channelList[idx].name)) {
        curChannel.splice(curChannel.indexOf(channelList[idx].name), 1)
      }else {
        curChannel.push(channelList[idx].name)
      }
    }
    this.setState({
      curChannel: curChannel.slice(0),
      isSearching: true
    })
    this._requestExtraParams.channels = curChannel.includes('ALL') ? null : channelList.filter(v => curChannel.includes(v.name)).map(v => v.id).join(',')
    console.log('---', this._requestExtraParams)
    console.log('this.state.curChannel :', this.state.curChannel);
  }

  private _setCurTime(time) {
    if(time === 'LATER') {
      this.setState({
        isTimeselectorShow: !this.state.isTimeselectorShow
      })
      return
    }
    this.setState({
      curTime: time,
      isSearching: true
    })
    const _getTimestampObj: any = this._getTimeTrans(time, 'timestamp')
    this._requestExtraParams.before = _getTimestampObj.before
    this._requestExtraParams.after = _getTimestampObj.after
    console.log('---', this._requestExtraParams)
  }

  private _searchWithCondition() { 
    this._flatlist.outSideRefresh(
      () => {
        this._toggleSearch()
        this.setState({isSearchingSubmiting: true})
      }
    )
  }

  private _clearSearch() {
    this.setState({
      isSearchingSubmiting: false,
      beforeDate: this._generateToday(),
      afterDate: this._generateToday(),
      beforeDateFormat: new Date(),
      afterDateFormat: new Date(),
      isTimeselectorShow: false,
      curChannel: ['ALL'],
      curTime: 'ANYTIME',
      isSearing: false
    })
    this._requestExtraParams.limit = 5
    this._requestExtraParams.channels = null
    this._requestExtraParams.after = ''
    this._requestExtraParams.before = ''
    this._flatlist.outSideRefresh()
  }

  private _getTimeTrans(timeName, type='string') {
    const _moment = moment()
    const m = _moment.month()
    const d = _moment.date()     
    const mFunc = m => (m + 1) < 10 ? `0${m+1}` : m + 1
    const dFunc = d => d < 10 ? `0${d}` : d 
    const weekStart = moment().startOf('week')
    const weekEnd = moment().endOf('week')
    const monthStart = moment().startOf('month')
    const monthEnd = moment().endOf('month').endOf('month')
    if(type === 'string') {
      switch(timeName) {
        case 'ANYTIME': return '';
        case 'TODAY': return ` ${dFunc(d)}/${mFunc(m)}`;
        case 'TOMORROW': return ` ${dFunc(d+1)}/${mFunc(m)}`;
        case 'THIS WEEK': return ` from ${dFunc(weekStart.date())}/${mFunc(weekStart.month())} to ${dFunc(weekEnd.date())}/${mFunc(weekEnd.month())}`
        case 'THIS MONTH': return ` from ${dFunc(monthStart.date())}/${mFunc(monthStart.month())} to ${dFunc(monthEnd.date())}/${mFunc(monthEnd.month())}`
      }
    }else if(type === 'timestamp') {
      switch(timeName) {
        case 'ANYTIME': return {before: '', after: ''}
        case 'TODAY': return {before: _moment.valueOf(), after: _moment.valueOf()};
        case 'TOMORROW': return {before: moment(new Date()).add(1,'days').valueOf(), after: moment(new Date()).add(1,'days').valueOf()};
        case 'THIS WEEK': return {before: weekStart.valueOf(), after: weekEnd.valueOf()}
        case 'THIS MONTH': return {before: monthStart.valueOf(), after: monthEnd.valueOf()}
      }
    }
  }

  private _generateToday() {
    const _moment = moment()
    const m = _moment.month()
    const d = _moment.date()   
    const y = _moment.year()  
    const mFunc = m => (m + 1) < 10 ? `0${m+1}` : m + 1
    const dFunc = d => d < 10 ? `0${d}` : d 
    return `${dFunc(d)}/${mFunc(m)}/${y}`
  }

  private _toggleDatePicker(type) {
    this.setState({
      isTimePickerShow: !this.state.isTimePickerShow,
      dateType: type
    })
  }

  private _dateChange(event, selectedDate) {
    const mFunc = m => (m + 1) < 10 ? `0${m+1}` : m + 1
    const dFunc = d => d < 10 ? `0${d}` : d 
    console.log(moment(selectedDate).valueOf())
    if(this.state.dateType === 'before') {
      this.setState({
        beforeDate: `${dFunc(moment(selectedDate).date())}/${mFunc(moment(selectedDate).month())}/${moment(selectedDate).year()}` || this.state.beforeDate,
        beforeDateFormat: selectedDate,
        isSearching: true
      })
      this._requestExtraParams.before = moment(selectedDate).valueOf()
    }else if(this.state.dateType === 'after') {
      this.setState({
        afterDate: `${dFunc(moment(selectedDate).date())}/${mFunc(moment(selectedDate).month())}/${moment(selectedDate).year()}` || this.state.afterDate,
        afterDateFormat: selectedDate,
        isSearching: true
      })
      this._requestExtraParams.after = moment(selectedDate).valueOf()
    }
    console.log('this._requestExtraParams :', this._requestExtraParams);
  } 

  private _getListCount(count) {
    this.setState({
      listCount: count
    })
  }

  private async _getChannels() {
    try{
      const res: any = await getChannels()
      if(!res.error) {
        this.setState({
          channelList: [{id: null, name: 'ALL'}].concat(res.channels)
        })
      }else if(res.error === "invalid_token") {
        AppStorage.removeUser()
        this.props.navigation.replace("Login")
      }
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
    const { isSearching, isSearchingSubmiting, beforeDateFormat, afterDateFormat, dateType, isTimePickerShow, curTime, curChannel } = this.state
    let btnSubTitle = ''
    if(curChannel.length > 0) {
      btnSubTitle = curChannel.includes('ALL') ? 'All activities' : curChannel.join(',')
    }
    if(curTime) {
      btnSubTitle += this._getTimeTrans(curTime)
    }
    return (
      <View style={[SearchViewStyle.mainContainer]}>
        <View style={SearchViewStyle.searchContainer}>
          {this._renderDateView()}
          {this._renderChannelView()}
          <BlockButton disabled={!isSearching} clickFunc={() => this._searchWithCondition()} style={!isSearching ? SearchViewStyle.searchDisabled : {}}>
            <View style={SearchViewStyle.searchItem}>
              <SearchIcon style={SearchViewStyle.searchIcon} width={14} height={14} fill={Colors.deepPurple}/>
              <Text style={SearchViewStyle.searchTitle}>
                {this._i18n.searchTitle}
              </Text>
            </View>
            {
              isSearching ? (<Text style={SearchViewStyle.searchSubtitle}>{btnSubTitle}</Text> ) : null
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
          { isSearchingSubmiting && (!curChannel.includes('ALL') || curTime !== 'ALL') ? this._renderSearchResult() : null} 
          {this._renderEventList()}
          {/* <BlankPage text="No activity found"/> */}
        </Animated.View>
        <Toast ref={t => this._toast = t} textColor={Colors.mainWhite} bgColor={Colors.transparentRed} autoHide={true}/>
        {isTimePickerShow && (
        <DateTimePicker
            style={SearchViewStyle.dateTimePicker}
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={dateType === 'before' ? beforeDateFormat : afterDateFormat }
            mode='date'
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => this._dateChange(event, selectedDate)}
          />
        )}
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
        {this._renderTimePickerView()}
      </View>
    )
  }

  private _renderTimePickerView() {
    if(!this.state.isTimeselectorShow) return null
    return (
      <View style={SearchViewStyle.timePickerContainer}>
        <TouchableOpacity onPress={() => this._toggleDatePicker('before')} style={SearchViewStyle.timePickerItem}>
          <DateFromIcon style={SearchViewStyle.timePickerIcon} fill={Colors.mainGreen} width={12} height={10.3}/>
          <Text style={SearchViewStyle.timePickerText}>{this.state.beforeDate}</Text>
        </TouchableOpacity>
        <Text style={SearchViewStyle.timePickerDivider}>-</Text>
        <TouchableOpacity onPress={() => this._toggleDatePicker('after')} style={SearchViewStyle.timePickerItem}>
          <DateToIcon style={SearchViewStyle.timePickerIcon} fill={Colors.mainGreen} width={12} height={10.3}/>
          <Text style={SearchViewStyle.timePickerText}>{this.state.afterDate}</Text>
        </TouchableOpacity>
        <View style={SearchViewStyle.timePickerTriangle}/>
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
              <RadiusButton clickFunc={() => this._setCurChannel(idx)} defaultStyle={curChannel.includes(item.name) ? SearchViewStyle.channelBtnActive : SearchViewStyle.channelBtnDefault} textActiveStyle={curChannel.includes(item.name) ? SearchViewStyle.channelBtnActiveText : {}} key={idx} text={item.name}/>
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
        <SearchIcon fill={Colors.deepPurple} width={25} height={25}/>
      </TouchableOpacity>
    )
    return <CommonHeader leftElement={leftElement} avatar={userInfo ? userInfo.avatar : ''}/>
  }

  private _renderSearchResult() {
    const { listCount, curChannel, curTime } = this.state
    let searchTextTips = 'Searched For '
    if(curChannel.length) {
      searchTextTips += curChannel.includes('ALL') ? 'All activities' : curChannel.join(',')
    }
    if(curTime) {
      searchTextTips += this._getTimeTrans(curTime)
    }
    return (
      <View style={SearchViewStyle.searchResContainer}>
        <View style={SearchViewStyle.searchResInner}>
          <Text style={SearchViewStyle.searchResInnerText}>{listCount} Results</Text>
          <RadiusButton clickFunc={() => this._clearSearch()} defaultStyle={SearchViewStyle.searchDefaultBtn} textStyle={SearchViewStyle.searchDefaultBtnText} text="CLEAR SEARCH"/>
        </View>
        <Text style={SearchViewStyle.searchResSubtitle}>{searchTextTips}</Text>
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
        getCount={(count) => this._getListCount(count)}
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
                <TimeIcon style={SearchViewStyle.listItemSubTitleSvg} fill={Colors.mainPurple} width={12} height={12}/>
                <Text style={SearchViewStyle.listItemSubtitle}>{item.begin_time.slice(0,10) || ''} - {item.end_time.slice(0,10) || ''}</Text>
              </View>
              <Text numberOfLines={4} style={SearchViewStyle.listItemDesc}>{item.description}</Text>
              <View style={{flexDirection: 'row'}}>
                {
                  item.me_going ? (
                    <TouchableOpacity activeOpacity={0.8} style={SearchViewStyle.listItemBottom}>
                      <CheckActiveIcon style={SearchViewStyle.listItemBottomSvg} fill={Colors.deepGreen} width={14} height={11}/>
                      <Text style={SearchViewStyle.listItemBottomText}>I am going!</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity activeOpacity={0.8} style={SearchViewStyle.listItemBottom}>
                      <CheckIcon style={SearchViewStyle.listItemBottomSvg} fill={Colors.lighterPurple} width={14} height={11}/>
                      <Text style={SearchViewStyle.listItemBottomText}>{item.goings_count}</Text>
                    </TouchableOpacity>
                  )
                }
                {
                  item.me_likes ? (
                    <TouchableOpacity activeOpacity={0.8} style={SearchViewStyle.listItemBottom}>
                      <LikeActiveIcon style={SearchViewStyle.listItemBottomSvg} fill={Colors.mainRed} width={14} height={11}/>
                      <Text style={SearchViewStyle.listItemBottomText}>I like it!</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity activeOpacity={0.8} style={SearchViewStyle.listItemBottom}>
                      <LikeIcon style={SearchViewStyle.listItemBottomSvg} fill={Colors.lighterPurple} width={14} height={11}/>
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