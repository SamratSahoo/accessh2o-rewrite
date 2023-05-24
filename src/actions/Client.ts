import { internalRequest } from "src/utils/request";
import { Applicant, Client, HttpMethod } from "src/utils/types"
import urls from "src/utils/urls"


const getAllClientsUrl = urls.baseUrl + urls.api.client.getAll;
const addClientUrl = urls.baseUrl + urls.api.client.addClient;
const rmeoveClientUrl = urls.baseUrl + urls.api.client.removeClient;

export const getAllApplicants = async () => {
    return internalRequest<Applicant[]>({
        url: getAllClientsUrl,
        method: HttpMethod.GET,
        authRequired: true,
    })
}

export const addClient = async (client: { [key: string]: unknown; }) => {
    return internalRequest<Client>({
        url: addClientUrl,
        method: HttpMethod.GET,
        authRequired: true,
        body: client
    })
}

export const removeClient = async (accountId: string) => {
    return internalRequest<Client>({
        url: rmeoveClientUrl,
        method: HttpMethod.DELETE,
        authRequired: true,
        queryParams: {
            accountId
        }
    })
}