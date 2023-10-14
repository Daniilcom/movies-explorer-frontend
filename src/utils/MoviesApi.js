import requestData from './constants/reqDataMovies'

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

  _req(url, options) {
    return fetch(url, options).then(this._handleResponse)
  }

  getMovies() {
    return this._req(`${this._baseUrl}`, {
      headers: this._headers,
    })
  }
}

const moviesApi = new MoviesApi(requestData)

export default moviesApi
