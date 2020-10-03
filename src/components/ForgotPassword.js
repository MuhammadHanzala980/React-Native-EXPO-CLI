/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Icon } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { Card, Button, HeaderText, Input, Spinner } from "./common";
import Dimensions from "../constants/Dimensions";
import { forgotPassword } from "../actions/forgotPasswordAction";

class ForgotPassword extends Component {
  navigateTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);

  state = {
    phoneNumber: "",
    buttonPress: false,
    borderColor: "#FAC2C3",
    passwordBorderWidth: 0,
    PhoneNumberBorderWidth: 0,
    errorMessage: "",
    phoneNumberBorderColor: "#FAC2C3",
  };

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
   */
  onSubmit = async () => {
    if (!this.state.phoneNumber) {
      this.setState({
        buttonPress: true,
        phoneNumberBorderColor: "#EE3265",
        PhoneNumberBorderWidth: 1,
      });
    } else {
      const formData = {
        phone_number: this.state.phoneNumber,
      };
      await this.props.forgotPassword(formData);
      this.handleValidation();
    }
  };

  /**
   * This function triggers validation and sends data to the API
   */
  handleValidation = async () => {
    this.setState({
      errorMessage: "",
    });
    if (this.props.errorMessage && this.props.status !== 200) {
      this.setState({
        errorMessage: this.props.errorMessage.phone_number,
      });
      if (this.state.errorMessage) {
        return this.setState({
          buttonPress: true,
          phoneNumberBorderColor: "#EE3265",
          PhoneNumberBorderWidth: 1,
        });
      }
    } else {
      this.navigateTo("ForgotPasswordLinkSent", { transition: "fadeIn" });
    }
  };

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
   */
  renderButton = () => {
    if (this.props.loading) {
      return (
        <Spinner color="#1B62CC" size="large" style={styles.spinnerStyle} />
      );
    } else {
      return (
        <Button style={styles.buttonStyle} onPress={() => this.onSubmit()}>
          Request Code
        </Button>
      );
    }
  };
  render() {
    const {
      phoneNumber,
      buttonPress,
      errorMessage,
      phoneNumberBorderColor,
      PhoneNumberBorderWidth,
    } = this.state;

    const { status } = this.props;

    const {
      cardStyle,
      headerTextStyle,
      secondCardStyle,
      iconViewStyle,
      iconStyle,
      forgotImageStyle,
      textStyle,
      secondTextStyle,
      inputStyle,
      errorTextStyle,
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
              <View style={iconViewStyle}>
                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                  <Icon type="AntDesign" name="arrowleft" style={iconStyle} />
                </TouchableOpacity>
                <HeaderText
                  headerStyle={headerTextStyle}
                  headerText={"Forgot \nPassword"}
                />
              </View>

              <Card style={secondCardStyle}>
                <Image
                  source={require("../assets/images/group-41-2.png")}
                  style={forgotImageStyle}
                />

                <Text style={textStyle}>Reset Password {"\n"} Reset link</Text>
                <Text style={secondTextStyle}>
                  please enter you registered Email. We will send you a password
                  reset link
                </Text>

                <Input
                  value={phoneNumber}
                  style={[
                    inputStyle,
                    {
                      borderWidth: PhoneNumberBorderWidth,
                      borderColor: phoneNumberBorderColor,
                    },
                  ]}
                  placeholder={"Phone Number"}
                  keyboardType={"phone-pad"}
                  onChangeText={(text) => {
                    this.setState({
                      phoneNumber: text,
                      buttonPress: false,
                      phoneNumberBorderColor: "#FAC2C3",
                      PhoneNumberBorderWidth: 0,
                    });
                    if (text.match(/\+?\D\+/g)) {
                      return this.setState({
                        phoneNumber,
                      });
                    } else {
                      return this.setState({
                        phoneNumber: text,
                      });
                    }
                  }}
                />

                {!phoneNumber && buttonPress ? (
                  <Text style={errorTextStyle}>
                    Please enter your phone number.
                  </Text>
                ) : (
                  <></>
                )}

                {errorMessage && buttonPress && status !== 200 ? (
                  <Text style={errorTextStyle}>{errorMessage}</Text>
                ) : (
                  <></>
                )}

                {this.renderButton()}
              </Card>
            </KeyboardAwareScrollView>
          </Card>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.forgotPasswordReducer.loading,
  errorMessage: state.forgotPasswordReducer.errors,
  status: state.forgotPasswordReducer.status,
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);

const styles = StyleSheet.create({
  cardStyle: {
    height: "100%",
    paddingTop: wp(8),
    backgroundColor: "#1B62CC",
  },
  secondCardStyle: {
    marginTop: hp(4),
    backgroundColor: "#FFFFFA",
    paddingHorizontal: wp(10),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    paddingBottom: wp(12),
  },
  inputStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    color: "#1B62CC",
    backgroundColor: "#F6F5F5",
    paddingHorizontal: hp(3),
    width: "100%",
  },
  iconViewStyle: {
    flexDirection: "row",
  },
  iconStyle: {
    fontSize: Dimensions.backIcon,
    color: "#FFFFFF",
    paddingRight: wp(8),
    paddingTop: wp(5),
    paddingLeft: wp(5),
  },
  headerTextStyle: {
    color: "#FFFFFF",
  },
  buttonStyle: {
    bottom: 0,
  },
  forgotImageStyle: {
    backgroundColor: "transparent",
    alignSelf: "center",
    marginTop: hp(4),
  },
  textStyle: {
    textAlign: "center",
    fontSize: RFPercentage(3.2),
    marginTop: hp(4),
    marginBottom: hp(3),
  },
  secondTextStyle: {
    textAlign: "center",
    fontSize: RFPercentage(2.2),
    paddingHorizontal: hp(4),
    fontWeight: "600",
    marginBottom: hp(8),
  },
  errorTextStyle: {
    color: "#EE3265",
    textAlign: "center",
    marginTop: hp(2),
    bottom: hp(2),
    fontSize: RFPercentage(2.5),
    marginBottom: hp(0),
  },
  spinnerStyle: {
    bottom: hp(10),
  },
});
