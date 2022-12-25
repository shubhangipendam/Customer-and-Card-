const cardModel = require("../model/cardModel")
const customerModel = require("../model/customerModel")
const validators = require("../validation/validator")

const { isEmpty, isValidBody, } = validators

const createCard = async function (req, res) {

    try {
        const data = req.body

        if (!isValidBody(data)) return res.status(400).send({ status: false, message: "plese enter data in request body" })

        const { customerID, cardType, vision } = data

        const findCard = await cardModel.findOne({ customerID: customerID })
        if (findCard) return res.status(400).send({ status: false, message: "card allrady created for this customer" })

        const findCustomer = await customerModel.findOne({ customerID: customerID })
        if (!findCustomer) return res.status(404).send({ status: false, message: "No customer is found" })
        if (findCustomer.isDeleted) return res.status(400).send({ status: false, message: "custemer is already deleted" })



        if (!cardType) return res.status(400).send({ status: false, message: "Cardtype is required" })
        if (!(["regular", "special"].includes(cardType))) return res.status(400).send({ status: false, message: "Cardtype is invalidel" })

        if (!vision) return res.status(400).send({ status: false, message: "vision is required" })
        
        let cardpresent = await cardModel.find().count()
        let cardNumber = "C" + (00 + (++cardpresent))

        data.cardNumber = cardNumber
        data.customerName = findCustomer.firstName + " " + findCustomer.lastName
        data.status = findCustomer.status

        const saveData = await cardModel.create(data)
        return res.status(201).send({ status: true, data: saveData })


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}


const getcards = async function (req, res) {
    try {

        const cardsData = await cardModel.find()
        if (cardsData.length == 0) return res.status(404).send({ status: false, message: "No cards data found" })
        return res.status(200).send({ status: true, data: cardsData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = { createCard, getcards }