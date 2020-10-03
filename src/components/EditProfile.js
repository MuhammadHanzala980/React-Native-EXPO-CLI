/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { RFPercentage } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { Toast } from "native-base";
import { Card, Input, Button } from "./common";
import { profileDetails } from "../actions/profileDetailsAction";
import { profileUpdate } from "../actions/profileUpdateAction";

let isEmpty = true;

class EditProfile extends Component {
  navigateTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);

  componentDidMount = async () => {
    await this.props.profileDetails();
  };

  state = {
    name: undefined,
    email: undefined,
    mobile_number: undefined,
    address_line_1: undefined,
    birthDate: undefined,
    birthMonth: undefined,
    birthYear: undefined,
    zip_code: undefined,
    date_of_birth: undefined,
    grade: undefined,
    school_name: undefined,
    buttonPress: false,
    someInputEmpty: true,
    emailBorderColor: "#FAC2C3",
    errorMessage: "",
    dayBorderColor: "blue",
    dayBorderWidth: 0,
  };

  /**
   * This function handles the blur event.
   */
  onBlur = () => {
    this.setState({
      dayBorderColor: "pink",
      dayBorderWidth: 2,
    });
  };

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
   */
  onSubmit = async () => {
    const { navigation } = this.props;
    const userProfile = navigation.getParam("userProfile");
    const birthDay = `${this.state.dayOfBirth}/${this.state.monthOfBirth}/${this.state.yearOfBirth}`;
    const formData = {
      name:
        this.state.name === undefined || ""
          ? userProfile.name
          : this.state.name,
      email:
        this.state.email === undefined || ""
          ? userProfile.email
          : this.state.email,
      mobile_number:
        this.state.mobile_number === undefined || ""
          ? userProfile.mobile_number
          : this.state.mobile_number,
      address_line_1:
        this.state.address_line_1 === undefined || ""
          ? userProfile.address_line_1
          : this.state.address_line_1,
      zip_code:
        this.state.zip_code === undefined || ""
          ? userProfile.zip_code
          : this.state.zip_code,
      // date_of_birth: birthDay === undefined || '' ? userProfile.date_of_birth : birthDay,
      grade:
        this.state.grade === undefined || ""
          ? userProfile.grade
          : this.state.grade,
      school_name: this.state.grade,
    };
    await this.props.profileUpdate(formData);
    this.navigateTo("Profile", { transition: "fadeIn" });
  };

  render() {
    const { navigation } = this.props;
    const userProfile = navigation.getParam("userProfile");

    const {
      name,
      email,
      mobile_number,
      address_line_1,
      birthDate,
      birthMonth,
      birthYear,
      zip_code,
      grade,
      school_name,
      buttonPress,
      someInputEmpty,
    } = this.state;

    const dateOfBirth = userProfile.date_of_birth;
    const dayOfBirth = dateOfBirth.substring(0, 2);
    const monthOfBirth = dateOfBirth.substring(3, 5);
    const yearOfBirth = dateOfBirth.substring(6, 10);

    isEmpty =
      !email ||
      !mobile_number ||
      !address_line_1 ||
      !birthDate ||
      !birthMonth ||
      !birthYear ||
      !zip_code ||
      !grade ||
      !school_name;

    const {
      cardStyle,
      profileDetailsViewStyle,
      imageViewStyle,
      ImageStyle,
      profileNameTextStyle,
      gradeTextStyle,
      updateProfilePicTextStyle,
      horizontalStyle,
      inputContainerViewStyle,
      inputViewStyle,
      placeholderTextStyle,
      nameTextStyle,
      birthDateViewStyle,
      birthDateInputStyle,
      contactViewStyle,
      addressInputStyle,
      phoneInputStyle,
      ZipCodeInputStyle,
      schoolInputStyle,
      GradeInputStyle,
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
        <SafeAreaView style={{ flex: 1 }}>
          <Card style={cardStyle}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              enableOnAndroid={true}
              extraScrollHeight={hp(15)}
              extraHeight={hp(15)}
            >
              <View style={profileDetailsViewStyle}>
                <View style={imageViewStyle}>
                  <Image
                    source={require("../assets/images/user-avatar-icon.png")}
                    style={ImageStyle}
                  />
                </View>
                <View>
                  <Text style={profileNameTextStyle}>{userProfile.name}</Text>
                  <Text style={gradeTextStyle}>Grade: {userProfile.grade}</Text>
                  <TouchableOpacity>
                    <Text style={updateProfilePicTextStyle}>
                      Change your profile picture
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={horizontalStyle} />

              <View style={inputContainerViewStyle}>
                <View style={inputViewStyle}>
                  <Text style={placeholderTextStyle}>Name</Text>
                  <Input
                    value={name}
                    style={nameTextStyle}
                    defaultValue={
                      userProfile.name === null ? false : userProfile.name
                    }
                    onChangeText={(text) =>
                      this.setState({
                        name: text,
                        buttonPress: false,
                        someInputEmpty: isEmpty,
                      })
                    }
                  />
                </View>

                <View style={inputViewStyle}>
                  <Text style={placeholderTextStyle}>Email</Text>
                  <Input
                    style={nameTextStyle}
                    value={email}
                    defaultValue={
                      userProfile.email === null
                        ? "Enter Email address"
                        : userProfile.email
                    }
                    keyboardType={"email-address"}
                    onChangeText={(text) =>
                      this.setState({
                        email: text,
                        buttonPress: false,
                        someInputEmpty: isEmpty,
                      })
                    }
                  />
                </View>

                <View style={birthDateViewStyle}>
                  <View style={inputViewStyle}>
                    <Text style={placeholderTextStyle}>DD</Text>
                    <Input
                      value={birthDate}
                      style={[nameTextStyle, birthDateInputStyle]}
                      defaultValue={
                        userProfile.date_of_birth === null ? false : dayOfBirth
                      }
                      keyboardType={"numeric"}
                      maxLength={2}
                      numberOfLines={1}
                      onBlur={this.onBlur}
                      onChangeText={(text) => {
                        this.setState({
                          birthDate: text,
                          buttonPress: false,
                          someInputEmpty: isEmpty,
                        });
                      }}
                    />
                  </View>

                  <View style={inputViewStyle}>
                    <Text style={placeholderTextStyle}>MM</Text>
                    <Input
                      value={birthMonth}
                      style={[nameTextStyle, birthDateInputStyle]}
                      defaultValue={
                        userProfile.date_of_birth === null
                          ? false
                          : monthOfBirth
                      }
                      keyboardType={"numeric"}
                      maxLength={2}
                      numberOfLines={1}
                      onChangeText={(text) => {
                        this.setState({
                          birthMonth: text,
                          buttonPress: false,
                          someInputEmpty: isEmpty,
                        });
                      }}
                    />
                  </View>

                  <View style={inputViewStyle}>
                    <Text style={placeholderTextStyle}>YYYY</Text>
                    <Input
                      value={birthYear}
                      style={[nameTextStyle, birthDateInputStyle]}
                      defaultValue={
                        userProfile.date_of_birth === null ? false : yearOfBirth
                      }
                      maxLength={4}
                      numberOfLines={1}
                      keyboardType={"numeric"}
                      onChangeText={(text) =>
                        this.setState({
                          birthYear: text,
                          buttonPress: false,
                          someInputEmpty: isEmpty,
                        })
                      }
                    />
                  </View>
                </View>

                <View style={inputViewStyle}>
                  <Text style={placeholderTextStyle}>Address</Text>
                  <Input
                    value={address_line_1}
                    style={[nameTextStyle, addressInputStyle]}
                    defaultValue={
                      userProfile.address_line_1 === null
                        ? false
                        : userProfile.address_line_1
                    }
                    onChangeText={(text) =>
                      this.setState({
                        address_line_1: text,
                        buttonPress: false,
                        someInputEmpty: isEmpty,
                      })
                    }
                  />
                </View>

                <View style={contactViewStyle}>
                  <View style={inputViewStyle}>
                    <Text style={placeholderTextStyle}>Mobile</Text>
                    <Input
                      value={mobile_number}
                      style={[nameTextStyle, phoneInputStyle]}
                      keyboardType={"phone-pad"}
                      defaultValue={
                        userProfile.mobile_number === null || undefined
                          ? false
                          : userProfile.mobile_number
                      }
                      onChangeText={(text) =>
                        this.setState({
                          mobile_number: text,
                          buttonPress: false,
                          someInputEmpty: isEmpty,
                        })
                      }
                    />
                  </View>

                  <View style={inputViewStyle}>
                    <Text style={placeholderTextStyle}>Zipcode</Text>
                    <Input
                      value={zip_code}
                      style={[nameTextStyle, ZipCodeInputStyle]}
                      placeholder={"Zipcode"}
                      defaultValue={
                        userProfile.zip_code === null || undefined
                          ? false
                          : userProfile.zip_code
                      }
                      keyboardType={"numeric"}
                      onChangeText={(text) =>
                        this.setState({
                          zip_code: text,
                          buttonPress: false,
                          someInputEmpty: isEmpty,
                        })
                      }
                    />
                  </View>
                </View>

                <View style={contactViewStyle}>
                  <View style={inputViewStyle}>
                    <Text style={placeholderTextStyle}>School</Text>
                    <Input
                      value={school_name}
                      style={[nameTextStyle, schoolInputStyle]}
                      defaultValue={
                        userProfile.school_name === null || undefined
                          ? false
                          : userProfile.school_name
                      }
                      onChangeText={(text) =>
                        this.setState({
                          school_name: text,
                          buttonPress: false,
                          someInputEmpty: isEmpty,
                        })
                      }
                    />
                  </View>

                  <View style={inputViewStyle}>
                    <Text style={placeholderTextStyle}>Grade</Text>
                    <Input
                      value={grade}
                      maxLength={2}
                      style={[nameTextStyle, GradeInputStyle]}
                      defaultValue={
                        userProfile.grade === null || undefined
                          ? false
                          : userProfile.grade
                      }
                      onChangeText={(text) =>
                        this.setState({
                          grade: text,
                          buttonPress: false,
                          someInputEmpty: isEmpty,
                        })
                      }
                    />
                  </View>
                </View>

                {buttonPress && someInputEmpty ? (
                  <>
                    {Toast.show({
                      useNativeDriver: true,
                      text: "All fields are required",
                      position: "top",
                      type: "danger",
                      duration: 3000,
                      textStyle: {
                        textAlign: "center",
                      },
                      style: {
                        width: wp(90),
                        alignSelf: "center",
                        justifyContent: "center",
                        borderRadius: 5,
                      },
                    })}
                  </>
                ) : (
                  <></>
                )}

                <Button
                  style={buttonStyle}
                  onPress={() => this.onSubmit()}
                  // onPress={() => this.navigateTo('CreatePassword', {transition: 'fadeIn'})}
                >
                  Update Profile
                </Button>

                <Button
                  style={buttonStyle}
                  onPress={() =>
                    this.navigateTo("CreatePassword", { transition: "fadeIn" })
                  }
                >
                  Change Password
                </Button>
              </View>
            </KeyboardAwareScrollView>
          </Card>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => (
  console.log("Profile Detail me", state.profileUpdateReducer),
  {
    loading: state.profileDetailsReducer.loading,
    data: state.profileDetailsReducer.data,
    errorMessage: state.profileDetailsReducer.errors,
    status: state.profileDetailsReducer.status,
  }
);

export default connect(mapStateToProps, { profileDetails, profileUpdate })(
  EditProfile
);

const styles = StyleSheet.create({
  cardStyle: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    paddingRight: wp(2),
  },
  profileDetailsViewStyle: {
    height: hp(20),
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: hp(4),
  },
  imageViewStyle: {
    borderRadius: 50,
    height: hp(10),
    width: wp(20),
    justifyContent: "center",
    marginRight: hp(2),
  },
  ImageStyle: {
    resizeMode: "cover",
    alignSelf: "center",
    height: hp(10),
    width: wp(17),
    borderRadius: 50,
  },
  profileNameTextStyle: {
    fontSize: RFPercentage(2.7),
    fontFamily: "poppins",
    fontWeight: "bold",
  },
  gradeTextStyle: {
    fontSize: RFPercentage(2.5),
    fontFamily: "poppins",
  },
  updateProfilePicTextStyle: {
    color: "#1B62CC",
  },
  horizontalStyle: {
    backgroundColor: "#F1F1F1",
    height: hp(1),
  },
  inputContainerViewStyle: {
    paddingHorizontal: hp(2),
    paddingTop: hp(4),
  },
  inputViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'pink',
  },
  placeholderTextStyle: {
    fontSize: RFPercentage(2.2),
    backgroundColor: "#F6F5F5",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    letterSpacing: RFPercentage(0.1),
    color: "#888888",
    paddingHorizontal: hp(2),
    paddingVertical: hp(2),
    fontFamily: "Poppins",
    marginBottom: wp(3),
  },
  nameTextStyle: {
    fontFamily: "Poppins",
    fontSize: RFPercentage(2.2),
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "#F6F5F5",
    alignSelf: "flex-start",
    width: wp(75.4),
    paddingHorizontal: hp(1),
    marginBottom: wp(3),
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  birthDateInputStyle: {
    width: wp(15),
  },
  containerViewStyle: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  birthDateViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contactViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addressInputStyle: {
    width: wp(71),
  },
  phoneInputStyle: {
    width: wp(36),
    justifyContent: "space-between",
    marginRight: wp(1),
  },
  ZipCodeInputStyle: {
    width: wp(15),
  },
  schoolInputStyle: {
    width: wp(45),
    marginRight: wp(2),
  },
  GradeInputStyle: {
    width: wp(9),
  },
  buttonStyle: {
    marginBottom: hp(-2),
    width: "70%",
  },
  errorTextStyle: {
    color: "#EE3265",
    textAlign: "center",
    marginTop: hp(2),
    bottom: hp(2),
    fontSize: RFPercentage(2.5),
    marginBottom: hp(0),
  },
});
