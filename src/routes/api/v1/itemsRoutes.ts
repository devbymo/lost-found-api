import { Router } from 'express'
import indexByUser from '../../../controllers/items/indexByUser'
import index from '../../../controllers/items'
import create from '../../../controllers/items/create'
import remove from '../../../controllers/items/delete'
import show from '../../../controllers/items/show'
import update from '../../../controllers/items/update'
import auth from '../../../middlewares/auth'
import upload from '../../../middlewares/upload'
import uploadImage from '../../../controllers/items/uploadImage'
import getImage from '../../../controllers/items/getImage'

const itemsRoutes = Router()

itemsRoutes.get('/:id/image', getImage)
itemsRoutes.get('/', index)
itemsRoutes.get('/user/:id', indexByUser)
itemsRoutes.get('/:id', show)
itemsRoutes.post('/:id/image', auth, upload.single('image'), uploadImage)
itemsRoutes.post('/', auth, create)
itemsRoutes.patch('/:id', auth, update)
itemsRoutes.delete('/:id', auth, remove)

export default itemsRoutes
