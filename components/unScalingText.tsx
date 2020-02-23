import React from "react";
import { Text as NBText } from "react-native";

const Text = (props: any): React.ReactElement => (
  <NBText allowFontScaling={false} {...props}>
    {props.children}
  </NBText>
);

export default Text;
