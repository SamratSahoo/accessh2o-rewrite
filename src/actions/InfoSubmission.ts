import { internalRequest } from 'src/utils/request'
import { HttpMethod, Info } from 'src/utils/types'
import urls from 'src/utils/urls'

const addInfoUrl = urls.baseUrl + urls.api.info.addInfo
const getInfoUrl = urls.baseUrl + urls.api.info.getInfo

export const addInfo = async (info: { [key: string]: unknown }) => {
  return internalRequest<Info>({
    url: addInfoUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: info
  })
}

export const getInfo = async (accountId: string) => {
  return internalRequest<Info>({
    url: getInfoUrl,
    method: HttpMethod.GET,
    authRequired: true,
    queryParams: {
      accountId
    }
  })
}

export const update = async (info: { [key: string]: unknown }) => {
  return internalRequest<Info>({
    url: getInfoUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: info
  })
}
