import Cookies from 'js-cookie'

const TokenKey = 'Token-key'
const RefreshKey = 'Refresh-key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getRefreshToken() {
  return Cookies.get(RefreshKey)
}

export function setToken(token, second) {
  return Cookies.set(TokenKey, token, { expires: new Date(Date.now() + second * 1000) })
}

export function setRefreshToken(refreshToken) {
  return Cookies.set(RefreshKey, refreshToken, { expires: 30 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshKey)
}
