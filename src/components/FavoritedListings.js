/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { Card, Input, Spinner } from "./common";
import { Icon } from "native-base";
import { listings } from "../actions/listingsAction";
import { searchAllListings } from "../actions/searchAllListingsAction";
import { RFPercentage } from "react-native-responsive-fontsize";

class FavoritedListings extends Component {
  navigateTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);

  componentDidMount = async () => {
    await this.props.listings();
    this.renderData();
  };

  state = {
    buttonPress: false,
    isFavourited: {},
    searchTerm: "",
    searchResult: {},
    listing: [],
  };

  /**
   * This function renders data. It triggers validation and and render the data on the screen
   */
  renderData = async () => {
    if (!this.state.buttonPress) {
      this.setState({
        loading: this.props.loadingListing,
        listing: this.props.data,
      });
    } else {
      this.setState({
        loading: this.props.loadingSearch,
        listing: this.props.searchData,
      });
    }
  };

  /**
   * This function gets all listing and renders the data on the screen
   */

  getAllListing = async () => {
    this.setState({
      buttonPress: false,
      searchTerm: "",
    });
    await this.props.listings();
    this.renderData();
  };

  /**
   * This function handles the onSearch event. It triggers validation and sends data to the API
   */
  onSearch = async () => {
    this.setState({
      buttonPress: true,
      loading: this.props.loadingSearch,
    });
    if (this.state.searchTerm) {
      this.setState({
        loading: this.props.loadingSearch,
      });
      const formData = {
        search_string: this.state.searchTerm,
      };
      await this.props.searchAllListings(formData);
      this.setState({
        searchResult: this.props.searchData,
      });
      this.renderData();
    }
  };

  onClick = (title) => {
    console.log("====================items===============");
    console.log(title);
    console.log("====================items===============");
  };

  render() {
    const { searchTerm, buttonPress, listing } = this.state;

    const { loadingListing, loadingSearch } = this.props;

    const Item = ({
      title,
      posted_by,
      bucket,
      tag,
      due_date,
      id,
      imageUrl,
    }) => (
      <TouchableOpacity style={styles.touchableOpacityStyle}>
        <Text style={styles.textStyle}>{bucket.name}</Text>
        <View style={styles.viewStyle}>
          <Image source={{ uri: imageUrl }} style={styles.imageStyle} />

          <View style={styles.containerStyle}>
            <View style={styles.textViewStyle}>
              <Text style={styles.searchTextStyle}>{title}</Text>
              <View style={styles.tagStyle}>
                <Text style={styles.tagTextStyle}>{tag.title}</Text>
              </View>
              <Text style={styles.searchTextNameStyle}>{posted_by.name}</Text>
              <Text style={styles.searchTextDateStyle}>
                Due Date: {new Date(due_date).toDateString()}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => this.onClick(title)}
              style={styles.iconViewStyle}
            >
              {this.state.buttonPress ? (
                <Icon
                  type='AntDesign'
                  name='heart'
                  style={styles.redHeartIconStyle}
                />
              ) : (
                <Icon
                  type='AntDesign'
                  name='hearto'
                  style={styles.redHeartIconStyle}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
      <Item
        id={item.title}
        title={item.title}
        bucket={item.bucket}
        posted_by={item.posted_by}
        due_date={item.due_date}
        imageUrl={item.imageUrl}
        tag={item.tag}
      />
    );

    const {
      cardStyle,
      topbarViewStyle,
      searchInputStyle,
      touchableOpacityIconViewStyle,
      iconStyle,
      viewBarStyle,
      touchableOpacityTextStyle,
      textBarStyle,
      activeTextBarStyle,
      noListingTextStyle,
    } = styles;

    return (
      <>
        <StatusBar
          backgroundColor='#1B62CC'
          hidden={false}
          translucent={false}
          barStyle='default'
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={topbarViewStyle}>
            <Input
              value={searchTerm}
              onChangeText={(text) =>
                this.setState({
                  searchTerm: text,
                  buttonPress: false,
                })
              }
              placeholder={"Search"}
              style={searchInputStyle}
            >
              <TouchableOpacity
                onPress={() => this.onSearch()}
                style={touchableOpacityIconViewStyle}
              >
                <Icon type='FontAwesome5' name='search' style={iconStyle} />
              </TouchableOpacity>
            </Input>

            <ScrollView
              style={viewBarStyle}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => this.getAllListing()}
                style={touchableOpacityTextStyle}
              >
                <Text style={textBarStyle}>All</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.navigateTo("EducationListings", { transition: "fadeIn" })
                }
                style={touchableOpacityTextStyle}
              >
                <Text style={textBarStyle}>Education</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.navigateTo("EmploymentListings", {
                    transition: "fadeIn",
                  })
                }
                style={touchableOpacityTextStyle}
              >
                <Text style={textBarStyle}>Employment</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={touchableOpacityTextStyle}
                onPress={() =>
                  this.navigateTo("MentorshipListings", {
                    transition: "fadeIn",
                  })
                }
              >
                <Text style={textBarStyle}>Mentorship</Text>
              </TouchableOpacity>

              <TouchableOpacity style={touchableOpacityTextStyle}>
                <Text style={[textBarStyle, activeTextBarStyle]}>
                  Favourites
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <Card style={cardStyle}>
            {loadingListing || loadingSearch ? (
              <Spinner
                color='#1B62CC'
                size='large'
                style={styles.spinnerStyle}
              />
            ) : (
              <>
                {buttonPress &&
                searchTerm &&
                this.props.searchData.length < 1 ? (
                  <Text style={noListingTextStyle}>
                    No Listing for {searchTerm}
                  </Text>
                ) : (
                  <FlatList
                    data={listing}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                  />
                )}
              </>
            )}
          </Card>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingListing: state.listingsReducer.loading,
  data: state.listingsReducer.data,
  searchData: state.searchAllListingReducer.data,
  loadingSearch: state.searchAllListingReducer.loading,
  errorMessage: state.listingsReducer.errors,
  status: state.listingsReducer.status,
});

export default connect(mapStateToProps, { listings, searchAllListings })(
  FavoritedListings
);

const styles = StyleSheet.create({
  topbarViewStyle: {
    paddingTop: hp(4),
    backgroundColor: "#FFFFFF",
    height: hp(20),
  },
  searchInputStyle: {
    width: "80%",
    backgroundColor: "#ECEEF1",
    borderRadius: 50,
    paddingHorizontal: hp(3),
    marginBottom: hp(3),
    height: hp(6),
    fontSize: RFPercentage(2.8),
    fontFamily: "Poppins",
  },
  touchableOpacityIconViewStyle: {
    position: "absolute",
    color: "#1B62CC",
    right: wp(14),
    bottom: hp(3.9),
    padding: 3,
  },
  iconStyle: {
    color: "#1B62CC",
    fontSize: RFPercentage(3),
  },
  viewBarStyle: {
    flexDirection: "row",
  },
  touchableOpacityTextStyle: {
    marginHorizontal: wp(4),
  },
  textBarStyle: {
    paddingBottom: hp(1),
    fontWeight: "bold",
  },
  activeTextBarStyle: {
    borderBottomWidth: 4,
    borderColor: "#1B62CC",
  },
  cardStyle: {
    flex: 1,
    paddingHorizontal: wp(4),
    backgroundColor: "#E5E5E5",
  },
  touchableOpacityStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: hp(1),
    height: hp(18),
    paddingHorizontal: hp(2),
    paddingVertical: hp(1),
  },
  viewStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    flexDirection: "row",
  },
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "79%",
  },
  textStyle: {
    color: "#C4C4C4",
    textAlign: "right",
    fontWeight: "bold",
  },
  imageStyle: {
    height: hp(10),
    width: wp(17),
    resizeMode: "cover",
    borderRadius: 100,
    alignSelf: "center",
  },
  textViewStyle: {
    marginLeft: wp(3),
  },
  tagStyle: {
    backgroundColor: "#47CB44",
    color: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: wp(2),
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingBottom: hp(0.5),
    height: hp(2.3),
  },
  tagTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  searchTextNameStyle: {
    color: "#326ABE",
  },
  searchTextDateStyle: {
    color: "#F69D7D",
  },
  searchTextStyle: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: RFPercentage(2.5),
  },
  redHeartIconStyle: {
    color: "#EE4B4E",
    fontSize: hp(3),
    borderColor: "#ECEEF1",
    marginTop: hp(4),
  },
  spinnerStyle: {
    marginTop: hp(-20),
  },
  noListingTextStyle: {
    textAlign: "center",
    marginTop: hp(4),
    fontSize: RFPercentage(3),
    color: "#1B62CC",
  },
});
