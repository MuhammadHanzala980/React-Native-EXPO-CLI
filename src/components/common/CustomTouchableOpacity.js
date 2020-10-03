import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

const CustomTouchableOpacity = ({
  children,
  style,
  onPress,
  touchableOpacityStyling,
}) => {
  const { viewStyle, touchableOpacityStyle } = styles;
  return (
    <View style={[viewStyle, style]}>
      <TouchableOpacity
        style={[touchableOpacityStyle, touchableOpacityStyling]}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: hp(3.5),
    elevation: 2,
  },
  touchableOpacityStyle: {
    borderWidth: 1,
    borderColor: "#000D374D",
    borderRadius: RFPercentage(2),
    letterSpacing: RFPercentage(0.1),
    fontSize: RFPercentage(1.9),
    fontFamily: "CircularStd-Book",
    paddingHorizontal: wp(5),
    height: hp(7.4),
    justifyContent: "center",
  },
});

export { CustomTouchableOpacity };
