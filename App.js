import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, TextInput, View, Text, Alert } from 'react-native';


//const Array =[{name:"asid",id:12},{name:'asm',id:54},{name:'jhon',id:65},{name:'ram',id:56}]

export default function App() {
  const [Name, setName] = useState([])
  const [bData, setbData] = useState([])
  const [Loading, setLoading] = useState(true)
  const [text, settext] = useState("")

  const fetchData = () => {
    axios({
      "method": "GET",
      "url": "https://dummy.restapiexample.com/api/v1/employees"

    }).then((Response) => {
      setName(Response.data.data)
      setbData(Response.data.data)
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
      setName(bData)
    }
  }, [text])

  const searching = (String) => {
    if (String === '') {
      return (Response.data)
    }
    const regex = new RegExp(`${String.trim()}`, 'i');
    return Name.filter(
      (Name => Name.employee_name.search(regex) >= 0
      ));

  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: 'black', fontSize: 20 }}>Employees List</Text>

        <TextInput style={styles.inputStyle} placeholder={"search name"} value={text} onChangeText={(text) => settext(text)}></TextInput>
      </View>
      <View style={{ backgroundColor: 'grey', width: 350, alignItems: 'center'  }}>
        {
          !Loading ? (Name && Name.map((item) => {
            return (
              <Text style={{ fontSize: 20, fontVariant: 'black'}}>{item.employee_name}</Text>
            )
          })) : (<Text style={{ color: 'red' }}>Loading...</Text>)
        }
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    paddingStart: 20,
    paddingTop: 60,
    
  },
  inputStyle: {
    
    height: 30,
    borderColor: 'green',
    borderWidth: 2,
    width: 200,
    paddingLeft: 20,
    alignContent: 'center',
    alignItems: 'center'

  }
});
