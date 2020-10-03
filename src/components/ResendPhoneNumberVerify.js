/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { Card, HeaderText, Input, Button, Spinner } from './common';
import { resendPhoneNumberVerifyUser } from '../actions/resendPhoneNumberVerifyAction';

class ResendPhoneNumberVerify extends Component {
  navigateTo = (screen, params) => this.props.navigation.navigate(screen, params);

  state = {
    password: '',
    phoneNumber: '',
    buttonPress: false,
    borderColor: '#FAC2C3',
    passwordBorderWidth: 0,
    PhoneNumberBorderWidth: 0,
    errorMessage: '',
    passwordErrormessage: '',
    phoneNumberBorderColor: '#FAC2C3',
    passwordBorderColor: '#FAC2C3',
    allFieldsEmpty: false,
  }

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
  */
  onSubmit = async () => {
    if (!this.state.password && !this.state.phoneNumber) {
      this.setState({
        buttonPress: true,
        allFieldsEmpty: true,
        phoneNumberBorderColor: '#EE3265',
        passwordBorderColor: '#EE3265',
        passwordBorderWidth: 1,
        PhoneNumberBorderWidth: 1,
      });
    } else if (!this.state.password) {
      this.setState({
        buttonPress: true,
        allFieldsEmpty: false,
        passwordBorderColor: '#EE3265',
        passwordBorderWidth: 1,
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
        phone_number: this.state.phoneNumber,
        password: this.state.password,
      };
      await this.props.resendPhoneNumberVerifyUser(formData);
      this.handleValidation();
    }
  }

  /**
   * This function triggers validation and sends data to the API
  */
  handleValidation = async () => {
    this.setState({
      passwordErrormessage: this.props.passwordErrormessage,
      errorMessage: '',
    });
   if (this.props.errorMessage) {
     this.setState({
        errorMessage: this.props.errorMessage.phone_number,
      });
      if (this.state.errorMessage) {
        return this.setState({
          buttonPress: true,
          phoneNumberBorderColor: '#EE3265',
          PhoneNumberBorderWidth: 1,
        });
      }
    } else if (this.state.passwordErrormessage ) {
      return this.setState({
        buttonPress: true,
        passwordBorderColor: '#EE3265',
        passwordBorderWidth: 1,
      });
    } else {
      this.navigateTo('PhoneNumberVerify', {transition: 'fadeIn'});
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
          Send
        </Button>
      );
    }
  }

  render() {

    const { password, phoneNumber, buttonPress, errorMessage, passwordBorderColor, phoneNumberBorderColor, passwordBorderWidth, PhoneNumberBorderWidth, allFieldsEmpty, passwordErrormessage } = this.state;

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
              headerText={'Resend \nVerification code' }
            />

            <View style={inputViewStyle}>
              <Input
                value={phoneNumber}
                style={[nameTextStyle,
                  {
                    borderWidth: PhoneNumberBorderWidth,
                    borderColor: phoneNumberBorderColor,
                  },
                ]}
                placeholder={'Phone Number'}
                keyboardType={'phone-pad'}
                onChangeText={text => {
                  this.setState({
                    phoneNumber: text,
                    buttonPress: false,
                    phoneNumberBorderColor: '#FAC2C3',
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

              {
                !phoneNumber && buttonPress && !allFieldsEmpty ? (
                  <Text style={errorTextStyle}>
                    Please enter your phone number.
                  </Text>
                ) : (
                  <></>
                )
              }

              <Input
                value={password}
                style={[nameTextStyle,
                  {
                    borderWidth: passwordBorderWidth,
                    borderColor: passwordBorderColor,
                  },
                ]}
                placeholder={'Password'}
                secureTextEntry
                onChangeText={text => this.setState({
                  password: text,
                  buttonPress: false,
                  passwordBorderColor: '#FAC2C3',
                  passwordBorderWidth: 0,
                })}
              />

              {
                !password && buttonPress && !allFieldsEmpty ? (
                  <Text style={errorTextStyle}>
                    Please enter your password.
                  </Text>
                ) : (
                  <></>
                )
              }

              {
                !password && !phoneNumber && buttonPress ? (
                  <Text style={errorTextStyle}>
                    Please fill the above fields.
                  </Text>
                ) : (
                  <></>
                )
              }

              {
                errorMessage && buttonPress && status !== 201 ? (
                  <Text style={errorTextStyle}>
                    {errorMessage}
                  </Text>
                ) : (
                  <></>
                )
              }

              {
                passwordErrormessage !== 'The given data was invalid.' && buttonPress && status !== 201 ? (
                  <Text style={errorTextStyle}>
                    {passwordErrormessage}
                  </Text>
                ) : (
                  <></>
                )
              }
            </View>
          </KeyboardAwareScrollView>

          {this.renderButton()}

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
  loading: state.resendPhoneNumberVerifyReducer.loading,
  passwordErrormessage: state.resendPhoneNumberVerifyReducer.passwordErrormessage,
  errorMessage: state.resendPhoneNumberVerifyReducer.errors,
  status: state.resendPhoneNumberVerifyReducer.status,
});

export default connect(mapStateToProps, { resendPhoneNumberVerifyUser })(ResendPhoneNumberVerify);

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
    marginTop: hp(2),
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
