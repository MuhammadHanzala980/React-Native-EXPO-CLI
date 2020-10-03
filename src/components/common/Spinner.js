import React from "react";
import { View, ActivityIndicator } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Spinner = ({ size, color, style }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || "large"} color={color} style={style} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: "#FAC2C3",
    marginTop: hp(16),
    height: hp(4.5),
    width: wp(8),
  },
};

export { Spinner };
