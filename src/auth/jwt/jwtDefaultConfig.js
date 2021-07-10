// ** Auth Endpoints
const jwtDefaultconfig = {
  loginEndpoint: '/auth/login',
  baseUrl: 'http://localhost:3030',
  authLoginEndpoint: '/auth/login',
  registerEndpoint: '/auth/register',
  refreshEndpoint: '/auth/refresh-token',
  logoutEndpoint: '/auth/logout',
  tokenType: 'Bearer',
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}

export default jwtDefaultconfig