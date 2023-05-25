import { NextApiRequest, NextApiResponse } from 'next/types'
import { getCompany, updateCompany } from 'server/mongodb/actions/Company'
import APIWrapper from 'server/utils/APIWrapper'
import { Role } from 'src/utils/types'

export default APIWrapper({
  PATCH: {
    config: {
      requireToken: true,
      roles: [Role.UTILITY_COMPANY, Role.NONPROFIT_ADMIN]
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const company = await updateCompany(req.body)
      return company
    }
  }
})
