import express from 'express'
import { addTocart,getUsercart,updatecart } from '../controllers/CartController.js'
import authUser from'../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.post('/get',authUser, getUsercart)
cartRouter.post('/add',authUser,addTocart)
cartRouter.post('/update',authUser,updatecart)

export default cartRouter


