/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Card, HeaderText, Input, Button } from './common';

export default class Signup extends Component {
  navigateTo = (screen, params) => this.props.navigation.navigate(screen, params);
  render() {
    const {
      cardStyle,
      nameTextStyle,
      headerSubTextStyle,
      birthDateViewStyle,
      birthDateInputStyle,
      contactViewStyle,
      phoneInputStyle,
      ZipCodeInputStyle,
      schoolInputStyle,
      GradeInputStyle,
      secondTextStyle,
      textStyle,
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
              headerText={'Register'}
              headerSubText={'Get updates on scholarships, Jobs and also connect with mentor'}
            />

            <Input
             style={nameTextStyle}
             placeholder={'Name'}
            />

            <Input
             style={nameTextStyle}
             placeholder={'Email'}
            />

            <View style={birthDateViewStyle}>
              <Input
                style={[nameTextStyle, birthDateInputStyle]}
                placeholder={'DD'}
              />

              <Input
                style={[nameTextStyle, birthDateInputStyle]}
                placeholder={'MM'}
              />

              <Input
                style={[nameTextStyle, birthDateInputStyle]}
                placeholder={'YY'}
              />
            </View>

            <Input
             style={nameTextStyle}
             placeholder={'Address'}
            />

            <View style={contactViewStyle}>
              <Input
                style={[nameTextStyle, phoneInputStyle]}
                placeholder={'Phone'}
              />

              <Input
                style={[nameTextStyle, ZipCodeInputStyle]}
                placeholder={'Zipcode'}
              />
            </View>

            <View style={contactViewStyle}>
              <Input
                style={[nameTextStyle, schoolInputStyle]}
                placeholder={'School'}
              />

              <Input
                style={[nameTextStyle, GradeInputStyle]}
                placeholder={'Grade'}
              />
            </View>

            <Button
              onPress={() => this.navigateTo('CreatePassword', {transition: 'fadeIn'})}>
              Register
            </Button>

            <TouchableOpacity
               onPress={() => this.navigateTo('Login', {transition: 'fadeIn'})}>
              <Text style={textStyle}>
                Already have an account? <Text style={secondTextStyle}>login</Text>
              </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </Card>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    height: '100%',
    paddingHorizontal: wp(10),
    paddingTop: wp(12),
    paddingBottom: wp(12),
    backgroundColor: '#FFFFFA',
  },
  nameTextStyle: {
		fontFamily: 'Poppins-Regular',
		fontSize: RFPercentage(2),
		fontStyle: 'normal',
		fontWeight: 'normal',
		textAlign: 'left',
		backgroundColor: '#F6F5F5',
    alignSelf: 'flex-start',
    width: wp(100),
    paddingHorizontal: hp(3),
    marginBottom: wp(3),
  },
  birthDateInputStyle: {
    width: wp(25),
  },
  headerSubTextStyle: {
    marginBottom: hp(10),
  },
  containerViewStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  birthDateViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phoneInputStyle: {
    width: wp(49),
    justifyContent: 'space-between',
    marginRight: wp(2),
  },
  ZipCodeInputStyle: {
    width: wp(29),
  },
  schoolInputStyle: {
    width: wp(57),
    marginRight: wp(2),
  },
  GradeInputStyle: {
    width: wp(23),
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: '600',
  },
  secondTextStyle: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#1B62CC',
  },
});
