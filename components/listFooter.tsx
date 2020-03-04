import React, { memo } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { httpStatus } from '../service/apis';
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
    case httpStatus.LOADING: {
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
    case httpStatus.LOAD_FAILED: {
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
    case httpStatus.NO_MORE_DATA: {
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
  loadingStatus: httpStatus.LOADING,
};

export default memo(ListFooter);
