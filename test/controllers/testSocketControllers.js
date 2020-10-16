const { expect } = require('chai');
const { messagesInGroup } = require('../../src/controllers/socket/utils');

describe('return messages in group', () => {
  it('it should return messages in a group', async () => {
    const groupId = 'a60v1eg';
    const offsetIndex = 0;

    const messages = await messagesInGroup(groupId, offsetIndex);

    expect(messages).to.be.an('array');
  });

  it('it Should throw an error if groupId is invalid', async () => {
    const groupId = 'a60v1ee';
    const offsetIndex = 0;

    expect(await messagesInGroup(groupId, offsetIndex)).to.throw();
  });
});
