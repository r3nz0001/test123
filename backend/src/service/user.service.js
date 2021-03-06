import User from '../model/user.model.js'
import log from '../utils/logger.js'

const omitPassword = (user) => {
  // eslint-disable-next-line no-unused-vars
  const { password, ...user_ } = user
  return user_
}

export async function createUser(input) {
  try {
    const user = await User.create(input)
    return omitPassword(user._doc)
  } catch (error) {
    const errorMessage = error.code === 11000 ? 'Email ya registrado' : error
    throw new Error(errorMessage)
  }
}

export async function validatePassword({ email, password }) {
  const user = await User.findOne({ email })
  if (!user) return false

  const isValid = await user.comparePassword(password)
  if (!isValid) return false

  const child = log.child(omitPassword(user._doc))
  child.info('User logged in')

  return omitPassword(user._doc)
}

export async function findUser(query) {
  return User.findOne(query).lean()
}
