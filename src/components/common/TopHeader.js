import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Icon } from "native-base";

const TopHeader = ({ children, size, color, style, onPress }) => {
  const { topbarViewStyle, iconViewStyle, iconStyle } = styles;
  return (
    <View style={topbarViewStyle}>
      <View style={iconViewStyle}>
        <TouchableOpacity onPress={onPress}>
          <Icon type="AntDesign" name="arrowleft" style={iconStyle} />
        </TouchableOpacity>
        <Text>{children}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = {
  topbarViewStyle: {
    paddingVertical: hp("2%"),
    backgroundColor: "#FFFFFF",
    marginBottom: hp("3%"),
    paddingHorizontal: wp("3%"),
    elevation: 10,
    alignItem: "center",
  },
  iconViewStyle: {
    // alignSelf: 'center',
    backgroundColor: "pink",
  },
  iconStyle: {
    color: "#000000",
  },
};

export { TopHeader };
