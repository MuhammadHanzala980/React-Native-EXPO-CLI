import React from "react";
import { View, StyleSheet } from "react-native";

const Card = ({ children, style }) => {
  const { viewStyle } = styles;
  return <View style={[viewStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  viewStyle: {
    width: "100%",
  },
});

export { Card };
