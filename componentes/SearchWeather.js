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
import {  Input } from '@rneui/themed'

const SearchWeather = () => {

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
    <Input 
        placeholder='Digite a Cidade' 
        style={styles.textInput}
        onChangeText = {(cidade) => setCidade(cidade)}
        />
      <FlatList 
        data={itens}
        keyExtractor={item => item.dt}
        renderItem={p => (
          <View>
          <Image
            style={{width: 50, height: 50}}
            source={{
                uri: `http://openweathermap.org/img/wn/${p.item.weather[0].icon}.png`,
            }}
          />
            <Text>{p.item.dt_txt}</Text>
            <Text>Temp Max: {p.item.main.temp_max}{`\u00B0`}</Text>
            <Text>Temp Min: {p.item.main.temp_min}{`\u00B0`}</Text>
          </View>
        )}
      />
      <Button 
        title='Buscar'
        // onPress={() => {buscar(), testeOracle(cidade)}}
        onPress={() => buscar()}/>
    </>
  )
}

export default SearchWeather

const styles = StyleSheet.create({
  textInput: {
    textAlign: 'center',
    margin: 0,
    padding: 0
}
})