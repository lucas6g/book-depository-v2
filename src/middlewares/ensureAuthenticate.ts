import { NextFunction, Request, Response } from 'express'
import { decode, verify } from 'jsonwebtoken'
import env from '../config/env'
import { Role } from '../enums/Role'
import { userRepository } from '../repositories/implementations/UserRepositoryPrisma'

export const ensureAuthenticate = (role: Role) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization
    if (!header) return res.status(401).send({ message: 'Token not provided' })

    const token = header.split(' ')[1]

    try {
      verify(token, env.jwt.secret)
      const { userId, userRole } = decode(token) as {
        userId: string;
        userRole: string;
      }
      req.userId = userId
      req.userRole = userRole

      const user = await userRepository.getById(userId)
      if (!user) return res.status(401).send({ message: 'User not found' })
      if (!user.verified) {
        return res.status(401).send({ message: 'User not verified' })
      }
      const authorized = user.role === role || user.role === Role.ADMIN
      if (!authorized) {
        return res.status(401).send({ message: 'User not authorized' })
      }
      console.debug({ userId, userRole })

      return next()
    } catch (err) {
      return res.status(401).send({ message: 'Invalid Token' })
    }
  }
}
