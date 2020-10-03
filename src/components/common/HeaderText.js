import React from "react";
import { StyleSheet, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

const HeaderText = ({
  headerText,
  headerSubText,
  headerStyle,
  headerSubStyle,
}) => {
  const { headerTextStyle, headerSubTextStyle } = styles;

  return (
    <>
      <Text style={[headerTextStyle, headerStyle]}>{headerText}</Text>
      <Text style={[headerSubTextStyle, headerSubStyle]}>{headerSubText}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  headerTextStyle: {
    fontFamily: "Poppins",
    fontWeight: "700",
    color: "#242424",
    fontSize: RFPercentage(3.8),
  },
  headerSubTextStyle: {
    color: "#242424",
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    fontSize: RFPercentage(2.5),
    marginVertical: hp(1),
  },
});

export { HeaderText };
