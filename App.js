import { StatusBar } from 'expo-status-bar';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Historico from './componentes/Historico';
import SearchWeather from './componentes/SearchWeather';

// import { armazenarNoHistorico }  from './service/OracleCloudService'

import * as oracleCloudService from './service/OracleCloudService'

export default function App() {
  return (
    // <Historico />
    <SearchWeather />
  )

  // return (
  //   <View style={styles.container}>
  //     <Button
  //       title='OK'
  //       onPress={() => testeOracle()}
  //     />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const testeOracle = (cidade) => {

  const promise = oracleCloudService.armazenarNoHistorico({
    cidade: cidade,
    representante: 'Joao de Jesus'
  })
  // console.log(promise)
  promise
    .then(res => {
      console.log(res)
    })
    .catch(erro => {
      console.log('erro: ', erro)
    })

  console.log("estamos livres para fazer outras coisas...")

}

// return (
//   <View style={styles.container}>
//     <Button
//       title='OK'
//       onPress={() => testeOracle()}
//     />
//   </View>
// );