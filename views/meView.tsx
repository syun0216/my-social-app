import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from 'react-native';
//components
import CommonHeader from '../components/commonHeader';
import CustomSvg from '../components/customSvg';
import Text from '../components/unScalingText';
import CommonTab from '../components/commonTab';
import BlankPage from '../components/blankPage';
import Loading from '../components/loading';
import RadiusButton from '../components/radiusButton';
// styles
import SearchViewStyle from '../styles/searchViewStyle';
import MeStyle from '../styles/meStyle';
//utils
import Colors from '../utils/colors';
import { px2dpwh } from '../utils/commonUtils';
//api
import { getUserInfo, getUserEvents } from '../api/apis';
//icons
import { HomeIcon, EmailIcon, TimeIcon } from '../components/icon';

type PropTypes = any;

type State = {
  isLoading: boolean;
  userInfo: null;
  userEvent: null;
};
export default class MeView extends React.PureComponent<PropTypes, State> {
  private _likeIcon = require('../assets/like-outline.svg');
  private _likeActiveIcon = require('../assets/like.svg');
  private _checkIcon = require('../assets/check-outline.svg');
  private _checkActiveIcon = require('../assets/check.svg');
  private _pastIcon = require('../assets/past-outline.svg');
  private _pastActiveIcon = require('../assets/past.svg');

  public state = {
    isLoading: true,
    userInfo: null,
    userEvent: null,
  };

  public componentDidMount() {
    this._getInfo();
    this._getEventByTypes('liked');
    this._getUserInfo();
  }

  private async _getInfo() {
    const resUserInfo: any = await getUserInfo();
    const resEvent: any = await getUserEvents('liked');
    this.setState({
      userInfo: resUserInfo,
      userEvent: resEvent.events,
      isLoading: false,
    });
  }

  private async _getUserInfo() {
    let res: any = await AsyncStorage.getItem('storage_key_user_data');
    if (res) {
      res = JSON.parse(res);
    }
    this.setState({
      userInfo: res.user || {},
    });
  }

  private async _getEventByTypes(type) {
    const resEvent: any = await getUserEvents(type);
    this.setState({
      userEvent: resEvent.events,
    });
    // console.log(resEvent)
  }

  private _changeTab(idx) {
    // console.log(idx)
    switch (idx) {
      case 0:
        this._getEventByTypes('liked');
        break;
      case 1:
        this._getEventByTypes('going');
        break;
      case 2:
        this._getEventByTypes('past');
        break;
    }
  }

  public render() {
    return this.state.isLoading ? <Loading /> : this._renderMainView();
  }

  //views
  private _renderMainView() {
    return (
      <View style={MeStyle.mainContainer}>
        {this._renderHeaderView()}
        <ScrollView stickyHeaderIndices={[1]}>
          {this._renderIntroView()}
          {this._renderTabView()}
          {this._renderEventList()}
        </ScrollView>
      </View>
    );
  }

  private _renderHeaderView() {
    const { userInfo } = this.state;
    const leftElement = (
      <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
        <HomeIcon fill={Colors.deepPurple} width={22} height={20} />
      </TouchableOpacity>
    );
    return (
      <CommonHeader
        leftElement={leftElement}
        avatar={userInfo ? userInfo.avatar : ''}
      />
    );
  }

  private _renderIntroView() {
    const { userInfo } = this.state;
    return (
      <View style={MeStyle.introContainer}>
        <Image source={{ uri: userInfo.avatar }} style={MeStyle.introAvatar} />
        <Text style={MeStyle.introName}>{userInfo.username}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <EmailIcon
            style={MeStyle.introEmailIcon}
            fill={Colors.mainPurple}
            width={20}
            height={15}
          />
          <Text style={MeStyle.introEmail}>{userInfo.email}</Text>
        </View>
      </View>
    );
  }

  private _renderTabView() {
    const { userInfo } = this.state;
    const tabData = [
      {
        svg: this._likeIcon,
        activeSvg: this._likeActiveIcon,
        svgWidth: 18,
        svgHeight: 18,
        label: `${userInfo.likes_count} Likes`,
      },
      {
        svg: this._checkIcon,
        activeSvg: this._checkActiveIcon,
        svgWidth: 18,
        svgHeight: 18,
        label: `${userInfo.goings_count} goings`,
      },
      {
        svg: this._pastIcon,
        activeSvg: this._pastActiveIcon,
        svgWidth: 18,
        svgHeight: 18,
        label: `${userInfo.past_count} Past`,
      },
    ];
    return (
      <CommonTab tabData={tabData} callback={idx => this._changeTab(idx)} />
    );
  }

  _renderEventList() {
    const { userEvent } = this.state;
    if (userEvent.length === 0) {
      return (
        <BlankPage style={{ height: px2dpwh(300) }} text="No activity found" />
      );
    }
    return (
      <View>
        {userEvent.map((item, idx) => this._renderListItem(item, idx))}
      </View>
    );
  }

  private _renderListItem(item, index) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        style={SearchViewStyle.listItemContainer}
        onPress={() =>
          this.props.navigation.navigate('Detail', { id: item.id })
        }
      >
        <View style={SearchViewStyle.listItemInner}>
          <View style={SearchViewStyle.listItemTop}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={SearchViewStyle.listItemTopAvatar}
                source={{ uri: item.creator.avatar }}
              />
              <Text style={SearchViewStyle.listItemTopTitle}>
                {item.creator.username}
              </Text>
            </View>
            <RadiusButton
              textStyle={SearchViewStyle.listItemTopBtnText}
              defaultStyle={SearchViewStyle.listItemTopBtn}
              text={item.channel.name}
            />
          </View>
          <View style={SearchViewStyle.listItemWrapper}>
            <View style={SearchViewStyle.listItemWrapperLeft}>
              <Text style={SearchViewStyle.listItemTitle}>{item.name}</Text>
              <View style={{ flexDirection: 'row', marginBottom: px2dpwh(12) }}>
                <TimeIcon
                  style={SearchViewStyle.listItemSubTitleSvg}
                  fill={Colors.mainPurple}
                  width={12}
                  height={12}
                />
                <Text style={SearchViewStyle.listItemSubtitle}>
                  {item.begin_time.slice(0, 10) || ''} -{' '}
                  {item.end_time.slice(0, 10) || ''}
                </Text>
              </View>
              <Text numberOfLines={4} style={SearchViewStyle.listItemDesc}>
                {item.description}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                {item.me_going ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={SearchViewStyle.listItemBottom}
                  >
                    <CustomSvg
                      style={SearchViewStyle.listItemBottomSvg}
                      fill={Colors.deepGreen}
                      svg={this._checkActiveIcon}
                      width={14}
                      height={11}
                    />
                    <Text style={SearchViewStyle.listItemBottomText}>
                      I am going!
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={SearchViewStyle.listItemBottom}
                  >
                    <CustomSvg
                      style={SearchViewStyle.listItemBottomSvg}
                      fill={Colors.lighterPurple}
                      svg={this._checkIcon}
                      width={14}
                      height={11}
                    />
                    <Text style={SearchViewStyle.listItemBottomText}>
                      {item.goings_count}
                    </Text>
                  </TouchableOpacity>
                )}
                {item.me_likes ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={SearchViewStyle.listItemBottom}
                  >
                    <CustomSvg
                      style={SearchViewStyle.listItemBottomSvg}
                      fill={Colors.mainRed}
                      svg={this._likeActiveIcon}
                      width={14}
                      height={11}
                    />
                    <Text style={SearchViewStyle.listItemBottomText}>
                      I like it!
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={SearchViewStyle.listItemBottom}
                  >
                    <CustomSvg
                      style={SearchViewStyle.listItemBottomSvg}
                      fill={Colors.lighterPurple}
                      svg={this._likeIcon}
                      width={14}
                      height={11}
                    />
                    <Text style={SearchViewStyle.listItemBottomText}>
                      {item.likes_count}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {item.images && item.images.length > 0 ? (
              <View style={SearchViewStyle.listItemWrapperRight}>
                <Image
                  style={SearchViewStyle.listItemWrapperRightImg}
                  source={{ uri: item.images[1] }}
                />
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
