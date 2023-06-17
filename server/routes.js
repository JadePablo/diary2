import express from 'express'

//import controllers here
import { decodeToken } from './controller.js'

const router = express.Router()

router.get("/decode",decodeToken)


export default router