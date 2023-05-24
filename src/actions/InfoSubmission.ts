
import { internalRequest } from "src/utils/request";
import { HttpMethod, Info } from "src/utils/types";
import urls from "src/utils/urls"

const addInfoUrl = urls.baseUrl + urls.api.info.addInfo;

export const addInfo = async (info: { [key: string]: unknown; }) => {
    return internalRequest<Info>({
        url: addInfoUrl,
        method: HttpMethod.POST,
        authRequired: true,
        body: info
    })
}