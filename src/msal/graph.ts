import { graphConfig } from './authConfig'

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph(accessToken: string) {
  const headers = new Headers()
  const bearer = `Bearer ${accessToken}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export interface OneDriveItemInterface {
  value: {
    name: string
    id: string
    webUrl: string
  }[]
}

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph2OneDrive(accessToken: string) {
  const headers = new Headers()
  const bearer = `Bearer ${accessToken}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }

  return fetch('https://graph.microsoft.com/v1.0/me/drive/root/children', options)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph2OneDriveByItemId(accessToken: string, id: string) {
  const headers = new Headers()
  const bearer = `Bearer ${accessToken}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }

  return fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${id}/children`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph2OneDriveResumeJsonContentByItemId(accessToken: string, id: string) {
  const headers = new Headers()
  const bearer = `Bearer ${accessToken}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }

  return fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${id}/content`, options)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph2OneDriveImgContentByItemId(accessToken: string, id: string) {
  const headers = new Headers()
  const bearer = `Bearer ${accessToken}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }

  return fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${id}/content`, options)
    .then((response) => response.url)
    .catch((error) => {
      console.log(error)
      return ''
    })
}
