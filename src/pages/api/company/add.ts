import { NextApiRequest, NextApiResponse } from 'next/types'
import { addCompany } from 'server/mongodb/actions/Company'
import APIWrapper from 'server/utils/APIWrapper'
import { Role } from 'src/utils/types'

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.UTILITY_COMPANY, Role.NONPROFIT_ADMIN]
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const company = await addCompany(req.body)
      return company
    }
  }
})
