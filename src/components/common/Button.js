import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Dimensions from "../../constants/Dimensions";

const Button = ({ children, onPress, style, disabled, buttonTextstyle }) => {
  const { buttonStyle, textstyle, buttonViewStyle } = styles;
  return (
    <View style={buttonViewStyle}>
      <TouchableOpacity
        onPress={onPress}
        style={[buttonStyle, style]}
        disabled={disabled}
      >
        <Text style={[textstyle, buttonTextstyle]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: hp(6.2),
    width: "96%",
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "#1B62CC",
    justifyContent: "center",
    alignItems: "center",
  },
  textstyle: {
    fontFamily: "Axiforma",
    fontSize: Dimensions.primaryButtonText,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  buttonViewStyle: {
    paddingVertical: hp(3),
  },
});

export { Button };
