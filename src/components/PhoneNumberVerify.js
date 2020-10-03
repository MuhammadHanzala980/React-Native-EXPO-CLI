/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { Card, HeaderText, Input, Button, Spinner } from './common';
import { phoneNumberVerifyUser } from '../actions/phoneNumberVerifyAction';

class PhoneNumberVerify extends Component {
  navigateTo = (screen, params) => this.props.navigation.navigate(screen, params);

  state = {
    verificationCode: '',
    phoneNumber: '',
    buttonPress: false,
    borderColor: '#FAC2C3',
    verifyCodeBorderWidth: 0,
    PhoneNumberBorderWidth: 0,
    errorMessage: '',
    verificationErrormessage: '',
    phoneNumberBorderColor: '#FAC2C3',
    verifyCodeBorderColor: '#FAC2C3',
    allFieldsEmpty: false,
  }

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
  */
  onSubmit = async () => {
    if (!this.state.verificationCode && !this.state.phoneNumber) {
      this.setState({
        buttonPress: true,
        allFieldsEmpty: true,
        phoneNumberBorderColor: '#EE3265',
        verifyCodeBorderColor: '#EE3265',
        verifyCodeBorderWidth: 1,
        PhoneNumberBorderWidth: 1,
      });
    } else if (!this.state.verificationCode) {
      this.setState({
        buttonPress: true,
        allFieldsEmpty: false,
        verifyCodeBorderColor: '#EE3265',
        verifyCodeBorderWidth: 1,
      });
    } else if (!this.state.phoneNumber) {
      this.setState({
        buttonPress: true,
        allFieldsEmpty: false,
        phoneNumberBorderColor: '#EE3265',
        PhoneNumberBorderWidth: 1,
      });
    }
    else {
      const formData = {
        phone_number_verification_token: this.state.verificationCode,
        phone_number: this.state.phoneNumber,
      };
      await this.props.phoneNumberVerifyUser(formData);
      this.handleValidation();
    }
  }

  /**
   * This function triggers validation and sends data to the API
  */
  handleValidation = async () => {
    this.setState({
      verificationErrormessage: this.props.verificationErrormessage,
    });
    if (this.props.message === 'successful' && this.props.status === 200) {
      this.navigateTo('Login', {transition: 'fadeIn'});
    } else if (this.props.errorMessage !== undefined) {
      this.setState({
        errorMessage: this.props.errorMessage.phone_number,
      });
      if (this.state.errorMessage || this.state.verificationErrormessage) {
        return this.setState({
          buttonPress: true,
          borderColor: '#EE3265',
          borderWidth: 1,
        });
      }
    } else if (this.state.verificationErrormessage) {
      return this.setState({
        buttonPress: true,
        borderColor: '#EE3265',
        borderWidth: 1,
      });
    }
  }

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
   */
  renderButton = () => {
    if (this.props.loading) {
      return (
        <Spinner
          color="#1B62CC"
          size="large"
          style={styles.spinnerStyle}
        />
      );
    } else {
      return (
        <Button
          style={styles.buttonStyle}
          onPress={() => this.onSubmit()}>
          Verify
        </Button>
      );
    }
  }

  render() {

    const { verificationCode, phoneNumber, buttonPress, errorMessage, verifyCodeBorderColor, phoneNumberBorderColor, verifyCodeBorderWidth, PhoneNumberBorderWidth, allFieldsEmpty, verificationErrormessage } = this.state;

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
          hidden={false} translucent={false}
          barStyle="default"
        />
        <SafeAreaView style={{ flex: 1 }}>
        <Card style={cardStyle}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraScrollHeight={hp(15)}
            extraHeight={hp(15)}>
            <HeaderText
              headerSubStyle={headerSubTextStyle}
              headerText={'Verify \nPhone Number' }
            />

            <View style={inputViewStyle}>
              <Input
                value={verificationCode}
                style={[nameTextStyle,
                  {
                    borderWidth: verifyCodeBorderWidth,
                    borderColor: verifyCodeBorderColor,
                  },
                ]}
                placeholder={'Verification Code'}
                onChangeText={text => this.setState({
                  verificationCode: text,
                  buttonPress: false,
                  verifyCodeBorderColor: '#FAC2C3',
                  verifyCodeBorderWidth: 0,
                  verificationErrormessage: '',
                  errorMessage: '',
                })}
              />

              {
                !verificationCode && buttonPress && !allFieldsEmpty ? (
                  <Text style={errorTextStyle}>
                    Please enter your verification code.
                  </Text>
                ) : (
                  <></>
                )
              }

              <Input
                value={phoneNumber}
                style={[nameTextStyle,
                  {
                    borderWidth: PhoneNumberBorderWidth,
                    borderColor: phoneNumberBorderColor,
                  },
                ]}
                placeholder={'Phone Number'}
                onChangeText={text => {
                  this.setState({
                  phoneNumber: text,
                  buttonPress: false,
                  phoneNumberBorderColor: '#FAC2C3',
                  PhoneNumberBorderWidth: 0,
                  verificationErrormessage: '',
                  errorMessage: '',
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

               {
                  !phoneNumber && buttonPress && !allFieldsEmpty ? (
                    <Text style={errorTextStyle}>
                      Please enter your phone number.
                    </Text>
                  ) : (
                    <></>
                  )
                }

              {
                !verificationCode && !phoneNumber && buttonPress ? (
                  <Text style={errorTextStyle}>
                    Please fill the above fields.
                  </Text>
                ) : (
                  <></>
                )
              }

              {
                errorMessage === 'invalid verification code' && buttonPress && status !== 201 ? (
                  <Text style={errorTextStyle}>
                    {errorMessage}
                  </Text>
                ) : (
                  <></>
                )
              }

              {
                verificationErrormessage && buttonPress && status !== 201 ? (
                  <Text style={errorTextStyle}>
                    {verificationErrormessage}
                  </Text>
                ) : (
                  <></>
                )
              }
            </View>
          </KeyboardAwareScrollView>
          {this.renderButton()}

          <TouchableOpacity
            onPress={() => this.navigateTo('ResendPhoneNumberVerify', {transition: 'fadeIn'})}
            >
            <Text style={secondTextStyle}>
              Resend Verification Code
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.navigateTo('Login', {transition: 'fadeIn'})}
            >
            <Text style={textStyle}>
              Already have an account? <Text style={secondTextStyle}>login</Text>
            </Text>
          </TouchableOpacity>
        </Card>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.phoneNumberVerifyReducer.loading,
  verificationErrormessage: state.phoneNumberVerifyReducer.verificationErrormessage,
  errorMessage: state.phoneNumberVerifyReducer.errors,
  status: state.phoneNumberVerifyReducer.status,
  message: state.phoneNumberVerifyReducer.successMessage,
});

export default connect(mapStateToProps, { phoneNumberVerifyUser })(PhoneNumberVerify);

const styles = StyleSheet.create({
  cardStyle: {
    height: '100%',
    paddingHorizontal: wp(10),
    paddingTop: wp(12),
    paddingBottom: wp(12),
    backgroundColor: '#FFFFFA',
  },
  nameTextStyle: {
    flex: 1,
		fontFamily: 'Poppins-Regular',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#1B62CC',
		textAlign: 'left',
		backgroundColor: '#F6F5F5',
    alignSelf: 'flex-start',
    width: wp(80),
    paddingHorizontal: hp(3),
    marginBottom: wp(3),
  },
  headerSubTextStyle: {
    marginBottom: hp(18),
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: '600',
    marginTop: hp(3),
  },
  secondTextStyle: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#1B62CC',
  },
  errorTextStyle: {
    color: '#EE3265',
    textAlign: 'center',
    marginTop: hp(2),
    bottom: hp(2),
    fontSize: RFPercentage(2.5),
    marginBottom: hp(0),
  },
  spinnerStyle: {
    marginBottom: hp(8),
  },
});
