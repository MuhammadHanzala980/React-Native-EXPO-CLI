import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { LIGHT_TEXT_COLOR, WHITE_COLOR } from "../themes/colors";
import { MEDIUM, SMALL } from "../themes/fonts";

export default class EducationListingComponent extends Component {
  render() {
    const {
      imageSrc,
      headingText,
      text1,
      text2,
      iconSrc,
      showTag,
      txt1Color,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.flexStyle}>
          <Image style={{ height: 60, width: 60 }} source={imageSrc} />
        </View>
        <View
          style={[
            styles.flexStyle,
            { alignItems: "flex-start", flex: 2.5, marginTop: 12 },
          ]}
        >
          <Text style={{ fontSize: MEDIUM, fontWeight: "bold" }}>
            {headingText}
          </Text>
          {showTag ? (
            <View style={styles.tagStyle}>
              <Text style={{ fontSize: SMALL, color: "white" }}>
                Scholarship
              </Text>
            </View>
          ) : (
            false
          )}

          <Text
            style={{
              fontSize: SMALL,
              color: txt1Color ? txt1Color : "#9BBEF6",
            }}
          >
            {text1}
          </Text>
          <Text style={{ fontSize: SMALL, color: "orange" }}>{text2}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.flexStyle}>
            <Text
              style={{
                fontSize: SMALL,
                color: LIGHT_TEXT_COLOR,
                paddingBottom: 8,
              }}
            >
              Education
            </Text>
          </View>
          <View style={styles.flexStyle}>
            <Text style={{ fontSize: SMALL, fontWeight: "bold" }}>$500/mo</Text>
            <View style={styles.lineStyle} />
          </View>
        </View>
        <View style={[styles.flexStyle, { flex: 0.5 }]}>
          <Image style={{ height: 20, width: 20 }} source={iconSrc} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: "95%",
    alignSelf: "center",
    backgroundColor: WHITE_COLOR,
    flexDirection: "row",
    borderRadius: 5,
    marginTop: 6,
  },
  flexStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
  lineStyle: {
    height: 8,
    width: 50,
    backgroundColor: "orange",
    borderRadius: 10,
    marginTop: 4,
    marginRight: 5,
  },
  tagStyle: {
    height: 25,
    width: 90,
    backgroundColor: "#47CB44",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 2,
  },
});
