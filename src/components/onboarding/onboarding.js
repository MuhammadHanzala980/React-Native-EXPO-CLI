import React, { Component } from "react";
import Swiper from "react-native-swiper";
import Employment from "./Employment";
import Mentorship from "./Mentorship";
import Scholarship from "./Scholarship";

export default class Onboarding extends Component {
  welcomePage = () =>
    this.props.navigation.navigate("Welcome", { transition: "fadeIn" });
  render() {
    return (
      <Swiper
        removeClippedSubviews={false}
        showsButtons={false}
        showsPagination={false}
        loop={false}
      >
        <Employment />
        <Mentorship />
        <Scholarship welcomePage={this.welcomePage} />
      </Swiper>
    );
  }
}
