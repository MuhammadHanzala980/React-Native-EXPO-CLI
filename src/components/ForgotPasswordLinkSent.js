/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Card, Button, HeaderText } from "./common";

export default class ForgotPasswordLinkSent extends Component {
  navigateTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);
  render() {
    const {
      cardStyle,
      headerTextStyle,
      secondCardStyle,
      iconViewStyle,
      buttonStyle,
      ImageStyle,
      textStyle,
      secondTextStyle,
    } = styles;
    return (
      <>
        <StatusBar
          backgroundColor="#1B62CC"
          hidden={false}
          translucent={false}
          barStyle="default"
        />
        <SafeAreaView style={{ flex: 1 }}>
          <Card style={cardStyle}>
            <View style={iconViewStyle}>
              <HeaderText
                headerStyle={headerTextStyle}
                headerText={"Reset \nSuccessful"}
              />
            </View>

            <Card style={secondCardStyle}>
              <Image
                source={require("../assets/images/email-icon.png")}
                style={ImageStyle}
              />

              <Text style={textStyle}>Successful!!!</Text>
              <Text style={secondTextStyle}>
                Password Reset was successful.
              </Text>

              <Button
                style={buttonStyle}
                onPress={() =>
                  this.navigateTo("Login", { transition: "fadeIn" })
                }
              >
                Login
              </Button>
            </Card>
          </Card>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    height: "100%",
    paddingTop: wp(8),
    backgroundColor: "#1B62CC",
  },
  secondCardStyle: {
    marginTop: hp(4),
    backgroundColor: "#FFFFFA",
    height: "100%",
    paddingHorizontal: wp(10),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
  },
  iconViewStyle: {
    flexDirection: "row",
  },
  headerTextStyle: {
    color: "#FFFFFF",
    marginLeft: wp(10),
  },
  buttonStyle: {
    bottom: 0,
  },
  ImageStyle: {
    backgroundColor: "transparent",
    alignSelf: "center",
    marginTop: hp(18),
  },
  textStyle: {
    textAlign: "center",
    fontSize: RFPercentage(3.8),
    marginTop: hp(4),
    color: "#1B62CC",
    marginBottom: hp(3),
  },
  secondTextStyle: {
    textAlign: "center",
    fontSize: RFPercentage(2.5),
    paddingHorizontal: hp(4),
    fontWeight: "600",
    marginBottom: hp(8),
  },
});
