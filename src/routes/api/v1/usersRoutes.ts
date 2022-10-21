import { Router } from 'express'
import index from '../../../controllers/users'
import create from '../../../controllers/users/create'
import remove from '../../../controllers/users/delete'
import show from '../../../controllers/users/show'
import update from '../../../controllers/users/update'
import authenticate from '../../../controllers/users/authenticate'
import auth from '../../../middlewares/auth'
import uploadAvatar from '../../../controllers/users/uploadAvatar'
import upload from '../../../middlewares/upload'
import removeAvatar from '../../../controllers/users/deleteAvatar'
import getAvatar from '../../../controllers/users/getAvatar'

const userRoutes = Router()

userRoutes.post('/avatar', auth, upload.single('avatar'), uploadAvatar)
userRoutes.delete('/avatar', auth, removeAvatar)
userRoutes.get('/:id/avatar', getAvatar)
userRoutes.get('/', index)
userRoutes.post('/signup', create)
userRoutes.get('/:id', show)
userRoutes.patch('/:id', auth, update)
userRoutes.delete('/:id', auth, remove)
userRoutes.post('/authenticate', authenticate)

export default userRoutes
