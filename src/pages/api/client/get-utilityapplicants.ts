import { NextApiRequest, NextApiResponse } from 'next/types'
import { getUtilityApplicants } from 'server/mongodb/actions/Client'
import APIWrapper from 'server/utils/APIWrapper'
import { Role } from 'src/utils/types'

export default APIWrapper({
  GET: {
    config: {
      requireToken: true,
      roles: [Role.UTILITY_COMPANY, Role.NONPROFIT_ADMIN]
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const utilityApplicants = await getUtilityApplicants(
        req.query.accountId as string
      )
      return utilityApplicants
    }
  }
})
