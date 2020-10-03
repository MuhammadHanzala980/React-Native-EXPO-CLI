/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, Share } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { Card, Button, BackwardArrow } from './common';
import { Icon } from 'native-base';

class ListingDetails extends Component {
  navigateTo = (screen, params) => this.props.navigation.navigate(screen, params);

  state = {
    readMorePress: false,
  }

  onShare = async () => {
    try {
      await Share.share({
        message:
          'I will update this message with URL to be shared after it has been provided by the API',
      });

      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      console.error(error.message);
    }
  };

  render() {

    const { navigation } = this.props;
    const listingDetails = navigation.getParam('listingDetails');

    const textLength = 350;

    const { readMorePress } = this.state;

    const {
      cardStyle,
      listingImageStyle,
      listingContainerViewStyle,
      listingTitleViewStyle,
      listingTitleTextStyle,
      iconViewStyle,
      iconStyle,
      tagViewStyle,
      tagTextStyle,
      postByNameTextStyle,
      dueDateTextStyle,
      lstingDescriptionViewStyle,
      lstingDescriptionHeaderTextStyle,
      lstingDescriptionTextStyle,
      readMoreTextStyle,
      lstingDescriptionReadMoreTextStyle,
      buttonViewStyle,
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
          <>
            <BackwardArrow
              onPress={() => this.props.navigation.pop()}
            />
          </>
          <ScrollView>
            <View>
              <View style={listingContainerViewStyle}>
                <Image
                  source={{uri: listingDetails.imageUrl}}
                  style={listingImageStyle}
                />
              </View>

              <View style={listingContainerViewStyle}>
                <View>
                  <View style={listingTitleViewStyle}>
                    <Text style={listingTitleTextStyle}>
                      {listingDetails.title}
                    </Text>
                    <View style={iconViewStyle}>
                      <TouchableOpacity
                        onPress={this.onShare}
                        >
                        <Icon
                          type="Entypo"
                          name="share"
                          style={iconStyle}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity>
                        <Icon
                          type="FontAwesome"
                          name="bookmark"
                          style={iconStyle}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity>
                        <Icon
                          type="AntDesign"
                          name="hearto"
                          style={iconStyle}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={tagViewStyle}>
                  <Text style={tagTextStyle}>{listingDetails.tag}</Text>
                </View>
                <Text style={postByNameTextStyle}>{listingDetails.name}</Text>
                <Text style={dueDateTextStyle}>{listingDetails.date}</Text>
              </View>

              <View style={lstingDescriptionViewStyle}>
                <Text style={lstingDescriptionHeaderTextStyle}>Description</Text>
                {
                  !readMorePress ? (
                    <View style={lstingDescriptionReadMoreTextStyle}>
                      <Text
                        style={lstingDescriptionTextStyle}>
                        {
                          listingDetails.description.length <= textLength ? listingDetails.description : listingDetails.description.substring(0, textLength - 1)
                        }
                      </Text>
                      {
                        listingDetails.description.length >= textLength ? (
                          <TouchableOpacity
                            onPress={() => this.setState({
                              readMorePress: true,
                            })}
                          >
                            <Text style={readMoreTextStyle}>Read more</Text>
                          </TouchableOpacity>
                        ) : (
                          <></>
                        )
                      }
                    </View>
                  ) : (
                    <>
                      <Text style={lstingDescriptionTextStyle}>
                        {
                          listingDetails.description
                        }
                      </Text>
                      <TouchableOpacity
                         onPress={() => this.setState({
                          readMorePress: false,
                        })}
                      >
                        <Text style={readMoreTextStyle}>Read less</Text>
                      </TouchableOpacity>
                    </>
                  )
                }
              </View>

              <View style={buttonViewStyle}>
                <Button
                  style={styles.buttonStyle}
                  >
                  Select
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

export default connect(mapStateToProps, {})(ListingDetails);


const styles = StyleSheet.create({
  cardStyle: {
    height: hp('100%'),
    backgroundColor: '#FFFFFF',
  },
  listingImageStyle: {
    height: hp('30%'),
    width: wp('96%'),
    borderRadius: 15,
    alignSelf: 'center',
  },
  listingContainerViewStyle: {
    paddingHorizontal: wp('3%'),
  },
  listingTitleViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  listingTitleTextStyle: {
    fontFamily: 'Poppins',
    fontSize: RFPercentage(2.6),
    color: '#000000',
    fontWeight: 'bold',
  },
  iconViewStyle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    elevation: 10,
    borderRadius: 10,
    padding: wp('1.5%'),
  },
  iconStyle: {
    color: '#C4C4C4',
    fontSize: RFPercentage(3),
    marginRight: wp('2.5%'),
    marginLeft: wp('2.5%'),
  },
  tagViewStyle: {
    backgroundColor: '#47CB44',
    color: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: wp('2%'),
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('0.6%'),
  },
  tagTextStyle: {
    color: '#FFFFFF',
    fontSize: RFPercentage(2),
  },
  postByNameTextStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
    marginTop: 2,
  },
  dueDateTextStyle: {
    color: '#F69D7D',
    marginTop: 2,
    fontSize: RFPercentage(2.1),
  },
  lstingDescriptionViewStyle: {
    backgroundColor: '#ECF2F9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2%'),
    marginTop: 15,
  },
  lstingDescriptionHeaderTextStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
  },
  lstingDescriptionTextStyle: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontSize: RFPercentage(2),
  },
  lstingDescriptionReadMoreTextStyle: {
    height: hp('20%'),
  },
  readMoreTextStyle: {
    color: '#1B62CC',
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  buttonViewStyle: {
    backgroundColor: '#ECF2F9',
    paddingHorizontal: wp('3%'),
  },
  buttonStyle: {
    marginBottom: hp(2),
  },
});
