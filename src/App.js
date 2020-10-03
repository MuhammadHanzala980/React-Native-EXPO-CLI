/* eslint-disable react-native/no-inline-styles */
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import React from "react";
import { Provider } from "react-redux";
import { Root } from "native-base";
import Route from "./routes";
import Login from "./components/Login";
import store from "./store";
import { AppRegistry } from "react-native";
import { name as appName } from "./../app.json";

const App = () => {
  return (
    <Root>
      <Provider store={store}>
        <Route style={{ flex: 1 }}></Route>
      </Provider>
    </Root>
  );
};

// AppRegistry.registerComponent(appName, () => App);

// export default App;

registerRootComponent(App);

export default App;
