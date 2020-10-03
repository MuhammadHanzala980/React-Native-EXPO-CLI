/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  Text,
  BackHandler,
  ToastAndroid,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { Icon, Toast } from "native-base";
import { HeaderText, Card, Button, PlaceholderLoader } from "./common";
import { interestCategories } from "../actions/interestCategoriesAction";
import Business from "../assets/images/pick-interest-business.png";
import Technology from "../assets/images/pick-interest-technology.png";
import Engineering from "../assets/images/pick-interest-engineering.png";
import Art from "../assets/images/pick-interest-art.png";
import Politics from "../assets/images/pick-interest-politics.png";
import Science from "../assets/images/pick-interest-science.png";
import Entertainment from "../assets/images/pick-interest-entertainment.png";
import Sports from "../assets/images/pick-interest-sport.png";
import Law from "../assets/images/pick-interest-law.png";
import TradeSkills from "../assets/images/pick-interest-trade-skills.png";

const images = [
  Business,
  Technology,
  Engineering,
  Art,
  Politics,
  Science,
  Entertainment,
  Sports,
  Law,
  TradeSkills,
];

const pickedInterestCategory = [];

class InterestCategories extends Component {
  navigateTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);

  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    await this.props.interestCategories();
    this.renderInterestCategories();
  };

  // componentWillUnmount = () => {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  };

  state = {
    data: [],
    selectedCategory: new Set(),
    buttonPress: false,
    isSelected: false,
    showToast: false,
    interestCategoriesSelected: {},
    backClickCount: 0,
  };

  handleBackButton = () => {
    if (this.props.navigation.isFocused()) {
      // The screen is focused, so return `true` to prevent react-navigation from handling it
      this.state.backClickCount === 1
        ? BackHandler.exitApp()
        : this.showToastWithGravityAndOffset();

      return true;
    } else {
      // The screen is not focused, so don't do anything
      return false;
    }
  };

  showToastWithGravityAndOffset = () => {
    this.setState({ backClickCount: 1 }, () => {
      ToastAndroid.showWithGravityAndOffset(
        "press back again to exit the app",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    });
  };

  onCategoryClick = async (key, title) => {
    const newState = this.state.data;
    const itemInArray = newState[key];
    const isSelected = itemInArray[`${title}Selected`];
    newState[key] = { ...newState[key], [`${title}Selected`]: !isSelected };
    this.setState(() => ({ data: newState }));

    if (!isSelected) {
      pickedInterestCategory.push({ id: newState[key].id, title: title });
    } else {
      if (pickedInterestCategory.some((category) => category.title === title)) {
        const indexOfPickedInterestaCategory = pickedInterestCategory.findIndex(
          (category) => category.title === title
        );
        pickedInterestCategory.splice(indexOfPickedInterestaCategory, 1);
      }
    }

    await this.setState({
      interestCategoriesSelected: pickedInterestCategory,
    });
  };

  renderInterestCategories = () => {
    const selectedCategory = this.props.data.map((value) => {
      return { ...value, [`${value.title}Selected`]: false };
    });
    if (this.props.data.length !== 0) {
      return this.setState({
        data: selectedCategory,
      });
    } else {
      return this.state.data;
    }
  };

  onButtonPress = () => {
    if (
      this.state.interestCategoriesSelected.length === undefined ||
      this.state.interestCategoriesSelected.length < 3
    ) {
      Toast.show({
        useNativeDriver: true,
        text: "Select at least 3 skills of interest",
        position: "top",
        type: "danger",
        duration: 3000,
        textStyle: {
          textAlign: "center",
        },
        style: {
          width: wp(90),
          alignSelf: "center",
          justifyContent: "center",
          borderRadius: 5,
        },
      });
    } else {
      this.navigateTo("Interests", {
        interestPicked: new Set(this.state.interestCategoriesSelected),
        transition: "fadeIn",
      });
    }
  };

  render() {
    const { data } = this.state;

    const {
      scrollViewStyle,
      cardStyle,
      headerTextStyle,
      headerSubTextStyle,
      imageViewStyle,
      imageStyle,
      imageTextstyle,
      buttonStyle,
      touchableOpacityStyle,
      overlayStyle,
      iconStyle,
    } = styles;
    return (
      <>
        <StatusBar
          backgroundColor="#1B62CC"
          hidden={false}
          translucent={false}
          barStyle="default"
        />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={scrollViewStyle}>
            <Card style={cardStyle}>
              <HeaderText
                headerStyle={headerTextStyle}
                headerSubStyle={headerSubTextStyle}
                headerText={"Pick Your \nInterest"}
                headerSubText={
                  "Select atleast 3 skills of interest \nand continue to the next phase"
                }
              />
              {this.props.loading ? (
                <View style={styles.imageViewStyle}>
                  <PlaceholderLoader
                    numberRow={10}
                    uniqueKey={"10rows"}
                    style={styles.touchableOpacityStyle}
                  />
                  <PlaceholderLoader
                    numberRow={10}
                    uniqueKey={"10rows"}
                    style={styles.touchableOpacityStyle}
                  />
                </View>
              ) : (
                <>
                  {
                    <View style={imageViewStyle}>
                      {data.map((category, key) => {
                        const { title, id } = category;
                        return (
                          <TouchableOpacity
                            key={id}
                            onPress={() => this.onCategoryClick(key, title)}
                            style={touchableOpacityStyle}
                          >
                            <Image
                              source={images[category.id - 1]}
                              style={imageStyle}
                            />
                            <Text style={imageTextstyle}>{category.title}</Text>
                            {category[`${title}Selected`] ? (
                              <View style={overlayStyle}>
                                <Icon
                                  type="AntDesign"
                                  name="checkcircle"
                                  style={iconStyle}
                                />
                              </View>
                            ) : (
                              <></>
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  }

                  <Button
                    onPress={() => this.onButtonPress()}
                    style={buttonStyle}
                  >
                    Next
                  </Button>
                </>
              )}
            </Card>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.interestCategoriesReducer.loading,
  data: state.interestCategoriesReducer.data,
  errorMessage: state.interestCategoriesReducer.errors,
  status: state.interestCategoriesReducer.status,
});

export default connect(mapStateToProps, { interestCategories })(
  InterestCategories
);

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: "#FFFFFF",
  },
  cardStyle: {
    paddingHorizontal: wp(10),
    paddingTop: wp(12),
    paddingBottom: wp(12),
  },
  headerTextStyle: {
    color: "#000000",
    fontSize: RFPercentage(4.8),
  },
  headerSubTextStyle: {
    color: "#000000",
    marginBottom: hp(3),
  },
  imageViewStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  touchableOpacityStyle: {
    backgroundColor: "#7E57C2",
    borderRadius: 20,
    width: wp(39),
    height: hp(40),
    marginBottom: hp(1.5),
  },
  imageStyle: {
    resizeMode: "cover",
    width: wp(39),
    borderRadius: 20,
    height: hp(40),
  },
  imageTextstyle: {
    bottom: hp(8),
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: RFPercentage(2.8),
  },
  buttonStyle: {
    marginTop: hp(6),
  },
  overlayStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(11, 11, 155, 0.5)",
    justifyContent: "center",
    borderRadius: 20,
  },
  iconStyle: {
    fontSize: RFPercentage(10),
    color: "#FFFFFF",
    alignSelf: "center",
  },
  spinnerStyle: {
    marginTop: hp(-16),
  },
});
