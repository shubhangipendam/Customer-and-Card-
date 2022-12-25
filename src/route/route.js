const express = require("express")
const router = express.Router()
const customerController = require("../controller/customerController")
const cardController = require("../controller/cardController")



router.post("/customer", customerController.createCustomer)

router.get("/customer", customerController.getcustomers)

router.delete("/customer/:customerID", customerController.deleteCustomer)

router.post("/card", cardController.createCard)

router.get("/card", cardController.getcards)





module.exports = router