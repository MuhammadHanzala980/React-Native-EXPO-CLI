/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Card, CustomTouchableOpacity } from "./common";

export default class Home extends Component {
  navigateTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);
  render() {
    const {
      cardStyle,
      buttonStyle,
      topbarViewStyle,
      logoImageStyle,
      textViewStyle,
      initialNameTextStyle,
      textStyle,
      buttonViewStyle,
      bellIconStyle,
      coinImageStyle,
      messageImageStyle,
      alertButtonStyle,
      profileButtonStyle,
      bucksButtonStyle,
      buckPointTextStyle,
      messageButtonStyle,
      buckTextStyle,
      categoryTextStyle,
      categoryImageStyle,
      categorySubTextStyle,
      categorySecondSubTextStyle,
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
          <View style={topbarViewStyle}>
            <Image
              source={require("../assets/images/momentum-logo.png")}
              style={logoImageStyle}
            />

            <View style={textViewStyle}>
              <Text style={initialNameTextStyle}>A</Text>
            </View>
          </View>
          <Card style={cardStyle}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={buttonViewStyle}>
                <CustomTouchableOpacity
                  touchableOpacityStyling={[buttonStyle, alertButtonStyle]}
                >
                  <Image
                    source={require("../assets/icons/bell.png")}
                    style={bellIconStyle}
                  />
                  <Text style={textStyle}>Alert</Text>
                </CustomTouchableOpacity>

                <CustomTouchableOpacity
                  onPress={() =>
                    this.navigateTo("Profile", { transition: "fadeIn" })
                  }
                  touchableOpacityStyling={[buttonStyle, profileButtonStyle]}
                >
                  <Image
                    source={require("../assets/icons/profile-icon.png")}
                    style={bellIconStyle}
                  />
                  <Text style={textStyle}>Profile</Text>
                </CustomTouchableOpacity>
              </View>

              <View style={buttonViewStyle}>
                <CustomTouchableOpacity
                  onPress={() =>
                    this.navigateTo("MomentumBucks", { transition: "fadeIn" })
                  }
                  touchableOpacityStyling={[buttonStyle, bucksButtonStyle]}
                >
                  <Image
                    source={require("../assets/images/coins.png")}
                    style={coinImageStyle}
                  />
                  <View>
                    <Text style={[textStyle, buckTextStyle]}>
                      Momentum Bucks
                    </Text>
                    <Text style={[textStyle, buckPointTextStyle]}>
                      3,534 mpt
                    </Text>
                  </View>
                </CustomTouchableOpacity>

                <CustomTouchableOpacity
                  touchableOpacityStyling={[buttonStyle, messageButtonStyle]}
                >
                  <Image
                    source={require("../assets/icons/message-icon.png")}
                    style={messageImageStyle}
                  />
                  <Text style={textStyle}>Messages</Text>
                </CustomTouchableOpacity>
              </View>

              <Text style={categoryTextStyle}>Categories</Text>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.navigateTo("EducationListings", {
                      transition: "fadeIn",
                    })
                  }
                >
                  <View>
                    <Image
                      source={require("../assets/images/category-education.png")}
                      style={categoryImageStyle}
                    />
                    <Text style={categorySubTextStyle}>Education</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.navigateTo("EmploymentListings", {
                      transition: "fadeIn",
                    })
                  }
                >
                  <View>
                    <Image
                      source={require("../assets/images/category-employment.png")}
                      style={categoryImageStyle}
                    />
                    <Text style={categorySubTextStyle}>Employment</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.navigateTo("MentorshipListings", {
                      transition: "fadeIn",
                    })
                  }
                >
                  <View>
                    <Image
                      source={require("../assets/images/category-education.png")}
                      style={categoryImageStyle}
                    />
                    <Text style={categorySubTextStyle}>Mentorship</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>

              <Text style={categoryTextStyle}>Favorites</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View>
                  <Image
                    source={require("../assets/images/favorites.png")}
                    style={categoryImageStyle}
                  />
                  <Text style={categorySubTextStyle}>
                    Business Administration
                  </Text>
                  <Text style={categorySecondSubTextStyle}>
                    NorthEastern University
                  </Text>
                </View>

                <View>
                  <Image
                    source={require("../assets/images/favorites.png")}
                    style={categoryImageStyle}
                  />
                  <Text style={categorySubTextStyle}>
                    Business Administration
                  </Text>
                  <Text style={categorySecondSubTextStyle}>
                    NorthEastern University
                  </Text>
                </View>
              </ScrollView>
            </ScrollView>
          </Card>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  topbarViewStyle: {
    paddingTop: hp(4),
    backgroundColor: "#FFFFFF",
    height: hp(12),
  },
  cardStyle: {
    flex: 1,
    paddingHorizontal: wp(4),
    backgroundColor: "#E5E5E5",
  },
  logoImageStyle: {
    height: hp(4),
    width: hp(11),
  },
  textViewStyle: {
    backgroundColor: "#E5E5E5",
    alignSelf: "flex-end",
    marginRight: hp(2),
    bottom: hp(6),
    borderRadius: 50,
  },
  initialNameTextStyle: {
    paddingVertical: hp(2),
    paddingHorizontal: hp(3),
  },
  bellIconStyle: {
    height: hp(3),
    width: wp(4.5),
    right: wp(6),
  },
  coinImageStyle: {
    height: hp(3),
    width: wp(5),
    right: wp(3),
  },
  messageImageStyle: {
    height: hp(2.5),
    width: wp(5.4),
    right: wp(3),
  },
  textStyle: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  buttonViewStyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonStyle: {
    elevation: 4,
    width: wp("44%"),
    height: hp(9),
    flexDirection: "row",
    alignItems: "center",
    marginRight: wp(1.5),
    marginLeft: wp(1.5),
    marginTop: hp(-1.8),
  },
  alertButtonStyle: {
    backgroundColor: "#FCD06A",
    borderColor: "#FCD06A",
  },
  profileButtonStyle: {
    backgroundColor: "#1B62CC",
    borderColor: "#1B62CC",
  },
  bucksButtonStyle: {
    backgroundColor: "#FAFAFA",
    borderColor: "#FAFAFA",
  },
  buckPointTextStyle: {
    color: "#1B62CC",
  },
  messageButtonStyle: {
    backgroundColor: "#F69D7D",
    borderColor: "#F69D7D",
  },
  buckTextStyle: {
    color: "#332927",
  },
  categoryTextStyle: {
    top: hp(3),
    fontWeight: "bold",
    fontSize: RFPercentage(2.8),
    paddingLeft: wp(3),
    marginBottom: hp(5),
  },
  categoryImageStyle: {
    marginRight: wp(1.5),
    marginLeft: wp(1.5),
  },
  categorySubTextStyle: {
    marginLeft: wp(3),
    top: hp(1),
    fontWeight: "bold",
    fontSize: RFPercentage(2.2),
    marginBottom: hp(2),
  },
  categorySecondSubTextStyle: {
    marginLeft: wp(4),
    marginBottom: hp(4),
  },
});
