import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const Input = ({
  viewStyle,
  style,
  placeholder,
  children,
  onFocus,
  onBlur,
  onSubmitEditing,
  value,
  onChangeText,
  ref,
  focusedInput,
  keyboardType,
  placeholderTextColor,
  defaultValue,
  secureTextEntry,
  maxLength,
  numberOfLines,
}) => {
  const { containerStyle, inputStyle } = styles;

  return (
    <View style={[containerStyle, viewStyle]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onFocus={onFocus}
        style={[inputStyle, style]}
        onBlur={onBlur}
        defaultValue={defaultValue}
        onSubmitEditing={onSubmitEditing}
        value={value}
        onChangeText={onChangeText}
        ref={ref}
        focusedInput={focusedInput}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    borderColor: "#FAC2C3",
    letterSpacing: RFPercentage(0.1),
    fontFamily: "Axiforma",
  },
});

export { Input };
