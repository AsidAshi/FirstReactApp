import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, TextInput, View, Text, Alert, ScrollView, ImageBackground, Button } from 'react-native';
import { image } from './assets/constants';


export default function HomeScreen(navigation) {
    const [Employees, setEmployees] = useState([])
    const [backUp, setbackUp] = useState([])
    const [Loading, setLoading] = useState(true)
    const [searchInput, setsearchInput] = useState("")

    const fetchData = () => {
        axios({
            "method": "GET",
            "url": "https://dummy.restapiexample.com/api/v1/employees"

        }).then((Response) => {
            setbackUp(Response.data.data)
            setEmployees(Response.data.data)
            setLoading(false)

        })

    }
    useEffect(() => {

        fetchData()

    }, [])

    useEffect(() => {
        // if (searchInput.length >= 1) {
        setEmployees(searching(searchInput))
        // }
        if (searchInput.length === 0) {
            setEmployees(backUp)
        }
    }, [searchInput])

    const searching = (String) => {
        if (String === '') {
            return (backUp)
        }
        const regex = new RegExp(`${String.trim()}`, 'i');
        return Employees.filter(
            (Employees => Employees.employee_name.search(regex) >= 0
            ));
    }
    return (
        <View  >
            <ImageBackground source={image} style={styles.imageStyle}>
                <View style={styles.container}>
                    <Text style={styles.textStyle2}>Employees List</Text>

                    <TextInput style={styles.inputStyle} placeholder={"search name"} value={searchInput} onChangeText={(searchInput) => setsearchInput(searchInput)}></TextInput>
                </View>
                <View>
                    <Button onPress={() => { navigation.navigate("Home") }} title="to second appScreen"></Button>
                </View>
                <ScrollView style={styles.scrollViewStyle}>
                    {
                        !Loading ? (Employees && Employees.map((item, index) => {
                            return (
                                <View style={styles.container1} >
                                    <Text style={styles.textStyle2} >{index + 1} - {item.employee_name}</Text>
                                </View>
                            )
                        })) : (<Text style={styles.textStyle1}>Loading...</Text>)
                    }
                </ScrollView>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 5,
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
        marginBottom: 50
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
