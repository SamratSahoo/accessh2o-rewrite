import { NextApiRequest, NextApiResponse } from 'next/types'
import { getNotes } from 'server/mongodb/actions/Note'
import APIWrapper from 'server/utils/APIWrapper'
import { Role } from 'src/utils/types'

export default APIWrapper({
  GET: {
    config: {
      requireToken: true,
      roles: [Role.UTILITY_COMPANY, Role.NONPROFIT_ADMIN]
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const notes = await getNotes(req.query.accountId as string)
      return notes
    }
  }
})
