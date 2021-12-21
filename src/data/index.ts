import { v4 as uuid } from 'uuid'
import { gen, mix, getRandomDate, getRandomInt, getRandomString } from './utils'

export const random = {
  get UserId() {
    return `${gen.N}${gen.N}${gen.N}${gen.N}${gen.N}${gen.N}`
  },
  get Tel() {
    return `0${gen.N}${gen.N}-${gen.N}${gen.N}${gen.N}${gen.N}-${gen.N}${gen.N}${gen.N}${gen.N}`
  },
  get Id() {
    return uuid()
  },
  get Email() {
    return 'test@example.com'
  },
  get Name() {
    const randomInt = getRandomInt(1, 100)
    return `ユーザ${randomInt >= 10 ? '' : 0}${randomInt}`
  },
  get Date() {
    return getRandomDate()
  },
  get PastDate() {
    return getRandomDate({ end: new Date() })
  },
  get FutureDate() {
    return getRandomDate({ start: new Date() })
  },
  get Url() {
    return ''
  },
  get Issuer() {
    return mix(this.Id, this.UserId)
  },
  get String() {
    return getRandomString()
  },
  get Boolean() {
    return mix(true, false)
  },
}
