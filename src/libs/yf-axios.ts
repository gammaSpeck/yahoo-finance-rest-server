import Axios, { AxiosInstance } from 'axios'

import configs from '@configs'
import { FailedDependencyError } from '@errors/failed-dependency-error'
import { log } from './logger'

class YFAxios {
  private readonly host = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com'
  private instance: AxiosInstance

  constructor(apiKey: string) {
    this.instance = Axios.create({
      baseURL: `${this.host}`,
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      }
      // transformResponse: formatResponse // If you want to format the response, go ahead
    })
  }

  async get(url: string, params: object) {
    try {
    } catch (e) {
      log.error('Axios call failed', e)
      throw new FailedDependencyError('Yahoo Finance API Call failed')
    }
    return (await this.instance({ method: 'GET', url, params })).data
  }
}

export const yfAxios = new YFAxios(configs.rapidAPIKey)
