import React, { Component } from "react";
import { Image, StyleSheet, Text, StatusBar } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Card, Button } from "../common";

export default class Scholarship extends Component {
  navigateTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);
  render() {
    const {
      containerStyle,
      cardStyle,
      onboardingImageStyle,
      onboardingCharacterImageStyle,
      onboardingTextStyle,
      secondCardStyle,
      secondonboardingTextStyle,
      buttonTextstyle,
      buttonStyle,
    } = styles;
    return (
      <>
        <StatusBar
          backgroundColor="#1B62CC"
          hidden={false}
          translucent={false}
          barStyle="default"
        />
        <Card style={containerStyle}>
          <Card style={cardStyle}>
            <Image
              source={require("../../assets/images/onboarding.png")}
              onboarding-scholarship-character
              style={onboardingImageStyle}
            />
            <Image
              source={require("../../assets/images/onboarding-scholarship-character.png")}
              style={onboardingCharacterImageStyle}
            />
          </Card>
          <Card style={secondCardStyle}>
            <Text style={onboardingTextStyle}>
              We Give You{"\n"}Local Educational{"\n"}
              <Text style={secondonboardingTextStyle}>Tools</Text>
            </Text>

            <Button
              onPress={() => this.props.welcomePage()}
              style={buttonStyle}
              buttonTextstyle={buttonTextstyle}
            >
              Get Started
            </Button>
          </Card>
        </Card>
      </>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#FFFDFC",
    height: "100%",
  },
  cardStyle: {
    height: hp(50),
    backgroundColor: "#1B62CC",
    paddingBottom: 50,
    borderBottomRightRadius: wp(35),
    paddingTop: 50,
  },
  secondCardStyle: {
    paddingHorizontal: RFPercentage(4),
  },
  onboardingImageStyle: {
    alignSelf: "center",
    width: wp(82),
    height: hp(38),
    marginLeft: hp(4),
  },
  onboardingCharacterImageStyle: {
    position: "absolute",
    top: hp("3%"),
    height: hp(40),
    alignSelf: "center",
    width: "40%",
  },
  onboardingTextStyle: {
    color: "rgb(41, 41, 41)",
    fontFamily: "Poppins",
    fontSize: RFPercentage(3.2),
    fontStyle: "normal",
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: 33,
    paddingTop: hp(4),
  },
  secondonboardingTextStyle: {
    color: "#1B62CC",
    fontFamily: "Poppins",
    fontSize: RFPercentage(3.2),
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: hp(4),
  },
  buttonStyle: {
    marginTop: hp(10),
    fontWeight: "400",
    paddingVertical: hp(-3),
  },
  buttonTextstyle: {
    fontWeight: "400",
  },
});
