import { NextApiRequest, NextApiResponse } from 'next/types'
import { getInfo } from 'server/mongodb/actions/InfoSubmission'
import APIWrapper from 'server/utils/APIWrapper'
import { Role } from 'src/utils/types'

export default APIWrapper({
  GET: {
    config: {
      requireToken: true,
      roles: [Role.UTILITY_COMPANY, Role.NONPROFIT_ADMIN]
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const company = await getInfo(req.query.accountId as string)
      return company
    }
  }
})
