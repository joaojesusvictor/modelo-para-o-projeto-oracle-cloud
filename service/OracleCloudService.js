import axios from 'axios'

const oracleCloudInstance = axios.create({
  baseURL: 'https://g3e99fc358a3389-jp1k665t7zehy4vs.adb.us-ashburn-1.oraclecloudapps.com/ords/admin',
  headers: {'Content-Type': 'application/json'}
})


export const armazenarNoHistorico = (item) => {
  return oracleCloudInstance.post('/fatec_ipi_202022_pdm_noite_tb_historico/', item)
}

export const obterHistorico = () => {
  return oracleCloudInstance.get('/fatec_ipi_202022_pdm_noite_tb_historico/')
}