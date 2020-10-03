import React from "react";
import { View } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

const PlaceholderLoader = ({ numberRow, uniqueKey, style }) => {
  const loadingAnimated = [];
  let shimmerRows = [];
  for (let index = 0; index < numberRow; index++) {
    shimmerRows.push(
      <ShimmerPlaceHolder
        key={`loading-${index}-${uniqueKey}`}
        ref={(ref) => loadingAnimated.push(ref)}
        autoRun={true}
        colorShimmer={["#ebebeb", "#c5c5c5", "#ebebeb"]}
        // loadingAnimated={loadingAnimated}
        numberRow={numberRow}
        uniqueKey={uniqueKey}
        style={style}
      />
    );
  }
  return <View>{shimmerRows}</View>;
};

export { PlaceholderLoader };
