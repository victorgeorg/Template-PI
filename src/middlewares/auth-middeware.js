import jwt from 'jsonwebtoken'
import {AppError} from '../Errors/errorHandle.js'
import {JWT_SECRET} from '../config/envconfig.js'

export function authMiddleware(req,res,next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new AppError('Token nao fornecido',401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        req.user = decoded
        next()
    } catch {
        throw new AppError('Token invalido ou expirado',401)
    }

}