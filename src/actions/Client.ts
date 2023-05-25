import { internalRequest } from 'src/utils/request'
import { Applicant, Client, HttpMethod } from 'src/utils/types'
import urls from 'src/utils/urls'

const getAllClientsUrl = urls.baseUrl + urls.api.client.getAll
const addClientUrl = urls.baseUrl + urls.api.client.addClient
const removeClientUrl = urls.baseUrl + urls.api.client.removeClient
const getClientUrl = urls.baseUrl + urls.api.client.getClient
const changeStatusUrl = urls.baseUrl + urls.api.client.changeStatus

export const getAllApplicants = async () => {
  return internalRequest<Applicant[]>({
    url: getAllClientsUrl,
    method: HttpMethod.GET,
    authRequired: true
  })
}

export const addClient = async (client: { [key: string]: unknown }) => {
  return internalRequest<Client>({
    url: addClientUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: client
  })
}

export const removeClient = async (accountId: string) => {
  return internalRequest<Client>({
    url: removeClientUrl,
    method: HttpMethod.DELETE,
    authRequired: true,
    queryParams: {
      accountId
    }
  })
}

export const getClient = async (accountId: string) => {
  return internalRequest<Client>({
    url: getClientUrl,
    method: HttpMethod.GET,
    authRequired: true,
    queryParams: {
      accountId
    }
  })
}

export const getAll = async () => {
  return internalRequest<Client[]>({
    url: getAllClientsUrl,
    method: HttpMethod.GET,
    authRequired: true
  })
}

export const changeStatus = async (status: { [key: string]: unknown }) => {
  return internalRequest<Client>({
    url: changeStatusUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: status
  })
}
