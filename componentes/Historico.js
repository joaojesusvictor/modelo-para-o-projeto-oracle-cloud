import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import { obterHistorico } from '../service/OracleCloudService'

const Historico = ({navigation}) => {
  const [itens, setItens] = useState([])
  useEffect(() => {
    const vai = async () => {
      const resultado = (await obterHistorico()).data.items
      setItens(resultado)
    }
    vai()
  }, [])

  return (
    <View>
      {
       itens.map(item => <Text key={item.cod_historico}>{item.cidade} {item.data} {item.link}</Text>)
      }
    </View>
  )
}

export default Historico

const styles = StyleSheet.create({})