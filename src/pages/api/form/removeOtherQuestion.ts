import APIWrapper from 'server/utils/APIWrapper'
import { removeOtherQuestion } from 'server/mongodb/actions/FormQuestion'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default APIWrapper({
  DELETE: {
    config: {
      requireToken: false
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const question = await removeOtherQuestion(req.body.id)
      return question
    }
  }
})
