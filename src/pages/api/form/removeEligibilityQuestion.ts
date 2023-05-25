import APIWrapper from 'server/utils/APIWrapper'
import { removeEligibilityQuestion } from 'server/mongodb/actions/FormQuestion'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default APIWrapper({
  DELETE: {
    config: {
      requireToken: false
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const question = await removeEligibilityQuestion(req.body.id)
      return question
    }
  }
})
