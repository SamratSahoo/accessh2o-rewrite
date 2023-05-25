import { NextApiRequest, NextApiResponse } from 'next/types'
import APIWrapper from 'server/utils/APIWrapper'
import { getUser } from 'server/utils/Authentication'

export default APIWrapper({
  GET: {
    config: {
      requireToken: true,
      skipIfNoToken: true
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      if (!req.headers.accesstoken) {
        return null
      }
      const user = getUser(req.headers.accesstoken as string)
      return user
    }
  }
})
