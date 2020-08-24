const { attendanceGroups } = require('../../models/index')

const userGroups = async (userId) => {
    if (!userId || typeof userId !== 'number') {
        throw new Error('User is required ');
    }

    const userGroupList = await attendanceGroups.findAll({
        where: {
            owerId: userId
        }
    })
    return userGroupList

}

module.exports = { userGroups }