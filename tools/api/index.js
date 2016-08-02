import { Router } from 'express'
const router = Router();

import gameboards from './gameboards'

router.use('/gameboards', gameboards);

export default router
