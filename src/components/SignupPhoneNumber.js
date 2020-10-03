/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { Card, Input, Button, Logo, Spinner } from './common';
import { saveInfo, signUpUser } from '../actions/signupAction';

class SignupPhoneNumber extends Component {
  navigateTo = (screen, params) => this.props.navigation.navigate(screen, params);

  state = {
    phoneNumber: '',
    buttonPress: false,
    borderColor: '#FAC2C3',
    borderWidth: 0,
    errorMessage: '',
  }

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
   */
  onSubmit = async () => {
    if (!this.state.phoneNumber) {
      this.setState({
        buttonPress: true,
        borderColor: '#EE3265',
        borderWidth: 1,
      });
    } else {
      const formData = {
        name: this.props.name,
        school: this.props.school,
        grade: this.props.grade,
        date_of_birth: this.props.birthDate,
        phone_number: this.state.phoneNumber,
      };
      await this.props.signUpUser(formData);
      this.handleValidation();
    }
  }

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
      borderColor: '#EE3265',
      borderWidth: 1,
    });
  } else {
    const formData = {
      name: this.props.name,
      school: this.props.school,
      grade: this.props.grade,
      birthDate: this.props.birthDate,
      phone_number: this.state.phoneNumber,
    };
    await this.props.saveInfo(formData);
    this.navigateTo('SignupZipcode', {transition: 'fadeIn'});
  }
}

/**
 * This function handles the onsubmit event. It triggers validation and sends data to the API
 */
renderButton = () => {
  if (this.props.loading) {
    return <Spinner color="#1B62CC" size="large" />;
  } else {
    return (
      <Button
        style={styles.buttonStyle}
        onPress={() => this.onSubmit()}>
        Next
      </Button>
    );
  }
}

  render() {
    const { phoneNumber, buttonPress, errorMessage, borderColor, borderWidth } = this.state;

    const { status } = this.props;

    const {
      cardStyle,
      labelTextStyle,
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
            <Logo />
            <Input
              value={phoneNumber}
              onChangeText={text => {
                this.setState({
                  borderColor: '#FAC2C3',
                  borderWidth: 0,
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
              placeholder={'Phone Number'}
              style={[labelTextStyle, {
                borderColor: borderColor,
                borderWidth: borderWidth,
              }]}
              keyboardType={'phone-pad'}
            />

            {
              !phoneNumber && buttonPress ? (
                <Text style={errorTextStyle}>
                  Please enter your phone number.
                </Text>
              ) : (
                <></>
              )
            }
            {
              buttonPress && status !== 201 ? (
                <Text style={errorTextStyle}>
                  {errorMessage}
                </Text>
              ) : (
                <></>
              )
            }
            {this.renderButton()}
          </KeyboardAwareScrollView>
        </Card>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.signupReducer.loading,
  errorMessage: state.signupReducer.phoneNumber,
  status: state.signupReducer.status,
  name: state.signupReducer.userData.name,
  school: state.signupReducer.userData.school,
  grade: state.signupReducer.userData.grade,
  birthDate: state.signupReducer.userData.birthDate,
});
export default connect(mapStateToProps, { saveInfo, signUpUser })(SignupPhoneNumber);

const styles = StyleSheet.create({
  cardStyle: {
    height: '100%',
    paddingHorizontal: wp('10%'),
    paddingTop: wp('12%'),
    paddingBottom: wp('4%'),
    backgroundColor: '#FFFFFF',
  },
  labelTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFPercentage(2.5),
    color: '#1B62CC',
		fontWeight: 'bold',
		textAlign: 'left',
		backgroundColor: '#F6F5F5',
    alignSelf: 'flex-start',
    width: wp('80%'),
    paddingHorizontal: hp('3%'),
    marginTop: hp('10%'),
    borderRadius: 3,
  },
  errorTextStyle: {
    color: '#EE3265',
    textAlign: 'center',
    marginTop: hp('2%'),
    fontSize: RFPercentage(2.5),
    marginBottom: hp('0%'),
  },
   buttonStyle: {
    marginTop: hp('16%'),
  },
});
