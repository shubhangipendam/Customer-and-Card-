const customerModel = require("../model/customerModel")
const validators = require("../validation/validator")
const UUID = require("uuid")

const { isValid, isValidName, isValidEmail, isValidPhone, isValidBody, isValidDate } = validators




const createCustomer = async function (req, res) {

    try {
        const data = req.body
        let { firstName, lastName, mobileNumber, DOB, emailID, address, status } = data
        
        if (!isValidBody(data)) return res.status(400).send({ status: false, message: "request body is empty" })

        if (!firstName) return res.status(400).send({ status: false, message: "firstName is requires" })
        if (!isValidName(firstName)) return res.status(400).send({ status: false, message: "firstName is not Valid" })

        if (!lastName) return res.status(400).send({ status: false, message: "lastName is requires" })
        if (!isValidName(lastName)) return res.status(400).send({ status: false, message: "lastName is not Valid" })

        if (!mobileNumber) return res.status(400).send({ status: false, message: "mobilNnumber is required" })
        if (!isValidPhone(mobileNumber)) return res.status(400).send({ status: false, message: "mobileNumber is not Valid" })
        const findMobile = await customerModel.findOne({ mobileNumber: mobileNumber })
        if (findMobile) return res.status(400).send({ status: false, message: "mobilNnumber is allrady use by other acount" })

        if (!emailID) return res.status(400).send({ status: false, message: "emailID is requires" })
        if (!isValidEmail(emailID)) return res.status(400).send({ status: false, message: "emailID is not Valid" })
        const findemailID = await customerModel.findOne({ emailID: emailID })
        if (findemailID) return res.status(400).send({ status: false, message: "emailID is allrady use by other acount" })

        if (!DOB) return res.status(400).send({ status: false, message: "DOB is required" })
        if (!isValidDate(DOB)) return res.status(400).send({ status: false, message: "DOB is invalid - provide in MM-DD-YYYY formet" })

        if (!isValid(address)) return res.status(400).send({ status: false, message: "address is required" })

        const customerID = UUID.v4()
        data.customerID = customerID

        if (!status) return res.status(400).send({ status: false, message: " status is required" })
        if (!(["active", "inactive"].includes(status))) return res.status(400).send({ status: false, message: " status is invalide plese provide status active/inactive " })

        const saveData = await customerModel.create(data)
        return res.status(201).send({ status: true, data: saveData })


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }


}


const getcustomers = async function (req, res) {
    try {
        const customerData = await customerModel.find({ status: "active" })

        if (customerData.length == 0) return res.status(404).send({ status: false, message: "No customer data found" })
        return res.status(200).send({ status: true, data: customerData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const deleteCustomer = async function (req, res) {

    const customerID = req.params.customerID

    const customerPresent = await customerModel.findOne({ customerID: customerID })

    if (!customerPresent) return res.status(404).send({ status: false, message: "No customer found for this id" })
    if(customerPresent.isDeleted)return res.status(400).send({ status: false, message: "custemer is deleated allrady" })
    await customerModel.findOneAndUpdate({ customerID: customerID }, { $set: { isDeleted: true } })
    return res.status(200).send({ status: true, message: "customer deleated Susscefully" })

}


module.exports = { createCustomer, getcustomers, deleteCustomer }