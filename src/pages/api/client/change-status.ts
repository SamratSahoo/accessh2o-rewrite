import { NextApiRequest, NextApiResponse } from 'next/types'
import { addClient, changeStatus } from 'server/mongodb/actions/Client'
import APIWrapper from 'server/utils/APIWrapper'
import { Role } from 'src/utils/types'

export default APIWrapper({
  PATCH: {
    config: {
      requireToken: true,
      roles: [Role.UTILITY_COMPANY, Role.NONPROFIT_ADMIN]
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const client = await changeStatus(req.body)
      return client
    }
  }
})
