const UserModel = require("../models/UserModel")

const uploadbookPermission = async(userId) => {
    const user = await UserModel.findById(userId)

    if(user.role === 'seller') {
        return true
    }

    return false
}


module.exports = uploadbookPermission