import reqData from './constants/reqData'

class MainApi {
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

  createUser({ email, password, name }) {
    return this._req(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
  }

  login({ email, password }) {
    return this._req(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
  }

  logout() {
    return this._req(`${this._baseUrl}/signout`, {
      credentials: 'include',
      headers: this._headers,
    })
  }

  getUser() {
    return this._req(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    })
  }

  updateUser({ email, name }) {
    return this._req(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email,
        name,
      }),
    })
  }

  saveMovie(data) {
    return this._req(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        ...data,
      }),
    })
  }

  deleteMovie(id) {
    return this._req(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
  }

  getSavedMovies() {
    return this._req(`${this._baseUrl}/movies`, {
      credentials: 'include',
      headers: this._headers,
    })
  }

  checkToken() {
    return this._req(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

const mainApi = new MainApi(reqData)

export default mainApi
