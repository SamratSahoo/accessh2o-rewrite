import { NextApiRequest, NextApiResponse } from 'next/types'
import { addInfo } from 'server/mongodb/actions/InfoSubmission'
import APIWrapper from 'server/utils/APIWrapper'
import { Role } from 'src/utils/types'

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.UTILITY_COMPANY, Role.NONPROFIT_ADMIN]
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const info = await addInfo(req.body)
      return info
    }
  }
})
