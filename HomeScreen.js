import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendTaps = () => {
    console.log("tap");
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={{ width: 125, height: 150, margin: 10 }}>
          <Button
            title="Free session"
            onPress={() => navigate("FreeTimer", {})}
          />
        </View>
        <View style={{ width: 125, height: 150, margin: 10 }}>
          <Button
            title="Sets"
            // onPress={() => navigate("Sets", { })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
