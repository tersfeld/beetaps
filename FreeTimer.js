import axios from "axios";

import uuidv4 from "uuid/v4";

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
  Alert
} from "react-native";

import credentials from "./auth_token";

export default class FreeTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfTaps: 0,
      doneForTheDay: true
    };

    this.getTapsToday();
  }

  static navigationOptions = {
    title: "Free session"
  };

  onTap = () => {
    this.setState({ numberOfTaps: this.state.numberOfTaps + 1 });
  };

  getTapsToday = () => {
    const endpoint = `https://www.beeminder.com/api/v1/users/${credentials.username}/goals/${credentials.goal_name}/datapoints.json?auth_token=${credentials.auth_token}`;

    const todayStamp = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");
    axios.get(`${endpoint}&count=1`).then(res => {
      const lastDatapoint = res.data[0];
      this.setState({
        doneForTheDay: lastDatapoint.daystamp === todayStamp
      });
    });
  };

  sendTaps = () => {
    if (this.state.numberOfTaps <= 0) {
      return;
    }

    const endpoint = `https://www.beeminder.com/api/v1/users/${credentials.username}/goals/${credentials.goal_name}/datapoints.json?auth_token=${credentials.auth_token}`;

    const data = {
      value: this.state.numberOfTaps,
      comment: `auto update from tap: ${this.state.numberOfTaps}`,
      requestid: uuidv4()
    };
    console.log(endpoint);
    console.log(data);
    axios
      .post(endpoint, data)
      .then(response => {
        console.log(response);
        this.setState({ numberOfTaps: 0 });
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderDoneForTheDay = () => {
    if (this.state.doneForTheDay) {
      return (
        <View style={{ width: 250, height: 50 }}>
          <Text style={styles.welcome}>You are done for the day !</Text>
        </View>
      );
    }
  };

  renderTapTool = () => {
    return (
      <View>
        {this.renderDoneForTheDay()}
        <View style={{ width: 250, height: 50 }}>
          <Text style={styles.welcome}>
            Number of taps : {this.state.numberOfTaps}
          </Text>
        </View>
        <View style={{ width: 250, height: 50 }}>
          <Button
            title="Reset"
            onPress={() => this.setState({ numberOfTaps: 0 })}
          />
        </View>
        <View style={{ width: 250, height: 50 }}>
          <Button title="Send to beeminder" onPress={this.sendTaps} />
        </View>
        <TouchableHighlight onPress={this.onTap}>
          <View
            style={{ width: 250, height: 200, backgroundColor: "steelblue" }}
          >
            <Text style={styles.welcome}>Tap here</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  render() {
    return <View style={styles.container}>{this.renderTapTool()}</View>;
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
