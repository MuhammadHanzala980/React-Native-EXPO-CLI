import React, { Component } from "react";
import { Image, StyleSheet, Text, StatusBar } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Card } from "../common";

export default class Mentorship extends Component {
  render() {
    const {
      containerStyle,
      cardStyle,
      onboardingImageStyle,
      onboardingCharacterImageStyle,
      onboardingTextStyle,
      carouselImageStyle,
      secondonboardingTextStyle,
      secondCardStyle,
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
              style={onboardingImageStyle}
            />

            <Image
              source={require("../../assets/images/onboarding-mentorship-character.png")}
              style={onboardingCharacterImageStyle}
            />
          </Card>
          <Card style={secondCardStyle}>
            <Text style={onboardingTextStyle}>
              We Give You{"\n"}Great{"\n"}
              <Text style={secondonboardingTextStyle}>Mentors</Text>
            </Text>

            <Image
              source={require("./../../assets/images/onboarding-carousel-2.png")}
              style={carouselImageStyle}
            />
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
    paddingBottom: wp(12),
    borderBottomRightRadius: wp(35),
    // paddingHorizontal: RFPercentage(3),
    paddingTop: 50,
  },
  secondCardStyle: {
    paddingHorizontal: RFPercentage(4),
    marginTop: 15,
  },
  onboardingImageStyle: {
    alignSelf: "center",
    width: wp(82),
    height: hp(38),
    marginLeft: hp(4),
  },
  onboardingCharacterImageStyle: {
    position: "absolute",
    top: hp(3),
    height: hp(40),
    alignSelf: "center",
    width: "79%",
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
  carouselImageStyle: {
    resizeMode: "center",
    alignSelf: "center",
    height: hp(6),
    marginTop: hp(9),
    top: hp(6),
  },
});
