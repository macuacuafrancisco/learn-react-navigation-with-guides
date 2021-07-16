import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Install this package with `expo install expo-linking`
import * as Linking from 'expo-linking';

const navigationRef = React.createRef();
const prefix = Linking.createURL('/');

function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Deep Linking Home</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigate('Settings', { userName: 'Lucy' })}
      />
    </View>
  );
}

function Settings({ route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Settings Linking page</Text>
      <Text>Hello {route.params.userName}</Text>
      <Button title="Go to Home" onPress={() => navigate('Home')} />
    </View>
  );
}

const RootStack = createStackNavigator();

export default function App() {

  const linking = {
    prefixes: [prefix],
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Settings" component={Settings} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
