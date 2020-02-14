import React from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
// styles
import SearchViewStyle from '../styles/searchViewStyle'
//components
import Text from '../components/unScalingText'
import RadiusButton from '../components/radiusButton'
import BlockButton from '../components/blockButton'
import CustomSvg from '../components/customSvg'
import BlankPage from '../components/blankPage'
import CommonHeader from '../components/commonHeader'
// languages
import i18n from '../language/i18n'
//utils
import Colors from '../utils/colors'
import { px2dpw, px2dpwh } from '../utils/commonUtils'

export default class SearchView extends React.PureComponent<{}, {}> {

  private _i18n = i18n['en'].searchText
  private _searchIcon = require('../assets/search.svg')
  private _timeIcon = require('../assets/time.svg')
  private _checkIcon = require('../assets/check-outline.svg')
  private _checkActiveIcon = require('../assets/check.svg')
  private _likeIcon = require('../assets/like-outline.svg')
  private _likeActiveIcon = require('../assets/like.svg')

  public render() {
    return this._renderMainView()
  }

  // views
  private _renderMainView() {
    return (
      <View style={SearchViewStyle.mainContainer}>
        {/* <View style={SearchViewStyle.searchContainer}>
          {this._renderDateView()}
          {this._renderChannelView()}
          <BlockButton>
            <View style={SearchViewStyle.searchItem}>
              <CustomSvg style={SearchViewStyle.searchIcon} width={14} height={14} fill={Colors.deepPurple} svg={this._searchIcon}/>
              <Text style={SearchViewStyle.searchTitle}>
                {this._i18n.searchTitle}
              </Text>
            </View>
            <Text style={SearchViewStyle.searchSubtitle}>{this._i18n.subTitle}</Text>            
          </BlockButton>
        </View> */}
        <View style={SearchViewStyle.contentContainer}>
          {this._renderHeaderView()}
          {this._renderSearchResult()}
          {this._renderListItem()}
          {/* <BlankPage text="No activity found"/> */}
        </View>
      </View>
    )
  }

  private _renderDateView() {
    const { date, anytime, today, tomorrow,thisWeek, thisMonth, later } = this._i18n
    const btnArr = [anytime, today, tomorrow, thisWeek, thisMonth, later]
    return(
      <View style={SearchViewStyle.dateContainer}>
        <Text style={SearchViewStyle.commonTitle}>{date}</Text>
        <View style={SearchViewStyle.divider}/>
        <View style={SearchViewStyle.commonContainer}>
          {
            btnArr.map((item, idx) => (
              <RadiusButton defaultStyle={SearchViewStyle.dateBtnDefault} key={idx} text={item}/>
            ))
          }
        </View>
      </View>
    )
  }

  private _renderChannelView() {
    const { all, channel, channel1, channel2, channel3 } = this._i18n
    const btnArr = [all, channel, channel1, channel2, channel3]
    return (
      <View style={SearchViewStyle.channelView}>
        <Text style={SearchViewStyle.commonTitle}>{channel}</Text>
        <View style={[SearchViewStyle.divider, {width: px2dpw(50)}]}/>
        <View style={SearchViewStyle.commonContainer}>
          {
            btnArr.map((item, idx) => (
              <RadiusButton defaultStyle={SearchViewStyle.channelBtnDefault} key={idx} text={item}/>
            ))
          }
        </View>
      </View>
    )
  }

  private _renderHeaderView() {
    const leftElement = <CustomSvg fill={Colors.deepPurple} svg={require('../assets/search.svg')} width={25} height={25}/>
    return <CommonHeader leftElement={leftElement}/>
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

  private _renderListItem() {
    return (
      <TouchableOpacity style={SearchViewStyle.listItemContainer}>
        
        <View style={SearchViewStyle.listItemInner}>
          <View style={SearchViewStyle.listItemTop}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={SearchViewStyle.listItemTopAvatar} source={{uri: 'https://s2.ax1x.com/2020/02/14/1XMwGR.png'}}/>
              <Text style={SearchViewStyle.listItemTopTitle}>username</Text>
            </View>
            <RadiusButton textStyle={SearchViewStyle.listItemTopBtnText} defaultStyle={SearchViewStyle.listItemTopBtn} text="channel name"/>
          </View>
          <View style={SearchViewStyle.listItemWrapper}>
            <View style={SearchViewStyle.listItemWrapperLeft}>
              <Text style={SearchViewStyle.listItemTitle}>Activity Title Name Make it Longer May Longer than One Line</Text>
              <View style={{flexDirection: 'row', marginBottom: px2dpwh(12)}}>
                <CustomSvg style={SearchViewStyle.listItemSubTitleSvg} fill={Colors.mainPurple} svg={this._timeIcon} width={12} height={12}/>
                <Text style={SearchViewStyle.listItemSubtitle}>14 May 2016 12:22 - 14 May 2016 18:00</Text>
              </View>
              <Text style={SearchViewStyle.listItemDesc}>[No longer than 300 chars] Vivamus sagittis, diam in lobortis, sapien arcu mattis erat, vel aliquet sem urna et risus. Ut feugiat sapien mi potenti...</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity activeOpacity={0.8} style={SearchViewStyle.listItemBottom}>
                  <CustomSvg style={SearchViewStyle.listItemBottomSvg} fill={Colors.deepGreen} svg={this._checkActiveIcon} width={14} height={11}/>
                  <Text style={SearchViewStyle.listItemBottomText}>I am going!</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={SearchViewStyle.listItemBottom}>
                  <CustomSvg style={SearchViewStyle.listItemBottomSvg} fill={Colors.mainRed} svg={this._likeActiveIcon} width={14} height={11}/>
                  <Text style={SearchViewStyle.listItemBottomText}>I like it!</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={SearchViewStyle.listItemWrapperRight}>
              <Image style={SearchViewStyle.listItemWrapperRightImg} source={{uri: 'https://s2.ax1x.com/2020/02/14/1XMwGR.png'}}/>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

}