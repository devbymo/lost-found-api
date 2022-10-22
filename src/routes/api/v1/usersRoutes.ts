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

userRoutes.get('/:id/avatar', getAvatar)
userRoutes.get('/:id', show)
// userRoutes.get('/', index) For testing purposes
userRoutes.post('/avatar', auth, upload.single('avatar'), uploadAvatar)
userRoutes.post('/authenticate', authenticate)
userRoutes.post('/signup', create)
userRoutes.patch('/:id', auth, update)
userRoutes.delete('/:id', auth, remove)
userRoutes.delete('/avatar', auth, removeAvatar)

export default userRoutes
