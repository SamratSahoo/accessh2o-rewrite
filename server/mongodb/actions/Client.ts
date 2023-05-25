import dbConnect from 'server/utils/dbConnect'
import ClientSchema from 'server/mongodb/models/Client'
import CompanySchema from 'server/mongodb/models/Company'
import { Client, Company, Status } from 'src/utils/types'

export async function addClient(client: Client): Promise<Client> {
  await dbConnect()
  const newClient = await ClientSchema.create(client)
  return newClient
}

export async function removeClient(
  accountId: Client['accountId']
): Promise<void> {
  await dbConnect()
  await ClientSchema.findOneAndDelete({ accountId })
}

export async function getClient(
  accountId: Client['accountId']
): Promise<Client> {
  await dbConnect()
  const client = await ClientSchema.findOne({ accountId })
  return client as Client
}

export async function getAll(): Promise<Client[]> {
  await dbConnect()
  const clients = await ClientSchema.find()
  return clients
}

export async function changeStatus(status: Status): Promise<void> {
  const accountId = status.accountId
  await dbConnect()
  const client = await ClientSchema.findOneAndUpdate(
    { accountId: accountId },
    {
      status: status.status
    }
  )
}

export async function addDocument(
  document: File,
  accountId: Client['accountId']
): Promise<void> {
  await dbConnect()
  const client = await ClientSchema.findOneAndUpdate(
    { accountId },
    {
      $push: {
        documents: document
      }
    }
  )
}

export async function removeDocument(
  document: File,
  accountId: Client['accountId']
): Promise<void> {
  await dbConnect()
  const client = await ClientSchema.findOneAndUpdate(
    { accountId },
    {
      $pull: { documents: document }
    }
  )
}

export async function getUtilityApplicants(
  utilityCompany: Client['utilityCompany']
): Promise<Client[]> {
  await dbConnect()

  const utility = (await CompanySchema.findOne({
    accountId: utilityCompany
  })) as Company
  const clients = await ClientSchema.find({ utilityCompany: utility.name })

  return clients
}
