import { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import CountryEntity from "../entity/country-entity";
import { Image } from "expo-image"
import { StyleSheet } from "react-native";


export default function HomePage() {


    const [countries, setCountries] = useState<CountryEntity[]>([])

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
        };
        let countryList: CountryEntity[] = [];



        fetch("https://restcountries.com/v3.1/all", requestOptions)
            .then(response => response.json())
            .then(result => {
                result.map(item => {
                    countryList.push({
                        id: item.name.common,
                        flagUrl: item.flags.svg,
                        name: item.name.common,
                        ptName: item.tranlations.common,
                        population: item.population,
                        
                    });
                })
            })


            .catch(error => console.log('error', error));

        setCountries(countryList)
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Paises</Text>
            <View style={styles.card}>
                <Image style={styles.flag} source={{ uri: '' }}></Image>
            </View>
            <FlatList
                renderItem={({item}) => 
                    <View>
                        <Text style={{ fontSize: 20 }}>{item.name} </Text>
                        <Text style={{ fontSize: 20 }}> {item.ptName}</Text>
                        <Text style={{ fontSize: 20 }}> {item.population} </Text>
                    </View>
                }

                data={countries}
                keyExtractor={item => item.id}>

            </FlatList>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#black',
    },
    title: {
        fontSize: 20,
        margin: 10,
        color: '#333333',
        fontWeight: '600'
    },
    card: {
        aspectRatio: 2.2,
        backgroundColor: "white",
        elevation: 15,
        shadowColor: "red",
        margin: 20,
        padding: 0,
        
        
    },
    flag: {
        width: 70,
        height: 70,
        margin: 10,

    },
})
