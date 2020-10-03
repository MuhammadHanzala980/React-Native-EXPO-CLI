import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

const Logo = ({ logoImageStyle, style }) => {
  const { viewStyle, ImageStyle, textStyle } = styles;
  return (
    <View style={[viewStyle, style]}>
      <Image
        source={require("../../assets/images/momentum-logo.png")}
        style={[ImageStyle, logoImageStyle]}
      />
      <Text style={textStyle}>Momentum</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignItems: "center",
    backgroundColor: "transparent",
    height: hp(30),
  },
  ImageStyle: {
    width: wp(30),
    height: hp(30),
    alignSelf: "center",
  },
  buttonStyle: {
    width: "75%",
    bottom: hp(43),
  },
  textStyle: {
    alignSelf: "center",
    color: "#1B62CC",
    bottom: hp(5),
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },
});

export { Logo };
