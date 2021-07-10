import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig }

  isAlreadyFetchingAccessToken = false

  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  async login(...args) {
    return fetch(this.jwtConfig.baseUrl + this.jwtConfig.authLoginEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(...args) }).then((body) => body.json())
  }

  register(...args) {
    // return axios.post(this.jwtConfig.registerEndpoint, ...args)
    return fetch(this.jwtConfig.baseUrl + this.jwtConfig.registerEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(...args) }).then((body) => body.json())
  }

  parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }
  
}
