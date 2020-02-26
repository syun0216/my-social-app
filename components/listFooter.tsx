import React from "react"
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native"
import {httpStatus} from '../api/apis'
import Colors from "../utils/colors";

const styles = StyleSheet.create({
  commonContainer: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

interface IListFooter {
  loadingStatus: number,
  errorToDo: () => void
}

const ListFooter = ({ loadingStatus, errorToDo }: IListFooter): React.ReactElement => {
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
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text>load failed, press to reload agin...</Text>
          </View>
        </TouchableOpacity>
      );
    }
    case httpStatus.NO_MORE_DATA: {
      return (
        <View style={[styles.commonContainer]}>
          {/*<View style={{width:_winWidth*0.3,height:1,marginLeft:10,marginRight:20,backgroundColor:'#959595'}}></View>*/}
          <View>
            <Text style={{ color: Colors.mainGray }}>
              no more data~
            </Text>
          </View>
          {/*<View style={{width:GLOBAL_PARAMS._winWidth*0.3,height:1,marginLeft:20,marginRight:10,backgroundColor:'#959595'}}></View>*/}
        </View>
      );
    }
    default:
      return null;
  }
};

ListFooter.defaultProps = {
  loadingStatus: httpStatus.LOADING
}

export default ListFooter