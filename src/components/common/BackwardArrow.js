import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Icon } from "native-base";

const BackwardArrow = ({ size, color, style, onPress }) => {
  return (
    <View style={styles.topbarViewStyle}>
      <TouchableOpacity onPress={onPress}>
        <Icon type="AntDesign" name="arrowleft" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  topbarViewStyle: {
    paddingTop: hp("4%"),
    backgroundColor: "#FFFFFF",
    marginBottom: hp("3%"),
    paddingHorizontal: wp("3%"),
  },
  iconStyle: {
    color: "#000000",
  },
};

export { BackwardArrow };
