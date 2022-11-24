import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar
} from 'react-native'
import {
  Button,
  Card,
  Input
} from '@rneui/themed-edge'
import React, { useState } from 'react'
import { obterPrevisoes } from '../service/WeatherMapService'
import { ListItem, Avatar } from '@rneui/themed'

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
              <ListItem bottomDivider>
                <Avatar title="Icone" source={{ uri: `http://openweathermap.org/img/wn/${p.item.weather[0].icon}.png` }} />

                <ListItem.Content style={{ left: '40%' }}>
                  <ListItem.Title style={{ color: 'red' }}>
                    {p.item.dt_txt}
                  </ListItem.Title>
                  <ListItem.Subtitle>Temp Max: {p.item.main.temp_max}{`\u00B0`}</ListItem.Subtitle>
                </ListItem.Content>

                <ListItem.Content right>
                  <ListItem.Subtitle right>Temp Min: {p.item.main.temp_min}{`\u00B0`}</ListItem.Subtitle>
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
    margin: 0,
    padding: 0
  },
  card: {
    marginBottom: 8
  },
  tela: {
    flexDirection: 'row'
  },
  imagem: {
    width: 50,
    height: 50
  },
  primeiraLinha: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  segundaLinha: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#DDD'
  },
  valor: {
    marginHorizontal: 2
  },
  button: {
    backgroundColor: "#00bfff",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 100,
    width: "90%",
    alignSelf: 'center',
    marginLeft: 10
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '97%',
  }
})