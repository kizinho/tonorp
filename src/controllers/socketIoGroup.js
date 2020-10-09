const { userGroups } = require('./getUserGroups');

const JoinUserToGroup = async (io, id) => {
  try {
    const groups = await userGroups(id);
    groups.forEach((group) => {
      io.join(group.groupId);
    });
    return 'success';
  } catch (e) {
    /* handle error */
    console.log(e);
    throw e;
  }
};

module.exports = { JoinUserToGroup };
