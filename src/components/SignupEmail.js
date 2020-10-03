/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { Card, Input, Button, Logo, Spinner } from './common';
import { saveInfo, signUpUser } from '../actions/signupAction';

class SignupEmail extends Component {
  navigateTo = (screen, params) => this.props.navigation.navigate(screen, params);

  state = {
    email: '',
    buttonPress: false,
    borderColor: '#FAC2C3',
    borderWidth: 0,
    errorMessage: '',
  }

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
   */
  onSubmit = async () => {
    if (this.state.email) {
      const formData = {
        email: this.state.email,
      };
      await this.props.signUpUser(formData);
      this.handleValidation();
    } else {
      const formData = {
        name: this.props.name,
        school: this.props.school,
        grade: this.props.grade,
        birthDate: this.props.birthDate,
        phone_number: this.props.phoneNumber,
        zipcode: this.props.zipcode,
        email: this.state.email,
      };
      await this.props.saveInfo(formData);
      this.navigateTo('CreatePassword', {transition: 'fadeIn'});
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
        phone_number: this.props.phoneNumber,
        zipcode: this.props.zipcode,
        email: this.state.email,
      };
      await this.props.saveInfo(formData);
      this.navigateTo('CreatePassword', {transition: 'fadeIn'});
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
    const { email, buttonPress, errorMessage, borderColor, borderWidth } = this.state;

    const { status } = this.props;

    const {
      cardStyle,
      labelTextStyle,
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
            <Logo />
            <Input
              value={email}
              style={[labelTextStyle,
                {
                  borderWidth: borderWidth,
                  borderColor: borderColor,
                },
              ]}
              placeholder={'Email'}
              keyboardType={'email-address'}
              onChangeText={text => this.setState({
                email: text,
                buttonPress: false,
                borderColor: '#FAC2C3',
                borderWidth: 0,
              })}
            />

            <Text style={textStyle}>(Optional)</Text>

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
  errorMessage: state.signupReducer.email,
  status: state.signupReducer.status,
  name: state.signupReducer.userData.name,
  phoneNumber: state.signupReducer.userData.phone_number,
  school: state.signupReducer.userData.school,
  grade: state.signupReducer.userData.grade,
  birthDate: state.signupReducer.userData.birthDate,
  zipcode: state.signupReducer.userData.zipcode,
});

export default connect(mapStateToProps, { saveInfo, signUpUser })(SignupEmail);


const styles = StyleSheet.create({
  cardStyle: {
    height: '100%',
    paddingHorizontal: wp('10%'),
    paddingTop: wp('12%'),
    paddingBottom: wp('12%'),
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
  },
  textStyle: {
    color: '#888888',
    marginTop: hp('2%'),
    left: wp('4%'),
  },
  buttonStyle: {
    marginTop: hp('14%'),
  },
  errorTextStyle: {
    color: '#EE3265',
    textAlign: 'center',
    marginTop: hp('2%'),
    fontSize: RFPercentage(2.5),
    marginBottom: hp('0%'),
  },
});
