/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { Card, Button } from './common';
import { Icon } from 'native-base';

class MomentumBucks extends Component {
  navigateTo = (screen, params) => this.props.navigation.navigate(screen, params);

  state = {}

  render() {
    const {} = this.state;

    const {
      cardStyle,
      topbarViewStyle,
      iconViewStyle,
      iconStyle,
      iconTextStyle,
      bucksContainerViewStyle,
      imageViewStyle,
      bucksViewStyle,
      bucksImageStyle,
      bucksAmountTextStyle,
      bucksTextStyle,
      secondBucksTextStyle,
      walletImageStyle,
      surveyContainerViewStyle,
      surveyDecorativeViewStyle,
      surveyViewStyle,
      surveyTextStyle,
      answerButtonStyle,
      submitButtonStyle,
      submitButtonTextStyle,
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
          <View style={topbarViewStyle}>
            <View style={iconViewStyle}>
              <TouchableOpacity
                onPress={() => this.props.navigation.pop()}
                >
                <Icon
                  type="AntDesign"
                  name="arrowleft"
                  style={iconStyle}
                />
              </TouchableOpacity>
              <Text style={iconTextStyle}>Momentum Wallet</Text>
            </View>
          </View>
          <ScrollView>
            <View style={bucksContainerViewStyle}>
              <View style={imageViewStyle}>
                <Text>A</Text>
              </View>

              <View style={bucksViewStyle}>
                <ImageBackground
                  source={require('../assets/images/momentum-bucks.png')}
                  style={bucksImageStyle}
                  >
                  <Text style={bucksAmountTextStyle}>3,069</Text>
                </ImageBackground>
              </View>

              <Text style={bucksTextStyle}>Boost Points</Text>
              <Text style={secondBucksTextStyle}>
                Get more points in you wallet buy answering quick survey questions
              </Text>
              <Text style={bucksTextStyle}>Fund Wallet</Text>
              <Text style={secondBucksTextStyle}>
                Get more points in you wallet buy answering quick survey questions
              </Text>

              <Image
                source={require('../assets/images/momentum-wallet.png')}
                style={walletImageStyle}
              />
            </View>

            <View style={surveyContainerViewStyle}>
              <View style={surveyDecorativeViewStyle} />
              <View style={surveyViewStyle}>
                <Text style={surveyTextStyle}>
                  What was the best part of your experience here?
                </Text>

                <Button
                  style={answerButtonStyle}
                  >
                  Answer
                </Button>

                <Button
                  style={submitButtonStyle}
                  buttonTextstyle={submitButtonTextStyle}
                  >
                  Submit
                </Button>
              </View>
            </View>
          </ScrollView>
        </Card>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(MomentumBucks);


const styles = StyleSheet.create({
  cardStyle: {
    height: hp('100%'),
    backgroundColor: '#FFFFFF',
  },
  topbarViewStyle: {
    paddingVertical: hp('2%'),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: wp('6%'),
    elevation: 10,
    height: hp(8),
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: hp(3),
  },
  iconViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
  },
  iconStyle: {
    color: '#000000',
    marginRight: 10,
    fontSize: RFPercentage(3),
  },
  iconTextStyle: {
    color: '#000000',
    fontSize: RFPercentage(2.3),
    fontWeight: 'bold',
  },
  bucksContainerViewStyle: {
    paddingHorizontal: wp(6),
  },
  imageViewStyle: {
    height: hp(7),
    width: wp(12.5),
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 50,
  },
  bucksViewStyle: {
    alignItems: 'center',
  },
  bucksImageStyle: {
    resizeMode: 'cover',
    height: hp(20),
    width: wp(38),
    justifyContent: 'center',
  },
  bucksAmountTextStyle: {
    textAlign: 'center',
    color: '#1B62CC',
    fontSize: RFPercentage(2.5),
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  bucksTextStyle: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.2),
    marginVertical: 7,
  },
  secondBucksTextStyle: {
    fontSize: RFPercentage(2),
    color: '#000000',
    fontFamily: 'Poppins',
  },
  walletImageStyle: {
    height: hp('4.5%'),
    width: wp('7.5%'),
    alignSelf: 'flex-end',
  },
  surveyContainerViewStyle: {
    marginTop: 10,
    height: hp(35),
    // backgroundColor: 'pink',
  },
  surveyDecorativeViewStyle: {
    backgroundColor: 'rgba(50, 106, 190, 0.6)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: hp(10),
  },
  surveyViewStyle: {
    position: 'absolute',
    height: hp(30),
    backgroundColor: '#1B62CC',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    top: hp(5),
    paddingTop: 20,
    alignItems: 'center',
    paddingHorizontal: wp(20),
  },
  surveyTextStyle: {
    color: '#FFFFFF',
    fontSize: RFPercentage(2.2),
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  answerButtonStyle: {
    backgroundColor: 'rgba(85, 146, 239, 0.4)',
    width: wp('50%'),
  },
  submitButtonStyle: {
    backgroundColor: '#FFFFFF',
    width: wp('50%'),
    bottom: hp(4.5),
  },
  submitButtonTextStyle: {
    color: '#000000',
  },
});
