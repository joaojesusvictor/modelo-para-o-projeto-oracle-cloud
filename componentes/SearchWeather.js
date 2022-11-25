import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native'
import {
  Button,
  Card,
  Input,
} from '@rneui/base'
import React, { useState } from 'react'
import { obterPrevisoes } from '../service/WeatherMapService'
import { ListItem, Avatar } from '@rneui/themed'
import { format } from 'date-fns'

import * as oracleCloudService from '../service/OracleCloudService'

const testeOracle = (cidade, url) => {

  const promise = oracleCloudService.armazenarNoHistorico({
    cidade: cidade,
    data: new Date(),
    link: url
  })

  promise
    .then(res => {
      console.log(res)
    })
    .catch(erro => {
      console.log('erro: ', erro)
    })

  console.log("estamos livres para fazer outras coisas...")

}

const SearchWeather = ({ navigation }) => {

  const [itens, setItens] = useState([])
  const [cidade, setCidade] = useState('')

  const buscar = () => {
    obterPrevisoes(cidade)
      .then(res => {
        console.log(res)
        setItens(itens => {
          console.log(res.data.list)
          return res.data.list
        })
      })
      .catch(erro => {
        console.log('erro', erro)
        Alert.alert('Cidade não encontrada! Por favor, pesquise outra.')
      })
  }
  return (
    <>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Digite a cidade'
          style={styles.textInput}
          onChangeText={(cidade) => setCidade(cidade)}
        />
        <Button
          title='Buscar'
          buttonStyle={styles.button}
          onPress={() => buscar()}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={itens}
          keyExtractor={item => item.dt}
          renderItem={p => (
            <View style={styles.item}>
              <ListItem style={styles.ListItem}>
                <Avatar title="Icone" source={{ uri: `http://openweathermap.org/img/wn/${p.item.weather[0].icon}.png` }} />
                <ListItem.Content center>
                  <ListItem.Subtitle center>{format(new Date(p.item.dt_txt), 'dd/MM/yyyy HH:mm')}</ListItem.Subtitle>
                </ListItem.Content>

                <ListItem.Content right>
                  <ListItem.Subtitle right>Max: {p.item.main.temp_max}{`\u00B0`}</ListItem.Subtitle>
                </ListItem.Content>

                <ListItem.Content right>
                  <ListItem.Subtitle right>Min: {p.item.main.temp_min}{`\u00B0`}</ListItem.Subtitle>
                </ListItem.Content>

                {testeOracle(cidade, `http://openweathermap.org/img/wn/${p.item.weather[0].icon}.png`)}
              </ListItem>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  )
}

export default SearchWeather

const styles = StyleSheet.create({
  textInput: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: "#00bfff",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 100,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f7794d',
    padding: 8,
    borderRadius: 15,
    marginVertical: 15,
    marginHorizontal: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    margin: 'auto'
  }
})