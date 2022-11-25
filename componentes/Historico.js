import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { ListItem, Avatar } from '@rneui/themed'
import { format } from 'date-fns'

import { obterHistorico } from '../service/OracleCloudService'

const Historico = ({ navigation }) => {
  const [itens, setItens] = useState([])

  useEffect(() => {
    const vai = async () => {
      const resultado = (await obterHistorico()).data.items
      setItens(resultado)
    }
    vai()
  }, [])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={itens}
          keyExtractor={item => item.cod_historico}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <ListItem >

                <ListItem.Content>
                  <ListItem.Subtitle>{format(new Date(item.data), 'dd/MM')}</ListItem.Subtitle>
                </ListItem.Content>

                <ListItem.Content>
                  <ListItem.Subtitle>{item.cidade}</ListItem.Subtitle>
                </ListItem.Content>

                <Avatar title="IconeHistorico" source={{ uri: item.link }} />
              </ListItem>
            </View>
          )}

        />
      </SafeAreaView>

    </>
  )
}

export default Historico

const styles = StyleSheet.create({
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
})