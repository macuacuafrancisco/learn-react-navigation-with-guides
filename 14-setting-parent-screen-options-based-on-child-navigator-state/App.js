import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Feed':
      return 'News feed';
    case 'Profile':
      return 'My profile';
    case 'Account':
      return 'My account';
  }
}

function A() {
  return <View />;
}

function B() {
  return <View />;
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="A"
        component={A}
        options={{ tabBarLabel: 'Home!' }}
      />
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen({ navigation, route }) {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="B"
        component={B}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
    </SettingsStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} /**options={{tabBarLabel: 'Home App'}}**/ />
        <Tab.Screen name="Settings" component={SettingsStackScreen} options={{tabBarLabel: 'Settings App'}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
