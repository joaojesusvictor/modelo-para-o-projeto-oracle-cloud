import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View 
} from 'react-native'
import React, { useState } from 'react'
import { obterPrevisoes } from '../service/WeatherMapService'

const SearchWeather = () => {

  const [itens, setItens] = useState([])

  const buscar = () => {
    const cidade = "Itu"
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
      <FlatList 
        data={itens}
        keyExtractor={item => item.dt}
        renderItem={p => (
          <View>
            <Text>Temp Max: {p.item.main.temp_max}{`\u00B0`}</Text>
            <Image
              style={{width: 50, height: 50}}
              source={{
                  uri: `http://openweathermap.org/img/wn/${p.item.weather[0].icon}.png`,
              }}
            />
          </View>
        )}
      />
      <Button 
        title='Buscar'
        onPress={() => buscar()}/>
    </>
  )
}

export default SearchWeather

const styles = StyleSheet.create({})