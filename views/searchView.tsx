import React from 'react'
import {View} from 'react-native'
// styles
import SearchViewStyle from '../styles/SearchViewStyle'
//components
import Text from '../components/unScalingText'
import RadiusButton from '../components/radiusButton'
import BlockButton from '../components/blockButton'
import CustomSvg from '../components/customSvg'
import BlankPage from '../components/blankPage'
// languages
import i18n from '../language/i18n'
//utils
import Colors from '../utils/colors'
import { px2dp } from '../utils/commonUtils'

export default class SearchView extends React.PureComponent<{}, {}> {

  private _i18n = i18n['en'].searchText
  private _searchIcon = require('../assets/search.svg')

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
          {/* <Text>1234</Text> */}
          <BlankPage text="No activity found"/>
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
        <View style={[SearchViewStyle.divider, {width: px2dp(50)}]}/>
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

}