import { NextApiRequest, NextApiResponse } from 'next/types'
import { update } from 'server/mongodb/actions/InfoSubmission'
import APIWrapper from 'server/utils/APIWrapper'
import { Role } from 'src/utils/types'

export default APIWrapper({
  PATCH: {
    config: {
      requireToken: true,
      roles: [Role.UTILITY_COMPANY, Role.NONPROFIT_ADMIN]
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const info = await update(req.body)
      return info
    }
  }
})
