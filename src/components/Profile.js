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
import { Card, Button } from "./common";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { profile } from "../actions/profileAction";

class Profile extends Component {
  navigateTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);

  componentDidMount = async () => {
    await this.props.profile();
  };

  render() {
    const { data } = this.props;
    const {
      cardStyle,
      secondCardStyle,
      barViewStyle,
      bucksViewStyle,
      bucksTextStyle,
      bucksImageStyle,
      imageViewStyle,
      ImageStyle,
      nameViewStyle,
      nameTextStyle,
      gradeTextStyle,
      locationViewStyle,
      contactViewStyle,
      locationTextStyle,
      locationCityTextStyle,
      phoneTextStyle,
      buttonStyle,
      editButtonStyle,
    } = styles;
    return (
      <>
        <StatusBar
          backgroundColor='#1B62CC'
          hidden={false}
          translucent={false}
          barStyle='default'
        />
        <SafeAreaView style={{ flex: 1 }}>
          <Card style={cardStyle}>
            <ScrollView>
              <Card style={secondCardStyle}>
                <View style={barViewStyle}>
                  <View style={bucksViewStyle}>
                    <Image
                      source={require("../assets/images/coins.png")}
                      style={bucksImageStyle}
                    />
                    <Text style={bucksTextStyle}>3,230 Pts</Text>
                  </View>
                </View>
                <View style={imageViewStyle}>
                  <Image
                    source={require("../assets/images/user-avatar-icon.png")}
                    style={ImageStyle}
                  />
                </View>

                <View style={nameViewStyle}>
                  <Text style={nameTextStyle}>{data.name}</Text>

                  <Text style={gradeTextStyle}>
                    Grade: {data.grade === null ? "No grade added" : data.grade}
                  </Text>
                </View>

                <Button
                  style={buttonStyle}
                  buttonTextstyle={editButtonStyle}
                  onPress={() =>
                    this.navigateTo("EditProfile", {
                      userProfile: this.props.data,
                      transition: "fadeIn",
                    })
                  }
                >
                  Edit Personal Information
                </Button>
              </Card>

              <View style={locationViewStyle}>
                <View style={contactViewStyle}>
                  <Text style={locationTextStyle}>Address</Text>
                  <Text style={locationCityTextStyle}>
                    {data.address_line_1 === null
                      ? "No address added"
                      : data.address_line_1}
                  </Text>
                </View>
                <View style={contactViewStyle}>
                  <Text style={locationTextStyle}>Mobile Number</Text>
                  <Text style={phoneTextStyle}>
                    {data.mobile_number === null
                      ? "No mobile number added"
                      : data.mobile_number}
                  </Text>
                </View>
              </View>

              <View style={locationViewStyle}>
                <View style={contactViewStyle}>
                  <Text style={locationTextStyle}>Email</Text>
                  <Text style={locationCityTextStyle}>
                    {data.email === null ? "No email added" : data.email}
                  </Text>
                </View>
                <View style={contactViewStyle}>
                  <Text style={locationTextStyle}>Date of birthday</Text>
                  <Text style={phoneTextStyle}>
                    {data.date_of_birth === null
                      ? "No birthday added"
                      : data.date_of_birth}
                  </Text>
                </View>
              </View>

              <View style={locationViewStyle}>
                <View style={contactViewStyle}>
                  <Text style={locationTextStyle}>School</Text>
                  <Text style={locationCityTextStyle}>
                    {data.school_name === null
                      ? "No school added"
                      : data.school_name}
                  </Text>
                </View>
                <View style={contactViewStyle}>
                  <Text style={locationTextStyle}>Zipcode</Text>
                  <Text style={phoneTextStyle}>
                    {data.zip_code === null
                      ? "No zipcode added"
                      : data.zip_code}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </Card>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.profileReducer.loading,
  data: state.profileReducer.data,
  errorMessage: state.profileReducer.errors,
  status: state.profileReducer.status,
});

export default connect(mapStateToProps, { profile })(Profile);

const styles = StyleSheet.create({
  cardStyle: {
    height: "100%",
    backgroundColor: "#ECEEF1",
  },
  secondCardStyle: {
    backgroundColor: "#F5FAFF",
    height: hp(42),
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    elevation: 5,
    marginBottom: hp(3),
  },
  barViewStyle: {
    backgroundColor: "#1B62CC",
    height: hp(18),
    justifyContent: "center",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingHorizontal: hp(4),
  },
  bucksViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    bottom: hp(4),
  },
  bucksImageStyle: {
    height: hp(4),
    width: hp(5),
    marginRight: hp(2),
    tintColor: "#FFFFFF",
  },
  bucksTextStyle: {
    color: "#FFFFFF",
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: RFPercentage(2.5),
  },
  imageViewStyle: {
    borderRadius: 50,
    height: hp(15),
    width: wp(25),
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    top: hp(10),
  },
  ImageStyle: {
    resizeMode: "cover",
    alignSelf: "center",
    height: hp(15),
    width: wp(25),
    borderRadius: 50,
  },
  nameViewStyle: {
    alignSelf: "center",
    top: hp(8),
    marginBottom: hp(6),
    alignContent: "center",
  },
  nameTextStyle: {
    textAlign: "center",
    fontSize: RFPercentage(2.7),
    fontFamily: "poppins",
    fontWeight: "bold",
  },
  gradeTextStyle: {
    textAlign: "center",
    fontSize: RFPercentage(2.5),
    fontFamily: "poppins",
  },
  locationViewStyle: {
    height: hp(15),
    backgroundColor: "#F5FAFF",
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: hp(3),
    marginBottom: hp(0.5),
  },
  contactViewStyle: {
    alignItems: "flex-start",
  },
  locationTextStyle: {
    color: "#888888",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginBottom: hp(1),
  },
  locationCityTextStyle: {
    fontSize: RFPercentage(1.9),
    color: "#000000",
    fontFamily: "Poppins",
  },
  phoneTextStyle: {
    color: "#1B62CC",
    fontSize: RFPercentage(1.9),
    fontFamily: "Poppins",
    marginBottom: hp(1),
  },
  headerTextStyle: {
    color: "#FFFFFF",
    marginLeft: wp(10),
  },
  buttonStyle: {
    width: "40%",
    height: hp(4),
  },
  editButtonStyle: {
    fontSize: RFPercentage(1.7),
    fontWeight: "normal",
  },
});
