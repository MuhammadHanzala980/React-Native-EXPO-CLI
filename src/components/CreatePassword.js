/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { RFPercentage } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { Card, HeaderText, Input, Button, Spinner } from "./common";
import { saveInfo, signUpUser } from "../actions/signupAction";

class CreatePassword extends Component {
  navigateTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);

  state = {
    password: "",
    confirmPassword: "",
    buttonPress: false,
    borderColor: "#FAC2C3",
    borderWidth: 0,
    errorMessage: "",
  };

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
   */
  onSubmit = async () => {
    if (!this.state.password) {
      this.setState({
        buttonPress: true,
        borderColor: "#EE3265",
        borderWidth: 1,
      });
    } else {
      const formData = {
        name: this.props.name,
        school_name: this.props.school,
        grade: this.props.grade,
        date_of_birth: this.props.birthDate,
        phone_number: this.props.phoneNumber,
        zip_code: this.props.zipcode,
        email: this.props.email,
        password: this.state.password,
        password_confirmation: this.state.confirmPassword,
      };
      await this.props.signUpUser(formData);
      this.handleValidation();
    }
  };

  /**
   * This function triggers validation and sends data to the API
   */
  handleValidation = async () => {
    this.setState({
      errorMessage: this.props.errorMessage,
    });
    if (this.state.errorMessage) {
      return this.setState({
        buttonPress: true,
        borderColor: "#EE3265",
        borderWidth: 1,
      });
    } else {
      const formData = {
        name: this.props.name,
        school: this.props.school,
        grade: this.props.grade,
        birthDate: this.props.birthDate,
        phone_number: this.props.phoneNumber,
        zipcode: this.props.zipcode,
        email: this.props.email,
        password: this.state.password,
        password_confirmation: this.state.confirmPassword,
      };
      await this.props.saveInfo(formData);
      this.navigateTo("PhoneNumberVerify", { transition: "fadeIn" });
    }
  };

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
   */
  renderButton = () => {
    if (this.props.loading) {
      return <Spinner color="#1B62CC" size="large" />;
    } else {
      return (
        <Button style={styles.buttonStyle} onPress={() => this.onSubmit()}>
          Create Account
        </Button>
      );
    }
  };

  render() {
    const {
      password,
      confirmPassword,
      buttonPress,
      errorMessage,
      borderColor,
      borderWidth,
    } = this.state;

    const { status } = this.props;

    const {
      cardStyle,
      nameTextStyle,
      headerSubTextStyle,
      secondTextStyle,
      inputViewStyle,
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
              <HeaderText
                headerSubStyle={headerSubTextStyle}
                headerText={"Create \nPassword"}
              />

              <View style={inputViewStyle}>
                <Input
                  value={password}
                  style={[
                    nameTextStyle,
                    {
                      borderWidth: borderWidth,
                      borderColor: borderColor,
                    },
                  ]}
                  placeholder={"Password"}
                  secureTextEntry
                  onChangeText={(text) =>
                    this.setState({
                      password: text,
                      buttonPress: false,
                      borderColor: "#FAC2C3",
                      borderWidth: 0,
                    })
                  }
                />

                <Input
                  value={confirmPassword}
                  style={[
                    nameTextStyle,
                    {
                      borderWidth: borderWidth,
                      borderColor: borderColor,
                    },
                  ]}
                  placeholder={"Re-type Password"}
                  secureTextEntry
                  onChangeText={(text) =>
                    this.setState({
                      confirmPassword: text,
                      buttonPress: false,
                      borderColor: "#FAC2C3",
                      borderWidth: 0,
                    })
                  }
                />

                {!password && buttonPress ? (
                  <Text style={errorTextStyle}>
                    Please enter your password.
                  </Text>
                ) : (
                  <></>
                )}

                {buttonPress && status !== 201 ? (
                  <Text style={errorTextStyle}>{errorMessage}</Text>
                ) : (
                  <></>
                )}
              </View>
            </KeyboardAwareScrollView>
            {this.renderButton()}

            <TouchableOpacity
              onPress={() => this.navigateTo("Login", { transition: "fadeIn" })}
            >
              <Text style={textStyle}>
                Already have an account?{" "}
                <Text style={secondTextStyle}>login</Text>
              </Text>
            </TouchableOpacity>
          </Card>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.signupReducer.loading,
  errorMessage: state.signupReducer.password,
  status: state.signupReducer.status,
  name: state.signupReducer.userData.name,
  phoneNumber: state.signupReducer.userData.phone_number,
  email: state.signupReducer.userData.email,
  school: state.signupReducer.userData.school,
  grade: state.signupReducer.userData.grade,
  birthDate: state.signupReducer.userData.birthDate,
  zipcode: state.signupReducer.userData.zipcode,
});

export default connect(mapStateToProps, { saveInfo, signUpUser })(
  CreatePassword
);

const styles = StyleSheet.create({
  cardStyle: {
    height: "100%",
    paddingHorizontal: wp(10),
    paddingTop: wp(12),
    paddingBottom: wp(12),
    backgroundColor: "#FFFFFA",
  },
  nameTextStyle: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    color: "#1B62CC",
    textAlign: "left",
    backgroundColor: "#F6F5F5",
    alignSelf: "flex-start",
    width: wp(80),
    paddingHorizontal: hp(3),
    marginBottom: wp(3),
  },
  headerSubTextStyle: {
    marginBottom: hp(18),
  },
  textStyle: {
    textAlign: "center",
    fontWeight: "600",
    marginTop: hp(3),
  },
  secondTextStyle: {
    textAlign: "center",
    fontWeight: "700",
    color: "#1B62CC",
  },
  errorTextStyle: {
    color: "#EE3265",
    textAlign: "center",
    marginTop: hp(2),
    fontSize: RFPercentage(2.5),
    marginBottom: hp(0),
  },
});
