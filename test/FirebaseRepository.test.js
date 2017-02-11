import Repository from '../src/FirebaseRepository';
import chai from 'chai';

chai.should();

function initializeRepository(initialState) {
    return new Promise(resolve => {
        const repository = new Repository({initialState});
        repository.onChange(resolve);
    })
}

describe('the firebase repository', function () {
    it('should be able to set and fetch the the default initial app state', function (done) {
        const obs = newRepository => {
            newRepository.columns.should.eql([
                {id: "G", title: "Good", cards: []},
                {id: "B", title: "Bad", cards: []},
                {id: "N", title: "Next actions", cards: []}
            ]);
            done();
        };

        const repository = new Repository();
        repository.onChange(obs);
    });

    it('should be able to set and fetch the the initial app state', function () {
        return initializeRepository({G: {title: "Good"}}).then(repository => {
            repository.columns.should.eql([
                {id: "G", title: "Good", cards: []},
            ]);
        });
    });

    it('should be able to create cards', function () {
        return initializeRepository({G: {title: "Good"}}).then(repository => {
            return new Promise(resolve => {
                repository.onChange(newRepository => {
                    newRepository.columns[0].cards[0].should.contain({title: 'title', votes: 0});
                    resolve();
                });
                repository.createCard({title: "title", columnId: "G"});
            });
        });
    });

    it('should be able to vote for cards', function (done) {
        initializeRepository({G: {title: "Good", cards: {card1: {title: "title", votes: 0}}}})
            .then(repository => {
                repository.onChange(newRepository => {
                    newRepository.columns[0].cards[0].votes.should.equal(1);
                    done();
                });
                repository.addVote("card1");
            });
    });

    it('should be able to remove votes for cards', function (done) {
        initializeRepository({G: {title: "Good", cards: {card1: {title: "title", votes: 0}}}})
            .then(repository => {
                repository.onChange(newRepository => {
                    newRepository.columns[0].cards[0].votes.should.equal(-1);
                    done();
                });
                repository.removeVote("card1");
            });
    });

    it('should be able to delete cards', function (done) {
        initializeRepository({G: {title: "Good", cards: {card1: {title: "title", votes: 0}}}})
            .then(repository => {
                repository.onChange(newRepository => {
                    newRepository.columns[0].cards.should.be.empty;
                    done();
                });
                repository.deleteCard("card1");
            });
    });
    it('should set the createCard flag for a column if the prepareCreateCard function is invoked', done => {
        initializeRepository({G: {title: "Good"}})
            .then(repository => {
                repository.onChange(() => {
                    repository.columns[0].createCard.should.be.true;
                    done();
                });

                repository.prepareCreateCard("G");
            });
    });
    it('should remove the createCard flag for a column if the undoPrepareCreateCard function is invoked', done => {
        initializeRepository({G: {title: "Good", createCard: true}})
            .then(repository => {
                repository.onChange(() => {
                    repository.columns[0].createCard.should.be.false;
                    done();
                });
                repository.undoPrepareCreateCard("G");
            });
    });
    it('should remove the createCard flag for a column if the undoPrepareCreateCard function is invoked', done => {
        initializeRepository({G: {title: "Good", createCard: true}})
            .then(repository => {
                repository.onChange(() => {
                    try {
                        repository.columns[0].createCard.should.be.false;
                        done();
                    } catch (e) {
                    }
                });
                repository.createCard({columnId: "G", title: "title"});
            });
    });
});