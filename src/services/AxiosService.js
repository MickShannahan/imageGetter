import Axios from 'axios'
import { AppState } from '../AppState'
import { baseURL } from '../env'
import { logger } from '../utils/Logger'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

function fixUrl(str = '') {
  let url = ''
  if (!str.startsWith('https://')) url += 'https://'
  url += str
  return url
}

class ApiService {
  async getImages(url) {
    try {
      url = fixUrl(url)
      const res = await api.get(url)
      AppState.results = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  select(str = '') {
    if (str.includes('*')) {
      const sup = str.split('.*.')[0]
      const sub = str.split('.*.')[1]
      const arr = this.selector(sup, AppState.results)
      AppState.filteredResults = arr.map(r => this.selector(sub, r))
    } else if (AppState.results[str]) {
      AppState.filteredResults = AppState.results[str]
    } else {
      AppState.filteredResults = this.selector(str, AppState.results, '.')
    }
  }

  selector(path, obj = self, separator = '.') {
    logger.log('filtering down by', path)
    const properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
  }
}

export const apiService = new ApiService()
