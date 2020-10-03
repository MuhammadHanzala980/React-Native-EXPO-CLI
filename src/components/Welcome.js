import React from 'react';
import { ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, Logo } from './common';

const Welcome = ({ navigation }) => {
  const {
    backgroundImageStyle,
    logoViewStyle,
    buttonStyle,
  } = styles;
  return (
    <>
      <StatusBar
        backgroundColor="#1B62CC"
        hidden={false} translucent={false}
        barStyle="default"
      />
      <ImageBackground
        source={require('../assets/images/welcome-image.png')}
        style={backgroundImageStyle}>

        <Logo
          style={logoViewStyle}
        />

        <Button
          style={ buttonStyle }
          onPress={()=>{
            navigation.navigate('SignupName', {transition: 'fadeIn'});
          }}>
          Sign up
        </Button>

        <Button
          style={ buttonStyle }
          onPress={()=>{
            navigation.navigate('Login', {transition: 'fadeIn'});
          }} >
          Login
        </Button>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImageStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  logoViewStyle: {
    bottom: hp(20),
    marginBottom: hp(5),
  },
  buttonStyle: {
    width: '75%',
    marginBottom: hp(-3),
  },
});

export default Welcome;
