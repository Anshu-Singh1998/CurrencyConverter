// App.js
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import Dashboard from './src/screens/Dashboard';
import Conversion from './src/screens/Conversion';
import store from './src/store/store'; // Adjust the path as necessary

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerTitleAlign: 'center',
              headerStyle: {backgroundColor: '#4a2669'},
              headerTintColor: '#ffffff',
            }}
          />
          <Stack.Screen
            name="Conversion"
            component={Conversion}
            options={{
              headerTitleAlign: 'center',
              headerStyle: {backgroundColor: '#4a2669'},
              headerTintColor: '#ffffff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
