import { internalRequest } from 'src/utils/request'
import { Company, HttpMethod } from 'src/utils/types'
import urls from 'src/utils/urls'

const getCompanyUrl = urls.baseUrl + urls.api.company.getCompany
const updateCompanyUrl = urls.baseUrl + urls.api.company.update

export const getCompany = async (accountId: string) => {
  return internalRequest<Company>({
    url: getCompanyUrl,
    method: HttpMethod.GET,
    authRequired: true,
    queryParams: {
      accountId
    }
  })
}

export const updateCompany = async (company: Company) => {
  return internalRequest<Company>({
    url: updateCompanyUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: company as unknown as { [key: string]: unknown }
  })
}
