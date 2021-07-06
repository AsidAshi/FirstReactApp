import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, TextInput, View, Text, Alert, ScrollView,ImageBackground } from 'react-native';
import { image} from './assets/constants';



export default function App() {
  const [Name, setName] = useState([])
  const [backUp, setbackUp] = useState([])
  const [Loading, setLoading] = useState(true)
  const [text, settext] = useState("")

  const fetchData = () => {
    axios({
      "method": "GET",
      "url": "https://dummy.restapiexample.com/api/v1/employees"

    }).then((Response) => {
      setbackUp(Response.data.data)
      setName(Response.data.data)
      setLoading(false)

    })

  }
  useEffect(() => {

    fetchData()

  }, [])

  useEffect(() => {
    if (text.length >= 3) {
      setName(searching(text))
    }
    if (text.length === 0) {
      setName(backUp)
    }
  }, [text])

  const searching = (String) => {
    if (String === '') {
      return (backUp)
    }
    const regex = new RegExp(`${String.trim()}`, 'i');
    return Name.filter(
      (Name => Name.employee_name.search(regex) >= 0
      ));
  }
  return (
    <View >
      <ImageBackground source={image} style={styles.imageStyle}>
      <View style={styles.container}>
        <Text style={styles.textStyle2}>Employees List</Text>

        <TextInput style={styles.inputStyle} placeholder={"search name"} value={text} onChangeText={(text) => settext(text)}></TextInput>
      </View>

      <ScrollView style={styles.scrollViewStyle}>
        {
          !Loading ? (Name && Name.map((item) => {
            return (
              <View style={styles.container1}>
                <Text style={styles.textStyle2} >{item.employee_name}</Text>
              </View>
            )
          })) : (<Text style={styles.textStyle1}>Loading...</Text>)
        }

      </ScrollView>
      <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     flexDirection: 'row',
      marginTop:50
  },
  container1: {
    backgroundColor: '#bababa',
    marginBottom: 2,
    width: 350,
    height: 50,
    alignItems: 'center',
    alignContent: 'center'

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
    { marginTop: 20,
      marginLeft:20
    },

  textStyle: {
    fontSize: 20,
    color: "#fff"

  },
  textStyle1: {
    color: 'red'
  },
  textStyle2: {
    marginLeft:10,
    color: 'black',
    fontSize: 20
  },
  imageStyle:{
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});
