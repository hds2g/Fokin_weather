import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "4991858d63d58ef1017e0a314f0d760a";

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    //console.log(data.main.temp);

    this.setState({ isLoading: false, temp: data.main.temp });
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      console.log(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't fund you.");
      console.log(error);
    }
  };

  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp } = this.state;
    //console.log(Math.round(temp));
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
  }
}
