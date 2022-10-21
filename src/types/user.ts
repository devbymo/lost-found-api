type User = {
  id?: string
  name: string
  phoneNumber: string
  password: string
  city: string
  country: string
  items?: string[]
  avatar?: Buffer
}

export default User
