import { NextApiRequest, NextApiResponse } from 'next/types'
import { getCompany } from 'server/mongodb/actions/Company'
import APIWrapper from 'server/utils/APIWrapper'
import { Role } from 'src/utils/types'

export default APIWrapper({
  GET: {
    config: {
      requireToken: true,
      roles: [Role.UTILITY_COMPANY, Role.NONPROFIT_ADMIN]
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const company = await getCompany(req.query.accountId as string)
      return company
    }
  }
})
