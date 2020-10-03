/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Icon, CheckBox, Toast } from 'native-base';
import { connect } from 'react-redux';
import { Card, Button, HeaderText, Spinner, PlaceholderLoader } from './common';
import Dimensions from '../constants/Dimensions';
import { interests } from '../actions/interestsAction';
import { selectedInterestItems } from '../actions/selectedInterestsAction';

const backgroundColors = [
  '#EFAC00',
  '#0B98AE',
  '#343C8A',
  '#F69D7D',
  '#EF9A9A',
  '#4DB6AC',
  '#FF5252',
  'rgba(72, 79, 146, 0.62)',
  'rgba(250, 180, 1, 0.36)',
  'rgba(1, 176, 204, 0.44)',
];

const interest_id = [];

class Interests extends Component {

  navigateTo = (screen, params) => this.props.navigation.navigate(screen, params);

  componentDidMount = async ()  => {
    const ids = {
      user_interest_catrgory_ids: [],
    };
    const { navigation } = this.props;
    const interestPicked = [...navigation.getParam('interestPicked')];
    interestPicked.map((title, key) => {
      ids.user_interest_catrgory_ids.push(title.id);
    });
    ids.user_interest_catrgory_ids = ids.user_interest_catrgory_ids.toString();
    await this.props.interests(ids);
    this.renderInterests();
  }

  state = {
    data: [],
    buttonPress: false,
    expanded: false,
    isSelected: false,
    numberOfInterests: 0,
    numberOfSlectedInterests: 0,
    isChecked: {},
  }

  renderInterests = () => {
    const { navigation } = this.props;
    const interestPicked = [...navigation.getParam('interestPicked')];
    this.setState({
      numberOfInterests: interestPicked.length,
    });
    // console.log(this.state.numberOfInterests);
    const selectedInterests = interestPicked.map(value => {
      return {...value, [`${value.title}Pressed`]: false, [`${value.title}Selected`]: false};
    });
    console.log(interestPicked);
    console.log(selectedInterests);
    if (interestPicked.length !== 0) {
      return this.setState({
        data: selectedInterests,
      });
    } else {
      return this.state.data;
    }
  };

  onClick = (key, title) => {
    const newState = this.state.data;
    const itemInArray = newState[key];
    // const isSelected = itemInArray[`${title}Selected`];
    const expanded = itemInArray[`${title}Pressed`];
    newState[key] = {...newState[key], [`${title}Pressed`]: !expanded};
    this.setState(() => ({data: newState}));
  };

  renderSelectedInterest = (title) => {
    for (const [key, value] of Object.entries(this.props.selectInterest)) {
      if (title === key) {
        return (
          value.map((selectedInterests, index) => {
            // console.log(index);
            return (
              <View
                key={index}
                style={styles.checkBoxViewStyle}>
                <CheckBox
                  color="#1B62CC"
                  checked={this.state.isChecked[`${index + title}`]}
                  onPress={() => this.manageCheckToggle(title, index, selectedInterests)}
                  style={styles.checkBoxStyle}
                />
                <Text style={styles.checkBoxTextStyle}>
                  {selectedInterests.description}
                </Text>
                {/* {console.log(this.state.data)} */}
              </View>
            );
          })
        );
      }
    }
  }

  /**
   * This function manages check toggle and push selected check value into a constant
  */
  manageCheckToggle = (title, index, selectedInterests) => {
    this.setState(state => {
      const isChecked = {...state.isChecked};
      isChecked[`${index + title}`] = !isChecked[`${index + title}`];
      const newState = this.state.data;
      const itemInArray = newState[index];
      const isSelected = itemInArray[`${title}Selected`];
      newState[index] = {...newState[index], [`${title}Selected`]: !isSelected};
      if (new Set(interest_id).has(selectedInterests.id)){
        const indexOfInterest = interest_id.indexOf(selectedInterests.id);
        interest_id.splice(indexOfInterest, 1);
      } else {
        console.log('==================');
        // console.log(!isSelected);
        console.log(isChecked);
        // this.setState(() => ({data: newState}));
        interest_id.push(selectedInterests.id);
      }
      return { isChecked };
    });
  }

  onButtonPress = async () => {
    if (interest_id.length < 1) {
      Toast.show({
        text: 'Select at least 1 interest from each of your interests',
        position: 'top',
        type: 'danger',
        duration: 3000,
        textStyle: {
          textAlign: 'center',
        },
        style: {
          width: wp(90),
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        },
      });
    } else {
      await this.props.selectedInterestItems(interest_id);
      if (this.props.errorMessage === 0){
        Toast.show({
          text: 'Interest item already exist',
          position: 'top',
          type: 'danger',
          duration: 3000,
          textStyle: {
            textAlign: 'center',
          },
          style: {
            width: wp(90),
            alignSelf: 'center',
            justifyContent: 'center',
            borderColorRadius: 5,
          },
        });
      } else {
        const { navigation } = this.props;
        const interestPicked = [...navigation.getParam('interestPicked')];
        this.navigateTo('Survey', { interestPicked, transition: 'fadeIn' });
      }
    }
  }

  render() {

    const { data } = this.state;

    const {
      cardStyle,
      headerTextStyle,
      scrollViewStyle,
      instructionTextStyle,
      iconViewStyle,
      iconStyle,
      downIconStyle,
      buttonStyle,
      listCardStyle,
      textStyle,
      touchableOpacityStyle,
      checkBoxHeaderTextStyle,
      buttonTextStyle,
      placeholderLoaderStyle,
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
            <View style={iconViewStyle}>
              <TouchableOpacity
                onPress={() => this.props.navigation.pop()}>
                  <Icon
                    type="AntDesign"
                    name="arrowleft"
                    style={ iconStyle }
                />
              </TouchableOpacity>
              <HeaderText
                headerStyle={headerTextStyle}
                headerText={'Refine Your \nInterests' }
              />
            </View>
            <ScrollView style={scrollViewStyle}>
              <Text style={instructionTextStyle}>
                Select atleast 1 item {'\n'}from each of your interests below
              </Text>
              {
                this.props.loading ? (
                  <View style={{ marginTop: 30 }}>
                    <PlaceholderLoader
                      numberRow={5}
                      uniqueKey={'2rows'}
                      style={placeholderLoaderStyle}
                    />
                </View>
                ) : (
                  data.map((interest, key) => {
                    const {title} = interest;
                    // console.log(key);
                    return (
                      <View
                        style={[
                          listCardStyle,
                            {
                            backgroundColor: backgroundColors[interest.id - 1],
                            },
                          ]}
                          key={key}>
                          <Text style={textStyle}>
                            {interest.title}
                          </Text>
                          <TouchableOpacity
                            style={touchableOpacityStyle}
                            onPress={() => this.onClick(key, title)}
                            >
                            <Icon
                              type="AntDesign"
                              name="down"
                              style={downIconStyle}
                            />
                          </TouchableOpacity>
                          {
                            interest[`${title}Pressed`] ? (
                              <>
                                <Text style={checkBoxHeaderTextStyle}>
                                  You are interested in?
                                </Text>

                                {this.renderSelectedInterest(title)}
                              </>
                            ) : (
                              <></>
                            )
                          }
                      </View>
                    );
                  })
                )
              }
              {
                !this.props.loading ? (
                  <Button
                    onPress={() => this.onButtonPress()}
                    style={buttonStyle}
                    >
                    {
                      !this.props.selectedInterestItemsLoading ? (
                        <Text style={buttonTextStyle}>Done</Text>
                      ) : (
                        <Spinner
                          color="#FFFFFF"
                          size="large"
                        />
                      )
                    }
                  </Button>
                ) : (
                  <></>
                )
              }
            </ScrollView>
          </Card>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.interestsReducer.loading,
  selectInterest: state.interestsReducer.data,
  selectedInterestItems: state.selectedInterestsReducer.data,
  selectedInterestItemsLoading: state.selectedInterestsReducer.loading,
  errorMessage: state.selectedInterestsReducer.errors,
  status: state.interestsReducer.status,
});

export default connect(mapStateToProps, { interests, selectedInterestItems })(Interests);

const styles = StyleSheet.create({
  cardStyle: {
    height: '100%',
    flex: 1,
    paddingTop: hp(8),
    backgroundColor: '#1B62CC',
  },
  headerTextStyle: {
    color: '#FFFFFF',
    fontSize: RFPercentage(4),
    marginBottom: hp(4),
  },
  scrollViewStyle: {
    backgroundColor: '#FFFFFA',
    paddingHorizontal: wp(3),
    paddingTop: hp(6),
  },
  instructionTextStyle: {
    textAlign: 'center',
    fontSize: RFPercentage(2.8),
    fontFamily: 'poppin',
    fontWeight: '600',
  },
  listCardStyle: {
    top: hp(5),
    elevation: 4,
    paddingHorizontal: hp(3),
    marginBottom: hp(1.3),
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: hp(1.2),
  },
  expandListStyle: {
    height: hp(10),
  },
  textStyle: {
    color: '#FFFFFF',
    top: hp(1.5),
    fontWeight: 'bold',
    fontSize: RFPercentage(3),
    marginLeft: wp(5),
  },
  touchableOpacityStyle: {
    alignSelf: 'flex-end',
    width: wp(8),
    bottom: hp(1.8),
  },
  iconViewStyle: {
    flexDirection: 'row',
  },
  iconStyle: {
    fontSize:  Dimensions.backIcon,
    color: '#FFFFFF',
    paddingRight: wp(8),
    paddingTop: wp(5),
    paddingLeft: wp(5),
  },
  downIconStyle: {
    color: '#FFFFFF',
    fontSize: RFPercentage(2.5),
  },
  checkBoxHeaderTextStyle: {
    marginVertical: hp(2),
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    color: '#FFFFFF',
    fontSize: RFPercentage(2.6),
    marginLeft: wp(5),
  },
  checkBoxViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
    marginLeft: wp(-2),
  },
  checkBoxStyle: {
    borderRadius: 5,
    borderColor: '#FFFFFF',
  },
  checkBoxTextStyle: {
    marginLeft: wp(4),
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontSize: RFPercentage(2.4),
  },
  buttonStyle: {
    width: '80%',
    marginBottom: hp(16),
    marginTop: hp(10),
  },
  buttonTextStyle: {
    height: 0,
    width: 0,
  },
  placeholderLoaderStyle: {
  height: hp(8),
  width: '100%',
  marginBottom: hp(1.3),
  },
});
