// ** UseJWT import to get config
import useJwt from '../../../auth/jwt/useJwt'

const config = useJwt.jwtConfig

// ** Handle User Login
export const handleLogin = data => dispatch => {
  dispatch({
    type: 'LOGIN',
    data,
    config,
    [config.storageTokenKeyName]: data[config.storageTokenKeyName],
    [config.storageRefreshTokenKeyName]: data[config.storageRefreshTokenKeyName]
  })
  localStorage.setItem('icUserdata', JSON.stringify(data))
  localStorage.setItem(config.storageTokenKeyName, data.accessToken)
  localStorage.setItem(config.storageRefreshTokenKeyName, data.refreshToken)
}

// ** Handle User Logout
export const handleLogout = () => dispatch => {
  dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })
  // ** Remove user, accessToken & refreshToken from localStorage
  localStorage.removeItem('icUserdata')
  localStorage.removeItem(config.storageTokenKeyName)
  localStorage.removeItem(config.storageRefreshTokenKeyName)
}
