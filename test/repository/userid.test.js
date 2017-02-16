import userId from '../../src/repository/user-id';
import chai from 'chai';
chai.should();

describe('userid', function () {
    it('should fetch the userId if already set', function () {
        global.document.cookie.should.be.empty;

        const actualUserId = userId();

        actualUserId.should.not.be.empty;
        global.document.cookie.should.equal(`dsr_user_id=${actualUserId}`);
    });
});