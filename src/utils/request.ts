import { InternalRequestData, InternalResponseData } from 'src/utils/types'

export async function internalRequest<T>({
  url,
  queryParams,
  method,
  body,
  authRequired
}: InternalRequestData): Promise<T> {
  const requestInfo: RequestInit = {
    method,
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      accesstoken: authRequired
        ? localStorage.getItem('accessToken')
          ? localStorage.getItem('accessToken')
          : ''
        : ''
    } as HeadersInit
  }

  if (body) {
    requestInfo.body = JSON.stringify(body)
  }
  if (queryParams) {
    Object.entries(queryParams)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => {
        url = `${url}?${key}=${(
          value as string | number | boolean
        ).toString()}&`
      })
  }
  const response = await fetch(url, requestInfo)
  const responseBody = (await response.json()) as InternalResponseData<T>
  if (!responseBody) {
    throw new Error('Unable to connect to API.')
  } else if (!responseBody.success) {
    const errorMessage = responseBody.message
    throw new Error(errorMessage)
  }

  // refresh access token logic
  if (
    responseBody.accessToken &&
    responseBody.accessToken !== localStorage.getItem('accessToken')
  ) {
    localStorage.setItem('accessToken', responseBody.accessToken)
  }
  return responseBody.payload as T
}
