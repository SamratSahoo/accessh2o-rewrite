import APIWrapper from 'server/utils/APIWrapper'
import { editDocumentQuestion } from 'server/mongodb/actions/FormQuestion'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default APIWrapper({
  PATCH: {
    config: {
      requireToken: false
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const question = await editDocumentQuestion(req.body)
      return question
    }
  }
})
