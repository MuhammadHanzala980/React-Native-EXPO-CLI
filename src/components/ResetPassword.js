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
import { resetPassword } from "../actions/resetPassswordAction";

class ResetPassword extends Component {
  navigateTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);

  state = {
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    code: "",
    buttonPress: false,
    passwordBorderWidth: 0,
    passwordBorderColor: "#FAC2C3",
    PhoneNumberBorderWidth: 0,
    phoneNumberBorderColor: "#FAC2C3",
    codeBorderColor: "#FAC2C3",
    codeBorderWidth: 0,
    errorMessage: "",
    passwordErrorMessage: "",
    codeErrorMessage: "",
    allFieldsEmpty: false,
  };

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
   */
  onSubmit = async () => {
    if (
      !this.state.phoneNumber &&
      !this.state.code &&
      !this.state.password &&
      !this.state.confirmPassword
    ) {
      this.setState({
        buttonPress: true,
        phoneNumberBorderColor: "#EE3265",
        PhoneNumberBorderWidth: 1,
        passwordBorderWidth: 1,
        passwordBorderColor: "#EE3265",
        codeBorderColor: "#EE3265",
        codeBorderWidth: 1,
        allFieldsEmpty: true,
      });
    } else if (!this.state.phoneNumber) {
      this.setState({
        buttonPress: true,
        allFieldsEmpty: false,
        phoneNumberBorderColor: "#EE3265",
        PhoneNumberBorderWidth: 1,
      });
    } else if (!this.state.code) {
      this.setState({
        buttonPress: true,
        allFieldsEmpty: false,
        codeBorderColor: "#EE3265",
        codeBorderWidth: 1,
      });
    } else if (!this.state.password || !this.state.confirmPassword) {
      this.setState({
        buttonPress: true,
        allFieldsEmpty: false,
        passwordBorderColor: "#EE3265",
        codeBorderWidth: 1,
      });
    } else {
      const formData = {
        phone_number: this.state.phoneNumber,
        phone_number_verification_token: this.state.code,
        password: this.state.password,
        password_confirmation: this.state.confirmPassword,
      };
      await this.props.resetPassword(formData);
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
    if (
      this.props.errorMessage &&
      this.props.errorMessage.phone_number &&
      this.props.status !== 200
    ) {
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
    } else if (this.props.passwordErrorMessage && this.props.status !== 200) {
      this.setState({
        passwordErrorMessage: this.props.passwordErrorMessage.password,
      });
      return this.setState({
        buttonPress: true,
        passwordBorderColor: "#EE3265",
        passwordBorderWidth: 1,
      });
    } else if (this.props.codeErrorMessage && this.props.status !== 200) {
      this.setState({
        codeErrorMessage: this.props.codeErrorMessage,
      });
      return this.setState({
        buttonPress: true,
        codeBorderColor: "#EE3265",
        codeBorderWidth: 1,
      });
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
        <Spinner color='#1B62CC' size='large' style={styles.spinnerStyle} />
      );
    } else {
      return (
        <Button style={styles.buttonStyle} onPress={() => this.onSubmit()}>
          Reset
        </Button>
      );
    }
  };
  render() {
    const {
      phoneNumber,
      phoneNumberBorderColor,
      PhoneNumberBorderWidth,
      buttonPress,
      errorMessage,
      passwordErrorMessage,
      codeErrorMessage,
      password,
      passwordBorderWidth,
      passwordBorderColor,
      confirmPassword,
      allFieldsEmpty,
      code,
      codeBorderColor,
      codeBorderWidth,
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
      contactViewStyle,
      phoneInputStyle,
      ZipCodeInputStyle,
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
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps='handled'
              enableOnAndroid={true}
              extraScrollHeight={hp(15)}
              extraHeight={hp(15)}
            >
              <View style={iconViewStyle}>
                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                  <Icon type='AntDesign' name='arrowleft' style={iconStyle} />
                </TouchableOpacity>
                <HeaderText
                  headerStyle={headerTextStyle}
                  headerText={"Reset \nPassword"}
                />
              </View>

              <Card style={secondCardStyle}>
                <Image
                  source={require("../assets/images/group-41-2.png")}
                  style={forgotImageStyle}
                />

                <Text style={textStyle}>Reset Password</Text>
                <Text style={secondTextStyle}>
                  please enter you registered Phone Number. And the reset code
                  sent to your phone to reset password.
                </Text>

                <View style={contactViewStyle}>
                  <Input
                    value={phoneNumber}
                    style={[
                      inputStyle,
                      phoneInputStyle,
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

                  <Input
                    value={code}
                    style={[
                      inputStyle,
                      ZipCodeInputStyle,
                      {
                        borderColor: codeBorderColor,
                        borderWidth: codeBorderWidth,
                      },
                    ]}
                    placeholder={"Code"}
                    onChangeText={(text) =>
                      this.setState({
                        code: text,
                        buttonPress: false,
                        codeBorderColor: "#FAC2C3",
                        codeBorderWidth: 0,
                      })
                    }
                  />
                </View>
                {!phoneNumber && buttonPress && !allFieldsEmpty ? (
                  <Text style={errorTextStyle}>
                    Please enter your phone number.
                  </Text>
                ) : (
                  <></>
                )}

                <Input
                  value={password}
                  style={[
                    inputStyle,
                    {
                      borderWidth: passwordBorderWidth,
                      borderColor: passwordBorderColor,
                    },
                  ]}
                  placeholder={"Password"}
                  secureTextEntry
                  onChangeText={(text) =>
                    this.setState({
                      password: text,
                      buttonPress: false,
                      passwordBorderColor: "#FAC2C3",
                      passwordBorderWidth: 0,
                    })
                  }
                />

                {!password && buttonPress && !allFieldsEmpty ? (
                  <Text style={errorTextStyle}>
                    Please enter your password.
                  </Text>
                ) : (
                  <></>
                )}

                <Input
                  value={confirmPassword}
                  style={[
                    inputStyle,
                    {
                      borderWidth: passwordBorderWidth,
                      borderColor: passwordBorderColor,
                    },
                  ]}
                  placeholder={"Re-type Password"}
                  secureTextEntry
                  onChangeText={(text) =>
                    this.setState({
                      confirmPassword: text,
                      buttonPress: false,
                      passwordBorderColor: "#FAC2C3",
                      passwordBorderWidth: 0,
                    })
                  }
                />

                {!confirmPassword && buttonPress && !allFieldsEmpty ? (
                  <Text style={errorTextStyle}>Please confirm password.</Text>
                ) : (
                  <></>
                )}

                {!password && !phoneNumber && !code && buttonPress ? (
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
                {passwordErrorMessage && buttonPress && status !== 200 ? (
                  <Text style={errorTextStyle}>{passwordErrorMessage}</Text>
                ) : (
                  <></>
                )}

                {codeErrorMessage && buttonPress && status !== 200 ? (
                  <Text style={errorTextStyle}>{codeErrorMessage}</Text>
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
  loading: state.resetPasswordReducer.loading,
  errorMessage: state.resetPasswordReducer.errors,
  passwordErrorMessage: state.resetPasswordReducer.errors,
  codeErrorMessage: state.resetPasswordReducer.message,
  status: state.resetPasswordReducer.status,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);

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
    marginBottom: hp(2),
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
    height: hp(10),
    width: wp(15),
  },
  textStyle: {
    textAlign: "center",
    fontSize: RFPercentage(3.2),
    marginTop: hp(3),
    marginBottom: hp(2),
    fontWeight: "bold",
  },
  secondTextStyle: {
    textAlign: "center",
    fontSize: RFPercentage(2.2),
    paddingHorizontal: hp(4),
    fontWeight: "600",
    marginBottom: hp(4),
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
  contactViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  phoneInputStyle: {
    width: wp(49),
    justifyContent: "space-between",
    marginRight: wp(2),
  },
  ZipCodeInputStyle: {
    width: wp(29),
  },
});
