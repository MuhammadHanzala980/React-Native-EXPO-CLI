/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { CheckBox, Toast } from 'native-base';
import { Card, Button, Spinner } from './common';
import { surveyQuestions } from '../actions/surveyQuestionsAction';
import { survey } from '../actions/surveyAction';

const surveyResponse = [];

class Survey extends Component {

  navigateTo = (screen, params) => this.props.navigation.navigate(screen, params);

  componentDidMount = async () => {
    let user_interest_catrgory_ids = '';

    const { navigation } = this.props;

    const interestPicked = navigation.getParam('interestPicked');

    interestPicked.map(id => {
      user_interest_catrgory_ids = id.id;
      return id;
    });

    await this.props.surveyQuestions(user_interest_catrgory_ids);
  }

  state = {
    name: '',
    grade: '',
    selected: false,
    buttonPress: false,
    borderColor: '#FAC2C3',
    borderWidth: 0,
    isChecked: {},
    isAllQuestionSectionCheked: false,
  }

  /**
   * This function manages check toggle and push selected check value into a constant
  */
  manageCheckToggle = (index, surveyData, chosen_option) => {
    this.setState(state => {
      const isChecked = {...state.isChecked};
      isChecked[`${index + chosen_option}`] = !isChecked[`${index + chosen_option}`];
      if (surveyResponse.some(surveyOption => surveyOption.chosen_option === chosen_option)){
        const indexOfChosenOption = surveyResponse.indexOf(surveyData.chosen_option);
        console.log(indexOfChosenOption);
        surveyResponse.splice(indexOfChosenOption, 1);
      } else {
        surveyResponse.push({
          'chosen_option': chosen_option,
          'survey_question_id': surveyData.survey_id,
        });
      }
      return { isChecked };
    });
  }

  /**
   * This function manages all question section checked
  */

  // allQuestionSectionChecked = (index) => {
  //   if (questionSectionChecked !== index) {
  //     this.setState({
  //       isAllQuestionSectionCheked: false,
  //     });
  //   }
  //   else {
  //     this.setState({
  //       isAllQuestionSectionCheked: true,
  //     });
  //   }
  // }

  /**
   * This function triggers validation and sends data to the API
  */
  handleValidation = async () => {
    if (surveyResponse.length === 0) {
      Toast.show({
        useNativeDriver: true,
        text: 'Please select at least on answer from each question',
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
      await this.props.survey(surveyResponse);
      this.navigateTo('SurveyCompleted', {transition: 'fadeIn'});
    }
  }


  render() {
    const {
      cardStyle,
      buttonStyle,
      headerTextStyle,
      checkBoxHeaderTextStyle,
      containerCheckBoxViewStyle,
      checkBoxViewStyle,
      checkBoxTextStyle,
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
            <Text style={headerTextStyle}>
              Hello! Here is a quick survey for you, this will help us serve you best.
            </Text>

            {
              this.props.loading ? (
                <Spinner
                  color="#1B62CC"
                  size="large"
                  style={styles.spinnerStyle}
                />
              ) : (
                this.props.data && this.props.data.length > 0 ? this.props.data[0].questions.map((surveyData, index) => {
                  const { question, option_a, option_b, option_c, option_d } = surveyData;
                  // console.log('========================');
                  // console.log(index);
                  // console.log(this.state.isChecked);
                  // console.log('========================');
                  return (
                    <View key={index}>
                      <Text style={checkBoxHeaderTextStyle}>
                        {question}?
                      </Text>

                      <View style={containerCheckBoxViewStyle}>
                        <View
                          style={checkBoxViewStyle}>
                          <CheckBox
                            color="#1B62CC"
                            checked={this.state.isChecked[`${index + option_a}`]}
                            onPress={() =>
                              this.manageCheckToggle(index, surveyData, option_a)
                            }
                          />
                          <Text style={checkBoxTextStyle}>
                            {option_a}
                          </Text>
                        </View>

                        <View
                          style={checkBoxViewStyle}>
                          <CheckBox
                            color="#1B62CC"
                            checked={this.state.isChecked[`${index + option_b}`]}
                            onPress={() =>
                              this.manageCheckToggle(index, surveyData, option_b)
                            }
                          />
                          <Text style={checkBoxTextStyle}>
                            {option_b}
                          </Text>
                        </View>

                        <View style={checkBoxViewStyle}>
                          <CheckBox
                            color="#1B62CC"
                            checked={this.state.isChecked[`${index + option_c}`]}
                            onPress={() =>
                              this.manageCheckToggle(index, surveyData, option_c)
                            }
                          />
                          <Text style={checkBoxTextStyle}>
                            {option_c}
                          </Text>
                        </View>

                        <View style={checkBoxViewStyle}>
                          <CheckBox
                            color="#1B62CC"
                            checked={this.state.isChecked[`${index + option_d}`]}
                            onPress={() =>
                              this.manageCheckToggle(index, surveyData, option_d)
                            }
                          />
                          <Text style={checkBoxTextStyle}>
                            {option_d}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }) : <></>
              )
            }
          </KeyboardAwareScrollView>
          {
            !this.props.loading ? (
              <Button
                onPress={() => this.handleValidation()}
                style={buttonStyle}
                >
                {
                  !this.props.loadingSurvey ? (
                    <Text>Submit</Text>
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
        </Card>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.surveyQuestionsReducer.loading,
  loadingSurvey: state.surveyReducer.loading,
  data: state.surveyQuestionsReducer.data,
  surveyQuestionData: state.surveyQuestionsReducer.data,
  errorMessage: state.interestsReducer.errors,
  status: state.interestsReducer.status,
});

export default connect(mapStateToProps, { surveyQuestions, survey })(Survey);

const styles = StyleSheet.create({
  cardStyle: {
    height: '100%',
    paddingHorizontal: wp(10),
    paddingTop: wp(12),
    // paddingBottom: wp(4),
    backgroundColor: '#FFFFFF',
  },
  headerTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFPercentage(2.7),
    fontWeight: 'bold',
    marginBottom: hp(4),
  },
  checkBoxHeaderTextStyle: {
    textAlign: 'center',
    marginVertical: hp(3),
    fontWeight: 'bold',
  },
  containerCheckBoxViewStyle: {
    backgroundColor: '#F1F1F1',
    padding: hp(2),
  },
  checkBoxViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  checkBoxStyle: {
    color: '#ECEEF1',
    backgroundColor: '#ECEEF1',
  },
  checkBoxTextStyle: {
    marginLeft: wp(4),
  },
  errorTextStyle: {
    color: '#EE3265',
    textAlign: 'center',
    marginTop: hp(2),
    fontSize: RFPercentage(2.5),
    marginBottom: hp(0),
  },
  buttonStyle: {
    // marginTop: hp(3),
  },
  spinnerStyle: {
    height: hp(6),
    width: wp(5),
  },
});
