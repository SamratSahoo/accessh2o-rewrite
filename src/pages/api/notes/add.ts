import { NextApiRequest, NextApiResponse } from 'next/types'
import { addNote } from 'server/mongodb/actions/Note'
import APIWrapper from 'server/utils/APIWrapper'
import { Role } from 'src/utils/types'

export default APIWrapper({
  POST: {
    config: {
      requireToken: true,
      roles: [Role.UTILITY_COMPANY, Role.NONPROFIT_ADMIN]
    },
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const company = await addNote(req.body)
      return company
    }
  }
})
