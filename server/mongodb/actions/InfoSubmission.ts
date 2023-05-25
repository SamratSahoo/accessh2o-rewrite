import dbConnect from 'server/utils/dbConnect'
import InfoSubmissionModel from 'server/mongodb/models/InfoSubmission'
import { Errors, Info } from 'src/utils/types'

export async function addInfo(info: Info): Promise<Info> {
  await dbConnect()
  const newInfo = await InfoSubmissionModel.create(info)
  return newInfo
}

export async function getInfo(accountId: Info['accountId']): Promise<Info> {
  await dbConnect()
  const info = await InfoSubmissionModel.findOne({ accountId: accountId })
  return info as Info
}

export async function update(infosubmitted: Info): Promise<void> {
  const accountId = infosubmitted.accountId

  await dbConnect()

  const info = await InfoSubmissionModel.findOneAndUpdate(
    { accountId: accountId },
    {
      eligibilityQuestions: infosubmitted.eligibilityQuestions,
      documents: infosubmitted.documents,
      otherQuestions: infosubmitted.otherQuestions
    }
  )
  if (info === undefined) throw new Error(Errors.user.INVALID_ID)
}
