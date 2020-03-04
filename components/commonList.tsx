import React, { Component } from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { httpStatus } from '../service/apis';
//components
import ListFooter from './listFooter';
import BlankPage from './blankPage';
import Loading from './loading';
import ErrorPage from './errorPage';
//language
import colors from '../utils/colors';
import { px2dpw, px2dph } from '../utils/commonUtils';
//cache
import AppStorage from '../cache/appStorage';
//navigation
import * as RootNavigation from '../router/rootNavigation';

let requestParams: { nextOffset: number; currentOffset: number } = {
  nextOffset: 0,
  currentOffset: 0,
};

const {
  LOADING,
  LOAD_SUCCESS,
  LOAD_FAILED,
  NO_DATA,
  NO_MORE_DATA,
} = httpStatus;

type PropTypes = {
  requestFunc: (params) => Promise<any>;
  renderItem: (item: any, index: number) => React.ReactElement;
  renderHeader?: () => React.ReactElement;
  renderIndicator?: () => React.ReactElement;
  isRefreshControlShow?: boolean;
  isBlankInfoBtnShow?: boolean;
  isItemSeparatorShow?: boolean;
  isIndicatorShow?: boolean;
  blankBtnMessage?: string;
  offset: number;
  extraParams?: object;
  getCount?: (x: number) => void;
  getRawData?: (x: object) => void; // 获取最原始的列表数据
  getScrollTop?: (x: number) => void; //获取滚动高度
  style?: ViewProps['style'];
  errorCallback?: () => void;
};

type State = {
  listData: any[];
  firstPageLoading: number;
  nextPageLoading: number;
  refreshing: boolean;
  showToTop: boolean;
  isError: boolean;
};

class CommonList extends Component<PropTypes, State> {
  private _timer = null;
  private _flatlist = null;

  public state = {
    listData: [], //列表数据
    firstPageLoading: LOADING, //首屏加载状态
    nextPageLoading: LOADING, //上拉加载更多状态
    refreshing: false, //是否下拉刷新
    showToTop: false, // 是否展示返回顶部按钮
    isError: false,
  };

  componentDidMount() {
    this.init();
    this._timer = setTimeout(() => {
      this._requestFirstPage();
      clearTimeout(this._timer);
    }, 300);
  }

  componentWillUnmount() {
    this.init();
    clearTimeout(this._timer);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return JSON.stringify(nextState) != JSON.stringify(this.state);
  };

  /**
   * 初始化请求参数
   *
   * @memberof CommonFlatList
   */
  init() {
    requestParams.currentOffset = 0;
    requestParams.nextOffset = 0;
  }

  /**
   * 获取列表数据
   *
   * @param {*} offset
   * @param {*} successCallback
   * @param {*} failCallback
   * @memberof CommonFlatList
   */
  getData(offset, successCallback, failCallback = () => {}) {
    const { extraParams, getRawData } = this.props;
    let _requestParams = {
      offset,
    };
    if (Object.keys(extraParams).length > 0) {
      _requestParams = Object.assign(_requestParams, extraParams);
    }
    this.props.requestFunc(_requestParams).then(
      (data: any) => {
        if (data.error) {
          if (data.error === 'invalid_token') {
            AppStorage.removeUser();
            // this.props.navigation.replace("Login")
            RootNavigation.replace('Login', {});
          }
          return;
        }
        getRawData && getRawData(data);
        successCallback(data.events);
        this.getFlatListCount();
      },
      err => {
        failCallback();
        this.setState({ isError: true });
        console.log(err);
      }
    );
  }

  // public
  /**
   * 暴露的列表刷新函数，主要用于外部条件改变时的刷新列表功能
   *
   * @memberof CommonFlatList
   */
  outSideRefresh = cb => {
    this.init();
    this.setState(
      {
        firstPageLoading: LOADING,
      },
      () => {
        this._requestFirstPage(cb);
      }
    );
  };

  /**
   * 暴露获取列表总条数功能
   *
   * @returns
   * @memberof CommonFlatList
   */
  getFlatListCount() {
    if (typeof this.props.getCount == 'undefined') return;
    this.props.getCount(this.state.listData.length);
  }

  //private
  /**
   * 请求首页数据
   *
   * @memberof CommonFlatList
   */
  _requestFirstPage(cb = () => {}) {
    this.getData(
      requestParams.nextOffset,
      data => {
        // console.log(123,data)
        cb && cb();
        if (data.length == 0) {
          this.setState({
            listData: data,
            firstPageLoading: NO_DATA,
            refreshing: false,
          });
          return;
        }
        this.setState({
          listData: data,
          firstPageLoading: LOAD_SUCCESS,
          refreshing: false,
        });
      },
      () => {
        this.setState({
          firstPageLoading: LOAD_FAILED,
        });
      }
    );
  }

  /**
   * 请求下一页
   *
   * @memberof CommonFlatList
   */
  _requestNextPage() {
    this.getData(requestParams.nextOffset, data => {
      if (data.length == 0) {
        requestParams.nextOffset = requestParams.currentOffset;
        this.setState({
          nextPageLoading: NO_MORE_DATA,
          listData: this.state.listData.concat(data),
        });
        return;
      }
      this.setState({
        listData: this.state.listData.concat(data),
        nextPageLoading: LOADING,
      });
      requestParams.currentOffset = requestParams.nextOffset;
    });
  }

  /**
   * 刷新页面
   *
   * @memberof CommonFlatList
   */
  _onRefreshToRequestFirstPageData() {
    this.setState(
      {
        refreshing: true,
        nextPageLoading: LOADING,
      },
      () => {
        this.init();
        this._requestFirstPage();
      }
    );
  }

  /**
   * 请求出错再重试
   *
   * @memberof CommonFlatList
   */
  _onErrorRequestFirstPage() {
    // this.props.showLoading&& this.props.showLoading();
    this.setState(
      {
        isError: false,
        firstPageLoading: LOADING,
      },
      () => {
        this.init();
        this._requestFirstPage();
        this.props.errorCallback && this.props.errorCallback();
      }
    );
  }

  /**
   * 上拉加载出错点击重试
   *
   * @memberof CommonFlatList
   */
  _onErrorToRequestNextPage() {
    this.setState({
      nextPageLoading: LOADING,
    });
    requestParams.nextOffset += this.props.offset;
    this._requestNextPage();
  }

  /**
   * 上拉加载
   *
   * @memberof CommonFlatList
   */
  _onEndReach() {
    requestParams.nextOffset += this.props.offset;
    if (this.state.nextPageLoading == NO_MORE_DATA) return;
    this._requestNextPage();
  }

  /**
   * 监听列表滚动
   *
   * @param {*} sview
   * @memberof CommonFlatList
   */
  _onScroll(sview) {
    const { getScrollTop } = this.props;
    !!getScrollTop && getScrollTop(sview.nativeEvent.contentOffset.y);
    this.setState({
      showToTop: sview.nativeEvent.contentOffset.y > 100,
    });
  }

  /**
   * 置顶
   *
   * @memberof CommonFlatList
   */
  _scrollToTop() {
    this._flatlist &&
      this._flatlist.scrollToIndex({ animated: true, index: 0 });
  }

  /**
   * 加载指示器
   *
   * @returns
   * @memberof CommonFlatList
   */
  _renderFlatListLoading() {
    return <Loading />;
  }

  /**
   * 置顶按钮
   *
   * @returns
   * @memberof CommonFlatList
   */
  _renderToTop() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ position: 'absolute', right: 10, bottom: 50, zIndex: 10 }}
        onPress={() => {
          // console.log('this._flatlist :', this._flatlist);
          this._scrollToTop();
        }}
      >
        <Image
          style={{ width: px2dpw(60), height: px2dph(60) }}
          resizeMode="cover"
          source={require('../assets/toTop.png')}
        />
      </TouchableOpacity>
    );
  }

  /**
   * 列表
   *
   * @returns
   * @memberof CommonFlatList
   */
  _renderCommonListView() {
    const { nextPageLoading, refreshing } = this.state;
    return (
      <FlatList
        ref={fl => (this._flatlist = fl)}
        contentContainerStyle={this.props.style}
        data={this.state.listData}
        onScroll={sview => this._onScroll(sview)}
        scrollEventThrottle={80}
        initialNumToRender={5}
        renderItem={({ item, index }) =>
          this._renderCommonListItemView(item, index)
        }
        keyExtractor={(item, index) => `${index}key`}
        onEndReachedThreshold={0.01}
        onEndReached={() => this._onEndReach()}
        // ItemSeparatorComponent={() => this._renderItemDivider()}
        removeClippedSubviews={true}
        ListHeaderComponent={() => this._renderHeader()}
        ListFooterComponent={() => (
          <ListFooter
            loadingStatus={nextPageLoading}
            errorToDo={() => this._onErrorToRequestNextPage()}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            title="loading..."
            tintColor={colors.mainGray}
            titleColor={colors.mainGray}
            onRefresh={() => this._onRefreshToRequestFirstPageData()}
          />
        }
      />
    );
  }
  /**
   * 列表头部
   *
   * @returns
   * @memberof CommonFlatList
   */
  _renderHeader() {
    const { renderHeader } = this.props;
    if (!renderHeader) {
      return null;
    }
    return renderHeader();
  }
  /**
   * 列表item
   *
   * @param {*} item
   * @param {*} index
   * @returns
   * @memberof CommonFlatList
   */
  _renderCommonListItemView(item, index) {
    if (this.props.renderItem) {
      return this.props.renderItem(item, index);
    }
    return <Text>{index}</Text>;
  }
  /**
   * render函数
   *
   * @returns
   * @memberof CommonFlatList
   */
  render() {
    const { firstPageLoading, showToTop, isError } = this.state;
    const { blankBtnMessage, style } = this.props;
    const Blank = () => (
      <BlankPage text={blankBtnMessage || 'No activity found'} />
    );
    if (isError)
      return <ErrorPage retryFunc={() => this._onErrorRequestFirstPage()} />;
    return (
      <View style={[{ flex: 1, position: 'relative' }, style]}>
        {showToTop && this._renderToTop()}
        {firstPageLoading == LOADING &&
          this.props.isIndicatorShow &&
          this._renderFlatListLoading()}
        {firstPageLoading == NO_DATA ? <Blank /> : null}
        {firstPageLoading == LOAD_SUCCESS ? this._renderCommonListView() : null}
      </View>
    );
  }
}

export default CommonList;
