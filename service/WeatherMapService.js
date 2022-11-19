import axios from 'axios'

const weatherMapInstance = axios.create({
  baseURL: 'https://api.openweathermap.org'
})

export const obterPrevisoes = (cidade) => {
  return weatherMapInstance.get(
    '/data/2.5/forecast/', 
    {params: {
      q: cidade,
      appid:'ef0b0973b783e0614ac87612ec04344b',
      units: 'metric',
      cnt: 5
    }}
  )
}


