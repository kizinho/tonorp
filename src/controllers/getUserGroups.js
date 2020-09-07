const { attendanceGroups, attendanceRecorded } = require('../../models/index')

const userGroups = async (userId) => {
    if (!userId || typeof userId !== 'number') {
        throw new Error('User is required ');
    }

    const userGroupList = await attendanceGroups.findAll({
        where: {
            ownerId: userId
        }
    })
    return userGroupList

}

const groupAttendanceCount = async (meetingId) => {
    if (!meetingId || typeof meetingId !== 'number') {
        throw new Error('GroupId is required ');
    }
    const groupCount = await attendanceRecorded.count({
        where: {
            meetingId
        }
    })
    return groupCount
}

module.exports = { userGroups, groupAttendanceCount }