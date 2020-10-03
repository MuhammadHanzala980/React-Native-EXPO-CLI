/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { Card  } from './common';
import { saveInfo } from '../actions/signupAction';


class SurveyCompleted extends Component {
  navigateTo = (screen, params) => this.props.navigation.navigate(screen, params);


  render() {
    const {
      cardStyle,
      viewStyle,
      imageStyle,
      successTextStyle,
      completedTextStyle,
      homeTextStyle,
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
            <View style={viewStyle}>
              <Image
                source={require('../assets/images/survey.png')}
                style={imageStyle}
              />
              <Text style={successTextStyle}>
                Successful!
              </Text>
              <Text style={completedTextStyle}>
                Your survey has been completed
              </Text>

              <TouchableOpacity
                onPress={() => this.navigateTo('Home', {transition: 'fadeIn'})}
                >
                <Text style={homeTextStyle}>
                  Proceed to Home
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </Card>
        </SafeAreaView>
      </>
    );
  }
}

export default connect(null, { saveInfo })(SurveyCompleted);

const styles = StyleSheet.create({
  cardStyle: {
    height: '100%',
    paddingHorizontal: wp(10),
    paddingTop: wp(12),
    paddingBottom: wp(4),
    backgroundColor: '#FFFFFF',
  },
  viewStyle: {
    alignItems: 'center',
    marginVertical: hp(17),
  },
  imageStyle: {
    width: wp(58),
    height: hp(30),
    alignSelf: 'center',
  },
  successTextStyle: {
    marginTop: hp(2),
    color: '#1B62CC',
    fontWeight: 'bold',
    fontSize: RFPercentage(3),
  },
  completedTextStyle: {
    fontSize: RFPercentage(2.4),
    fontWeight: 'bold',
    marginTop: hp(1.5),
  },
  homeTextStyle: {
    color: '#1B62CC',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
    marginTop: hp(1),
  },
});
