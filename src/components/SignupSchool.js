/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { Card, Input, Button, Logo } from './common';
import { saveInfo } from '../actions/signupAction';

class SignupSchool extends Component {
  navigateTo = (screen, params) => this.props.navigation.navigate(screen, params);

  state = {
    school: '',
    buttonPress: false,
    borderColor: '#FAC2C3',
    borderWidth: 0,
  }

  /**
   * This function handles the onsubmit event. It triggers validation and sends data to the API
   */
  onSubmit = async () => {
    if (!this.state.school) {
      this.setState({
        buttonPress: true,
        borderColor: '#EE3265',
        borderWidth: 1,
      });
    } else {
      const formData = {
        name: this.props.name,
        school: this.state.school,
      };
      await this.props.saveInfo(formData);
      this.navigateTo('SignupGrade', {transition: 'fadeIn'});
    }
  }

  render() {

    const { borderColor, borderWidth, school, buttonPress } = this.state;

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
              value={school}
              style={[labelTextStyle, {
                borderColor: borderColor,
                borderWidth: borderWidth,
              }]}
             placeholder={'School'}
             onChangeText={text => this.setState({
              school: text,
              borderColor: '#FAC2C3',
              borderWidth: 0,
              buttonPress: false,
            })}
            />

            {
              !school && buttonPress ? (
                <Text style={errorTextStyle}>
                  Please enter your school.
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
});

export default connect(mapStateToProps, { saveInfo })(SignupSchool);


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
    marginTop: hp('17%'),
  },
});
