/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { RFPercentage } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { Card, Input, Button, Logo, Spinner } from "./common";
import { loginUser } from "../actions/loginAction";

class Login extends Component {
  navigateTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);

  state = {
    password: "",
    phoneNumber: "",
    buttonPress: false,
    borderColor: "#FAC2C3",
    passwordBorderWidth: 0,
    PhoneNumberBorderWidth: 0,
    errorMessage: "",
    passwordErrormessage: "",
    phoneNumberBorderColor: "#FAC2C3",
    passwordBorderColor: "#FAC2C3",
    allFieldsEmpty: false,
  };

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
   */
  onSubmit = async () => {
    if (!this.state.password && !this.state.phoneNumber) {
      this.setState({
        buttonPress: true,
        allFieldsEmpty: true,
        phoneNumberBorderColor: "#EE3265",
        passwordBorderColor: "#EE3265",
        passwordBorderWidth: 1,
        PhoneNumberBorderWidth: 1,
      });
    } else if (!this.state.password) {
      this.setState({
        buttonPress: true,
        allFieldsEmpty: false,
        passwordBorderColor: "#EE3265",
        passwordBorderWidth: 1,
      });
    } else if (!this.state.phoneNumber) {
      this.setState({
        buttonPress: true,
        allFieldsEmpty: false,
        phoneNumberBorderColor: "#EE3265",
        PhoneNumberBorderWidth: 1,
      });
    } else {
      const formData = {
        phone_number: this.state.phoneNumber,
        password: this.state.password,
      };
      await this.props.loginUser(formData);
      this.handleValidation();
    }
  };

  /**
   * This function triggers validation and sends data to the API
   */
  handleValidation = async () => {
    this.setState({
      passwordErrormessage: "",
      errorMessage: "",
    });
    this.setState({
      passwordErrormessage: this.props.passwordErrormessage,
    });
    if (this.props.errorMessage && this.props.status !== 200) {
      this.setState({
        errorMessage: this.props.errorMessage.phone_number,
      });
      if (this.state.errorMessage && this.props.status !== 200) {
        return this.setState({
          buttonPress: true,
          phoneNumberBorderColor: "#EE3265",
          PhoneNumberBorderWidth: 1,
        });
      }
    } else if (this.state.passwordErrormessage && this.props.status !== 200) {
      return this.setState({
        buttonPress: true,
        passwordBorderColor: "#EE3265",
        passwordBorderWidth: 1,
      });
    } else {
      this.navigateTo("InterestCategories", { transition: "fadeIn" });
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
          Login
        </Button>
      );
    }
  };

  render() {
    const {
      password,
      phoneNumber,
      buttonPress,
      errorMessage,
      passwordBorderColor,
      phoneNumberBorderColor,
      passwordBorderWidth,
      PhoneNumberBorderWidth,
      allFieldsEmpty,
      passwordErrormessage,
    } = this.state;

    const { status } = this.props;

    const {
      cardStyle,
      labelTextStyle,
      emailLabelTextStyle,
      secondTextStyle,
      signupTextStyle,
      textStyle,
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
              <Logo />
              <Input
                value={phoneNumber}
                onChangeText={(text) => {
                  this.setState({
                    phoneNumberBorderColor: "#FAC2C3",
                    PhoneNumberBorderWidth: 0,
                    buttonPress: false,
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
                style={[
                  labelTextStyle,
                  emailLabelTextStyle,
                  {
                    borderWidth: PhoneNumberBorderWidth,
                    borderColor: phoneNumberBorderColor,
                  },
                ]}
                placeholder={"Phone Number"}
                keyboardType={"phone-pad"}
              />

              {!phoneNumber && buttonPress && !allFieldsEmpty ? (
                <Text style={errorTextStyle}>
                  Please enter your phone number.
                </Text>
              ) : (
                <></>
              )}

              <Input
                value={password}
                secureTextEntry
                onChangeText={(text) =>
                  this.setState({
                    password: text,
                    buttonPress: false,
                    passwordBorderColor: "#FAC2C3",
                    passwordBorderWidth: 0,
                  })
                }
                style={[
                  labelTextStyle,
                  {
                    borderWidth: passwordBorderWidth,
                    borderColor: passwordBorderColor,
                  },
                ]}
                placeholder={"Password"}
              />

              {!password && buttonPress && !allFieldsEmpty ? (
                <Text style={errorTextStyle}>Please enter your password.</Text>
              ) : (
                <></>
              )}

              {!password && !phoneNumber && buttonPress ? (
                <Text style={errorTextStyle}>
                  Please fill the above fields.
                </Text>
              ) : (
                <></>
              )}

              {errorMessage && buttonPress && status !== 200 ? (
                <Text style={errorTextStyle}>{errorMessage}</Text>
              ) : (
                <></>
              )}

              {passwordErrormessage !== "The given data was invalid." &&
              buttonPress &&
              status !== 201 ? (
                <Text style={errorTextStyle}>{passwordErrormessage}</Text>
              ) : (
                <></>
              )}

              <TouchableOpacity
                onPress={() =>
                  this.navigateTo("ForgotPassword", { transition: "fadeIn" })
                }
              >
                <Text style={[textStyle, secondTextStyle]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {this.renderButton()}

              <TouchableOpacity
                onPress={() =>
                  this.navigateTo("PhoneNumberVerify", { transition: "fadeIn" })
                }
              >
                <Text style={textStyle}>
                  Phone number not verified?{" "}
                  <Text style={secondTextStyle}>Verify</Text>
                </Text>
              </TouchableOpacity>

              <Text style={textStyle}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() =>
                  this.navigateTo("SignupName", { transition: "fadeIn" })
                }
              >
                <Text style={[textStyle, signupTextStyle]}>Sign Up</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </Card>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loginReducer.loading,
  passwordErrormessage: state.loginReducer.passwordErrormessage,
  errorMessage: state.loginReducer.errors,
  status: state.loginReducer.status,
});

export default connect(mapStateToProps, { loginUser })(Login);

const styles = StyleSheet.create({
  cardStyle: {
    height: "100%",
    paddingHorizontal: wp(10),
    paddingTop: wp(9),
    paddingBottom: wp(4),
    backgroundColor: "#FFFFFF",
  },
  labelTextStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: RFPercentage(2.5),
    color: "#1B62CC",
    fontWeight: "bold",
    textAlign: "left",
    backgroundColor: "#F6F5F5",
    alignSelf: "flex-start",
    width: wp(80),
    paddingHorizontal: hp(3),
  },
  emailLabelTextStyle: {
    top: hp(8),
    marginBottom: hp(10),
  },
  textStyle: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: hp(1),
  },
  secondTextStyle: {
    textAlign: "right",
    fontWeight: "700",
    color: "#1B62CC",
  },
  signupTextStyle: {
    fontWeight: "700",
    color: "#1B62CC",
    fontSize: RFPercentage(2.7),
  },
  errorTextStyle: {
    color: "#EE3265",
    textAlign: "center",
    marginTop: hp(2),
    fontSize: RFPercentage(2.5),
    marginBottom: hp(0),
    bottom: hp(2),
  },
  spinnerStyle: {
    bottom: hp(10),
  },
});
