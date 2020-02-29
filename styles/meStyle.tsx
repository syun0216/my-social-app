import { StyleSheet } from 'react-native';
import {
  px2dpw,
  px2dph,
  isIphoneX,
  iPhoneTop,
  iPhoneXTop,
  spText,
} from '../utils/commonUtils';
import Colors from '../utils/colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: isIphoneX() ? px2dph(40) + iPhoneXTop : px2dph(40) + iPhoneTop,
    backgroundColor: Colors.mainWhite,
  },
  introContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: px2dph(36),
    paddingBottom: px2dph(25),
  },
  introAvatar: {
    width: px2dpw(72),
    height: px2dpw(72),
    borderWidth: 2,
    borderColor: Colors.lightestPurple,
    marginBottom: px2dph(24),
    borderRadius: px2dpw(36),
    paddingBottom: px2dph(25),
  },
  introName: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(24),
    color: Colors.mainBlack,
    marginBottom: px2dph(8),
  },
  introEmailIcon: {
    marginRight: px2dpw(6),
    marginTop: px2dpw(2),
  },
  introEmail: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: spText(14),
    color: Colors.mainPurple,
  },
});
