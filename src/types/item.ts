import { ClientSession } from 'mongoose'

type Item = {
  id: string
  name: string
  category: string
  description: string
  phoneNumber: string
  creator: string
  city: string
  country: string
  image?: Buffer
  createdAt: Date
  toObject(arg0: { getters: boolean }): unknown
  save(): unknown
  remove(arg0: { session: ClientSession }): unknown
}

export default Item
