import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, TextInput, View, Text, Alert, ScrollView, ImageBackground, Button } from 'react-native';
import HomeScreen from "./HomeScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
      name="Homescreen"
      component={HomeScreen}
  
    />
    {/* <Stack.Screen
      name="Home"
      component={Mystack}
      options={{ title: 'My profile' }}
    /> */}
  </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 50,
    backgroundColor: '#bababa',
    height: 50,
    alignItems: 'center',
    alignContent: 'center',
    width: 350
  },
  container1: {

    backgroundColor: '#abdaca',
    marginBottom: 2,
    width: 350,
    height: 50,

  },
  inputStyle: {

    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    paddingLeft: 20,
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 20
  },
  scrollViewStyle:
  {
    marginTop: 20,
    marginLeft: 20,
    marginBottom:50
  },

  textStyle: {
    fontSize: 20,
    color: "#fff"

  },
  textStyle1: {
    color: 'red'
  },
  textStyle2: {
    marginLeft: 10,
    color: 'black',
    fontSize: 20
  },
  imageStyle: {
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});
