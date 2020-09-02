const JoinUserToGroup = (io, socket_id, groupName) => {
  io(socket_id).join(groupName);
};

module.exports = { JoinUserToGroup };
