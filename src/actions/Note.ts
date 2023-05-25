import { internalRequest } from 'src/utils/request'
import { HttpMethod, Note } from 'src/utils/types'
import urls from 'src/utils/urls'

const addNoteUrl = urls.baseUrl + urls.api.notes.add
const getNoteUrl = urls.baseUrl + urls.api.notes.getNote

export const addNote = async (note: { [key: string]: unknown }) => {
  return internalRequest<Note>({
    url: addNoteUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: note
  })
}

export const getNote = async (accountId: string) => {
  return internalRequest<Note>({
    url: getNoteUrl,
    method: HttpMethod.GET,
    authRequired: true,
    queryParams: {
      accountId
    }
  })
}
