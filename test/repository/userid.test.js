import chai from 'chai';
import userId from '../../src/repository/user-id';

chai.should();

describe('userid', () => {
  it('should fetch the userId if already set', () => {
    const actualUserId = userId();

    actualUserId.should.not.be.empty;
    global.document.cookie.should.equal(`dsr_user_id=${actualUserId}`);
  });
});
