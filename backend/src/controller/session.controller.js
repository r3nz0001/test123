import {
  createSession,
  findSessions,
  updateSession
} from '../service/session.service.js'
import { validatePassword } from '../service/user.service.js'
import { signJwt } from '../utils/jwt.js'

export async function login(req, res) {
  const user = await validatePassword(req.body)
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' })

  const session = await createSession(user._id, req['user-agent'] || '')

  const tokenInfo = { ...user, session: session._id }

  const accessToken = signJwt(tokenInfo, 'accessToken')
  const refreshToken = signJwt(tokenInfo, 'refreshToken')

  return res
    .status(200)
    .cookie('jwt', refreshToken, {
      httpOnly: true,
      // maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'strict',
      path: '/'
      // secure: true
    })
    .send({ accessToken })
}

export async function getUserSession(req, res) {
  const userId = res.locals.user._id

  const sessions = await findSessions({ user: userId, valid: true })

  return res.send({ sessions })
}

export async function deleteUserSession(req, res) {
  const sessionId = res.locals.user.session

  await updateSession({ _id: sessionId }, { valid: false })

  return res.clearCookie('jwt').send({ message: 'Sesión invalidada' })
}
