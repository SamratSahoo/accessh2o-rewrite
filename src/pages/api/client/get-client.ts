import { NextApiRequest, NextApiResponse } from 'next/types'
import { getClient } from 'server/mongodb/actions/Client'
import APIWrapper from 'server/utils/APIWrapper'
import { Role } from 'src/utils/types'

export default APIWrapper({
  GET: {
    config: {
      requireToken: true,
      roles: [Role.UTILITY_COMPANY, Role.NONPROFIT_ADMIN]
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const client = await getClient(req.query.accountId as string)
      return client
    }
  }
})
