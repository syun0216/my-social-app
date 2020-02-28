import React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  AsyncStorage,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//styles
import DetailStyle from '../styles/detailStyle';
//components
import Text from '../components/unScalingText';
import CommonHeader from '../components/commonHeader';
import CommonTab from '../components/commonTab';
import RadiusButton from '../components/radiusButton';
import Loading from '../components/loading';
import Toast from '../components/toast';
//utils
import Colors from '../utils/colors';
import { px2dpwh, isIphoneX, iPhoneXBottom } from '../utils/commonUtils';
//api
import {
  getEventsWithEventId,
  getEventParticipantWithEventId,
  getLikesWithEventId,
  getCommentWithEventId,
  postEventParticipantWithEventId,
  postLikeWithEventId,
  postCommentWithEventId,
  deleteEventParticipantWithEventId,
  deleteLikeWithEventId,
} from '../api/apis';
//icons
import * as Icons from '../components/icon';

type PropTypes = any;
type State = {
  eventInfo: eventItemModel | null;
  participantInfo: participantsModel | null;
  likesInfo: null;
  commentsInfo: null;
  userInfo: userInfo | null;
  commentInputTranY: Animated.AnimatedValue;
  isGoing: boolean;
  isLike: boolean;
  isLoading: boolean;
  isViewAll: boolean;
};

type layoutObj = {
  [key: number]: any;
};

const _infoIcon: NodeRequire = require('../assets/info-outline.svg');
const _infoActiveIcon: NodeRequire = require('../assets/info.svg');
const _peopleIcon: NodeRequire = require('../assets/people-outline.svg');
const _peopleActiveIcon: NodeRequire = require('../assets/people.svg');
const _commentIcon: NodeRequire = require('../assets/comment-outline.svg');
const _commentActiveIcon: NodeRequire = require('../assets/comment.svg');

export default class DetailsView extends React.PureComponent<PropTypes, State> {
  private _toast = null;

  private _commentText: string = '';
  private _commentInputRef = null;
  private _scrollViewRef = null;
  private _layoutObj: layoutObj = {};

  public state = {
    eventInfo: null,
    participantInfo: null,
    likesInfo: null,
    commentsInfo: null,
    userInfo: null,
    commentInputTranY: new Animated.Value(0),
    isGoing: false,
    isLike: false,
    isLoading: true,
    isViewAll: false,
  };

  public componentDidMount() {
    this._getInfo();
    this._getUserInfo();
  }

  private async _getUserInfo() {
    let res: any = await AsyncStorage.getItem('storage_key_user_data');
    if (res) {
      res = JSON.parse(res);
    }
    this.setState({
      userInfo: res.user,
    });
  }

  private async _getInfo() {
    const { id } = this.props.route.params;
    const resEvent: any = await getEventsWithEventId(id);
    const resParticipant: any = await getEventParticipantWithEventId(id);
    const resLikes: any = await getLikesWithEventId(id);
    const resComments: any = await getCommentWithEventId(id);
    this.setState({
      eventInfo: resEvent.event,
      participantInfo: resParticipant.users,
      likesInfo: resLikes.users,
      commentsInfo: resComments.comments,
      isGoing: resEvent.event.me_going,
      isLike: resEvent.event.me_likes,
      isLoading: false,
    });
  }

  private async _getEventInfo() {
    const resEvent: any = await getEventsWithEventId(
      this.props.route.params.id
    );
    console.log('resComments', resEvent);
    this.setState({
      eventInfo: resEvent.event,
      isGoing: resEvent.event.me_going,
      isLike: resEvent.event.me_likes,
    });
  }

  private async _getParticipantInfo() {
    const resParticipant: any = await getEventParticipantWithEventId(
      this.props.route.params.id
    );
    this.setState({
      participantInfo: resParticipant.users,
    });
  }

  private async _getLikeInfo() {
    const resLike: any = await getLikesWithEventId(this.props.route.params.id);
    this.setState({
      likesInfo: resLike.users,
    });
  }

  private _getCommentText(text) {
    this._commentText = text;
  }

  private async _getCommentsInfo() {
    const resComments: any = await getCommentWithEventId(
      this.props.route.params.id
    );
    this.setState({
      commentsInfo: resComments.comments,
    });
  }

  private async _postParticipanet() {
    const { id, callback } = this.props.route.params;
    const { isGoing } = this.state;
    if (isGoing) {
      await deleteEventParticipantWithEventId(id);
      this._toast.show('delete success');
    } else {
      await postEventParticipantWithEventId(id);
      this._toast.show('post success');
    }
    this._getEventInfo();
    this._getParticipantInfo();
    callback && callback();
    // console.log('res :', res);
  }

  private async _postLike() {
    const { id, callback } = this.props.route.params;
    const { isLike } = this.state;
    if (isLike) {
      await deleteLikeWithEventId(id);
      this._toast.show('delete success');
    } else {
      await postLikeWithEventId(id);
      this._toast.show('post success');
    }
    this._getEventInfo();
    this._getLikeInfo();
    callback && callback();
    // console.log('res :', res);
  }

  private async _postComment() {
    const { id } = this.props.route.params;
    if (this._commentText === '') {
      this._toast.show('comment can not be null');
      return;
    }
    await postCommentWithEventId(id, this._commentText);
    requestAnimationFrame(() => {
      this._toast.show('post success');
      this._toggleCommentInput(false);
    });
    this._commentInputRef.clear();
    this._getCommentsInfo();
    // console.log('res :', res);
  }

  private _toggleCommentInput(status: boolean) {
    Animated.spring(this.state.commentInputTranY, {
      toValue: status ? 1 : 0,
      // duration: 800,
      // easing: Easing.cubic
    }).start();
  }

  private _toggleViewAll(status: boolean) {
    this.setState({
      isViewAll: status,
    });
  }

  private _tabChange(idx: number) {
    // console.log('idx :', idx);
    const { x, y } = this._layoutObj[idx];
    // console.log(x, y)
    this._scrollViewRef.scrollTo({ x, y: y - px2dpwh(48), animated: true });
  }

  private _getViewLayout(e: LayoutChangeEvent, viewType: number) {
    // console.log(e)
    if (!this._layoutObj[viewType]) {
      this._layoutObj[viewType] = {};
    }
    this._layoutObj[viewType] = { ...e.nativeEvent.layout };
    // console.log(this._layoutObj)
  }

  public render() {
    return this.state.isLoading ? <Loading /> : this._renderMainView();
  }

  private _renderMainView() {
    return (
      <View style={DetailStyle.mainContainer}>
        {this._renderHeader()}
        <ScrollView
          ref={ref => (this._scrollViewRef = ref)}
          stickyHeaderIndices={[1]}
          style={{ marginBottom: px2dpwh(56) }}
        >
          {this._renderTopIntro()}
          {this._renderTabView()}
          {this._renderInfoView()}
          {this._renderParticipantView()}
          {this._renderCommentView()}
        </ScrollView>
        {this._renderBottomBar()}
        {this._renderBottomInput()}
        <Toast ref={t => (this._toast = t)} autoHide={true} />
      </View>
    );
  }

  private _renderHeader() {
    const { userInfo } = this.state;
    const leftElement = (
      <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
        <Icons.HomeIcon fill={Colors.deepPurple} width={22} height={20} />
      </TouchableOpacity>
    );
    return (
      <CommonHeader
        leftElement={leftElement}
        avatar={userInfo ? userInfo.avatar : ''}
      />
    );
  }

  private _renderTopIntro() {
    const { eventInfo } = this.state;
    return (
      <View style={DetailStyle.topIntroContainer}>
        <RadiusButton
          defaultStyle={DetailStyle.channelBtn}
          textStyle={DetailStyle.channelBtnText}
          text={eventInfo.channel.name}
        />
        <Text style={DetailStyle.introTitle}>{eventInfo.name}</Text>
        <View style={DetailStyle.introAvatarContainer}>
          <Image
            source={{ uri: eventInfo.creator.avatar }}
            style={DetailStyle.introAvatarImg}
          />
          <View>
            <Text style={DetailStyle.introAvatarTitle}>
              {eventInfo.creator.username}
            </Text>
            <Text style={DetailStyle.introAvatarSubtitle}>
              {eventInfo.updatedAt}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  private _renderTabView() {
    const tabData = [
      {
        svg: _infoIcon,
        activeSvg: _infoActiveIcon,
        svgWidth: 18,
        svgHeight: 18,
        label: 'Details',
      },
      {
        svg: _peopleIcon,
        activeSvg: _peopleActiveIcon,
        svgWidth: 18,
        svgHeight: 18,
        label: 'Participants',
      },
      {
        svg: _commentIcon,
        activeSvg: _commentActiveIcon,
        svgWidth: 18,
        svgHeight: 18,
        label: 'Comments',
      },
    ];
    return (
      <CommonTab tabData={tabData} callback={idx => this._tabChange(idx)} />
    );
  }

  private _renderInfoView() {
    return (
      <View style={DetailStyle.infoContainer}>
        {this._renderDescView()}
        {this._renderDateTimeInfoView()}
        {this._renderWhereInfoView()}
      </View>
    );
  }

  private _renderDescView() {
    const { eventInfo, isViewAll } = this.state;
    return (
      <View
        style={DetailStyle.descContainer}
        onLayout={(e: LayoutChangeEvent) => this._getViewLayout(e, 0)}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={DetailStyle.scrollImgContainer}
          horizontal={true}
        >
          {eventInfo.images.length > 0
            ? eventInfo.images
                .slice(1, 3)
                .map((item, idx) => (
                  <Image
                    key={idx}
                    style={DetailStyle.scrollImg}
                    source={{ uri: item }}
                  />
                ))
            : null}
        </ScrollView>
        <View style={DetailStyle.descTextItem}>
          <Text numberOfLines={isViewAll ? 10 : 4} style={DetailStyle.descText}>
            {eventInfo.description}
          </Text>
          {!isViewAll ? (
            <LinearGradient
              colors={['rgba(250, 249, 252, 0)', 'rgba(250, 249, 252, 1)']}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 0.0, y: 1.0 }}
              style={DetailStyle.viewAllContainer}
            >
              <View style={DetailStyle.viewAllInner}>
                <RadiusButton
                  clickFunc={() => this._toggleViewAll(true)}
                  defaultStyle={DetailStyle.viewAllBtn}
                  textStyle={DetailStyle.viewAllBtnText}
                  text="VIEW ALL"
                />
              </View>
            </LinearGradient>
          ) : null}
        </View>
      </View>
    );
  }

  private _renderDateTimeInfoView() {
    const { eventInfo } = this.state;
    return (
      <View style={DetailStyle.dateContainer}>
        <View style={DetailStyle.commonLeftTitleContainer}>
          <View style={DetailStyle.commonLeftDivider} />
          <Text style={DetailStyle.commonLeftTitle}>When</Text>
        </View>
        <View style={DetailStyle.dateContent}>
          <View
            style={[
              DetailStyle.dateContentItem,
              DetailStyle.dateContentItemDivider,
            ]}
          >
            <View style={DetailStyle.dateContentTimeContainer}>
              <Icons.DateFromIcon
                style={DetailStyle.dateContentTimeIcon}
                width={16}
                height={13.8}
                fill={Colors.mainGreen}
              />
              <Text style={DetailStyle.dateContentTimeText}>
                {eventInfo.begin_time.slice(0, 10)}
              </Text>
            </View>
            <View style={DetailStyle.dateContentHourContainer}>
              <Text style={DetailStyle.dateContentHourText}>8:30</Text>
              <Text style={DetailStyle.dateContentHourSubText}>am</Text>
            </View>
          </View>
          <View style={DetailStyle.dateContentItem}>
            <View style={DetailStyle.dateContentTimeContainer}>
              <Icons.DateToIcon
                style={DetailStyle.dateContentTimeIcon}
                width={16}
                height={13.8}
                fill={Colors.mainGreen}
              />
              <Text style={DetailStyle.dateContentTimeText}>
                {eventInfo.end_time.slice(0, 10)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  private _renderWhereInfoView() {
    const { eventInfo } = this.state;
    return (
      <View style={DetailStyle.whereContainer}>
        <View
          style={[
            DetailStyle.commonLeftTitleContainer,
            { marginBottom: px2dpwh(8) },
          ]}
        >
          <View style={DetailStyle.commonLeftDivider} />
          <Text style={DetailStyle.commonLeftTitle}>Where</Text>
        </View>
        <Text style={DetailStyle.whereTitle}>{eventInfo.location}</Text>
        <Text style={DetailStyle.whereSubTitle}>
          {eventInfo.location_detail}
        </Text>
        <Image
          style={DetailStyle.whereLocation}
          source={require('../assets/gmap.png')}
        />
      </View>
    );
  }

  private _renderParticipantView() {
    const { participantInfo, likesInfo, eventInfo } = this.state;
    return (
      <View
        style={DetailStyle.participantContainer}
        onLayout={e => this._getViewLayout(e, 1)}
      >
        <View
          style={[
            DetailStyle.participantItem,
            DetailStyle.participantItemDivider,
          ]}
        >
          <View style={DetailStyle.participantCountContainer}>
            <Icons.CheckIcon
              style={DetailStyle.participantCountIcon}
              fill={Colors.lighterPurple}
              width={12}
              height={9.8}
            />
            <Text style={DetailStyle.participantCountText}>
              {eventInfo.goings_count} going
            </Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {participantInfo.map(item => (
              <Image
                key={item.id}
                style={DetailStyle.participantCountAvatar}
                source={{ uri: item.avatar }}
              />
            ))}
          </ScrollView>
        </View>
        <View style={DetailStyle.participantItem}>
          <View style={DetailStyle.participantCountContainer}>
            <Icons.CheckIcon
              style={DetailStyle.participantCountIcon}
              fill={Colors.lighterPurple}
              width={12}
              height={9.8}
            />
            <Text style={DetailStyle.participantCountText}>
              {eventInfo.likes_count} likes
            </Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {likesInfo.map(item => (
              <Image
                key={item.id}
                style={DetailStyle.participantCountAvatar}
                source={{ uri: item.avatar }}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }

  private _renderCommentView() {
    const { commentsInfo } = this.state;
    return (
      <View
        style={DetailStyle.commentContainer}
        onLayout={e => this._getViewLayout(e, 2)}
      >
        {commentsInfo.map(item => this._renderCommentItem(item))}
      </View>
    );
  }

  private _renderCommentItem(item) {
    return (
      <View key={item.id} style={DetailStyle.commentItem}>
        <Image
          style={DetailStyle.commentAvatar}
          source={{ uri: item.user.avatar }}
        />
        <View style={DetailStyle.commentContentContainer}>
          <View style={DetailStyle.commentTopContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={DetailStyle.commentTopName}>
                {item.user.username}
              </Text>
              <Text style={DetailStyle.commentTopTime}>
                {item.updatedAt.slice(0, 10)}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this._toggleCommentInput(true)}
            >
              <Icons.ReplyIcon
                style={DetailStyle.commentTopIcon}
                fill={Colors.mainGreen}
                width={18}
                height={15}
              />
            </TouchableOpacity>
          </View>
          <Text style={DetailStyle.commentContentText}>{item.comment}</Text>
        </View>
      </View>
    );
  }

  private _renderBottomBar() {
    const { isGoing, isLike } = this.state;
    return (
      <View style={DetailStyle.bottomBar}>
        <View style={DetailStyle.bottomBarLeft}>
          <TouchableOpacity
            onPress={() => this._toggleCommentInput(true)}
            style={DetailStyle.bottomBarLeftBtn}
          >
            <Icons.CommentSingleIcon
              style={DetailStyle.bottomBarLeftIcon}
              fill={Colors.deepPurple}
              width={24}
              height={24}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._postLike()}
            style={DetailStyle.bottomBarLeftBtn}
          >
            {isLike ? (
              <Icons.LikeActiveIcon
                fill={Colors.mainGreen}
                width={24}
                height={24}
              />
            ) : (
              <Icons.LikeIcon fill={Colors.deepPurple} width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>
        {isGoing ? (
          <TouchableOpacity
            onPress={() => this._postParticipanet()}
            style={DetailStyle.bottomBarRight}
          >
            <Icons.CheckActiveIcon
              style={DetailStyle.bottomBarRightIcon}
              fill={Colors.mainPurple}
              width={22}
              height={22}
            />
            <Text style={DetailStyle.bottomBarRightText}>I am going</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => this._postParticipanet()}
            style={DetailStyle.bottomBarRight}
          >
            <Icons.CheckIcon
              style={DetailStyle.bottomBarRightIcon}
              fill={Colors.mainBlack}
              width={22}
              height={22}
            />
            <Text style={DetailStyle.bottomBarRightText}>Join</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  private _renderBottomInput() {
    return (
      <Animated.View
        style={[
          DetailStyle.bottomInputContainer,
          {
            transform: [
              {
                translateY: this.state.commentInputTranY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    0,
                    -(isIphoneX() ? iPhoneXBottom + px2dpwh(56) : px2dpwh(56)),
                  ],
                }),
              },
            ],
          },
        ]}
      >
        <View style={DetailStyle.bottomInputLeft}>
          <TouchableOpacity onPress={() => this._toggleCommentInput(false)}>
            <Icons.CloseIcon
              width={15}
              height={15}
              fill={Colors.mainGray}
              style={DetailStyle.bottomInputLeftIcon}
            />
          </TouchableOpacity>
          <TextInput
            ref={ti => (this._commentInputRef = ti)}
            style={DetailStyle.bottomInput}
            placeholder="Leave your comment here"
            placeholderTextColor={Colors.lightestPurple}
            clearButtonMode="while-editing"
            onChangeText={comment => this._getCommentText(comment)}
          />
        </View>
        <TouchableOpacity
          onPress={() => this._postComment()}
          style={DetailStyle.bottomInputSubmitBtn}
          activeOpacity={1}
        >
          <Icons.SendIcon
            style={DetailStyle.bottomInputSubmitBtnIcon}
            fill={Colors.mainPurple}
            width={28}
            height={24}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
