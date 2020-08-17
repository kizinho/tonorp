const {
    meeting
} = require('../../models/index')

const userMeeting = async (attendanceGroupId, type) => {
    if (!attendanceGroupId || !type || typeof attendanceGroupId !== 'number' || typeof type !== 'string') {
        throw new Error('Attendance group and type can not be null');
    }
    const groupMeeting = await meeting.create({
        attendanceGroupId,
        type
    })
    return groupMeeting
}


module.exports = userMeeting