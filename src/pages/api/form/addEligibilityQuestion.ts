import APIWrapper from 'server/utils/APIWrapper'
import { addEligibilityQuestion } from 'server/mongodb/actions/FormQuestion'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default APIWrapper({
  POST: {
    config: {
      requireToken: false
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const question = await addEligibilityQuestion(req.body)
      return question
    }
  }
})
