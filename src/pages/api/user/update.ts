import { NextApiRequest, NextApiResponse } from 'next/types'
import { update } from 'server/mongodb/actions/User'
import APIWrapper from 'server/utils/APIWrapper'

export default APIWrapper({
  PATCH: {
    config: {
      requireToken: true
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const user = await update(req.body)
      return user
    }
  }
})
