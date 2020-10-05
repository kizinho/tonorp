const { Op } = require("sequelize");

const { meeting } = require('../../models/index');
const { isValidDate } = require('../modules/utils/helper');


const userMeeting = async (attendanceGroupsId, type) => {
  if (
    !attendanceGroupsId ||
    !type ||
    typeof attendanceGroupsId !== 'number' ||
    typeof type !== 'string'
  ) {
    throw new Error('Attendance group and type can not be null');
  }
  const groupMeeting = await meeting.create({
    attendanceGroupsId,
    type,
  });
  return groupMeeting;
};

const meetingSort = async (attendanceGroupId, date = null) => {
  if (!attendanceGroupId || typeof attendanceGroupId !== 'number') {
    throw TypeError('Attendance group is required');
  }
  if (date == null) {
    const getSort = await meeting.findAll({
      where: {
        attendanceGroupId,
      },
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
      ]
    });
    return getSort;
  }
  const checkDate = isValidDate(date);
  if (checkDate === false) {
    throw TypeError('Invalid Date');
  }

  const getSortDate = await meeting.findAll({
    where: {
      createdAt: {
        [Op.eq]: date
      },
      attendanceGroupId
    },
    limit: 10,
    order: [
      ['createdAt', 'DESC'],
    ]
  });
  return getSortDate;

}

module.exports = { userMeeting, meetingSort };

