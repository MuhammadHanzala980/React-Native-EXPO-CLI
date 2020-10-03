/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, View, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { Card, Input, Button, Logo } from './common';
import { saveInfo } from '../actions/signupAction';

class SignupBirthDate extends Component {
  navigateTo = (screen, params) => this.props.navigation.navigate(screen, params);

  state = {
    birthDate: '',
    dayOfBirth: '',
    monthOfBirth: '',
    yearOfBirth: '',
    buttonPress: false,
    borderColor: '#FAC2C3',
    borderWidth: 0,
  }

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
   */
  onSubmit = async () => {
    if (!this.state.dayOfBirth || !this.state.monthOfBirth || !this.state.yearOfBirth) {
      this.setState({
        buttonPress: true,
        borderColor: '#EE3265',
        borderWidth: 1,
      });
    } else {
      const birthDay = `${this.state.dayOfBirth}-${this.state.monthOfBirth}-${this.state.yearOfBirth}`;
      await this.setState({
        birthDate: birthDay,
      });
      const formData = {
        name: this.props.name,
        school: this.props.school,
        grade: this.props.grade,
        birthDate: this.state.birthDate,
      };
      await this.props.saveInfo(formData);
      this.navigateTo('SignupPhoneNumber', {transition: 'fadeIn'});
    }
  }

  render() {

    const {
      birthDate,
      dayOfBirth,
      monthOfBirth,
      yearOfBirth,
      buttonPress,
    } = this.state;

    const {
      cardStyle,
      labelTextStyle,
      birthDateViewStyle,
      birthDateInputStyle,
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

            <View style={birthDateViewStyle}>
              <Input
                value={dayOfBirth}
                style={[labelTextStyle, birthDateInputStyle]}
                placeholder={'DD'}
                keyboardType={'numeric'}
                maxLength = {2}
                numberOfLines={1}
                onChangeText={text => {
                  this.setState({
                    dayOfBirth: text,
                    buttonPress: false,
                });}}
              />

              <Input
                value={monthOfBirth}
                style={[labelTextStyle, birthDateInputStyle]}
                placeholder={'MM'}
                keyboardType={'numeric'}
                maxLength={2}
                numberOfLines={1}
                onChangeText={text => {
                  this.setState({
                    monthOfBirth: text,
                    buttonPress: false,
                });}}
              />

              <Input
                value={yearOfBirth}
                style={[labelTextStyle, birthDateInputStyle]}
                placeholder={'YYYY'}
                keyboardType={'numeric'}
                maxLength = {4}
                numberOfLines={1}
                onChangeText={text => {
                  this.setState({
                    yearOfBirth: text,
                    buttonPress: false,
                });}}
              />
            </View>

            {
              !birthDate && buttonPress ? (
                <Text style={errorTextStyle}>
                  Please enter all fields.
                </Text>
              ) : (
                <></>
              )
            }

            <Button
              style={styles.buttonStyle}
              onPress={() => this.onSubmit()}
              >
              Next
            </Button>
          </KeyboardAwareScrollView>
        </Card>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  name: state.signupReducer.userData.name,
  school: state.signupReducer.userData.school,
  grade: state.signupReducer.userData.grade,
});

export default connect(mapStateToProps, { saveInfo })(SignupBirthDate);

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
    paddingHorizontal: hp('3%'),
    marginTop: hp('10%'),
    borderRadius: 3,
  },
  birthDateViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  birthDateInputStyle: {
    width: wp('25%'),
  },
  errorTextStyle: {
    color: '#EE3265',
    textAlign: 'center',
    marginTop: hp('2%'),
    fontSize: RFPercentage(2.5),
    marginBottom: hp('0%'),
  },
  buttonStyle: {
    marginTop: hp('17%'),
  },
});
