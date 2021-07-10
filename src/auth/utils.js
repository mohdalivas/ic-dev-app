import useJwt from './jwt/useJwt'

// eslint-disable-next-line arrow-body-style
export const isUserLoggedIn = () => {
  return localStorage.getItem('icUserdata') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
}

export const getUserData = () => JSON.parse(localStorage.getItem('icUserdata'))
