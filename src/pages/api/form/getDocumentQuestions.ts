import APIWrapper from 'server/utils/APIWrapper'
import { getDocumentQuestions } from 'server/mongodb/actions/FormQuestion'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default APIWrapper({
  GET: {
    config: {
      requireToken: false
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const questions = await getDocumentQuestions()
      return questions
    }
  }
})
