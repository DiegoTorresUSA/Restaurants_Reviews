import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
const router = express.Router()

// route RestarantasCtrl
// file apiGetRestaurants
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)

export default router
