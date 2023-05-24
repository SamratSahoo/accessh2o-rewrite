import { internalRequest } from "src/utils/request";
import { DocumentQuestion, EligibilityQuestion, HttpMethod, OtherQuestion } from "src/utils/types";
import urls from "src/utils/urls"

const getEligibilityQuestionsUrl = urls.baseUrl + urls.api.formQuestions.getEligibilityQuestions;
const getDocumentQuestionsUrl = urls.baseUrl + urls.api.formQuestions.getDocumentQuestions;
const getOtherQuestionsUrl = urls.baseUrl + urls.api.formQuestions.getOtherQuestions;

export const getEligibilityQuestions = async () => {
    return internalRequest<EligibilityQuestion[]>({
        url: getEligibilityQuestionsUrl,
        method: HttpMethod.GET,
        authRequired: true,
    })
}

export const getDocumentQuestions = async () => {
    return internalRequest<DocumentQuestion[]>({
        url: getDocumentQuestionsUrl,
        method: HttpMethod.GET,
        authRequired: true,
    })
}

export const getOtherQuestions = async () => {
    return internalRequest<OtherQuestion[]>({
        url: getOtherQuestionsUrl,
        method: HttpMethod.GET,
        authRequired: true,
    })
}
