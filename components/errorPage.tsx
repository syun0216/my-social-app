import React, { memo } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
//utils
import Colors from '../utils/colors';
import { px2dpw, spText } from '../utils/commonUtils';
//language
import i18n from '../language/i18n';

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: px2dpw(80),
    flex: 1,
    width: '100%',
  },
  errorImg: {
    width: px2dpw(140),
    height: px2dpw(140),
    marginBottom: px2dpw(16),
  },
  errorTitle: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: spText(16),
    color: Colors.mainBlack,
    marginBottom: px2dpw(8),
    fontWeight: '500',
  },
  errorSubTitle: {
    fontSize: px2dpw(14),
    color: Colors.mainBlack,
    fontFamily: 'SourceSansPro-Regular',
    marginBottom: px2dpw(28),
  },
  retryButton: {
    backgroundColor: Colors.mainGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: px2dpw(10),
    paddingHorizontal: px2dpw(15),
  },
});

type PropTypes = {
  title?: string;
  subTitle?: string;
  retryBtnText?: string;
  retryFunc(): void;
};

const errorPage = (props: PropTypes) => (
  <View style={styles.errorContainer}>
    <Image
      style={styles.errorImg}
      source={require('../assets/image_server_error.png')}
    />
    <Text style={styles.errorTitle}>{props.title || i18n.t('errorTitle')}</Text>
    <Text style={styles.errorSubTitle}>
      {props.subTitle || i18n.t('errorSubTitle')}
    </Text>
    <TouchableOpacity
      style={styles.retryButton}
      onPress={() => props.retryFunc()}
    >
      <Text>{props.retryBtnText || 'try again'}</Text>
    </TouchableOpacity>
  </View>
);

export default memo(errorPage);
