import axios from 'axios'

const oracleCloudInstance = axios.create({
  baseURL: 'https://ge181442bf23be3-historicoclima.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin',
  headers: {'Content-Type': 'application/json'}
})

export const armazenarNoHistorico = (item) => {
  return oracleCloudInstance.post('/tb_historico/', item)
}

export const obterHistorico = () => {
  return oracleCloudInstance.get('/tb_historico/')
}