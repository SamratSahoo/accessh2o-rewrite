import APIWrapper from 'server/utils/APIWrapper'
import { editEligibilityQuestion } from 'server/mongodb/actions/FormQuestion'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default APIWrapper({
  PATCH: {
    config: {
      requireToken: false
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const question = await editEligibilityQuestion(req.body)
      return question
    }
  }
})
