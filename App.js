import FreeTimer from "./FreeTimer";
import HomeScreen from "./HomeScreen";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  FreeTimer: { screen: FreeTimer }
});

const App = createAppContainer(MainNavigator);

export default App;
