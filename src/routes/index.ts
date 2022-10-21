import expres from 'express'
import userRoutes from './api/v1/usersRoutes'
import itemRoutes from './api/v1/itemsRoutes'

const routes = expres.Router()

routes.use('/v1/users', userRoutes)
routes.use('/v1/items', itemRoutes)

export default routes
