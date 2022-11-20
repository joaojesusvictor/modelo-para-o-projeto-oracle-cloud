import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Historico from '../components/Historico'

const HistoricoTela = () => {
  return (
    <View>
    <Historico navigation={navigation}/>
    </View>
  )
}

export default HistoricoTela

const styles = StyleSheet.create({})