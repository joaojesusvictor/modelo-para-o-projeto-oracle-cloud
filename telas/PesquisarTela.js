import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchWeather from '../components/SearchWeather'

const PesquisarTela = ({navigation}) => {
  return (
    <View>
      <SearchWeather navigation={navigation}/>
    </View>
  )
}

export default PesquisarTela

const styles = StyleSheet.create({})