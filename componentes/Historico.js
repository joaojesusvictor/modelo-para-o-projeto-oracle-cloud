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
    width: "20%",
    alignSelf: 'center'
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
  content: {
    flex: 1,
    padding: 10,
  }
})