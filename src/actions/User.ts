import { internalRequest } from "src/utils/request"
import { HttpMethod, User } from "src/utils/types"
import urls from "src/utils/urls"

const getCurrentUrl = urls.baseUrl + urls.api.user.getCurrent;
const loginUrl = urls.baseUrl + urls.api.user.login;
const signUpUrl = urls.baseUrl + urls.api.user.signUp;

export const getCurrentUser = async () => {
    return internalRequest<User | null>({
        url: getCurrentUrl,
        method: HttpMethod.GET,
        authRequired: true,
    })
}

export const login = async (email: string, password: string) => {
    return internalRequest<string>({
        url: loginUrl,
        method: HttpMethod.POST,
        authRequired: false,
        body: {
            email: email,
            password: password
        }
    })
}

export const signUp = async (email: string, password: string, utilityCompanyName: string) => {
    return internalRequest<string>({
        url: signUpUrl,
        method: HttpMethod.POST,
        authRequired: false,
        body: {
            email: email,
            password: password,
            utilityCompanyName: utilityCompanyName
        }
    })
}