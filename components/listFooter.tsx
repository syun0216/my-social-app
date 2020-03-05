import React, { memo } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { HTTP_STATUS } from '../constants/http';
import Colors from '../utils/colors';

const styles = StyleSheet.create({
  commonContainer: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type PropTypes = {
  loadingStatus: number;
  errorToDo: () => void;
};

const ListFooter = ({
  loadingStatus,
  errorToDo,
}: PropTypes): React.ReactElement => {
  switch (loadingStatus) {
    case HTTP_STATUS.LOADING: {
      return (
        <View style={styles.commonContainer}>
          <ActivityIndicator
            style={{ flex: 1 }}
            size="small"
            color={Colors.mainGray}
          />
        </View>
      );
    }
    case HTTP_STATUS.LOAD_FAILED: {
      return (
        <TouchableOpacity
          style={styles.commonContainer}
          onPress={() => errorToDo()}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>load failed, press to reload agin...</Text>
          </View>
        </TouchableOpacity>
      );
    }
    case HTTP_STATUS.NO_MORE_DATA: {
      return (
        <View style={[styles.commonContainer]}>
          <View>
            <Text style={{ color: Colors.mainGray }}>no more data~</Text>
          </View>
        </View>
      );
    }
    default:
      return null;
  }
};

ListFooter.defaultProps = {
  loadingStatus: HTTP_STATUS.LOADING,
};

export default memo(ListFooter);
