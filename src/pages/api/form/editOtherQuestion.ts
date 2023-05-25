import APIWrapper from 'server/utils/APIWrapper'
import { editOtherQuestion } from 'server/mongodb/actions/FormQuestion'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default APIWrapper({
  PATCH: {
    config: {
      requireToken: false
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const question = await editOtherQuestion(req.body)
      return question
    }
  }
})
